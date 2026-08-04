import jsPDF from 'jspdf';
import {
  onePagers,
  onePagerContent,
  type OnePagerId,
} from '@/onepagers-config';

/**
 * Print-ready one-pager PDF generator (US Letter, 1–2 pages).
 * Each one-pager has:
 *  - branded header band (blush + mint)
 *  - large title + subtitle
 *  - 4 evidence-aligned body blocks
 *  - NB-specific caregiving context
 *  - printable caregiver checklist
 *  - back page with full APA references + disclaimer
 */
export function generateOnePagerPdf(id: OnePagerId) {
  const meta = onePagers[id];
  const data = onePagerContent[id];
  const doc = buildOnePagerDoc(meta, data);
  doc.save(meta.filename);
}

/**
 * Generate the one-pager as a Blob URL for in-browser preview.
 * Caller is responsible for revoking the URL when done.
 */
export function previewOnePagerPdf(id: OnePagerId): string {
  const meta = onePagers[id];
  const data = onePagerContent[id];
  const doc = buildOnePagerDoc(meta, data);
  const blob = doc.output('blob');
  return URL.createObjectURL(blob);
}

function buildOnePagerDoc(
  meta: (typeof onePagers)[OnePagerId],
  data: (typeof onePagerContent)[OnePagerId],
) {
  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 54;
  const contentW = pageW - marginX * 2;
  let y = 64;
  let pageNum = 1;

  const drawHeader = () => {
    doc.setFillColor(255, 209, 220);
    doc.rect(0, 0, pageW, 12, 'F');
    doc.setFillColor(181, 222, 192);
    doc.rect(0, 12, pageW, 4, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(44, 62, 80);
    doc.text('Nurses Inc. · New Brunswick · nursesinc.ca', marginX, 28);
  };

  const drawFooter = () => {
    doc.setFontSize(8);
    doc.setTextColor(120, 130, 140);
    doc.text(
      `${meta.title} · One-Pager · Page ${pageNum}`,
      marginX,
      pageH - 28,
    );
    doc.text(
      'PHIPAA-aligned · For clinical use, not legal advice.',
      pageW - marginX,
      pageH - 28,
      { align: 'right' },
    );
  };

  const newPageIfNeeded = (minSpace: number) => {
    if (y + minSpace > pageH - 64) {
      drawFooter();
      doc.addPage();
      drawHeader();
      pageNum++;
      y = 100;
    }
  };

  // First page setup
  drawHeader();

  // Title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(24);
  doc.setTextColor(44, 62, 80);
  doc.text(meta.title, marginX, 80);
  y = 80;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(12);
  doc.setTextColor(141, 207, 168);
  doc.text(meta.shortTitle.toUpperCase(), marginX, 98);
  y = 110;

  // Audience chip
  doc.setFillColor(244, 251, 246);
  doc.roundedRect(marginX, y, 180, 22, 8, 8, 'F');
  doc.setFontSize(9);
  doc.setTextColor(44, 62, 80);
  doc.text(meta.audience, marginX + 10, y + 15);
  y += 36;

  // Divider
  doc.setDrawColor(255, 209, 220);
  doc.setLineWidth(1);
  doc.line(marginX, y, pageW - marginX, y);
  y += 14;

  // Intro
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(44, 62, 80);
  for (const para of data.intro) {
    newPageIfNeeded(40);
    const lines = doc.splitTextToSize(para, contentW);
    doc.text(lines, marginX, y);
    y += lines.length * 14 + 6;
  }
  y += 10;

  // NB context callout
  newPageIfNeeded(120);
  doc.setFillColor(232, 245, 233);
  doc.roundedRect(marginX, y, contentW, 100, 12, 12, 'F');
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(11);
  doc.setTextColor(44, 62, 80);
  doc.text('New Brunswick context', marginX + 14, y + 18);
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  const nbLines = doc.splitTextToSize(data.nbContext.join(' '), contentW - 28);
  doc.text(nbLines, marginX + 14, y + 36);
  y += 116;

  // Body blocks
  data.blocks.forEach((block, idx) => {
    newPageIfNeeded(140);
    doc.setFillColor(255, 233, 238);
    doc.roundedRect(marginX - 4, y - 14, contentW + 8, 24, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(44, 62, 80);
    doc.text(`${idx + 1} · ${block.heading}`, marginX, y + 2);
    y += 22;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    doc.setTextColor(60, 72, 84);
    const lines = doc.splitTextToSize(block.body, contentW);
    newPageIfNeeded(lines.length * 14 + 8);
    doc.text(lines, marginX, y + 6);
    y += lines.length * 14 + 14;
  });

  // Caregiver checklist
  newPageIfNeeded(180);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(44, 62, 80);
  doc.text('Caregiver checklist', marginX, y + 4);
  y += 22;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  data.checklist.forEach((line) => {
    newPageIfNeeded(24);
    const lines = doc.splitTextToSize(line, contentW - 16);
    doc.setTextColor(141, 207, 168);
    doc.text('☐', marginX, y + 8);
    doc.setTextColor(60, 72, 84);
    doc.text(lines, marginX + 18, y + 8);
    y += lines.length * 14 + 4;
  });

  y += 18;

  // References page
  newPageIfNeeded(200);
  doc.setDrawColor(181, 222, 192);
  doc.line(marginX, y, pageW - marginX, y);
  y += 18;

  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(44, 62, 80);
  doc.text('References (APA, 7th ed.)', marginX, y + 4);
  y += 22;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  data.references.forEach((ref, i) => {
    newPageIfNeeded(60);
    const lines = doc.splitTextToSize(ref, contentW);
    doc.setTextColor(141, 207, 168);
    doc.text(`${i + 1}.`, marginX, y + 4);
    doc.setTextColor(60, 72, 84);
    doc.text(lines, marginX + 18, y + 4);
    y += lines.length * 12 + 6;
  });

  y += 14;
  newPageIfNeeded(80);
  doc.setDrawColor(181, 222, 192);
  doc.line(marginX, y, pageW - marginX, y);
  y += 16;

  doc.setFontSize(9);
  doc.setTextColor(120, 130, 140);
  const disclaimer =
    'This one-pager is for educational and clinical workflow use. It does not substitute for clinical judgement, prescriber authority, or legal advice. Nurses Inc. is an independent collaborative nursing practice in New Brunswick; all services are delivered under physician oversight and in alignment with the New Brunswick Personal Health Information Privacy and Access Act (PHIPAA) and ANBLPN Collaborative Practice Regulations.';
  const discLines = doc.splitTextToSize(disclaimer, contentW);
  doc.text(discLines, marginX, y);

  // Page numbers
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    pageNum = p;
    drawFooter();
  }

  return doc;
}