type OperatingFlowProps = {
  steps: { title: string; body: string }[];
};

export function OperatingFlow({ steps }: OperatingFlowProps) {
  return (
    <ol className="mt-14 grid gap-0 overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.02] md:grid-cols-2">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="scroll-rise border-b border-[rgba(255,255,255,0.08)] p-7 transition duration-500 hover:bg-white/[0.03] last:border-b-0 md:[&:nth-child(2n-1)]:border-r md:[&:nth-child(3)]:border-b-0 md:[&:nth-child(4)]:border-b-0"
        >
          <span className="text-xs font-semibold text-[#6E7680]">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="mt-8 text-2xl font-semibold leading-tight text-[#F3EEE5]">
            {step.title}
          </h3>
          <p className="mt-7 text-sm leading-6 text-[#A6AFB8]">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
