import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  journeyItems,
  journeyYears,
  journeyCategories,
  journeyQuote,
  type JourneyCategory,
  type JourneyItem,
} from '@/data/journeyData';

const categoryColors: Record<JourneyCategory, string> = {
  Education: 'bg-blue-500/15 border-blue-500/30 text-blue-700 dark:text-blue-300',
  Research: 'bg-emerald-500/15 border-emerald-500/30 text-emerald-700 dark:text-emerald-300',
  Publications: 'bg-amber-500/15 border-amber-500/30 text-amber-700 dark:text-amber-300',
  Teaching: 'bg-violet-500/15 border-violet-500/30 text-violet-700 dark:text-violet-300',
  Awards: 'bg-rose-500/15 border-rose-500/30 text-rose-700 dark:text-rose-300',
};

const categoryDots: Record<JourneyCategory, string> = {
  Education: 'bg-blue-500',
  Research: 'bg-emerald-500',
  Publications: 'bg-amber-500',
  Teaching: 'bg-violet-500',
  Awards: 'bg-rose-500',
};

const filterOptions: (JourneyCategory | 'All')[] = [
  'All',
  ...journeyCategories,
];

const JourneyCard = ({
  item,
  onClick,
  isActive,
}: {
  item: JourneyItem;
  onClick: () => void;
  isActive: boolean;
}) => {
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full text-left rounded-lg border px-2.5 py-2 transition-all duration-200
        cursor-pointer group
        ${categoryColors[item.category]}
        ${isActive ? 'ring-2 ring-primary/40 shadow-md scale-[1.02]' : 'hover:shadow-sm hover:scale-[1.01]'}
      `}
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -8 }}
      layout
    >
      <p className="text-[11px] sm:text-xs font-semibold leading-tight truncate">
        {item.label}
      </p>
      <p className="text-[9px] sm:text-[10px] opacity-70 leading-tight mt-0.5 truncate">
        {item.sublabel}
      </p>
      {item.badges && (
        <div className="flex gap-1 mt-1 flex-wrap">
          {item.badges.map((b) => (
            <span
              key={b}
              className="text-[8px] sm:text-[9px] font-bold uppercase tracking-wide px-1.5 py-0.5 rounded-full bg-primary/10 text-primary"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </motion.button>
  );
};

const DetailPopover = ({
  item,
  onClose,
}: {
  item: JourneyItem;
  onClose: () => void;
}) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 12, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 8, scale: 0.97 }}
      transition={{ duration: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      {/* Backdrop */}
      <div className="absolute inset-0 bg-black/30 backdrop-blur-sm" />
      {/* Card */}
      <div
        className="relative bg-card border border-border rounded-xl shadow-2xl max-w-md w-full p-5 sm:p-6"
        onClick={(e) => e.stopPropagation()}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 text-muted-foreground hover:text-foreground text-lg leading-none w-6 h-6 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
          aria-label="Close"
        >
          ×
        </button>
        <div className="flex items-center gap-2 mb-3">
          <span className={`w-2.5 h-2.5 rounded-full ${categoryDots[item.category]}`} />
          <span className="text-xs font-medium text-muted-foreground uppercase tracking-wider">
            {item.category} · {item.year}
          </span>
        </div>
        <h3 className="text-base sm:text-lg font-bold text-foreground mb-2">{item.label}</h3>
        <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
          {item.detail}
        </div>
        {item.url && (
          <a
            href={item.url}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1 mt-3 text-xs text-primary hover:underline"
          >
            View publication →
          </a>
        )}
      </div>
    </motion.div>
  );
};

const JourneyTimeline = () => {
  const [activeFilter, setActiveFilter] = useState<JourneyCategory | 'All'>('All');
  const [activeItem, setActiveItem] = useState<JourneyItem | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  const filteredItems =
    activeFilter === 'All'
      ? journeyItems
      : journeyItems.filter((i) => i.category === activeFilter);

  const getItemsForCell = (category: JourneyCategory, year: number) =>
    filteredItems.filter((i) => i.category === category && i.year === year);

  const visibleCategories =
    activeFilter === 'All'
      ? journeyCategories
      : journeyCategories.filter((c) => c === activeFilter);

  return (
    <section className="mt-12 sm:mt-16 md:mt-20">
      <h2 className="text-lg sm:text-xl md:text-2xl font-semibold mb-2">Journey</h2>
      <p className="text-xs sm:text-sm text-muted-foreground/70 mb-6 sm:mb-8 max-w-2xl italic">
        {journeyQuote}
      </p>

      {/* Filter Buttons */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
        {filterOptions.map((opt) => (
          <button
            key={opt}
            onClick={() => setActiveFilter(opt)}
            className={`
              px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200
              border
              ${
                activeFilter === opt
                  ? 'bg-primary text-primary-foreground border-primary shadow-sm'
                  : 'bg-muted/50 text-muted-foreground border-border hover:bg-muted hover:border-border/80'
              }
            `}
          >
            {opt}
          </button>
        ))}
      </div>

      {/* Timeline Grid */}
      <div ref={scrollRef} className="overflow-x-auto -mx-2 px-2 pb-4">
        <div
          className="grid gap-px bg-border/30 rounded-xl overflow-hidden border border-border/40"
          style={{
            gridTemplateColumns: `120px repeat(${journeyYears.length}, minmax(120px, 1fr))`,
          }}
        >
          {/* Header Row */}
          <div className="bg-muted/60 p-2 sm:p-3 flex items-center justify-center">
            <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground/60 uppercase tracking-widest">
              
            </span>
          </div>
          {journeyYears.map((yr) => (
            <div
              key={yr}
              className="bg-muted/60 p-2 sm:p-3 text-center"
            >
              <span className="text-xs sm:text-sm font-bold text-foreground/70 tabular-nums">
                {yr}
              </span>
            </div>
          ))}

          {/* Data Rows */}
          {visibleCategories.map((cat) => (
            <>
              {/* Row label */}
              <div
                key={`${cat}-label`}
                className="bg-background/80 p-2 sm:p-3 flex items-start"
              >
                <div className="flex items-center gap-1.5">
                  <span className={`w-2 h-2 rounded-full shrink-0 ${categoryDots[cat]}`} />
                  <span className="text-[10px] sm:text-xs font-semibold text-foreground/70">
                    {cat}
                  </span>
                </div>
              </div>
              {/* Row cells */}
              {journeyYears.map((yr) => {
                const cellItems = getItemsForCell(cat, yr);
                return (
                  <div
                    key={`${cat}-${yr}`}
                    className="bg-background/50 p-1.5 sm:p-2 min-h-[60px] flex flex-col gap-1"
                  >
                    <AnimatePresence mode="popLayout">
                      {cellItems.map((item, idx) => (
                        <JourneyCard
                          key={`${item.label}-${idx}`}
                          item={item}
                          isActive={activeItem === item}
                          onClick={() =>
                            setActiveItem(activeItem === item ? null : item)
                          }
                        />
                      ))}
                    </AnimatePresence>
                  </div>
                );
              })}
            </>
          ))}
        </div>
      </div>

      {/* Detail Popup */}
      <AnimatePresence>
        {activeItem && (
          <DetailPopover
            item={activeItem}
            onClose={() => setActiveItem(null)}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default JourneyTimeline;
