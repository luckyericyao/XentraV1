const nodes = [
  { cx: 74, cy: 154, r: 3 },
  { cx: 118, cy: 86, r: 4 },
  { cx: 164, cy: 208, r: 3 },
  { cx: 214, cy: 128, r: 5 },
  { cx: 284, cy: 72, r: 3 },
  { cx: 328, cy: 178, r: 4 },
  { cx: 402, cy: 114, r: 5 },
  { cx: 482, cy: 184, r: 3 },
  { cx: 536, cy: 92, r: 4 },
  { cx: 610, cy: 152, r: 3 },
  { cx: 686, cy: 98, r: 5 },
  { cx: 730, cy: 210, r: 3 },
  { cx: 812, cy: 142, r: 4 },
  { cx: 888, cy: 78, r: 3 },
  { cx: 954, cy: 180, r: 5 },
];

export function DecisionGraph() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute left-1/2 top-24 h-[520px] w-[1120px] -translate-x-1/2 opacity-45"
        viewBox="0 0 1040 320"
        fill="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="70" x2="960" y1="130" y2="170">
            <stop stopColor="#f4f0e8" stopOpacity="0.02" />
            <stop offset="0.5" stopColor="#6f8faf" stopOpacity="0.24" />
            <stop offset="1" stopColor="#f4f0e8" stopOpacity="0.04" />
          </linearGradient>
          <pattern
            id="decisionGrid"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path d="M72 0H0V72" stroke="#f4f0e8" strokeOpacity="0.045" />
          </pattern>
        </defs>
        <rect width="1040" height="320" fill="url(#decisionGrid)" />
        <path
          className="decision-path"
          d="M74 154C162 82 216 222 284 72C346 -64 390 242 482 184C558 136 586 76 686 98C782 120 780 226 954 180"
          stroke="url(#pathGradient)"
          strokeWidth="1.5"
        />
        <path
          d="M214 128L328 178L402 114L536 92L610 152L730 210L812 142"
          stroke="#f4f0e8"
          strokeOpacity="0.08"
          strokeWidth="1"
        />
        <path
          d="M118 86L214 128L284 72M482 184L610 152L686 98L812 142L888 78"
          stroke="#6f8faf"
          strokeOpacity="0.12"
          strokeWidth="1"
        />
        {nodes.map((node) => (
          <circle
            className="decision-node"
            key={`${node.cx}-${node.cy}`}
            cx={node.cx}
            cy={node.cy}
            r={node.r}
            fill={node.r > 4 ? "#6f8faf" : "#f4f0e8"}
            opacity="0.42"
          />
        ))}
      </svg>
    </div>
  );
}
