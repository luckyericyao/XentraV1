const companyTones = {
  "ai-agent-coach": {
    tone: "steel",
    label: "text-[#A7B3C3]",
    border: "border-[rgba(167,179,195,0.3)]",
    rail: "border-t-[rgba(167,179,195,0.6)]",
    dot: "bg-[#A7B3C3]",
    hover: "hover:border-[#A7B3C3]",
  },
  localhost: {
    tone: "brass",
    label: "text-[#C6A15B]",
    border: "border-[rgba(198,161,91,0.3)]",
    rail: "border-t-[rgba(198,161,91,0.6)]",
    dot: "bg-[#C6A15B]",
    hover: "hover:border-[#C6A15B]",
  },
  bioaxis: {
    tone: "sage",
    label: "text-[#9AA797]",
    border: "border-[rgba(154,167,151,0.3)]",
    rail: "border-t-[rgba(154,167,151,0.6)]",
    dot: "bg-[#9AA797]",
    hover: "hover:border-[#9AA797]",
  },
} as const;

export function getCompanyTone(slug: string) {
  return companyTones[slug as keyof typeof companyTones] ?? companyTones.localhost;
}
