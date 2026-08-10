import jsPDF from 'jspdf';
import {
  Document,
  Packer,
  Paragraph,
  HeadingLevel,
  TextRun,
  AlignmentType,
  PageBreak,
  Table,
  TableRow,
  TableCell,
  WidthType,
  BorderStyle,
} from 'docx';
import { saveAs } from 'file-saver';
import {
  deEscalationContent,
  familyKitContent,
  resources,
  type ResourceId,
} from '@/resources-config';

type Block = { heading: string; items: string[] };

type Payload = {
  intro: string[];
  sections: Block[];
  references: string[];
};

const payloadMap: Partial<Record<ResourceId, Payload>> = {
  'de-escalation-playbook': deEscalationContent,
  'family-care-conference-kit': familyKitContent,
};

// ---------------------------------------------------------------------------
// PDF generator (jsPDF) — designed for clean printing on letter paper.
// Brand accents: blush #FF9FB3, mint #8FCB9F, ink #2C3E50.
// ---------------------------------------------------------------------------

export function generatePdf(id: ResourceId) {
  // Medication audit is now a bundle of 10 single-page forms.
  // Download / preview of individual forms is handled by `med-form-pdf.ts`.
  if (id === 'medication-audit-checklist') return;
  generateStandardPdf(id);
}

/**
 * Medication Audit is now a bundle of 10 standalone single-page forms.
 * See src/lib/med-form-pdf.ts for the per-form generator and previewer.
 */

/**
 * Standard PDF generator for the playbook and (in the future) any non-form resource.
 */
