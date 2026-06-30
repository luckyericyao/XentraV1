import { operatingSteps } from "@/lib/content";

export function OperatingFlow() {
  return (
    <ol className="mt-16 grid gap-0 overflow-hidden rounded-lg border border-[rgba(244,240,232,0.14)] md:grid-cols-4">
      {operatingSteps.map((step) => (
        <li
          key={step.title}
          className="border-b border-[rgba(244,240,232,0.14)] p-7 last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <h3 className="text-2xl font-medium text-[#f4f0e8]">{step.title}</h3>
          <p className="mt-8 text-sm leading-6 text-[#8f8a82]">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
