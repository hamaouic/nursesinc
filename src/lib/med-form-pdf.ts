import jsPDF from 'jspdf';
import {
  medForms,
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

/**
 * Build a single-page PDF for one of the 10 Medication Audit forms.
 * Layout is tight (US Letter, 0.5" margins, 8–10pt body) and overflow-safe:
 * if any block would push past the bottom margin, content is truncated to
 * fit. The References block is always included but in condensed APA form.
 */
export function generateMedFormPdf(id: MedFormId): jsPDF {
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

  const drawField = (label: string, height: number) => {
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(7);
    doc.setTextColor(100, 117, 138);
    const need = 10 + height + 4;
    if (!safeSpace(need)) return;
    doc.text(label.toUpperCase(), marginX, y + 8);
    doc.setDrawColor(180, 188, 200);
    doc.setLineWidth(0.4);
    doc.line(marginX, y + 10 + height - 1, marginX + contentW, y + 10 + height - 1);
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

/** Download helper used by the UI. */
export function downloadMedForm(id: MedFormId) {
  const doc = generateMedFormPdf(id);
  doc.save(medForms[id].filename);
}

/** Preview helper — returns an object URL for the iframe. */
export function previewMedForm(id: MedFormId): string {
  const doc = generateMedFormPdf(id);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}