function generateStandardPdf(id: ResourceId) {
  const meta = resources[id];
  const data = payloadMap[id]!;

  const doc = new jsPDF({ unit: 'pt', format: 'letter' });
  const pageW = doc.internal.pageSize.getWidth();
  const pageH = doc.internal.pageSize.getHeight();
  const marginX = 54;
  const contentW = pageW - marginX * 2;
  let y = 64;
  let pageNum = 1;

  const newPageIfNeeded = (minSpace = 80) => {
    if (y + minSpace > pageH - 64) {
      drawFooter(pageNum++);
      doc.addPage();
      drawHeader();
      y = 100;
    }
  };

  const drawHeader = () => {
    // Brand band
    doc.setFillColor(255, 209, 220); // blush-200
    doc.rect(0, 0, pageW, 12, 'F');
    doc.setFillColor(181, 222, 192); // mint-300
    doc.rect(0, 12, pageW, 4, 'F');
    doc.setFont('helvetica', 'normal');
    doc.setFontSize(8);
    doc.setTextColor(44, 62, 80);
    doc.text('Nurses Inc. · New Brunswick · nursesinc.ca', marginX, 28);
  };

  const drawFooter = (pageNum: number) => {
    doc.setFontSize(8);
    doc.setTextColor(120, 130, 140);
    doc.text(
      `${meta.title} · Page ${pageNum}`,
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

  // Initialize first page
  drawHeader();

  // Cover title
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(22);
  doc.setTextColor(44, 62, 80);
  doc.text(meta.title, marginX, 80);
  y = 80;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(80, 92, 105);
  const subtitleLines = doc.splitTextToSize(meta.subtitle, contentW);
  doc.text(subtitleLines, marginX, y + 18);
  y += 18 + subtitleLines.length * 14;

  // Tag chip
  doc.setFillColor(244, 251, 246); // mint-50
  doc.roundedRect(marginX, y + 4, 150, 22, 8, 8, 'F');
  doc.setFontSize(9);
  doc.setTextColor(44, 62, 80);
  doc.text(meta.audience, marginX + 10, y + 19);
  y += 40;

  // Divider
  doc.setDrawColor(255, 209, 220);
  doc.setLineWidth(1);
  doc.line(marginX, y, pageW - marginX, y);
  y += 18;

  // Intro paragraphs
  doc.setFont('helvetica', 'normal');
  doc.setFontSize(11);
  doc.setTextColor(44, 62, 80);
  for (const para of data.intro) {
    newPageIfNeeded(40);
    if (para === meta.title) continue; // already drawn
    const lines = doc.splitTextToSize(para, contentW);
    doc.text(lines, marginX, y);
    y += lines.length * 14 + 6;
  }
  y += 10;

  // Sections
  data.sections.forEach((section, sIdx) => {
    newPageIfNeeded(120);
    // Section heading
    doc.setFillColor(255, 233, 238); // blush-100
    doc.roundedRect(marginX - 6, y - 14, contentW + 12, 28, 6, 6, 'F');
    doc.setFont('helvetica', 'bold');
    doc.setFontSize(13);
    doc.setTextColor(44, 62, 80);
    doc.text(section.heading, marginX, y + 4);
    y += 30;

    doc.setFont('helvetica', 'normal');
    doc.setFontSize(11);
    section.items.forEach((item, iIdx) => {
      newPageIfNeeded(36);
      const bullet = `•`;
      const lines = doc.splitTextToSize(item, contentW - 16);
      doc.setTextColor(141, 207, 168); // mint-400 accent bullet
      doc.text(bullet, marginX, y);
      doc.setTextColor(60, 72, 84);
      doc.text(lines, marginX + 14, y);
      y += lines.length * 14 + 4;
    });
    y += 8;
  });

  // References page
  newPageIfNeeded(200);
  doc.setFont('helvetica', 'bold');
  doc.setFontSize(14);
  doc.setTextColor(44, 62, 80);
  doc.text('References (APA, 7th ed.)', marginX, y + 6);
  y += 26;

  doc.setFont('helvetica', 'normal');
  doc.setFontSize(10);
  data.references.forEach((ref, i) => {
    newPageIfNeeded(60);
    const lines = doc.splitTextToSize(ref, contentW);
    doc.setTextColor(141, 207, 168);
    doc.text(`${i + 1}.`, marginX, y);
    doc.setTextColor(60, 72, 84);
    doc.text(lines, marginX + 18, y);
    y += lines.length * 12 + 8;
  });

  y += 16;
  newPageIfNeeded(80);
  doc.setDrawColor(181, 222, 192);
  doc.line(marginX, y, pageW - marginX, y);
  y += 18;

  doc.setFontSize(9);
  doc.setTextColor(120, 130, 140);
  const disclaimer =
    'This document is for educational and clinical workflow use. It does not substitute for clinical judgement, prescriber authority, or legal advice. Nurses Inc. is an independent collaborative nursing practice in New Brunswick; all services are delivered under physician oversight and in alignment with the New Brunswick Personal Health Information Privacy and Access Act (PHIPAA) and ANBLPN Collaborative Practice Regulations.';
  const discLines = doc.splitTextToSize(disclaimer, contentW);
  doc.text(discLines, marginX, y);
  y += discLines.length * 11 + 16;

  // Page numbers — draw after all pages exist
  const total = doc.getNumberOfPages();
  for (let p = 1; p <= total; p++) {
    doc.setPage(p);
    drawFooter(p);
  }

  doc.save(meta.filename);
}

// ---------------------------------------------------------------------------
// DOCX generator — editable Word template for the Family Care Conference Kit.
// ---------------------------------------------------------------------------

export function generateDocx(id: ResourceId) {
  const meta = resources[id];
  const data = payloadMap[id]!;

  const heading = (text: string, level: (typeof HeadingLevel)[keyof typeof HeadingLevel]) =>
    new Paragraph({
      text,
      heading: level,
      spacing: { before: 280, after: 140 },
    });

  const para = (text: string, opts: { bold?: boolean; italic?: boolean } = {}) =>
    new Paragraph({
      children: [new TextRun({ text, bold: opts.bold, italics: opts.italic })],
      spacing: { after: 120 },
    });

  const bullet = (text: string) =>
    new Paragraph({
      children: [new TextRun({ text })],
      bullet: { level: 0 },
      spacing: { after: 80 },
    });

  const fillRow = (label: string) =>
    new TableRow({
      children: [
        new TableCell({
          width: { size: 35, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: label, bold: true })] })],
        }),
        new TableCell({
          width: { size: 65, type: WidthType.PERCENTAGE },
          children: [new Paragraph({ children: [new TextRun({ text: ' ' })] })],
        }),
      ],
    });

  const blankTable = (labels: string[]) =>
    new Table({
      width: { size: 100, type: WidthType.PERCENTAGE },
      rows: labels.map(fillRow),
      borders: {
        top: { style: BorderStyle.SINGLE, size: 6, color: 'C4CCD4' },
        bottom: { style: BorderStyle.SINGLE, size: 6, color: 'C4CCD4' },
        left: { style: BorderStyle.SINGLE, size: 6, color: 'C4CCD4' },
        right: { style: BorderStyle.SINGLE, size: 6, color: 'C4CCD4' },
        insideHorizontal: { style: BorderStyle.SINGLE, size: 4, color: 'E4E8EC' },
        insideVertical: { style: BorderStyle.SINGLE, size: 4, color: 'E4E8EC' },
      },
    });

  const children: (Paragraph | Table)[] = [];

  // Cover
  children.push(
    new Paragraph({
      children: [new TextRun({ text: meta.title, bold: true, size: 36, color: '2C3E50' })],
      alignment: AlignmentType.LEFT,
      spacing: { after: 120 },
    }),
  );
  children.push(
    new Paragraph({
      children: [new TextRun({ text: meta.subtitle, italics: true, size: 24, color: '2C3E50' })],
      spacing: { after: 240 },
    }),
  );
  data.intro.forEach((p) => children.push(para(p)));
  children.push(
    new Paragraph({
      children: [new TextRun({ text: meta.audience, bold: true, color: '2C3E50' })],
      spacing: { before: 120, after: 120 },
    }),
  );
  children.push(new Paragraph({ children: [new PageBreak()] }));

  // Sections — extra fillable tables for the Family Kit
  data.sections.forEach((section, sIdx) => {
    children.push(heading(section.heading, HeadingLevel.HEADING_2));
    section.items.forEach((item) => children.push(bullet(item)));

    if (id === 'family-care-conference-kit') {
      // Add a writable table after each section
      const labelsBySection: Record<number, string[]> = {
        0: ['Date & time', 'Location / link', 'Attendees', 'Person\u2019s values to honor'],
        1: ['Item', 'Owner', 'Due date', 'Status'],
        2: ['Role', 'Name', 'Contact', 'Notes'],
        3: ['What I heard', 'Decision / next step', 'Owner'],
        4: ['Tension / concern', 'Person\u2019s values referenced', 'Resolution'],
        5: ['Decision', 'Rationale', 'Owner', 'Due'],
      };
      children.push(
        new Paragraph({
          children: [new TextRun({ text: 'Fillable notes:', bold: true })],
          spacing: { before: 120 },
        }),
      );
      children.push(blankTable(labelsBySection[sIdx] ?? ['Notes']));
      children.push(new Paragraph({ children: [new TextRun({ text: '' })] }));
    }
  });

  // References
  children.push(new Paragraph({ children: [new PageBreak()] }));
  children.push(heading('References (APA, 7th ed.)', HeadingLevel.HEADING_2));
  data.references.forEach((ref, i) =>
    children.push(
      new Paragraph({
        children: [new TextRun({ text: `${i + 1}. ${ref}` })],
        spacing: { after: 140 },
      }),
    ),
  );

  // Disclaimer
  children.push(
    new Paragraph({
      children: [
        new TextRun({
          text: 'This template is for educational and clinical workflow use. It does not substitute for clinical judgement, prescriber authority, or legal advice. Nurses Inc. is an independent collaborative nursing practice in New Brunswick; all services are delivered under physician oversight and in alignment with the New Brunswick Personal Health Information Privacy and Access Act (PHIPAA) and ANBLPN Collaborative Practice Regulations.',
          italics: true,
          size: 18,
          color: '64758A',
        }),
      ],
      spacing: { before: 280 },
    }),
  );

  const doc = new Document({
    creator: 'Nurses Inc.',
    title: meta.title,
    description: meta.subtitle,
    sections: [
      {
        properties: {},
        children,
      },
    ],
  });

  Packer.toBlob(doc).then((blob) => saveAs(blob, meta.filename));
}

