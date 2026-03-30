import { useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  journeyItems,
  journeyPeriods,
  journeyCategories,
  journeyQuote,
  type JourneyCategory,
  type JourneyItem,
} from '@/data/journeyData';

const categoryAccent: Record<JourneyCategory, string> = {
  Education: 'border-l-blue-500',
  Research: 'border-l-emerald-500',
  Publications: 'border-l-amber-500',
  Teaching: 'border-l-violet-500',
  Awards: 'border-l-rose-500',
};

const categoryDot: Record<JourneyCategory, string> = {
  Education: 'bg-blue-500',
  Research: 'bg-emerald-500',
  Publications: 'bg-amber-500',
  Teaching: 'bg-violet-500',
  Awards: 'bg-rose-500',
};

const categoryTextAccent: Record<JourneyCategory, string> = {
  Education: 'text-blue-600 dark:text-blue-400',
  Research: 'text-emerald-600 dark:text-emerald-400',
  Publications: 'text-amber-600 dark:text-amber-400',
  Teaching: 'text-violet-600 dark:text-violet-400',
  Awards: 'text-rose-600 dark:text-rose-400',
};

const filterActive: Record<JourneyCategory, string> = {
  Education: 'bg-blue-500 text-white border-blue-500 shadow-blue-500/25',
  Research: 'bg-emerald-500 text-white border-emerald-500 shadow-emerald-500/25',
  Publications: 'bg-amber-500 text-white border-amber-500 shadow-amber-500/25',
  Teaching: 'bg-violet-500 text-white border-violet-500 shadow-violet-500/25',
  Awards: 'bg-rose-500 text-white border-rose-500 shadow-rose-500/25',
};

const filterInactive: Record<JourneyCategory, string> = {
  Education: 'bg-blue-500/15 text-blue-700 dark:text-blue-300 border-blue-500/30 hover:bg-blue-500/25',
  Research: 'bg-emerald-500/15 text-emerald-700 dark:text-emerald-300 border-emerald-500/30 hover:bg-emerald-500/25',
  Publications: 'bg-amber-500/15 text-amber-700 dark:text-amber-300 border-amber-500/30 hover:bg-amber-500/25',
  Teaching: 'bg-violet-500/15 text-violet-700 dark:text-violet-300 border-violet-500/30 hover:bg-violet-500/25',
  Awards: 'bg-rose-500/15 text-rose-700 dark:text-rose-300 border-rose-500/30 hover:bg-rose-500/25',
};

const filterOptions: (JourneyCategory | 'All')[] = ['All', ...journeyCategories];

/* ─── Hover Tooltip ─── */
const HoverTooltip = ({
  item,
  anchorRect,
}: {
  item: JourneyItem;
  anchorRect: DOMRect;
}) => {
  const tooltipWidth = 320;
  let left = anchorRect.left + anchorRect.width / 2 - tooltipWidth / 2;
  left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
  const top = anchorRect.top - 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="fixed z-50 pointer-events-none"
      style={{ left, top, width: tooltipWidth, transform: 'translateY(-100%)' }}
    >
      <div className={`bg-popover border border-border rounded-xl shadow-2xl overflow-hidden border-l-[3px] ${categoryAccent[item.category]}`}>
        <div className="p-3.5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className={`w-2 h-2 rounded-full ${categoryDot[item.category]}`} />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {item.category} · {item.period}
            </span>
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1.5">{item.label}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line">
            {item.detail}
          </p>
          {item.url && (
            <span className={`inline-flex items-center gap-1 mt-2 text-[10px] font-medium ${categoryTextAccent[item.category]}`}>
              View publication →
            </span>
          )}
        </div>
      </div>
      <div
        className="w-3 h-3 bg-popover border-b border-r border-border rotate-45 absolute -bottom-1.5"
        style={{ left: Math.max(12, Math.min(anchorRect.left + anchorRect.width / 2 - left - 6, tooltipWidth - 20)) }}
      />
    </motion.div>
  );
};

