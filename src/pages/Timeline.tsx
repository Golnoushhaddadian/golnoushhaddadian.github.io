import React, { useState, useMemo } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useDocumentHead } from '@/hooks/useDocumentHead';
import { timelineEvents, categoryConfig, TimelineCategory, TimelineEvent } from '@/data/timelineData';
import { Badge } from '@/components/ui/badge';
import { ChevronDown, ChevronUp, Filter, Sparkles, Flag, ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Slider } from '@/components/ui/slider';

const categoryPageMap: Record<TimelineCategory, { path: string; label: string }> = {
  education: { path: '/education', label: 'Education' },
  research: { path: '/research', label: 'Research' },
  publication: { path: '/research', label: 'Research' },
  award: { path: '/awards', label: 'Awards' },
  teaching: { path: '/teaching', label: 'Teaching' },
  leadership: { path: '/cv', label: 'CV' },
  service: { path: '/cv', label: 'CV' },
};

// ── Category filter pills ──
const CategoryFilter = ({ active, onToggle }: { active: Set<TimelineCategory>; onToggle: (cat: TimelineCategory) => void }) => (
  <div className="flex flex-wrap gap-2 justify-center">
    {(Object.entries(categoryConfig) as [TimelineCategory, typeof categoryConfig[TimelineCategory]][]).map(([key, cfg]) => {
      const isActive = active.has(key);
      return (
        <button
          key={key}
          onClick={() => onToggle(key)}
          className={cn(
            'px-3 py-1.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-200 border',
            isActive ? 'shadow-sm scale-105' : 'opacity-40 hover:opacity-70 bg-muted border-transparent'
          )}
          style={isActive ? { backgroundColor: cfg.bgColor, borderColor: cfg.color, color: cfg.color } : undefined}
        >
          {cfg.icon} {cfg.label}
        </button>
      );
    })}
  </div>
);

// ── Year range slider ──
const YearRangeSlider = ({
  min, max, value, onChange,
}: {
  min: number; max: number; value: [number, number]; onChange: (val: [number, number]) => void;
}) => (
  <div className="flex items-center gap-3 w-full max-w-md mx-auto mt-4 px-2">
    <span className="text-xs font-semibold text-primary min-w-[2.5rem] text-right">{value[0]}</span>
    <Slider min={min} max={max} step={1} value={value} onValueChange={(v) => onChange(v as [number, number])} className="flex-1" />
    <span className="text-xs font-semibold text-primary min-w-[2.5rem]">{value[1]}</span>
  </div>
);

// ── Year marker with sticky badge ──
const YearMarker = ({ year, milestoneLabel }: { year: number; milestoneLabel?: string }) => (
  <div className="sticky top-16 z-10 flex items-center gap-3 py-2">
    <div className="flex-shrink-0 w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-primary/10 border-2 border-primary flex items-center justify-center shadow-md">
      <span className="text-sm sm:text-base font-bold text-primary">{year}</span>
    </div>
    <div className="flex-1 flex items-center gap-2">
      <div className="flex-1 h-px bg-gradient-to-r from-primary/30 to-transparent" />
      {milestoneLabel && (
        <motion.span
          initial={{ opacity: 0, x: 10 }}
          animate={{ opacity: 1, x: 0 }}
          className="flex items-center gap-1 text-[10px] sm:text-xs font-semibold text-primary bg-primary/10 px-2 py-0.5 rounded-full whitespace-nowrap"
        >
          <Flag size={10} /> {milestoneLabel}
        </motion.span>
      )}
    </div>
  </div>
);

// ── Timeline card ──
const TimelineCard = ({ event, index }: { event: TimelineEvent; index: number }) => {
  const [expanded, setExpanded] = useState(false);
  const cfg = categoryConfig[event.category];
  const isLeft = index % 2 === 0;

  return (
    <motion.div
      initial={{ opacity: 0, x: isLeft ? -30 : 30 }}
      whileInView={{ opacity: 1, x: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{ duration: 0.4, delay: 0.05 * (index % 4) }}
      className={cn(
        'relative flex w-full mb-4',
        'md:w-[calc(50%-1.5rem)]',
        isLeft ? 'md:mr-auto md:pr-4' : 'md:ml-auto md:pl-4'
      )}
    >
      <div
        className={cn(
          'hidden md:block absolute top-5 w-3 h-3 rounded-full border-2 z-10',
          isLeft ? '-right-[1.8rem]' : '-left-[1.8rem]'
        )}
        style={{ backgroundColor: cfg.bgColor, borderColor: cfg.color }}
      />

      <motion.div
        whileHover={{ y: -2, boxShadow: '0 8px 25px -8px rgba(0,0,0,0.15)' }}
        className={cn(
          'w-full rounded-lg border p-4 cursor-pointer transition-colors duration-200 bg-card',
          event.highlight && 'ring-1'
        )}
        style={{
          borderLeftWidth: '4px',
          borderLeftColor: cfg.color,
          ...(event.highlight ? { ringColor: cfg.color } : {}),
        }}
        onClick={() => event.description && setExpanded(!expanded)}
      >
        {event.milestone && (
          <div
            className="flex items-center gap-1 text-[10px] font-semibold mb-2 px-2 py-0.5 rounded-full w-fit"
            style={{ backgroundColor: cfg.bgColor, color: cfg.color }}
          >
            <Flag size={10} />
            {event.milestone}
          </div>
        )}

        <div className="flex items-start justify-between gap-2 mb-1">
          <Badge
            variant="outline"
            className="text-[10px] shrink-0"
            style={{ backgroundColor: cfg.bgColor, color: cfg.color, borderColor: cfg.color }}
          >
            {cfg.icon} {cfg.label}
          </Badge>
          <div className="flex items-center gap-1">
            {event.highlight && <Sparkles size={12} className="text-amber-500" />}
            {event.endYear && (
              <span className="text-[10px] text-muted-foreground">{event.year}–{event.endYear}</span>
            )}
          </div>
        </div>

        <h3 className="text-sm sm:text-base font-semibold leading-snug mt-1">{event.title}</h3>
        {event.subtitle && (
          <p className="text-xs sm:text-sm text-muted-foreground mt-0.5">{event.subtitle}</p>
        )}

        <AnimatePresence>
          {expanded && event.description && (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: 'auto', opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25 }}
              className="overflow-hidden"
            >
              <p className="text-xs sm:text-sm text-muted-foreground mt-3 pt-3 border-t leading-relaxed">
                {event.description}
              </p>
            </motion.div>
          )}
        </AnimatePresence>

        {event.description && (
          <button
            className="flex items-center gap-1 text-[10px] text-primary mt-2 hover:underline"
            onClick={(e) => { e.stopPropagation(); setExpanded(!expanded); }}
          >
            {expanded ? <ChevronUp size={12} /> : <ChevronDown size={12} />}
            {expanded ? 'Less' : 'More'}
          </button>
        )}
      </motion.div>
    </motion.div>
  );
};

