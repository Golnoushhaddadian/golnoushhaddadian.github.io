import { useDocumentHead } from '@/hooks/useDocumentHead';
import JourneyTimeline from '@/components/JourneyTimeline';

const Timeline = () => {
  useDocumentHead({
    title: 'Timeline — Golnoush Haddadian',
    description: 'Interactive timeline of academic career, research, publications, awards, and teaching experience.',
    canonical: '/timeline',
  });

  return (
    <div className="max-w-5xl mx-auto">
      <JourneyTimeline />
    </div>
  );
};

export default Timeline;
