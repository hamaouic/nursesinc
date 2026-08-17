import jsPDF from 'jspdf';
import {
  medForms,
  medFormList,
  inventoryColumns,
  beersBullets,
  beersIntro,
  stoppStartBullets,
  stoppStartIntro,
  polypharmacyBullets,
  polypharmacyIntro,
  symptomCauseLabels,
  deprescribingAlgorithms,
  deprescribingConversationFields,
  empowerBullets,
  empowerIntro,
  adherenceSubsections,
  fridgeColumns,
  welcomePrepIntro,
  welcomePrepSections,
  welcomePrepScopeNote,
  feedbackIntro,
  feedbackInfoFields,
  feedbackQuestions,
  feedbackOpenQuestions,
  feedbackRecommendOptions,
  feedbackMarketingNote,
  feedbackMarketingConsent,
  feedbackClosingNote,
  emergencyCardIntro,
  emergencyCardFields,
  emergencyCardContacts,
  emergencyCardFooter,
  sideEffectTrackerIntro,
  sideEffectTrackerHeaders,
  sideEffectTrackerSeverityLabels,
  sideEffectTrackerPrompt,
  sideEffectTrackerWatchlist,
  doctorVisitPrepIntro,
  doctorVisitPrepSections,
  medFormReferences,
  type MedFormId,
} from '@/med-form-forms';
import type { FillableFormValues } from '@/fillable-form-schema';

/**
 * Build a single-page PDF for one of the 10 Medication Audit forms.
 * Layout is tight (US Letter, 0.5" margins, 8–10pt body) and overflow-safe:
 * if any block would push past the bottom margin, content is truncated to
 * fit. The References block is always included but in condensed APA form.
 */
