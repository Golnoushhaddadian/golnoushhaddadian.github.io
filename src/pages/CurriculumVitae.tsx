const CurriculumVitae = () => {
  return (
    <section className="space-y-4">
      <h1>Curriculum Vitae</h1>
      <div className="w-full h-[calc(100vh-200px)] min-h-[600px] rounded-lg overflow-hidden border border-border">
        <iframe
          src="/CV_Golnoush_Haddadian.pdf"
          className="w-full h-full"
          title="Golnoush Haddadian CV"
        />
      </div>
    </section>
  );
};

export default CurriculumVitae;
