import { operatingSteps } from "@/lib/content";

export function OperatingFlow() {
  return (
    <ol className="mt-14 grid gap-5 lg:grid-cols-5">
      {operatingSteps.map((step, index) => (
        <li
          key={step.title}
          className="relative border-l border-[#b8b4aa]/50 pl-6 lg:border-l-0 lg:border-t lg:pl-0 lg:pt-8"
        >
          <span className="absolute -left-[7px] top-0 flex h-3.5 w-3.5 rounded-full border border-[#87b7d8] bg-[#f6f0e6] lg:-top-[7px] lg:left-0" />
          <span className="text-xs font-semibold uppercase text-[#7a766d]">
            0{index + 1}
          </span>
          <h3 className="mt-4 text-xl font-semibold text-[#181713]">
            {step.title}
          </h3>
          <p className="mt-3 text-sm leading-6 text-[#5f5b52]">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
