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
  if (id === 'inventory') {
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