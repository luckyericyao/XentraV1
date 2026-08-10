type OperatingFlowProps = {
  steps: { title: string; body: string }[];
};

export function OperatingFlow({ steps }: OperatingFlowProps) {
  return (
    <ol className="mt-14 border-y border-[#2A2D33]">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="scroll-rise grid gap-5 border-b border-[#2A2D33] py-6 last:border-b-0 transition duration-500 hover:bg-[#101214] md:grid-cols-[4rem_0.55fr_1fr] md:items-start md:py-7"
        >
          <span className="text-xs font-semibold text-[#9B978E] md:pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-2xl font-semibold leading-tight text-[#F2EFE8]">
            {step.title}
          </h3>
          <p className="text-sm leading-6 text-[#A6A39A]">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
