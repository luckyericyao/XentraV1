type OperatingFlowProps = {
  steps: { title: string; body: string }[];
};

export function OperatingFlow({ steps }: OperatingFlowProps) {
  return (
    <ol className="mt-10 grid border-y border-[#2A2D33] md:grid-cols-4">
      {steps.map((step, index) => (
        <li
          key={step.title}
          className="scroll-rise grid grid-cols-[2rem_1fr] gap-x-4 gap-y-3 border-b border-[#2A2D33] py-6 last:border-b-0 md:grid-cols-1 md:content-start md:gap-5 md:border-b-0 md:border-r md:px-6 md:py-8 md:first:pl-0 md:last:border-r-0 md:last:pr-0"
        >
          <span className="text-xs font-medium text-[#B49459] max-md:pt-1">
            {String(index + 1).padStart(2, "0")}
          </span>
          <h3 className="text-xl font-medium leading-tight text-[#F2EFE8] sm:text-2xl">
            {step.title}
          </h3>
          <p className="col-start-2 text-sm leading-6 text-[#A6A39A] md:col-start-auto">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
