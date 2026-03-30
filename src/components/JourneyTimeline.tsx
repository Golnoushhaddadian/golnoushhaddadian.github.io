import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  journeyItems,
  journeyPeriods,
  journeyCategories,
  journeyQuote,
  type JourneyCategory,
  type JourneyItem,
} from '@/data/journeyData';

const categoryStyles: Record<JourneyCategory, { bg: string; border: string; text: string; dot: string; filterActive: string }> = {
  Education: {
    bg: 'bg-blue-500/10',
    border: 'border-blue-500/25',
    text: 'text-blue-700 dark:text-blue-300',
    dot: 'bg-blue-500',
    filterActive: 'bg-blue-500 text-white border-blue-500 shadow-blue-500/25',
  },
  Research: {
    bg: 'bg-emerald-500/10',
    border: 'border-emerald-500/25',
    text: 'text-emerald-700 dark:text-emerald-300',
    dot: 'bg-emerald-500',
    filterActive: 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/25',
  },
  Publications: {
    bg: 'bg-amber-500/10',
    border: 'border-amber-500/25',
    text: 'text-amber-700 dark:text-amber-300',
    dot: 'bg-amber-500',
    filterActive: 'bg-amber-500 text-white border-amber-500 shadow-amber-500/25',
  },
  Teaching: {
    bg: 'bg-violet-500/10',
    border: 'border-violet-500/25',
    text: 'text-violet-700 dark:text-violet-300',
    dot: 'bg-violet-500',
    filterActive: 'bg-violet-500 text-white border-violet-500 shadow-violet-500/25',
  },
  Awards: {
    bg: 'bg-rose-500/10',
    border: 'border-rose-500/25',
    text: 'text-rose-700 dark:text-rose-300',
    dot: 'bg-rose-500',
    filterActive: 'bg-rose-500 text-white border-rose-500 shadow-rose-500/25',
  },
};

const filterOptions: (JourneyCategory | 'All')[] = ['All', ...journeyCategories];

