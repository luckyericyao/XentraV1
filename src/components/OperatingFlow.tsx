import { operatingSteps } from "@/lib/content";

export function OperatingFlow() {
  return (
    <ol className="mt-16 grid gap-0 overflow-hidden rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.02] md:grid-cols-4">
      {operatingSteps.map((step) => (
        <li
          key={step.title}
          className="border-b border-[rgba(255,255,255,0.08)] p-7 transition duration-300 hover:bg-white/[0.03] last:border-b-0 md:border-b-0 md:border-r md:last:border-r-0"
        >
          <h3 className="text-2xl font-semibold text-[#F3EEE5]">{step.title}</h3>
          <p className="mt-8 text-sm leading-6 text-[#A6AFB8]">{step.body}</p>
        </li>
      ))}
    </ol>
  );
}
