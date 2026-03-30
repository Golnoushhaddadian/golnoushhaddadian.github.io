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

/* ─── Hover Tooltip ─── */
const HoverTooltip = ({
  item,
  anchorRect,
}: {
  item: JourneyItem;
  anchorRect: DOMRect;
}) => {
  const s = categoryStyles[item.category];

  // Position tooltip above the card, centered
  const tooltipWidth = 320;
  let left = anchorRect.left + anchorRect.width / 2 - tooltipWidth / 2;
  // Keep tooltip within viewport
  left = Math.max(8, Math.min(left, window.innerWidth - tooltipWidth - 8));
  let top = anchorRect.top - 8;

  return (
    <motion.div
      initial={{ opacity: 0, y: 4 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 4 }}
      transition={{ duration: 0.15 }}
      className="fixed z-50 pointer-events-none"
      style={{
        left,
        top,
        width: tooltipWidth,
        transform: 'translateY(-100%)',
      }}
    >
      <div className="bg-popover border border-border rounded-xl shadow-2xl overflow-hidden">
        <div className={`h-1 w-full ${s.dot}`} />
        <div className="p-3.5">
          <div className="flex items-center gap-1.5 mb-2">
            <span className={`w-2 h-2 rounded-full ${s.dot}`} />
            <span className="text-[10px] font-medium text-muted-foreground uppercase tracking-wider">
              {item.category} · {item.period}
            </span>
          </div>
          <h4 className="text-sm font-bold text-foreground mb-1.5">{item.label}</h4>
          <p className="text-xs text-muted-foreground leading-relaxed whitespace-pre-line line-clamp-4">
            {item.detail}
          </p>
          {item.url && (
            <span className={`inline-flex items-center gap-1 mt-2 text-[10px] font-medium ${s.text}`}>
              View publication →
            </span>
          )}
        </div>
      </div>
      {/* Arrow */}
      <div
        className="w-3 h-3 bg-popover border-b border-r border-border rotate-45 absolute -bottom-1.5"
        style={{ left: anchorRect.left + anchorRect.width / 2 - left - 6 }}
      />
    </motion.div>
  );
};

/* ─── Journey Card ─── */
const JourneyCard = ({
  item,
  index,
  onHover,
  onLeave,
}: {
  item: JourneyItem;
  index: number;
  onHover: (item: JourneyItem, rect: DOMRect) => void;
  onLeave: () => void;
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const s = categoryStyles[item.category];

  return (
    <motion.div
      ref={ref}
      onMouseEnter={() => {
        if (ref.current) onHover(item, ref.current.getBoundingClientRect());
      }}
      onMouseLeave={onLeave}
      className={`
        relative w-full text-left rounded-md border px-2 py-1.5 transition-all duration-200
        cursor-default group backdrop-blur-sm
        ${s.bg} ${s.border} ${s.text}
        hover:shadow-md hover:scale-[1.03] hover:brightness-105
      `}
      initial={{ opacity: 0, y: 6 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95 }}
      transition={{ delay: index * 0.02, duration: 0.2 }}
      layout
    >
      <div className="flex items-start gap-1">
        <span className={`w-1 h-1 rounded-full shrink-0 mt-[5px] ${s.dot}`} />
        <div className="min-w-0 flex-1">
          <p className="text-[9px] sm:text-[10px] font-semibold leading-tight truncate">
            {item.label}
          </p>
          <p className="text-[7px] sm:text-[8px] opacity-55 leading-tight mt-0.5 truncate">
            {item.sublabel}
          </p>
        </div>
      </div>
      {item.badges && (
        <div className="flex gap-0.5 mt-1 flex-wrap">
          {item.badges.map((b) => (
            <span
              key={b}
              className="text-[6px] sm:text-[7px] font-bold uppercase tracking-wider px-1 py-px rounded-full bg-foreground/5 border border-foreground/10 text-foreground/50"
            >
              {b}
            </span>
          ))}
        </div>
      )}
    </motion.div>
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

  let cardIndex = 0;

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
              : categoryStyles[opt as JourneyCategory].filterActive + ' shadow-lg';
          return (
            <motion.button
              key={opt}
              onClick={() => setActiveFilter(opt)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              className={`
                px-2.5 py-1 rounded-full text-[10px] sm:text-[11px] font-medium transition-all duration-200 border flex items-center gap-1
                ${isActive ? activeClass : 'bg-muted/40 text-muted-foreground border-border/60 hover:bg-muted hover:border-border'}
              `}
            >
              {opt !== 'All' && (
                <span
                  className={`w-1.5 h-1.5 rounded-full ${
                    isActive ? 'bg-white/80' : categoryStyles[opt as JourneyCategory].dot
                  }`}
                />
              )}
              {opt}
              <span className={`text-[8px] ml-0.5 ${isActive ? 'opacity-80' : 'opacity-40'}`}>
                {getCategoryCount(opt)}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Timeline Grid — everything in one frame */}
      <div
        className="grid gap-px rounded-xl overflow-hidden border border-border/30 bg-border/20"
        style={{
          gridTemplateColumns: `80px minmax(0, 1.8fr) repeat(${journeyPeriods.length - 1}, minmax(0, 1fr))`,
        }}
      >
        {/* Header Row */}
        <div className="bg-muted/40 p-1.5 flex items-center justify-center" />
        {journeyPeriods.map((p) => (
          <div key={p} className="bg-muted/40 p-1.5 text-center">
            <span className="text-[9px] sm:text-[11px] font-bold text-foreground/55 tabular-nums">
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
                <div className="bg-background/80 p-1.5 flex items-center border-r border-border/10">
                  <div className="flex items-center gap-1">
                    <span className={`w-1.5 h-1.5 rounded-full shrink-0 ${s.dot}`} />
                    <span className="text-[8px] sm:text-[9px] font-semibold text-foreground/55 leading-tight">
                      {cat}
                    </span>
                  </div>
                </div>
                {journeyPeriods.map((period) => {
                  const cellItems = getItemsForCell(cat, period);
                  return (
                    <div
                      key={`${cat}-${period}`}
                      className="bg-background/40 p-1 sm:p-1.5 min-h-[44px] flex flex-col gap-0.5 justify-center"
                    >
                      {cellItems.map((item) => {
                        const ci = cardIndex++;
                        return (
                          <JourneyCard
                            key={`${item.label}-${ci}`}
                            item={item}
                            index={ci}
                            onHover={(itm, rect) => setHoveredItem({ item: itm, rect })}
                            onLeave={() => setHoveredItem(null)}
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
