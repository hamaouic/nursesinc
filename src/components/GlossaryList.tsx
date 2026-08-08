import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import { Search, BookOpen, X, ArrowRight, FileText, Stethoscope } from 'lucide-react';
import {
  glossary,
  glossaryCategories,
  type GlossaryEntry,
} from '@/nurses-inc-glossary';
import { medFormList } from '@/med-form-forms';
import { cn } from '@/lib/utils';

type CategoryFilter = 'all' | GlossaryEntry['category'];

const filterChips: { id: CategoryFilter; label: string }[] = [
  { id: 'all', label: 'All' },
  { id: 'nursing', label: 'Nursing' },
  { id: 'clinical', label: 'Clinical' },
  { id: 'vaccines', label: 'Vaccines' },
  { id: 'diseases', label: 'Illnesses' },
  { id: 'regulatory', label: 'Regulatory' },
  { id: 'workflow', label: 'Workflow' },
];

const categoryStyles: Record<
  GlossaryEntry['category'],
  { dot: string; chip: string; halo: string }
> = {
  nursing: {
    dot: 'bg-mint-500',
    chip: 'bg-mint-100 text-mint-600',
    halo: 'hover:shadow-[0_18px_50px_-12px_rgba(170,210,190,0.55)]',
  },
  clinical: {
    dot: 'bg-blush-400',
    chip: 'bg-blush-100 text-blush-500',
    halo: 'hover:shadow-[0_18px_50px_-12px_rgba(255,209,220,0.55)]',
  },
  vaccines: {
    dot: 'bg-mint-500',
    chip: 'bg-mint-100 text-mint-700',
    halo: 'hover:shadow-[0_18px_50px_-12px_rgba(170,210,190,0.55)]',
  },
  diseases: {
    dot: 'bg-blush-400',
    chip: 'bg-blush-100 text-blush-500',
    halo: 'hover:shadow-[0_18px_50px_-12px_rgba(255,209,220,0.55)]',
  },
  regulatory: {
    dot: 'bg-ink-500',
    chip: 'bg-cream-200 text-ink-500',
    halo: 'hover:shadow-[0_18px_50px_-12px_rgba(180,180,180,0.45)]',
  },
  workflow: {
    dot: 'bg-ink-300',
    chip: 'bg-cream-100 text-ink-500',
    halo: 'hover:shadow-[0_18px_50px_-12px_rgba(180,180,180,0.45)]',
  },
};

