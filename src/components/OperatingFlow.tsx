type OperatingFlowProps = {
  steps: { title: string; body: string }[];
};

export function OperatingFlow({ steps }: OperatingFlowProps) {
  return (
    <ol className="mt-14 grid gap-3">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="scroll-rise grid gap-5 rounded-lg border border-[#2A2D33] bg-[#101214] p-6 transition duration-500 hover:border-[rgba(198,161,91,0.22)] hover:bg-[#17191D] md:grid-cols-[4rem_0.55fr_1fr] md:items-start md:p-7"
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