/* ─── Journey Card — neutral bg + colored left line ─── */
const JourneyCard = ({
  item,
  onHover,
  onLeave,
}: {
  item: JourneyItem;
  onHover: (item: JourneyItem, rect: DOMRect) => void;
  onLeave: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);

  return (
    <div
      ref={ref}
      onMouseEnter={() => {
        if (ref.current) onHover(item, ref.current.getBoundingClientRect());
      }}
      onMouseLeave={onLeave}
      className={`
        w-full text-left rounded-[4px] border border-border/40 border-l-[3px]
        bg-card/80 hover:bg-card hover:shadow-sm
        px-2 py-1.5 transition-all duration-150 cursor-default
        ${categoryAccent[item.category]}
      `}
    >
      <p className="text-[9px] sm:text-[10px] font-semibold leading-tight text-foreground/85 truncate">
        {item.label}
      </p>
      <p className="text-[7px] sm:text-[8px] text-muted-foreground/60 leading-tight mt-0.5 truncate">
        {item.sublabel}
      </p>
      {item.badges && (
        <div className="flex gap-0.5 mt-1 flex-wrap">
          {item.badges.map((b) => (
            <span
              key={b}
              className="text-[6px] sm:text-[7px] font-bold uppercase tracking-wider px-1 py-px rounded bg-muted text-muted-foreground/70"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </div>
  );
};

/* ─── Main Component ─── */
const JourneyTimeline = () => {
  const [activeFilter, setActiveFilter] = useState<JourneyCategory | 'All'>('All');
  const [hoveredItem, setHoveredItem] = useState<{ item: JourneyItem; rect: DOMRect } | null>(null);

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

  const getCategoryCount = (cat: JourneyCategory | 'All') =>
    cat === 'All' ? journeyItems.length : journeyItems.filter((i) => i.category === cat).length;

  return (
    <section className="mt-12 sm:mt-16 md:mt-20">
      <div className="flex items-baseline gap-3 mb-2">
        <h2 className="text-lg sm:text-xl md:text-2xl font-semibold">Journey</h2>
        <span className="text-[10px] sm:text-xs text-muted-foreground/40 font-medium tabular-nums">
          {filteredItems.length} milestones
        </span>
      </div>
      <p className="text-xs sm:text-sm text-muted-foreground/70 mb-5 sm:mb-6 max-w-2xl italic">
        {journeyQuote}
      </p>

      {/* Colorful Filter Buttons */}
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mb-5">
        {filterOptions.map((opt) => {
          const isActive = activeFilter === opt;
          const activeClass =
            opt === 'All'
              ? 'bg-foreground text-background border-foreground shadow-lg'
              : filterActive[opt as JourneyCategory] + ' shadow-lg';
          const inactiveClass =
            opt === 'All'
              ? 'bg-muted/40 text-muted-foreground border-border/60 hover:bg-muted'
              : filterInactive[opt as JourneyCategory];
          return (
            <motion.button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`
                px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all duration-200 border flex items-center gap-1
                ${isActive ? activeClass : inactiveClass}
              `}
            >
              {opt}
              <span className={`text-[8px] ml-0.5 ${isActive ? 'opacity-80' : 'opacity-50'}`}>
                {getCategoryCount(opt)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Timeline Grid — uniform cell sizes, no scroll */}
      <div
        className="grid rounded-xl overflow-hidden border border-border/30"
        style={{
          gridTemplateColumns: `64px repeat(${journeyPeriods.length}, minmax(0, 1fr))`,
        }}
      >
        {/* Header Row */}
        <div className="bg-muted/50 p-2 flex items-center justify-center border-b border-r border-border/20" />
        {journeyPeriods.map((p, i) => (
          <div
            key={p}
            className={`bg-muted/50 p-2 text-center border-b border-border/20 ${i < journeyPeriods.length - 1 ? 'border-r border-border/20' : ''}`}
          >
            <span className="text-[9px] sm:text-[11px] font-bold text-foreground/55 tabular-nums">
              {p}
            </span>
          </div>
        ))}

        {/* Data Rows — equal height */}
        <AnimatePresence mode="popLayout">
          {visibleCategories.map((cat, catIdx) => {
            const isLast = catIdx === visibleCategories.length - 1;
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
                <div className={`bg-background p-2 flex items-center border-r border-border/20 ${!isLast ? 'border-b border-border/20' : ''}`}>
                  <div className="flex items-center gap-1.5">
                    <span className={`w-2 h-2 rounded-full shrink-0 ${categoryDot[cat]}`} />
                    <span className="text-[8px] sm:text-[9px] font-semibold text-foreground/55 leading-tight">
                      {cat}
                    </span>
                  </div>
                </div>
                {/* Period cells */}
                {journeyPeriods.map((period, pIdx) => {
                  const cellItems = getItemsForCell(cat, period);
                  const isLastCol = pIdx === journeyPeriods.length - 1;
                  return (
                    <div
                      key={`${cat}-${period}`}
                      className={`bg-background p-2 flex flex-col gap-1 justify-center ${!isLast ? 'border-b border-border/20' : ''} ${!isLastCol ? 'border-r border-border/20' : ''}`}
                    >
                      {cellItems.map((item, idx) => (
                        <JourneyCard
                          key={`${item.label}-${idx}`}
                          item={item}
                          onHover={(itm, rect) => setHoveredItem({ item: itm, rect })}
                          onLeave={() => setHoveredItem(null)}
                        />
                      ))}
                    </div>
                  );
                })}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      <p className="text-[9px] text-muted-foreground/30 mt-1.5 text-center">
        Hover over any card to see details
      </p>

      {/* Hover Tooltip */}
      <AnimatePresence>
        {hoveredItem && (
          <HoverTooltip
            key={hoveredItem.item.label}
            item={hoveredItem.item}
            anchorRect={hoveredItem.rect}
          />
        )}
      </AnimatePresence>
    </section>
  );
};

export default JourneyTimeline;
