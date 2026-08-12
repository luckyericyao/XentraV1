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
          <pattern
            id="decisionGrid"
            width="72"
            height="72"
            patternUnits="userSpaceOnUse"
          >
            <path d="M72 0H0V72" stroke="#F2EFE8" strokeOpacity="0.045" />
          </pattern>
        </defs>
        <rect width="1040" height="320" fill="url(#decisionGrid)" />
        <rect x="154" y="160" width="12" height="12" fill="#C6A15B" opacity="0.42" />
        <rect x="146" y="152" width="28" height="28" stroke="#F2EFE8" strokeOpacity="0.15" />
        {branches.map((branch) => (
          <g key={branch.path}>
            <path
              d={branch.path}
              stroke="#F2EFE8"
              strokeOpacity="0.17"
              strokeWidth="1"
            />
            <rect
              x={branch.node.cx - 3}
              y={branch.node.cy - 3}
              width="6"
              height="6"
              fill="#C6A15B"
              opacity="0.38"
            />
          </g>
        ))}
      </svg>
    </div>
  );
}
