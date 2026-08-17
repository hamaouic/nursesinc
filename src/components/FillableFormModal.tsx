import { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import {
  X,
  Printer,
  Download,
  Stethoscope,
  AlertTriangle,
  ChevronLeft,
} from 'lucide-react';
import {
  fillableForms,
  emptyValuesFor,
  type FillableFormValues,
  type FillableFormSchema,
  type FillableField,
} from '@/fillable-form-schema';
import { downloadMedForm } from '@/lib/med-form-pdf';
import { cn } from '@/lib/utils';

/**
 * Live fillable form for Pain Score + Glasgow Coma Scale (first-pass).
 * Renders the schema as an HTML form, captures user input, and:
 *   - Print   → window.print() against the same component (CSS @media print hides chrome)
 *   - Save    → jsPDF-rendered PDF with AcroForm fields, downloaded via the user gesture.
 * The AcroForm fields keep the saved PDF fully editable in any PDF reader.
 */
export default function FillableFormModal({
  formId,
  open,
  onClose,
}: {
  formId: 'pain-score' | 'glasgow-coma-scale' | null;
  open: boolean;
  onClose: () => void;
}) {
  const schema = formId ? fillableForms[formId] : null;
  const [values, setValues] = useState<FillableFormValues>({});
  const printRef = useRef<HTMLDivElement | null>(null);

  // Reset values whenever the formId changes
  useEffect(() => {
    if (formId) setValues(emptyValuesFor(formId));
  }, [formId]);

  // Close on Escape
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [open, onClose]);

  const setField = (id: string, value: string | boolean) => {
    setValues((prev) => ({ ...prev, [id]: value }));
  };

  const handlePrint = () => {
    if (!printRef.current) return;
    // Use the browser's print dialog scoped to the form node.
    const original = document.body.innerHTML;
    const html = printRef.current.outerHTML;
    // The simpler approach: window.print() while the node is in the DOM.
    // CSS @media print already hides everything else.
    window.print();
  };

  const handleDownload = () => {
    if (!schema) return;
    try {
      downloadMedForm(schema.formId, values);
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error('[FillableFormModal] download failed', err);
    }
  };

  const handleReset = () => {
    if (!schema) return;
    setValues(emptyValuesFor(schema.formId));
  };

  const isDirty = useMemo(() => {
    if (!schema) return false;
    return Object.entries(values).some(([k, v]) => {
      if (schema.sections.some((s) =>
        s.fields.some((f) => f.id === k && f.kind === 'checkbox'),
      )) {
        return v === true;
      }
      return typeof v === 'string' && v.trim().length > 0;
    });
  }, [values, schema]);

  return (
    <AnimatePresence>
      {open && schema && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-50 flex items-stretch justify-center bg-ink-700/40 backdrop-blur-sm print:bg-transparent print:static print:z-auto"
          onClick={onClose}
        >
          <motion.aside
            initial={{ y: 16, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            exit={{ y: 16, opacity: 0 }}
            transition={{ duration: 0.25, ease: [0.2, 0.8, 0.2, 1] }}
            className="relative flex h-full w-full max-w-3xl flex-col overflow-hidden bg-white shadow-soft print:max-w-none print:bg-white print:shadow-none"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header — hidden on print */}
            <div className="flex shrink-0 items-center justify-between border-b border-ink-100/60 bg-gradient-to-br from-blush-50/80 via-white to-mint-50/80 px-5 py-3 shadow-soft backdrop-blur print:hidden sm:px-7">
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={onClose}
                  className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition hover:bg-ink-100 hover:text-ink-700"
                  aria-label="Back to forms"
                >
                  <ChevronLeft className="h-4 w-4" />
                </button>
                <div>
                  <p className="inline-flex items-center gap-1.5 rounded-full border border-white/60 bg-white/70 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-ink-500 shadow-soft">
                    <Stethoscope className="h-3 w-3 text-blush-400" />
                    {schema.audience}
                  </p>
                  <h3 className="mt-0.5 font-display text-base font-semibold text-ink-700 sm:text-lg">
                    {schema.displayName}
                  </h3>
                </div>
              </div>
              <button
                type="button"
                onClick={onClose}
                className="grid h-9 w-9 place-items-center rounded-full text-ink-500 transition hover:bg-ink-100 hover:text-ink-700"
                aria-label="Close form"
              >
                <X className="h-4 w-4" />
              </button>
            </div>

            {/* Print-only header */}
            <div className="hidden print:block print:border-b print:border-ink-200 print:px-8 print:py-3">
              <h1 className="text-lg font-bold">{schema.title}</h1>
              <p className="text-[10px] uppercase tracking-widest text-ink-500">
                Nurses Inc. · {schema.audience} · Last reviewed Aug 2026
              </p>
            </div>

            {/* Body */}
            <div
              ref={printRef}
              className="flex-1 overflow-y-auto bg-cream-50/40 px-5 py-5 print:bg-white print:overflow-visible print:px-8 sm:px-7"
            >
              <div className="rounded-2xl border border-white/70 bg-white/85 p-4 shadow-soft backdrop-blur print:border-ink-200 print:bg-white print:shadow-none">
                <p className="text-[12.5px] leading-relaxed text-ink-500">
                  {schema.intro}
                </p>
                <p className="mt-2 flex items-start gap-1.5 rounded-xl bg-amber-50/70 px-3 py-2 text-[11px] text-amber-700 ring-1 ring-amber-200 print:hidden">
                  <AlertTriangle className="mt-0.5 h-3 w-3 shrink-0 text-amber-500" />
                  <span>
                    Saved PDFs are real PDF forms — open in Adobe / Preview /
                    Edge and edit any field. They stay editable forever.
                  </span>
                </p>
              </div>

              <div className="mt-4 space-y-4">
                {schema.sections.map((section, sIdx) => (
                  <section
                    key={sIdx}
                    className="overflow-hidden rounded-2xl border border-white/70 bg-white/85 shadow-soft backdrop-blur print:border-ink-200 print:bg-white print:shadow-none"
                  >
                    {section.heading && (
                      <header className="border-b border-ink-100/60 bg-cream-100/40 px-4 py-2.5">
                        <h4 className="text-[12px] font-bold uppercase tracking-widest text-ink-700">
                          {section.heading}
                        </h4>
                        {section.intro && (
                          <p className="mt-1 text-[11.5px] text-ink-500">
                            {section.intro}
                          </p>
                        )}
                      </header>
                    )}
                    <div className="space-y-2.5 p-4">
                      {section.fields.map((field) => (
                        <FieldRenderer
                          key={field.id}
                          field={field}
                          value={values[field.id]}
                          onChange={(v) => setField(field.id, v)}
                        />
                      ))}
                    </div>
                  </section>
                ))}
              </div>

              <p className="mt-6 text-center text-[11px] italic text-ink-400">
                Nurses Inc. · Last reviewed Aug 2026 · For clinical use, not
                legal advice.
              </p>
            </div>

            {/* Footer — hidden on print */}
            <div className="shrink-0 border-t border-ink-100/60 bg-white/90 px-5 py-4 shadow-soft backdrop-blur print:hidden sm:px-7">
              <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
                <button
                  type="button"
                  onClick={handleReset}
                  className="text-[11px] font-semibold uppercase tracking-widest text-ink-400 underline-offset-2 hover:text-ink-700 hover:underline"
                >
                  Clear all fields
                </button>
                <div className="flex flex-col gap-2 sm:flex-row-reverse">
                  <button
                    type="button"
                    onClick={handleDownload}
                    disabled={!isDirty}
                    className="group inline-flex items-center justify-center gap-2 rounded-full bg-blush-300 px-5 py-2.5 text-[13px] font-semibold text-ink-700 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:bg-blush-400 hover:text-white hover:shadow-[0_18px_40px_-12px_rgba(255,170,190,0.7)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-500 focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:translate-y-0 disabled:hover:bg-blush-300 disabled:hover:text-ink-700 disabled:hover:shadow-soft"
                  >
                    <Download className="h-3.5 w-3.5 transition-transform group-hover:-translate-y-0.5" />
                    Save PDF
                    <span className="ml-1 rounded-full bg-white/30 px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest">
                      Editable
                    </span>
                  </button>
                  <button
                    type="button"
                    onClick={handlePrint}
                    className="inline-flex items-center justify-center gap-2 rounded-full border border-ink-200 bg-white px-5 py-2.5 text-[13px] font-semibold text-ink-700 shadow-soft transition-all duration-300 hover:-translate-y-0.5 hover:border-ink-300 hover:shadow-[0_18px_40px_-12px_rgba(44,62,80,0.25)] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ink-500 focus-visible:ring-offset-2"
                  >
                    <Printer className="h-3.5 w-3.5" />
                    Print
                  </button>
                </div>
              </div>
            </div>
          </motion.aside>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

function FieldRenderer({
  field,
  value,
  onChange,
}: {
  field: FillableField;
  value: string | boolean | undefined;
  onChange: (v: string | boolean) => void;
}) {
  const baseInput =
    'block w-full rounded-xl border border-white/70 bg-white/85 px-3 py-2 text-[13px] text-ink-700 shadow-soft focus:border-ink-300 focus:outline-none focus:ring-2 focus:ring-mint-200 print:border-ink-300 print:bg-white print:shadow-none';

  if (field.kind === 'checkbox') {
    return (
      <label className="flex items-start gap-2 cursor-pointer rounded-xl px-1 py-1.5 transition hover:bg-mint-50/60 print:hover:bg-transparent">
        <input
          type="checkbox"
          checked={value === true}
          onChange={(e) => onChange(e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-blush-400 focus:ring-blush-300 print:border-ink-500"
        />
        <span className="text-[12.5px] font-medium text-ink-700">
          {field.label}
        </span>
      </label>
    );
  }

  if (field.kind === 'select') {
    return (
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold text-ink-700">
          {field.label}
          {field.required && (
            <span className="ml-1 text-blush-500" aria-hidden="true">
              *
            </span>
          )}
        </span>
        <select
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          className={cn(baseInput, 'cursor-pointer')}
        >
          {field.options?.map((opt) => (
            <option key={opt} value={opt}>
              {opt}
            </option>
          ))}
        </select>
        {field.hint && (
          <span className="mt-1 block text-[10.5px] text-ink-400">
            {field.hint}
          </span>
        )}
      </label>
    );
  }

  if (field.kind === 'textarea') {
    return (
      <label className="block">
        <span className="mb-1 block text-[11px] font-semibold text-ink-700">
          {field.label}
        </span>
        <textarea
          rows={3}
          value={(value as string) ?? ''}
          onChange={(e) => onChange(e.target.value)}
          placeholder={field.placeholder}
          className={cn(baseInput, 'resize-y')}
        />
        {field.hint && (
          <span className="mt-1 block text-[10.5px] text-ink-400">
            {field.hint}
          </span>
        )}
      </label>
    );
  }

  return (
    <label className="block">
      <span className="mb-1 block text-[11px] font-semibold text-ink-700">
        {field.label}
        {field.required && (
          <span className="ml-1 text-blush-500" aria-hidden="true">
            *
          </span>
        )}
      </span>
      <input
        type={field.kind}
        inputMode={field.kind === 'number' ? 'decimal' : undefined}
        step={field.kind === 'number' ? '1' : undefined}
        min={field.kind === 'number' ? '0' : undefined}
        value={(value as string) ?? ''}
        onChange={(e) => onChange(e.target.value)}
        placeholder={field.placeholder}
        className={baseInput}
      />
      {field.hint && (
        <span className="mt-1 block text-[10.5px] text-ink-400">
          {field.hint}
        </span>
      )}
    </label>
  );
}