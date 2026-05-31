import { useDocumentHead } from '@/hooks/useDocumentHead';

const Collaborators = () => {
  useDocumentHead({
    title: 'Research Collaborators Map — Golnoush Haddadian',
    description: 'An interactive world map of advisors, mentors, dissertation committee members, and co-authors collaborating with Golnoush Haddadian.',
    canonical: '/collaborators',
  });

  return (
    <section className="space-y-4">
      <iframe
        src="/collaborators-map.html"
        title="Research Collaborators World Map"
        className="w-full rounded-md border border-border"
        style={{ height: '820px' }}
      />
    </section>
  );
};

export default Collaborators;