// ---------------------------------------------------------------------------
// Download dispatcher
// ---------------------------------------------------------------------------

export function downloadResource(id: ResourceId) {
  const meta = resources[id];
  if (meta.kind === 'pdf') generatePdf(id);
  else generateDocx(id);
}

// ---------------------------------------------------------------------------
// Preview helpers — return a blob URL (PDF) or an HTML string (DOCX) that
// can be embedded in the in-app preview modal.
// ---------------------------------------------------------------------------

/**
 * Build a PDF blob in memory and return its object URL.
 * The caller is responsible for revoking the URL when finished.
 *
 * Implementation: our existing PDF generators call `doc.save(filename)` at
 * the end. We monkey-patch `jsPDF.prototype.save` for the duration of one
 * generation call so the bytes are captured into a Blob instead of being
 * streamed to disk, then build an object URL.
 */
export function previewPdf(id: ResourceId): Promise<string> {
  // Medication audit is a bundle — use med-form-pdf.ts for individual forms.
  if (id === 'medication-audit-checklist') {
    return Promise.reject(new Error('Use med-form-pdf previewer for individual forms.'));
  }

  const originalSave = (jsPDF.prototype as { save: (s: string) => void }).save;
  let captured: Blob | null = null;
  (jsPDF.prototype as { save: (s: string) => void }).save = function (
    this: { output: (mode: string) => Blob },
    _filename: string,
  ) {
    captured = this.output('blob');
  };

  try {
    generateStandardPdf(id);
  } finally {
    (jsPDF.prototype as { save: (s: string) => void }).save = originalSave;
  }

  if (!captured) return Promise.reject(new Error('Failed to generate PDF blob'));
  return Promise.resolve(URL.createObjectURL(captured));
}