export function generateMedFormPdf(
  id: MedFormId,
  values?: FillableFormValues,
): jsPDF {
  const meta = medForms[id];
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });

  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 36; // 0.5"
  const topY = 50;
  const bottomLimit = pageH - 50; // 0.5" footer band
  const contentW = pageW - marginX * 2;

  // ----- Header band -----
  doc.setFillColor(255, 209, 220);
  doc.rect(0, 0, pageW, 10, 'F');
  doc.setFillColor(181, 222, 192);
  doc.rect(0, 10, pageW, 3, 'F');
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(7);
  doc.setTextColor(44, 62, 80);
  doc.text(
    `Nurses Inc. · Form ${meta.number} of 10 · ${meta.audience}`,
    marginX,
    22,
  );

  // ----- Title -----
  let y = topY;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(15);
  doc.setTextColor(44, 62, 80);
  doc.text(`${meta.number}. ${meta.title}`, marginX, y);
  y += 14;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(8);
  doc.setTextColor(141, 207, 168);
  doc.text(meta.shortTitle.toUpperCase(), marginX, y);
  y += 10;

  // Audience chip
  doc.setFillColor(244, 251, 246);
  doc.roundedRect(marginX, y, 140, 14, 4, 4, 'F');
  doc.setFontSize(7);
  doc.setTextColor(44, 62, 80);
  doc.text(meta.audience, marginX + 6, y + 10);
  y += 22;

  // Divider
  doc.setDrawColor(255, 209, 220);
  doc.setLineWidth(0.6);
  doc.line(marginX, y, pageW - marginX, y);
  y += 10;

  // ----- Per-form content -----
  const safeSpace = (need: number) => y + need <= bottomLimit - 80; // reserve 80pt for references + footer

  const drawSectionTitle = (title: string) => {
    if (!safeSpace(20)) return false;
    doc.setFillColor(232, 245, 233);
    doc.roundedRect(marginX, y - 6, contentW, 16, 3, 3, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(9);
    doc.setTextColor(44, 62, 80);
    doc.text(title, marginX + 6, y + 4);
    y += 16;
    return true;
  };

  const drawIntro = (text: string) => {
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(60, 72, 84);
    const lines = doc.splitTextToSize(text, contentW);
    if (!safeSpace(lines.length * 10 + 4)) return;
    doc.text(lines, marginX, y);
    y += lines.length * 10 + 6;
  };

  const drawBullet = (text: string, depth = 0) => {
    const indent = depth * 10;
    const width = contentW - indent - 8;
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    const lines = doc.splitTextToSize(text, width);
    const need = lines.length * 10 + 2;
    if (!safeSpace(need)) return;
    doc.setTextColor(141, 207, 168);
    doc.text('•', marginX + indent, y + 7);
    doc.setTextColor(60, 72, 84);
    doc.text(lines, marginX + indent + 8, y + 7);
    y += need;
  };

  const drawField = (label: string, height: number, fieldName?: string) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(100, 117, 138);
    const need = 10 + height + 4;
    if (!safeSpace(need)) return;
    doc.text(label.toUpperCase(), marginX, y + 8);
    doc.setDrawColor(180, 188, 200);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + 10 + height - 1, marginX + contentW, y + 10 + height - 1);
    // If a captured value is provided, register an AcroForm text field over the
    // underline so the saved PDF can be edited in any PDF reader.
    if (fieldName && values) {
      const v = values[fieldName];
      const tf = doc.AcroForm.TextField(); tf.fieldName = fieldName;
      tf.value = typeof v === 'string' ? v : '';
      tf.x = marginX;
      tf.y = y + 10;
      tf.width = contentW;
      tf.height = height;
      tf.fontSize = 9;
      tf.maxFontSize = 9;
      tf.color = '#1B2733';
      doc.addField(tf);
    }
    y += need;
  };

  // ===== Per-form dispatch =====
  if (id === 'welcome-prep') {
    // Branded hero band
    if (safeSpace(48)) {
      doc.setFillColor(255, 233, 238); // blush-100
      doc.roundedRect(marginX, y, contentW, 36, 6, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(141, 207, 168); // mint accent
      doc.text('NURSES INC.  ·  MEDICATION COMPLIANCE AUDIT', marginX + 8, y + 14);
      doc.setFontSize(7.5);
      doc.setTextColor(100, 117, 138);
      doc.text('PHIPAA-aligned  ·  Under physician oversight', marginX + 8, y + 26);
      y += 44;
    }

    drawIntro(welcomePrepIntro);

    welcomePrepSections.forEach((section) => {
      if (!safeSpace(60)) return;

      // Section banner
      doc.setFillColor(232, 245, 233);
      doc.roundedRect(marginX, y, contentW, 18, 3, 3, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(9);
      doc.setTextColor(44, 62, 80);
      const headingLabel = section.intro
        ? `${section.number}  ·  ${section.heading}  —  ${section.intro}`
        : `${section.number}  ·  ${section.heading}`;
      doc.text(headingLabel, marginX + 6, y + 12);
      y += 22;

      section.items.forEach((item) => {
        if (!safeSpace(36)) return;

        // Checkbox
        doc.setDrawColor(141, 207, 168);
        doc.setLineWidth(0.8);
        doc.rect(marginX, y, 10, 10);

        // Bold heading
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(8);
        doc.setTextColor(44, 62, 80);
        const boldLabel = item.bold + ' ';
        const fullText = boldLabel + item.text;
        const wrapped = doc.splitTextToSize(fullText, contentW - 16);
        doc.text(wrapped, marginX + 14, y + 8);
        // Tint the bold prefix by re-rendering it on line 1 only in ink accent
        doc.setFont('helvetica', 'normal');
        y += Math.max(12, wrapped.length * 9 + 4);
      });
      y += 4;
    });

    // Scope-of-practice note callout
    if (safeSpace(40)) {
      doc.setFillColor(244, 251, 246);
      doc.setDrawColor(141, 207, 168);
      doc.setLineWidth(0.5);
      doc.roundedRect(marginX, y, contentW, 36, 4, 4, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(44, 62, 80);
      doc.text('SCOPE OF PRACTICE', marginX + 6, y + 11);
      doc.setFont('helvetica', 'normal');
      doc.setFontSize(7);
      doc.setTextColor(60, 72, 84);
      const scopeLines = doc.splitTextToSize(welcomePrepScopeNote, contentW - 12);
      doc.text(scopeLines, marginX + 6, y + 22);
      y += 44;
    }
  }

  else if (id === 'inventory') {
    drawIntro(
      'Bring every bottle, blister pack, inhaler, eye drop, cream, patch, and supplement. List one medication per row. Continue on additional sheets if needed.',
    );

    // Compute column widths proportional to content
    const weights = [2.4, 0.7, 0.6, 0.7, 0.9, 1.2, 1.1, 1.0, 0.9, 1.0];
    const totalW = weights.reduce((a, b) => a + b, 0);
    const colW = weights.map((w) => (w / totalW) * contentW);
    const headerH = 22;
    const rowH = 18;

    // Header
    if (!safeSpace(headerH + rowH * 16 + 6)) return doc;
    doc.setFillColor(232, 245, 233);
    doc.rect(marginX, y, contentW, headerH, 'F');
    doc.setDrawColor(180, 188, 200);
    doc.rect(marginX, y, contentW, headerH);
    let xc = marginX;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(6.5);
    doc.setTextColor(44, 62, 80);
    inventoryColumns.forEach((label, i) => {
      const w = colW[i];
      if (i > 0) doc.line(xc, y, xc, y + headerH);
      const wrapped = doc.splitTextToSize(label, w - 4);
      doc.text(wrapped, xc + 2, y + 9);
      xc += w;
    });
    y += headerH;

    // 16 data rows
    doc.setDrawColor(200, 208, 218);
    doc.setLineWidth(0.3);
    for (let i = 0; i < 16; i++) {
      doc.rect(marginX, y, contentW, rowH);
      xc = marginX;
      for (let j = 0; j < colW.length; j++) {
        if (j > 0) doc.line(xc, y, xc, y + rowH);
        xc += colW[j];
      }
      y += rowH;
    }
  }

  else if (id === 'beers') {
    drawIntro(beersIntro);
    beersBullets.forEach((b) => drawBullet(b));
  }

  else if (id === 'stopp-start') {
    drawIntro(stoppStartIntro);
    stoppStartBullets.forEach((b) => drawBullet(b));
  }

  else if (id === 'polypharmacy') {
    drawIntro(polypharmacyIntro);
    polypharmacyBullets.forEach((b) => drawBullet(b));
  }

  else if (id === 'symptom-cause') {
    drawIntro(
      'Before any new prescription is started in an older adult, complete one of these cards. If a likely medication cause is identified, document and discuss with the prescriber.',
    );
    const cardH = 86;
    if (!safeSpace(cardH * 4 + 6)) return doc;
    for (let r = 0; r < 4; r++) {
      // Card border
      doc.setDrawColor(200, 208, 218);
      doc.setLineWidth(0.4);
      doc.roundedRect(marginX, y, contentW, cardH, 4, 4, 'S');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(141, 207, 168);
      doc.text(`Symptom entry #${r + 1}`, marginX + 6, y + 10);
      let rowY = y + 22;
      symptomCauseLabels.forEach((label) => {
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(60, 72, 84);
        doc.text(label, marginX + 6, rowY);
        doc.setDrawColor(200, 208, 218);
        doc.setLineWidth(0.3);
        doc.line(marginX + 110, rowY + 1, marginX + contentW - 6, rowY + 1);
        rowY += 11;
      });
      y += cardH + 4;
    }
  }

  else if (id === 'deprescribing-algorithms') {
    drawIntro(
      'Evidence-based deprescribing algorithms for the four drug classes most commonly reviewed in older adults. Use the relevant algorithm in shared decision-making with the prescriber and the patient.',
    );
    deprescribingAlgorithms.forEach((algo) => {
      if (!safeSpace(40)) return;
      doc.setFillColor(244, 251, 246);
      doc.setDrawColor(141, 207, 168);
      doc.setLineWidth(0.4);
      doc.roundedRect(marginX, y, contentW, 14, 3, 3, 'FD');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(44, 62, 80);
      doc.text(algo.title, marginX + 6, y + 10);
      y += 18;
      algo.steps.forEach((step, idx) => {
        if (!safeSpace(20)) return;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(141, 207, 168);
        doc.text(`${idx + 1}.`, marginX + 6, y + 6);
        doc.setTextColor(60, 72, 84);
        const lines = doc.splitTextToSize(step, contentW - 18);
        doc.text(lines, marginX + 18, y + 6);
        y += lines.length * 9 + 2;
      });
      y += 4;
    });
  }

  else if (id === 'deprescribing-conversation') {
    drawIntro(
      'Schedule the conversation. Fill this in together with the patient and substitute decision-maker, then bring it to the prescriber visit.',
    );
    deprescribingConversationFields.forEach((f) => {
      drawField(f.label, f.multi ? 30 : 14);
    });
  }

  else if (id === 'empower-brochures') {
    drawIntro(empowerIntro);
    empowerBullets.forEach((b) => drawBullet(b));
  }

  else if (id === 'adherence-safety') {
    adherenceSubsections.forEach((sub) => {
      if (!safeSpace(40)) return;
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(8);
      doc.setTextColor(141, 207, 168);
      doc.text(sub.heading, marginX, y + 6);
      y += 12;
      sub.items.forEach((item) => {
        if (!safeSpace(16)) return;
        doc.setDrawColor(120, 130, 140);
        doc.setLineWidth(0.5);
        doc.rect(marginX, y, 10, 10);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(60, 72, 84);
        const lines = doc.splitTextToSize(item, contentW - 16);
        doc.text(lines, marginX + 14, y + 7);
        y += Math.max(12, lines.length * 9 + 2);
      });
      y += 4;
    });
  }

  else if (id === 'fridge-list') {
    drawIntro(
      'Print this page and post it on the fridge for emergency responders, family, and home-care workers. List the medications the person takes most often.',
    );
    // Patient header
    if (safeSpace(28)) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(100, 117, 138);
      doc.text('PATIENT NAME', marginX, y + 8);
      doc.line(marginX, y + 16, marginX + contentW * 0.55, y + 16);
      doc.text('DATE UPDATED', marginX + contentW * 0.62, y + 8);
      doc.line(marginX + contentW * 0.62, y + 16, marginX + contentW, y + 16);
      y += 24;
    }
    // Table
    const weights = [2.2, 0.8, 1.4, 1.1, 1.6];
    const totalW = weights.reduce((a, b) => a + b, 0);
    const colW = weights.map((w) => (w / totalW) * contentW);
    const headerH = 18;
    const rowH = 22;
    if (!safeSpace(headerH + rowH * 8 + 50)) return doc;
    doc.setFillColor(232, 245, 233);
    doc.setDrawColor(180, 188, 200);
    doc.rect(marginX, y, contentW, headerH, 'FD');
    let xc = marginX;
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(44, 62, 80);
    fridgeColumns.forEach((label, i) => {
      const w = colW[i];
      if (i > 0) doc.line(xc, y, xc, y + headerH);
      const wrapped = doc.splitTextToSize(label, w - 4);
      doc.text(wrapped, xc + 2, y + 8);
      xc += w;
    });
    y += headerH;
    doc.setDrawColor(200, 208, 218);
    doc.setLineWidth(0.3);
    for (let i = 0; i < 8; i++) {
      doc.rect(marginX, y, contentW, rowH);
      xc = marginX;
      for (let j = 0; j < colW.length; j++) {
        if (j > 0) doc.line(xc, y, xc, y + rowH);
        xc += colW[j];
      }
      y += rowH;
    }
    y += 8;
    if (safeSpace(28)) {
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(7);
      doc.setTextColor(100, 117, 138);
      doc.text('KNOWN ALLERGIES', marginX, y + 8);
      doc.line(marginX, y + 16, marginX + contentW, y + 16);
      y += 24;
    }
    if (safeSpace(28)) {
      doc.text('EMERGENCY CONTACT', marginX, y + 8);
      doc.line(marginX, y + 16, marginX + contentW, y + 16);
    }
  }

  else if (id === 'feedback-survey') {
    // Branded intro
    drawIntro(feedbackIntro);

    // ---- Section 1: General Information ----
    if (drawSectionTitle('1. General Information (Optional)')) {
      feedbackInfoFields.forEach((label) => {
        if (!safeSpace(20)) return;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 117, 138);
        doc.text(label.toUpperCase(), marginX, y + 8);
        doc.setDrawColor(180, 188, 200);
        doc.setLineWidth(0.4);
        doc.line(marginX, y + 14, marginX + contentW, y + 14);
        y += 18;
      });
      y += 4;
    }

    // ---- Section 2: Experience ratings ----
    if (drawSectionTitle('2. Your Experience')) {
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(7);
      doc.setTextColor(100, 117, 138);
      doc.text('Please circle or check your response.', marginX, y + 4);
      y += 12;

      feedbackQuestions.forEach((q, qi) => {
        if (!safeSpace(40)) return;
        // Question text
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(44, 62, 80);
        const qLines = doc.splitTextToSize(`${qi + 1}. ${q.prompt}`, contentW);
        doc.text(qLines, marginX, y + 8);
        y += qLines.length * 9 + 2;

        // Option checkboxes in a row
        const optionGap = 6;
        let optionX = marginX + 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(60, 72, 84);
        q.options.forEach((opt) => {
          // Approximate text width via character count * charW
          const textW = opt.length * 3.2 + 12; // checkbox + gap + padding
          doc.setDrawColor(141, 207, 168);
          doc.setLineWidth(0.6);
          doc.rect(optionX, y, 8, 8);
          doc.text(opt, optionX + 11, y + 6);
          optionX += textW + optionGap;
        });
        y += 14;
      });
      y += 4;
    }

    // ---- Section 3: Open feedback ----
    if (drawSectionTitle('3. Open Feedback & Comments')) {
      feedbackOpenQuestions.forEach((q) => {
        if (!safeSpace(36)) return;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(44, 62, 80);
        const qLines = doc.splitTextToSize(q, contentW);
        doc.text(qLines, marginX, y + 8);
        y += qLines.length * 9 + 4;
        // Writing lines
        for (let i = 0; i < 2; i++) {
          if (!safeSpace(14)) return;
          doc.setDrawColor(180, 188, 200);
          doc.setLineWidth(0.3);
          doc.line(marginX, y + 8, marginX + contentW, y + 8);
          y += 12;
        }
        y += 4;
      });

      // Recommendation row
      if (safeSpace(28)) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(44, 62, 80);
        const recPrompt =
          'Would you recommend our Independent Nursing Services to other families navigating senior care?';
        const recLines = doc.splitTextToSize(recPrompt, contentW);
        doc.text(recLines, marginX, y + 8);
        y += recLines.length * 9 + 4;

        let optionX = marginX + 4;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(60, 72, 84);
        feedbackRecommendOptions.forEach((opt) => {
          doc.setDrawColor(141, 207, 168);
          doc.setLineWidth(0.6);
          doc.rect(optionX, y, 8, 8);
          doc.text(opt, optionX + 11, y + 6);
          optionX += opt.length * 3.2 + 18;
        });
        y += 14;
      }
    }

    // ---- Section 4: Marketing authorization ----
    if (drawSectionTitle('4. Direct Authorization for Marketing (Optional)')) {
      if (safeSpace(48)) {
        // Mint callout for note
        doc.setFillColor(244, 251, 246);
        doc.setDrawColor(141, 207, 168);
        doc.setLineWidth(0.4);
        doc.roundedRect(marginX, y, contentW, 30, 3, 3, 'FD');
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(6.5);
        doc.setTextColor(60, 72, 84);
        const noteLines = doc.splitTextToSize(feedbackMarketingNote, contentW - 12);
        doc.text(noteLines, marginX + 6, y + 10);
        y += 36;
      }

      // Consent checkbox + label
      if (safeSpace(24)) {
        doc.setDrawColor(141, 207, 168);
        doc.setLineWidth(0.8);
        doc.rect(marginX, y, 9, 9);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7.5);
        doc.setTextColor(44, 62, 80);
        const consentLines = doc.splitTextToSize(
          feedbackMarketingConsent,
          contentW - 16,
        );
        doc.text(consentLines, marginX + 14, y + 6);
        y += Math.max(12, consentLines.length * 9 + 4);
      }

      // Signature + date underline fields
      ['Signature of Caregiver / Client', 'Date'].forEach((label) => {
        if (!safeSpace(20)) return;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 117, 138);
        doc.text(label.toUpperCase(), marginX, y + 8);
        doc.setDrawColor(180, 188, 200);
        doc.setLineWidth(0.4);
        doc.line(marginX, y + 14, marginX + contentW, y + 14);
        y += 18;
      });

      // Closing note
      if (safeSpace(20)) {
        y += 4;
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(7);
        doc.setTextColor(120, 130, 140);
        doc.text(feedbackClosingNote, marginX, y + 8);
      }
    }
  }

  else if (id === 'emergency-card') {
    // Branded mint hero band
    if (safeSpace(48)) {
      doc.setFillColor(232, 245, 233);
      doc.roundedRect(marginX, y, contentW, 36, 6, 6, 'F');
      doc.setFont('helvetica', 'bold');
      doc.setFontSize(11);
      doc.setTextColor(141, 207, 168);
      doc.text('NURSES INC.  ·  EMERGENCY CONTACT CARD', marginX + 8, y + 14);
      doc.setFontSize(7.5);
      doc.setTextColor(100, 117, 138);
      doc.text('Wallet · Fridge · Medication Bag  ·  Updated: ___________', marginX + 8, y + 26);
      y += 44;
    }

    drawIntro(emergencyCardIntro);

    if (drawSectionTitle('Patient Details')) {
      emergencyCardFields.forEach((f) => {
        if (!safeSpace(20)) return;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 117, 138);
        doc.text(f.label.toUpperCase(), marginX, y + 8);
        doc.setDrawColor(180, 188, 200);
        doc.setLineWidth(0.4);
        doc.line(marginX, y + 14, marginX + contentW, y + 14);
        y += 18;
      });
      y += 2;
    }

    if (drawSectionTitle('Emergency Contacts')) {
      emergencyCardContacts.forEach((c) => {
        if (!safeSpace(22)) return;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(44, 62, 80);
        doc.text(c.label, marginX, y + 8);
        doc.setFont('helvetica', 'italic');
        doc.setFontSize(6.5);
        doc.setTextColor(120, 130, 140);
        doc.text(c.sublabel, marginX, y + 16);
        doc.setDrawColor(180, 188, 200);
        doc.setLineWidth(0.4);
        doc.line(marginX, y + 22, marginX + contentW, y + 22);
        y += 24;
      });
    }

    if (safeSpace(24)) {
      y += 4;
      doc.setFillColor(244, 251, 246);
      doc.setDrawColor(141, 207, 168);
      doc.setLineWidth(0.4);
      doc.roundedRect(marginX, y, contentW, 18, 3, 3, 'FD');
      doc.setFont('helvetica', 'italic');
      doc.setFontSize(6.5);
      doc.setTextColor(60, 72, 84);
      const footerLines = doc.splitTextToSize(emergencyCardFooter, contentW - 12);
      doc.text(footerLines, marginX + 6, y + 8);
      y += 22;
    }
  }

  else if (id === 'side-effect-tracker') {
    drawIntro(sideEffectTrackerIntro);

    if (drawSectionTitle('Daily Symptom Log — 7 Days')) {
      // Build a table: 5 columns, 8 rows (1 header + 7 days)
      const weights = [1.2, 1.8, 2.4, 0.8, 1.4];
      const totalW = weights.reduce((a, b) => a + b, 0);
      const colW = weights.map((w) => (w / totalW) * contentW);
      const headerH = 22;
      const rowH = 26;

      if (safeSpace(headerH + rowH * 7 + 50)) {
        // Header row
        doc.setFillColor(232, 245, 233);
        doc.setDrawColor(180, 188, 200);
        doc.rect(marginX, y, contentW, headerH, 'FD');
        let xc = marginX;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(44, 62, 80);
        sideEffectTrackerHeaders.forEach((label, i) => {
          const w = colW[i];
          if (i > 0) doc.line(xc, y, xc, y + headerH);
          const wrapped = doc.splitTextToSize(label, w - 4);
          doc.text(wrapped, xc + 2, y + 8);
          xc += w;
        });
        y += headerH;
        // Body rows
        doc.setDrawColor(200, 208, 218);
        doc.setLineWidth(0.3);
        for (let i = 0; i < 7; i++) {
          doc.rect(marginX, y, contentW, rowH);
          xc = marginX;
          for (let j = 0; j < colW.length; j++) {
            if (j > 0) doc.line(xc, y, xc, y + rowH);
            xc += colW[j];
          }
          y += rowH;
        }
        y += 8;
      }
    }

    if (drawSectionTitle('Severity Scale (1–5)')) {
      sideEffectTrackerSeverityLabels.forEach((label) => {
        if (!safeSpace(10)) return;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(60, 72, 84);
        doc.text('•  ' + label, marginX + 4, y + 4);
        y += 9;
      });
    }

    if (drawSectionTitle(sideEffectTrackerPrompt)) {
      sideEffectTrackerWatchlist.forEach((item) => {
        if (!safeSpace(10)) return;
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(60, 72, 84);
        doc.text('•  ' + item, marginX + 4, y + 4);
        y += 9;
      });
    }
  }

  else if (id === 'doctor-visit-prep') {
    drawIntro(doctorVisitPrepIntro);

    doctorVisitPrepSections.forEach((section) => {
      if (!drawSectionTitle(`${section.number}. ${section.heading}`)) return;

      if (section.number === '5') {
        // Note row
        if (safeSpace(16)) {
          doc.setFont('helvetica', 'italic');
          doc.setFontSize(7);
          doc.setTextColor(100, 117, 138);
          doc.text('(Tip: Form 2 — Medication Inventory — is a great attachable reference.)', marginX, y + 8);
          y += 14;
        }
      }

      section.fields.forEach((label) => {
        if (!safeSpace(20)) return;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 117, 138);
        doc.text(label.toUpperCase(), marginX, y + 8);
        doc.setDrawColor(180, 188, 200);
        doc.setLineWidth(0.4);
        if (section.number === '4' && label === 'Recent falls or near-falls') {
          // Make this row a checkbox row
          doc.rect(marginX + contentW - 30, y + 2, 8, 8);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(6.5);
          doc.setTextColor(120, 130, 140);
          doc.text('Yes', marginX + contentW - 19, y + 8);
          doc.rect(marginX + contentW - 12, y + 2, 8, 8);
          doc.text('No', marginX + contentW - 1, y + 8);
        } else if (section.number === '7') {
          // Larger writing area for the goal
          doc.setDrawColor(180, 188, 200);
          doc.rect(marginX, y + 12, contentW, 28);
          y += 32;
          return;
        }
        doc.line(marginX, y + 14, marginX + contentW, y + 14);
        y += 18;
      });
      y += 4;
    });
  }

  else if (id === 'pain-score') {
    drawIntro(
      'Two validated 0–10 pain scales. Numeric Rating Scale (NRS) for self-reporting adults; Wong-Baker FACES® for non-verbal or paediatric patients. Reassess after every intervention and on routine rounds. Pain is whatever the patient says it is.',
    );

    // Section 1 — Patient + context
    if (drawSectionTitle('1. Patient & Pain Context')) {
      [
        ['Patient name', 'patient_name'],
        ['Date of assessment', 'date'],
        ['Time of assessment', 'time'],
        ['Location of pain (mark all that apply)', 'location'],
        ['Onset (sudden / gradual)', 'onset'],
        ['Aggravating factors', 'aggravating'],
        ['Relieving factors', 'relieving'],
      ].forEach(([label, name]) =>
        drawField(label, 14, name),
      );
      y += 4;

      // Quality checkboxes
      if (safeSpace(30)) {
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(100, 117, 138);
        doc.text('QUALITY OF PAIN', marginX, y + 8);
        y += 10;
        const qualities = [
          'Sharp',
          'Dull',
          'Burning',
          'Aching',
          'Throbbing',
          'Stabbing',
          'Cramping',
          'Tingling',
        ];
        let cx = marginX;
        qualities.forEach((q) => {
          doc.setDrawColor(141, 207, 168);
          doc.setLineWidth(0.5);
          doc.rect(cx, y, 7, 7);
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(60, 72, 84);
          doc.text(q, cx + 10, y + 6);
          cx += 60;
        });
        y += 14;
      }
    }

    // Section 2 — NRS scale 0-10
    if (drawSectionTitle('2. Numeric Rating Scale (NRS) — Adults')) {
      if (safeSpace(80)) {
        // Bar of 11 numbered cells
        const cellW = contentW / 11;
        const barY = y;
        const barH = 18;
        const gradients: Array<[number, number, number]> = [
          [255, 209, 220],
          [255, 209, 220],
          [255, 222, 184],
          [255, 222, 184],
          [253, 244, 191],
          [253, 244, 191],
          [220, 245, 215],
          [220, 245, 215],
          [200, 232, 222],
          [200, 232, 222],
          [181, 222, 192],
        ];
        for (let i = 0; i <= 10; i++) {
          const [r, g, b] = gradients[i];
          doc.setFillColor(r, g, b);
          doc.setDrawColor(180, 188, 200);
          doc.setLineWidth(0.3);
          doc.rect(marginX + i * cellW, barY, cellW, barH, 'FD');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(10);
          doc.setTextColor(44, 62, 80);
          doc.text(String(i), marginX + i * cellW + cellW / 2, barY + 12, {
            align: 'center',
          });
        }
        y += barH + 2;

        // Scale labels under bar
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(6.5);
        doc.setTextColor(100, 117, 138);
        doc.text('No pain', marginX, y + 8);
        doc.text('Mild', marginX + contentW * 0.35, y + 8, { align: 'center' });
        doc.text('Moderate', marginX + contentW * 0.6, y + 8, {
          align: 'center',
        });
        doc.text('Severe', marginX + contentW * 0.85, y + 8, { align: 'center' });
        doc.text('Worst possible', marginX + contentW, y + 8, { align: 'right' });
        y += 14;

        // Severity legend
        const legend: Array<[string, string]> = [
          ['0', 'No pain'],
          ['1–3', 'Mild — score again in 1 h'],
          ['4–6', 'Moderate — notify physician'],
          ['7–10', 'Severe — urgent reassessment'],
        ];
        legend.forEach(([score, label]) => {
          if (!safeSpace(9)) return;
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(7);
          doc.setTextColor(60, 72, 84);
          doc.text(`•  ${score}  →  ${label}`, marginX + 4, y + 6);
          y += 8;
        });
        y += 4;

        // NRS score field
        drawField("Patient's NRS score (0–10)", 16, 'nrs_score');
      }
    }

    // Section 3 — Wong-Baker FACES (illustrative squares, 6 faces)
    if (drawSectionTitle('3. Wong-Baker FACES® — Non-verbal / Paediatric')) {
      if (safeSpace(60)) {
        const faceLabels = ['No hurt', 'Hurts little bit', 'Hurts little more', 'Hurts even more', 'Hurts whole lot', 'Hurts worst'];
        const faceScores = ['0', '2', '4', '6', '8', '10'];
        const faceW = contentW / 6;
        const faceH = 38;
        // Faces drawn as labeled colored cells — schematic, not actual face glyphs
        const faceGradients: Array<[number, number, number]> = [
          [181, 222, 192],
          [220, 245, 215],
          [253, 244, 191],
          [255, 222, 184],
          [255, 209, 220],
          [255, 170, 188],
        ];
        for (let i = 0; i < 6; i++) {
          const [r, g, b] = faceGradients[i];
          doc.setFillColor(r, g, b);
          doc.setDrawColor(180, 188, 200);
          doc.setLineWidth(0.3);
          doc.rect(marginX + i * faceW, y, faceW - 2, faceH, 'FD');
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(11);
          doc.setTextColor(44, 62, 80);
          doc.text(faceScores[i], marginX + i * faceW + faceW / 2 - 1, y + 14, {
            align: 'center',
          });
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(6.5);
          doc.setTextColor(60, 72, 84);
          const lbl = doc.splitTextToSize(faceLabels[i], faceW - 4);
          doc.text(lbl, marginX + i * faceW + faceW / 2 - 1, y + 24, {
            align: 'center',
          });
        }
        y += faceH + 4;
        drawField("Patient's FACES® score", 14, 'faces_score');
      }
    }

    // Section 4 — Reassessments
    if (drawSectionTitle('4. Reassessments (after intervention / routine rounds)')) {
      const weights = [1.0, 1.2, 1.0, 1.0, 2.4, 1.2, 1.2];
      const totalW = weights.reduce((a, b) => a + b, 0);
      const colW = weights.map((w) => (w / totalW) * contentW);
      const headerH = 22;
      const rowH = 24;
      const headers = [
        'Date',
        'Time',
        'NRS',
        'FACES',
        'Intervention given',
        'Response',
        'Nurse sig.',
      ];
      if (safeSpace(headerH + rowH * 4 + 10)) {
        doc.setFillColor(232, 245, 233);
        doc.setDrawColor(180, 188, 200);
        doc.rect(marginX, y, contentW, headerH, 'FD');
        let xc = marginX;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(44, 62, 80);
        headers.forEach((label, i) => {
          const w = colW[i];
          if (i > 0) doc.line(xc, y, xc, y + headerH);
          const wrapped = doc.splitTextToSize(label, w - 4);
          doc.text(wrapped, xc + 2, y + 9);
          xc += w;
        });
        y += headerH;
        doc.setDrawColor(200, 208, 218);
        doc.setLineWidth(0.3);
        const reassessmentRowIds = ['one', 'two', 'three', 'four'] as const;
        const reassessmentFieldNames = [
          'date',
          'time',
          'nrs',
          'faces',
          'intervention',
          'response',
          'sig',
        ] as const;
        for (let i = 0; i < 4; i++) {
          doc.rect(marginX, y, contentW, rowH);
          xc = marginX;
          for (let j = 0; j < colW.length; j++) {
            if (j > 0) doc.line(xc, y, xc, y + rowH);
            // Register an AcroForm text field inside each cell so the saved
            // PDF stays editable.
            if (values) {
              const fieldName = `r_${reassessmentRowIds[i]}_${reassessmentFieldNames[j]}`;
              const tf = doc.AcroForm.TextField(); tf.fieldName = fieldName;
              tf.value = String(values[fieldName] ?? '');
              tf.x = xc + 2;
              tf.y = y + 2;
              tf.width = colW[j] - 4;
              tf.height = rowH - 4;
              tf.fontSize = 8;
              tf.maxFontSize = 8;
              tf.color = '#1B2733';
              doc.addField(tf);
            }
            xc += colW[j];
          }
          y += rowH;
        }
        y += 4;
      }
    }

    // Section 5 — Signature
    drawField('Nurse signature & designation', 14, 'nurse_sig');
    drawField('Date', 14, 'sig_date');
  }

  else if (id === 'glasgow-coma-scale') {
    drawIntro(
      'Quick bedside assessment of consciousness level. Total = Eye (E) + Verbal (V) + Motor (M). Maximum 15. Reassess at least hourly for any patient with a GCS < 13. A drop of 2 or more points is a medical emergency — call rapid response.',
    );

    // Scoring table — 3 components
    if (drawSectionTitle('Component Scores')) {
      if (safeSpace(120)) {
        const weights = [1.6, 0.7, 1.0, 0.7, 0.6];
        const totalW = weights.reduce((a, b) => a + b, 0);
        const colW = weights.map((w) => (w / totalW) * contentW);
        const headerH = 20;
        const rowH = 18;

        // Header
        doc.setFillColor(232, 245, 233);
        doc.setDrawColor(180, 188, 200);
        doc.rect(marginX, y, contentW, headerH, 'FD');
        const headers = ['Component', 'Score', 'Criterion', 'Patient response', 'Init.'];
        let xc = marginX;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7);
        doc.setTextColor(44, 62, 80);
        headers.forEach((label, i) => {
          const w = colW[i];
          if (i > 0) doc.line(xc, y, xc, y + headerH);
          const wrapped = doc.splitTextToSize(label, w - 4);
          doc.text(wrapped, xc + 2, y + 9);
          xc += w;
        });
        y += headerH;

        // Rows
        const rows: Array<[string, string, string, string]> = [
          [
            'Eye opening (E)',
            '4',
            'Spontaneous',
            'Opens eyes on own',
          ],
          ['', '3', 'To speech', 'Opens eyes to verbal stimulation'],
          ['', '2', 'To pain', 'Opens eyes to painful stimulus'],
          ['', '1', 'None', 'No eye opening'],
          [
            'Verbal response (V)',
            '5',
            'Oriented',
            'Knows name, date, location',
          ],
          ['', '4', 'Confused', 'Converses but disoriented'],
          ['', '3', 'Inappropriate', 'Random or incomprehensible words'],
          ['', '2', 'Incomprehensible', 'Moaning, no words'],
          ['', '1', 'None', 'No verbal response'],
          [
            'Motor response (M)',
            '6',
            'Obeys commands',
            'Follows simple motor commands',
          ],
          ['', '5', 'Localises pain', 'Purposeful movement to pain'],
          ['', '4', 'Withdraws from pain', 'Pulls limb away from pain'],
          ['', '3', 'Abnormal flexion', 'Decorticate posturing'],
          ['', '2', 'Abnormal extension', 'Decerebrate posturing'],
          ['', '1', 'None', 'Flaccid / no movement'],
        ];

        doc.setDrawColor(200, 208, 218);
        doc.setLineWidth(0.3);
        rows.forEach((r, idx) => {
          // Alt row tint for the 3 component groups
          if (idx === 0 || idx === 5 || idx === 10) {
            doc.setFillColor(244, 251, 246);
            doc.rect(marginX, y, contentW, rowH, 'F');
            doc.rect(marginX, y, contentW, rowH);
          } else {
            doc.rect(marginX, y, contentW, rowH);
          }
          xc = marginX;
          // Component (col 0)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          doc.setTextColor(44, 62, 80);
          doc.text(r[0], xc + 2, y + 12);
          xc += colW[0];
          if (idx !== 0 && idx !== 5 && idx !== 10) doc.line(xc, y, xc, y + rowH);
          // Score (col 1)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(9);
          doc.setTextColor(141, 207, 168);
          doc.text(r[1], xc + colW[1] / 2, y + 13, { align: 'center' });
          xc += colW[1];
          doc.line(xc, y, xc, y + rowH);
          // Criterion (col 2)
          doc.setFont('helvetica', 'bold');
          doc.setFontSize(6.5);
          doc.setTextColor(44, 62, 80);
          doc.text(r[2], xc + 2, y + 12);
          xc += colW[2];
          doc.line(xc, y, xc, y + rowH);
          // Patient response (col 3)
          doc.setFont('helvetica', 'normal');
          doc.setFontSize(6.5);
          doc.setTextColor(60, 72, 84);
          doc.text(r[3], xc + 2, y + 12);
          xc += colW[3];
          doc.line(xc, y, xc, y + rowH);
          // Init (col 4) — empty
          doc.line(xc, y, xc, y + rowH);
          y += rowH;
        });
        y += 4;
      }
    }

    // Total + severity bands
    if (drawSectionTitle('Total Score & Severity')) {
      drawField('Eye (E) score (1–4)', 14, 'eye_score');
      drawField('Verbal (V) score (1–5)', 14, 'verbal_score');
      drawField('Motor (M) score (1–6)', 14, 'motor_score');
      drawField('GCS total (E + V + M)  /  15', 16, 'total_score');
      drawField('Severity band', 14, 'severity_band');

      // Severity bands
      if (safeSpace(40)) {
        doc.setFillColor(244, 251, 246);
        doc.setDrawColor(141, 207, 168);
        doc.setLineWidth(0.4);
        doc.roundedRect(marginX, y, contentW, 36, 3, 3, 'FD');
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(7.5);
        doc.setTextColor(44, 62, 80);
        doc.text('SEVERITY BANDS', marginX + 6, y + 10);
        doc.setFont('helvetica', 'normal');
        doc.setFontSize(7);
        doc.setTextColor(60, 72, 84);
        const sevLines = doc.splitTextToSize(
          '13–15  Mild brain injury · routine reassessment every 4 h\n9–12   Moderate brain injury · hourly reassessment · notify physician\n3–8    Severe brain injury · ICU / airway management · call rapid response',
          contentW - 12,
        );
        doc.text(sevLines, marginX + 6, y + 20);
        y += 44;
      }
    }

    // Pupil check
    if (drawSectionTitle('Pupillary Response (always assess with GCS)')) {
      drawField('Right pupil size (mm)', 14, 'pupil_r_size');
      drawField('Right pupil reaction', 14, 'pupil_r_reaction');
      drawField('Left pupil size (mm)', 14, 'pupil_l_size');
      drawField('Left pupil reaction', 14, 'pupil_l_reaction');
    }

    // Trending table
    if (drawSectionTitle('GCS Trend — last 6 readings')) {
      const weights = [0.9, 0.6, 0.5, 0.5, 0.5, 0.6, 2.0, 1.0];
      const totalW = weights.reduce((a, b) => a + b, 0);
      const colW = weights.map((w) => (w / totalW) * contentW);
      const headerH = 22;
      const rowH = 18;
      const headers = ['Date', 'Time', 'E', 'V', 'M', 'Total', 'Notes / intervention', 'Nurse'];
      if (safeSpace(headerH + rowH * 6 + 8)) {
        doc.setFillColor(232, 245, 233);
        doc.setDrawColor(180, 188, 200);
        doc.rect(marginX, y, contentW, headerH, 'FD');
        let xc = marginX;
        doc.setFont('helvetica', 'bold');
        doc.setFontSize(6.5);
        doc.setTextColor(44, 62, 80);
        headers.forEach((label, i) => {
          const w = colW[i];
          if (i > 0) doc.line(xc, y, xc, y + headerH);
          const wrapped = doc.splitTextToSize(label, w - 4);
          doc.text(wrapped, xc + 2, y + 9);
          xc += w;
        });
        y += headerH;
        doc.setDrawColor(200, 208, 218);
        doc.setLineWidth(0.3);
        const trendRowIds = ['one', 'two', 'three', 'four', 'five', 'six'] as const;
        const trendFieldNames = [
          'date',
          'time',
          'e',
          'v',
          'm',
          'total',
          'notes',
          'nurse',
        ] as const;
        for (let i = 0; i < 6; i++) {
          doc.rect(marginX, y, contentW, rowH);
          xc = marginX;
          for (let j = 0; j < colW.length; j++) {
            if (j > 0) doc.line(xc, y, xc, y + rowH);
            if (values) {
              const fieldName = `t_${trendRowIds[i]}_${trendFieldNames[j]}`;
              const tf = doc.AcroForm.TextField(); tf.fieldName = fieldName;
              tf.value = String(values[fieldName] ?? '');
              tf.x = xc + 2;
              tf.y = y + 2;
              tf.width = colW[j] - 4;
              tf.height = rowH - 4;
              tf.fontSize = 8;
              tf.maxFontSize = 8;
              tf.color = '#1B2733';
              doc.addField(tf);
            }
            xc += colW[j];
          }
          y += rowH;
        }
        y += 4;
      }
    }

    drawField('Nurse signature & designation', 14, 'nurse_sig');
    drawField('Date / time of assessment', 14, 'sig_date');
  }

  // ===== References (condensed APA) =====
  // Always at the bottom; trim if no space
  if (y + 50 > bottomLimit) {
    // try to anchor at the bottom limit with very tight references
    y = bottomLimit - 50;
  }
  doc.setDrawColor(181, 222, 192);
  doc.line(marginX, y, pageW - marginX, y);
  y += 8;
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(7);
  doc.setTextColor(44, 62, 80);
  doc.text('References (APA, 7th ed. — condensed)', marginX, y);
  y += 8;
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(6);
  medFormReferences.forEach((r, i) => {
    const lines = doc.splitTextToSize(`${i + 1}. ${r}`, contentW);
    if (y + lines.length * 7 > bottomLimit + 30) return;
    doc.setTextColor(60, 72, 84);
    doc.text(lines, marginX, y);
    y += lines.length * 7;
  });

  // ----- Footer -----
  doc.setFontSize(6);
  doc.setTextColor(120, 130, 140);
  doc.text(
    `Nurses Inc. · Form ${meta.number} of 10 · PHIPAA-aligned · Page 1`,
    marginX,
    pageH - 20,
  );
  doc.text(
    'For clinical use, not legal advice.',
    pageW - marginX,
    pageH - 20,
    { align: 'right' },
  );

  return doc;
}

