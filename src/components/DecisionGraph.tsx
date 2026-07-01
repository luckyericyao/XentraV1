const branches = [
  {
    path: "M160 166C286 92 418 92 560 98C682 104 762 82 890 70",
    node: { cx: 890, cy: 70 },
  },
  {
    path: "M160 166C304 166 432 166 560 166C688 166 764 166 900 166",
    node: { cx: 900, cy: 166 },
  },
  {
    path: "M160 166C284 238 428 248 566 238C698 230 770 250 908 274",
    node: { cx: 908, cy: 274 },
  },
];

export function DecisionGraph() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-0 overflow-hidden"
    >
      <svg
        className="absolute left-1/2 top-20 h-[520px] w-[1120px] -translate-x-1/2 opacity-30"
        viewBox="0 0 1040 320"
        fill="none"
      >
        <defs>
          <linearGradient id="pathGradient" x1="150" x2="920" y1="160" y2="170">
            <stop stopColor="#F3EEE5" stopOpacity="0.018" />
            <stop offset="0.5" stopColor="#8FA7C0" stopOpacity="0.22" />
            <stop offset="1" stopColor="#F3EEE5" stopOpacity="0.04" />
          </linearGradient>
          <pattern
            id="decisionGrid"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path d="M72 0H0V72" stroke="#F3EEE5" strokeOpacity="0.035" />
          </pattern>
        </defs>
        <rect width="1040" height="320" fill="url(#decisionGrid)" />
        <circle cx="160" cy="166" r="7" fill="#8FA7C0" opacity="0.58" />
        <circle cx="160" cy="166" r="24" stroke="#F3EEE5" strokeOpacity="0.08" />
        {branches.map((branch) => (
          <g key={branch.path}>
            <path
              className="decision-path"
              d={branch.path}
              stroke="url(#pathGradient)"
              strokeWidth="1.2"
            />
            <circle
              className="decision-node"
              cx={branch.node.cx}
              cy={branch.node.cy}
              r="4"
              fill="#B7C4D3"
              opacity="0.46"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
