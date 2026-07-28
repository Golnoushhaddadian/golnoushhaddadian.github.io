/**
 * Site-wide floating background using the exact bubbles.svg motion:
 * four soft pastel blobs that slowly morph and drift. Rendered as a fixed,
 * full-viewport, non-interactive layer behind all page content (z-0).
 * The SVG's opaque background was stripped so it overlays cleanly in both
 * light and dark themes; its SMIL animation runs inside <object>.
 */
const ParticleField = () => (
  <object
    type="image/svg+xml"
    data="/bubbles.svg"
    aria-hidden="true"
    tabIndex={-1}
    style={{
      position: 'fixed',
      inset: 0,
      width: '100%',
      height: '100%',
      zIndex: 0,
      pointerEvents: 'none',
      border: 0,
    }}
  />
);

export default ParticleField;