const JourneyCard = ({
  item,
  onClick,
  isActive,
  index,
}: {
  item: JourneyItem;
  onClick: () => void;
  isActive: boolean;
  index: number;
}) => {
  const s = categoryStyles[item.category];
  return (
    <motion.button
      onClick={onClick}
      className={`
        relative w-full text-left rounded-lg border px-2.5 py-2 transition-all duration-200
        cursor-pointer group backdrop-blur-sm
        ${s.bg} ${s.border} ${s.text}
        ${isActive ? 'ring-2 ring-primary/40 shadow-lg scale-[1.03]' : 'hover:shadow-md hover:scale-[1.015] hover:brightness-105'}
      `}
      initial={{ opacity: 0, y: 8, scale: 0.95 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, scale: 0.9 }}
      transition={{ delay: index * 0.03, duration: 0.25 }}
      layout
    >
      <div className="flex items-start gap-1.5">
        <span className={`w-1.5 h-1.5 rounded-full shrink-0 mt-1 ${s.dot}`} />
        <div className="min-w-0 flex-1">
          <p className="text-[10px] sm:text-[11px] font-semibold leading-tight truncate">
            {item.label}
          </p>
          <p className="text-[8px] sm:text-[9px] opacity-60 leading-tight mt-0.5 truncate">
            {item.sublabel}
          </p>
        </div>
      </div>
      {item.badges && (
        <div className="flex gap-0.5 mt-1.5 flex-wrap">
          {item.badges.map((b) => (
            <span
              key={b}
              className="text-[7px] sm:text-[8px] font-bold uppercase tracking-wider px-1.5 py-0.5 rounded-full bg-foreground/5 border border-foreground/10 text-foreground/60"
            >
              {b}
            </span>
          ))}
        </div>
      )}
      {/* Hover hint */}
      <div className="absolute -top-1 -right-1 w-3 h-3 rounded-full bg-foreground/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
        <span className="text-[6px] text-foreground/50">+</span>
      </div>
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
  const s = categoryStyles[item.category];
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.15 }}
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/40 backdrop-blur-md" />
      <motion.div
        initial={{ y: 20, scale: 0.92 }}
        animate={{ y: 0, scale: 1 }}
        exit={{ y: 10, scale: 0.95 }}
        transition={{ duration: 0.25, ease: [0.25, 0.1, 0.25, 1] }}
        className="relative bg-card border border-border rounded-2xl shadow-2xl max-w-md w-full overflow-hidden"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Colored top bar */}
        <div className={`h-1.5 w-full ${s.dot}`} />
        <div className="p-5 sm:p-6">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-muted-foreground hover:text-foreground text-sm w-7 h-7 flex items-center justify-center rounded-full hover:bg-muted transition-colors"
            aria-label="Close"
          >
            ✕
          </button>
          <div className="flex items-center gap-2 mb-3">
            <span className={`w-2.5 h-2.5 rounded-full ${s.dot}`} />
            <span className="text-[11px] font-medium text-muted-foreground uppercase tracking-wider">
              {item.category} · {item.period}
            </span>
          </div>
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-3 pr-6">{item.label}</h3>
          <div className="text-sm text-muted-foreground leading-relaxed whitespace-pre-line">
            {item.detail}
          </div>
          {item.url && (
            <a
              href={item.url}
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-1.5 mt-4 text-xs font-medium ${s.text} hover:underline transition-colors`}
            >
              View publication →
            </a>
          )}
        </div>
      </motion.div>
    </motion.div>
  );
};

const JourneyTimeline = () => {
  const [activeFilter, setActiveFilter] = useState<JourneyCategory | 'All'>('All');
  const [activeItem, setActiveItem] = useState<JourneyItem | null>(null);

  const filteredItems =
    activeFilter === 'All'
      ? journeyItems
      : journeyItems.filter((i) => i.category === activeFilter);

  const getItemsForCell = (category: JourneyCategory, period: string) =>
    filteredItems.filter((i) => i.category === category && i.period === period);

  const visibleCategories =
    activeFilter === 'All'
      ? journeyCategories
      : journeyCategories.filter((c) => c === activeFilter);

  // Count items per category for the filter badges
  const getCategoryCount = (cat: JourneyCategory | 'All') =>
    cat === 'All' ? journeyItems.length : journeyItems.filter((i) => i.category === cat).length;

  let cardIndex = 0;

  return (
    <section className="mt-12 sm:mt-16 md:mt-20">
      <div className="flex items-baseline gap-3 mb-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Journey</h2>
        <span className="text-[10px] sm:text-xs text-muted-foreground/50 font-medium tabular-nums">
          {filteredItems.length} milestones
        </span>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground/70 mb-6 sm:mb-8 max-w-2xl italic">
        {journeyQuote}
      </p>

      {/* Colorful Filter Buttons */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-6">
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt;
          const activeClass =
            opt === 'All'
              ? 'bg-foreground text-background border-foreground shadow-lg'
              : categoryStyles[opt as JourneyCategory].filterActive + ' shadow-lg';
          return (
            <motion.button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`
                px-3 py-1.5 rounded-full text-[11px] sm:text-xs font-medium transition-all duration-200 border flex items-center gap-1.5
                ${isActive ? activeClass : 'bg-muted/40 text-muted-foreground border-border/60 hover:bg-muted hover:border-border'}
              `}
            >
              {opt !== 'All' && (
                <span
                  className={`w-2 h-2 rounded-full ${
                    isActive ? 'bg-white/80' : categoryStyles[opt as JourneyCategory].dot
                  }`}
                />
              )}
              {opt}
              <span className={`text-[9px] ml-0.5 ${isActive ? 'opacity-80' : 'opacity-40'}`}>
                {getCategoryCount(opt)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Timeline Grid */}
      <div
        className="grid gap-px rounded-xl overflow-hidden border border-border/30 bg-border/20"
        style={{
          gridTemplateColumns: `90px repeat(${journeyPeriods.length}, 1fr)`,
        }}
      >
        {/* Header Row */}
        <div className="bg-muted/40 p-2 flex items-center justify-center">
          <span className="text-[9px] uppercase tracking-widest text-muted-foreground/40 font-semibold">
            Category
          </span>
        </div>
        {journeyPeriods.map((p) => (
          <div key={p} className="bg-muted/40 p-2 text-center">
            <span className="text-[10px] sm:text-xs font-bold text-foreground/60 tabular-nums">
              {p}
            </span>
          </div>
        ))}

        {/* Data Rows */}
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((cat) => {
            const s = categoryStyles[cat];
            return (
              <motion.div
                key={cat}
                className="contents"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                layout
              >
                {/* Row label */}
                <div className="bg-background/80 p-1.5 sm:p-2 flex items-center border-r border-border/10">
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${s.dot}`} />
                    <span className="text-[9px] sm:text-[10px] font-semibold text-foreground/60 leading-tight">
                      {cat}
                    </span>
                  </div>
                </div>
                {/* Period cells */}
                {journeyPeriods.map((period) => {
                  const cellItems = getItemsForCell(cat, period);
                  return (
                    <div
                      key={`${cat}-${period}`}
                      className="bg-background/40 p-1 sm:p-1.5 min-h-[52px] flex flex-col gap-1 justify-center"
                    >
                      {cellItems.map((item) => {
                        const ci = cardIndex++;
                        return (
                          <JourneyCard
                            key={`${item.label}-${ci}`}
                            item={item}
                            isActive={activeItem === item}
                            index={ci}
                            onClick={() =>
                              setActiveItem(activeItem === item ? null : item)
                            }
                          />
                        );
                      })}
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {/* Hint text */}
      <p className="text-[10px] text-muted-foreground/30 mt-2 text-center">
        Click any card to see details
      </p>

      {/* Detail Popup */}
      <AnimatePresence>
        {activeItem && (
          <DetailPopover item={activeItem} onClose={() => setActiveItem(null)} />
        )}
      </AnimatePresence>
    </section>
  );
};

export default JourneyTimeline;