/** Download helper used by the UI. Accepts optional captured values. */
export function downloadMedForm(
  id: MedFormId,
  values?: FillableFormValues,
) {
  const doc = generateMedFormPdf(id, values);
  doc.save(medForms[id].filename);
}

/** Preview helper — returns an object URL for the iframe. */
export function previewMedForm(
  id: MedFormId,
  values?: FillableFormValues,
): string {
  const doc = generateMedFormPdf(id, values);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}

/**
 * Open the form in a new tab and trigger the browser print dialog.
 * The form is generated as a PDF blob first so the user prints a clean
 * single-page document rather than the raw HTML wrapper.
 */
export function printMedForm(id: MedFormId): void {
  const url = previewMedForm(id);
  const win = window.open(url, '_blank');
  if (win) {
    win.addEventListener('load', () => {
      try {
        win.focus();
        win.print();
      } catch {
        /* user closed the window — fine */
      }
    });
  }
}

/**
 * Bundle download — generates all 10 forms in sequence and triggers a
 * download for each one. Browsers queue sequential downloads gracefully;
 * JSZip is intentionally avoided to keep the bundle dependency-free.
 */
export function downloadAllMedForms(): void {
  medFormList.forEach((f, i) => {
    setTimeout(() => downloadMedForm(f.id), i * 250);
  });
}
