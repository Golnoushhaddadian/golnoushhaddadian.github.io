/**
 * Small floating bubble animation (bubbles.svg motion) confined to the top
 * banner area of the page. Sits behind content (z-0), does not scroll-lock,
 * fades out toward the bottom so the rest of the page stays clean. Light and
 * non-interactive.
 */
const ParticleField = () => (
  <div
    aria-hidden="true"
    style={{
      position: 'absolute',
      top: 0,
      left: 0,
      right: 0,
      height: 300,
      zIndex: 0,
      pointerEvents: 'none',
      overflow: 'hidden',
      WebkitMaskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
      maskImage: 'linear-gradient(to bottom, black 50%, transparent 100%)',
    }}
  >
    <object
      type="image/svg+xml"
      data="/bubbles.svg"
      tabIndex={-1}
      style={{
        position: 'absolute',
        inset: 0,
        width: '100%',
        height: '100%',
        opacity: 0.28,
        pointerEvents: 'none',
        border: 0,
      }}
    />
  </div>
);

export default ParticleField;