/**
 * Build an HTML preview for the Family Care Conference Kit (DOCX).
 * Renders the same data the DOCX is built from, so the user sees the
 * real content with fillable underlines preserved.
 */
export function previewDocxHtml(id: ResourceId): string {
  const data = payloadMap[id]!;
  const meta = resources[id];

  const escapeHtml = (s: string) =>
    s
      .replace(/&/g, '&amp;')
      .replace(/</g, '&lt;')
      .replace(/>/g, '&gt;')
      .replace(/"/g, '&quot;');

  const sectionHtml = data.sections
    .map(
      (s) => `
        <section class="docx-section">
          <h2>${escapeHtml(s.heading)}</h2>
          <ul>${s.items.map((i) => `<li>${escapeHtml(i)}</li>`).join('')}</ul>
        </section>`,
    )
    .join('');

  const introHtml = data.intro
    .map((p) => `<p class="docx-intro">${escapeHtml(p)}</p>`)
    .join('');

  const refsHtml = data.references
    .map((r, idx) => `<li>${escapeHtml(r)}</li>`)
    .join('');

  return `<!doctype html>
<html lang="en">
<head>
  <meta charset="utf-8" />
  <title>${escapeHtml(meta.title)} — preview</title>
  <style>
    :root { color-scheme: light; }
    html, body { margin: 0; padding: 0; }
    body {
      font-family: 'Inter', system-ui, sans-serif;
      color: #2C3E50;
      background: #FFFEFC;
      padding: 48px;
      max-width: 820px;
      margin: 0 auto;
      line-height: 1.55;
    }
    h1 {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 32px;
      font-weight: 600;
      margin: 0 0 8px;
    }
    .docx-subtitle {
      font-style: italic;
      color: #64758A;
      margin: 0 0 16px;
      font-size: 16px;
    }
    .docx-chip {
      display: inline-block;
      background: #E8F5E9;
      color: #2C3E50;
      padding: 4px 12px;
      border-radius: 999px;
      font-size: 12px;
      letter-spacing: 0.06em;
      text-transform: uppercase;
      font-weight: 600;
      margin-bottom: 20px;
    }
    .docx-intro {
      font-size: 15px;
      color: #3C4854;
      margin: 6px 0;
    }
    .docx-section {
      margin-top: 28px;
      padding-top: 8px;
      border-top: 1px solid #FFD1DC;
    }
    .docx-section h2 {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 20px;
      margin: 0 0 10px;
      color: #2C3E50;
    }
    ul { padding-left: 22px; margin: 6px 0; }
    li { margin: 6px 0; color: #3C4854; }
    .docx-refs {
      margin-top: 36px;
      padding-top: 16px;
      border-top: 1px solid #B5DEC0;
    }
    .docx-refs h2 {
      font-family: 'Fraunces', Georgia, serif;
      font-size: 16px;
      margin-bottom: 10px;
    }
    .docx-refs ol { font-size: 12px; color: #3C4854; }
    .docx-disclaimer {
      margin-top: 24px;
      font-size: 11px;
      color: #788694;
      font-style: italic;
    }
    @media print {
      body { padding: 24px; }
      .docx-section { break-inside: avoid; }
    }
  </style>
</head>
<body>
  <h1>${escapeHtml(meta.title)}</h1>
  <p class="docx-subtitle">${escapeHtml(meta.subtitle)}</p>
  <span class="docx-chip">${escapeHtml(meta.audience)}</span>
  ${introHtml}
  ${sectionHtml}
  <section class="docx-refs">
    <h2>References (APA, 7th ed.)</h2>
    <ol>${refsHtml}</ol>
  </section>
  <p class="docx-disclaimer">
    This template is for educational and clinical workflow use. It does not
    substitute for clinical judgement, prescriber authority, or legal advice.
    Nurses Inc. is an independent collaborative nursing practice in New
    Brunswick; all services are delivered under physician oversight and in
    alignment with the New Brunswick Personal Health Information Privacy and
    Access Act (PHIPAA) and ANBLPN Collaborative Practice Regulations.
  </p>
</body>
</html>`;
}

// ---------------------------------------------------------------------------
// Print helpers — open the document in a new tab and trigger the print
// dialog. Uses the same monkey-patch trick as `previewPdf` to keep the
// bytes in memory instead of triggering a download.
// ---------------------------------------------------------------------------

/**
 * Build a PDF blob for the given resource and trigger the browser print
 * dialog (no file is downloaded).
 */
export function printPdf(id: ResourceId): void {
  if (id === 'medication-audit-checklist') return;
  const url = previewPdfSync(id);
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

/** Synchronous variant of previewPdf for the print flow. */
function previewPdfSync(id: ResourceId): string {
  const originalSave = (jsPDF.prototype as { save: (s: string) => void }).save;
  let captured: Blob | null = null;
  (jsPDF.prototype as { save: (s: string) => void }).save = function (
    this: { output: (mode: string) => Blob },
    _filename: string,
  ) {
    captured = this.output('blob');
  };

  try {
    generateStandardPdf(id);
  } finally {
    (jsPDF.prototype as { save: (s: string) => void }).save = originalSave;
  }

  if (!captured) throw new Error('Failed to generate PDF blob');
  return URL.createObjectURL(captured);
}

/**
 * Build a DOCX blob for the given resource and trigger the browser print
 * dialog using a hidden iframe loaded with the DOCX HTML preview.
 */
export function printDocx(id: ResourceId): void {
  if (id === 'medication-audit-checklist') return;
  const html = previewDocxHtml(id);
  const blob = new Blob([html], { type: 'text/html' });
  const url = URL.createObjectURL(blob);
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