export default function GlossaryList() {
  const [query, setQuery] = useState('');
  const [category, setCategory] = useState<CategoryFilter>('all');

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    return glossary.filter((g) => {
      if (category !== 'all' && g.category !== category) return false;
      if (!q) return true;
      const hay = [g.term, g.clinicalTerm ?? '', g.definition]
        .join(' ')
        .toLowerCase();
      return hay.includes(q);
    });
  }, [category, query]);

  // Group filtered entries by category for visual structure
  const grouped = useMemo(() => {
    const groups: Record<GlossaryEntry['category'], GlossaryEntry[]> = {
      nursing: [],
      clinical: [],
      vaccines: [],
      diseases: [],
      regulatory: [],
      workflow: [],
    };
    for (const g of filtered) {
      groups[g.category].push(g);
    }
    return groups;
  }, [filtered]);

  const counts = useMemo(
    () => ({
      all: glossary.length,
      nursing: glossary.filter((g) => g.category === 'nursing').length,
      clinical: glossary.filter((g) => g.category === 'clinical').length,
      vaccines: glossary.filter((g) => g.category === 'vaccines').length,
      diseases: glossary.filter((g) => g.category === 'diseases').length,
      regulatory: glossary.filter((g) => g.category === 'regulatory').length,
      workflow: glossary.filter((g) => g.category === 'workflow').length,
    }),
    [],
  );

  const findForm = (formId: GlossaryEntry['formId']) => {
    if (!formId) return null;
    return medFormList.find((f) => f.id === formId) ?? null;
  };

  return (
    <div>
      {/* Search + filter */}
      <div className="mb-6 flex flex-col gap-4">
        <div className="flex items-center gap-2 rounded-2xl border border-white/70 bg-white/80 px-4 py-3 shadow-soft backdrop-blur transition focus-within:border-mint-200 focus-within:shadow-[0_0_0_4px_rgba(170,210,190,0.35)]">
          <Search
            className="h-4 w-4 shrink-0 text-ink-300"
            aria-hidden="true"
          />
          <input
            type="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Search the dictionary — type a term, acronym, or topic…"
            aria-label="Search glossary"
            className="w-full bg-transparent text-sm text-ink-700 placeholder:text-ink-300 focus:outline-none"
          />
          {query && (
            <button
              type="button"
              onClick={() => setQuery('')}
              aria-label="Clear search"
              className="grid h-6 w-6 place-items-center rounded-full text-ink-300 transition hover:bg-ink-100 hover:text-ink-700"
            >
              <X className="h-3 w-3" />
            </button>
          )}
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <span className="text-[10px] font-bold uppercase tracking-widest text-ink-300">
            <BookOpen className="mr-1 inline h-3 w-3" />
            Dictionary · {filtered.length} of {glossary.length} terms
          </span>
          <span className="h-px flex-1 bg-ink-100" />
          {filterChips.map((c) => {
            const isActive = category === c.id;
            const count = counts[c.id];
            return (
              <button
                key={c.id}
                onClick={() => setCategory(c.id)}
                aria-pressed={isActive}
                className={cn(
                  'inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-[11px] font-semibold transition-all',
                  isActive
                    ? 'border-ink-700 bg-ink-700 text-white shadow-soft'
                    : 'border-white/70 bg-white/70 text-ink-500 hover:border-mint-200 hover:bg-mint-50',
                )}
              >
                <span>{c.label}</span>
                <span
                  className={cn(
                    'rounded-full px-1.5 py-0.5 text-[9px] font-bold uppercase tracking-widest',
                    isActive
                      ? 'bg-white/20 text-white'
                      : 'bg-ink-100 text-ink-400',
                  )}
                >
                  {count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Grouped definitions */}
      {filtered.length === 0 ? (
        <div className="rounded-3xl border border-white/60 bg-white/60 p-10 text-center shadow-soft">
          <p className="font-display text-base text-ink-700">
            No terms match your search.
          </p>
          <p className="mt-1 text-xs text-ink-400">
            Try a different keyword or switch the category filter.
          </p>
        </div>
      ) : (
        <div className="space-y-8">
          {glossaryCategories.map((cat) => {
            const items = grouped[cat.id];
            if (items.length === 0) return null;
            return (
              <div key={cat.id}>
                <div className="mb-3 flex items-center gap-2">
                  <span
                    className={cn(
                      'h-1.5 w-1.5 rounded-full',
                      categoryStyles[cat.id].dot,
                    )}
                    aria-hidden="true"
                  />
                  <h3 className="text-[10px] font-bold uppercase tracking-widest text-ink-500">
                    {cat.label}
                  </h3>
                  <span className="text-[10px] font-semibold text-ink-300">
                    · {items.length}
                  </span>
                </div>
                <div className="grid gap-3 sm:grid-cols-2">
                  {items.map((g, i) => {
                    const style = categoryStyles[g.category];
                    const linkedForm = findForm(g.formId);
                    return (
                      <motion.article
                        key={g.id}
                        initial={{ opacity: 0, y: 12 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{
                          duration: 0.3,
                          delay: i * 0.03,
                          ease: [0.2, 0.8, 0.2, 1],
                        }}
                        className={cn(
                          'group rounded-2xl border border-white/70 bg-white/70 p-4 shadow-soft backdrop-blur transition-all duration-300',
                          'hover:-translate-y-1 hover:border-white/90 hover:bg-white/85',
                          style.halo,
                        )}
                      >
                        <div className="flex items-start justify-between gap-3">
                          <div className="min-w-0 flex-1">
                            <h4 className="font-display text-base font-semibold leading-tight text-ink-700">
                              {g.term}
                            </h4>
                            {g.clinicalTerm && (
                              <p className="mt-0.5 text-[10px] uppercase tracking-widest text-ink-300">
                                {g.clinicalTerm}
                              </p>
                            )}
                          </div>
                          <span
                            className={cn(
                              'shrink-0 rounded-full px-1.5 py-0.5 text-[9px] font-semibold uppercase tracking-widest',
                              style.chip,
                            )}
                          >
                            {g.category}
                          </span>
                        </div>
                        <p className="mt-2.5 text-[12px] leading-relaxed text-ink-500">
                          {g.definition}
                        </p>
                        {g.deferToClinician && (
                          <p className="mt-2 inline-flex items-center gap-1.5 rounded-full border border-blush-200/60 bg-blush-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-widest text-blush-500">
                            <Stethoscope className="h-3 w-3" />
                            See your provider
                          </p>
                        )}
                        {linkedForm && (
                          <div className="mt-3 flex items-center justify-between border-t border-ink-100/60 pt-2.5 text-[10px]">
                            <span className="inline-flex items-center gap-1 font-semibold uppercase tracking-widest text-ink-300">
                              <FileText className="h-3 w-3" />
                              Form {linkedForm.number}
                            </span>
                            <span className="inline-flex items-center gap-1 font-semibold text-mint-600 transition-colors group-hover:text-mint-700">
                              See form
                              <ArrowRight className="h-3 w-3 transition-transform group-hover:translate-x-0.5" />
                            </span>
                          </div>
                        )}
                      </motion.article>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