// ── Main page ──
const Timeline = () => {
  useDocumentHead({
    title: 'Timeline — Golnoush Haddadian',
    description: 'Interactive timeline of academic career, research, publications, awards, and teaching experience.',
    canonical: '/timeline',
  });

  const allCategories = new Set(Object.keys(categoryConfig) as TimelineCategory[]);
  const [activeCategories, setActiveCategories] = useState<Set<TimelineCategory>>(allCategories);
  const [sortAsc, setSortAsc] = useState(false);

  const allYears = useMemo(() => timelineEvents.map((e) => e.year), []);
  const minYear = Math.min(...allYears);
  const maxYear = Math.max(...allYears);
  const [yearRange, setYearRange] = useState<[number, number]>([minYear, maxYear]);

  const toggleCategory = (cat: TimelineCategory) => {
    setActiveCategories((prev) => {
      const next = new Set(prev);
      if (next.has(cat)) { if (next.size > 1) next.delete(cat); }
      else next.add(cat);
      return next;
    });
  };

  const filtered = useMemo(() => {
    const items = timelineEvents.filter(
      (e) => activeCategories.has(e.category) && e.year >= yearRange[0] && e.year <= yearRange[1]
    );
    return items.sort((a, b) => (sortAsc ? a.year - b.year : b.year - a.year));
  }, [activeCategories, sortAsc, yearRange]);

  const grouped = useMemo(() => {
    const map = new Map<number, TimelineEvent[]>();
    filtered.forEach((e) => {
      const arr = map.get(e.year) || [];
      arr.push(e);
      map.set(e.year, arr);
    });
    const years = Array.from(map.keys()).sort((a, b) => (sortAsc ? a - b : b - a));
    return years.map((y) => ({ year: y, events: map.get(y)! }));
  }, [filtered, sortAsc]);

  const getMilestoneForYear = (events: TimelineEvent[]) => {
    const m = events.find((e) => e.milestone);
    return m?.milestone;
  };

  return (
    <div className="max-w-5xl mx-auto">
      <motion.div initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} className="text-center mb-8">
        <h1 className="text-xl sm:text-2xl md:text-3xl font-bold mb-2">My Journey</h1>
        <p className="text-sm text-muted-foreground mb-6">
          An interactive timeline of my academic career, research, and achievements
        </p>

        <CategoryFilter active={activeCategories} onToggle={toggleCategory} />

        <YearRangeSlider min={minYear} max={maxYear} value={yearRange} onChange={setYearRange} />

        <div className="flex justify-center mt-4 gap-2">
          <button
            onClick={() => setSortAsc(!sortAsc)}
            className="flex items-center gap-1.5 text-xs text-muted-foreground hover:text-foreground transition-colors px-3 py-1.5 rounded-md border bg-card"
          >
            <Filter size={12} />
            {sortAsc ? 'Oldest first' : 'Newest first'}
          </button>
          <span className="text-xs text-muted-foreground self-center">
            Showing {filtered.length} of {timelineEvents.length} events
          </span>
        </div>
      </motion.div>

      {/* Timeline */}
      <div className="relative">
        <div className="hidden md:block absolute left-1/2 top-0 bottom-0 w-px bg-border -translate-x-px" />

        {grouped.map(({ year, events }, gi) => (
          <div key={year} className="mb-6">
            <YearMarker year={year} milestoneLabel={getMilestoneForYear(events)} />
            <div className="md:flex md:flex-wrap md:gap-y-0 relative mt-2">
              {events.map((event, i) => (
                <TimelineCard key={event.id} event={event} index={gi * 10 + i} />
              ))}
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <p className="text-center text-sm text-muted-foreground py-12">
            No events match your filters. Try adjusting the year range or categories.
          </p>
        )}
      </div>

      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        className="text-center text-xs text-muted-foreground mt-10 mb-4"
      >
        ✦ Timeline reflects key milestones. Visit individual sections for full details.
      </motion.p>
    </div>
  );
};

export default Timeline;
