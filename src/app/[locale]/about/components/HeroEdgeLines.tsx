export default function HeroEdgeLines() {
  return (
    <>
      <div
        className="pointer-events-none absolute left-0 top-1/2 z-[5] hidden -translate-y-1/2 md:block"
        aria-hidden
      >
        <svg width="24" height="246" viewBox="0 0 24 246" fill="none">
          <g opacity="0.4">
            <line x1="0" y1="157.5" x2="24" y2="157.5" stroke="white" />
            <line x1="0" y1="147.5" x2="12" y2="147.5" stroke="white" />
            <line x1="0" y1="137.5" x2="24" y2="137.5" stroke="white" />
            <line x1="0" y1="127.5" x2="12" y2="127.5" stroke="white" />
            <line x1="0" y1="117.5" x2="24" y2="117.5" stroke="white" />
            <line x1="0" y1="97.5" x2="24" y2="97.5" stroke="white" />
            <line x1="0" y1="107.5" x2="12" y2="107.5" stroke="white" />
          </g>
        </svg>
      </div>
      <div
        className="pointer-events-none absolute right-0 top-1/2 z-[5] hidden -translate-y-1/2 md:block"
        aria-hidden
      >
        <svg width="24" height="246" viewBox="0 0 24 246" fill="none" className="scale-x-[-1]">
          <g opacity="0.4">
            <line x1="0" y1="157.5" x2="24" y2="157.5" stroke="white" />
            <line x1="0" y1="147.5" x2="12" y2="147.5" stroke="white" />
            <line x1="0" y1="137.5" x2="24" y2="137.5" stroke="white" />
            <line x1="0" y1="127.5" x2="12" y2="127.5" stroke="white" />
            <line x1="0" y1="117.5" x2="24" y2="117.5" stroke="white" />
            <line x1="0" y1="97.5" x2="24" y2="97.5" stroke="white" />
            <line x1="0" y1="107.5" x2="12" y2="107.5" stroke="white" />
          </g>
        </svg>
      </div>
    </>
  );
}
