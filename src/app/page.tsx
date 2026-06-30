import { CompanyCard } from "@/components/CompanyCard";
import { DecisionGraph } from "@/components/DecisionGraph";
import { Header } from "@/components/Header";
import { OperatingFlow } from "@/components/OperatingFlow";
import { SectionHeader } from "@/components/SectionHeader";
import {
  companies,
  navItems,
  principles,
  problemCards,
  thesisPillars,
} from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="relative isolate min-h-[92svh] overflow-hidden bg-[#11100d] px-5 pb-8 pt-24 text-[#f6f0e6] sm:px-8 sm:pb-10 sm:pt-28 lg:pt-28">
          <DecisionGraph />
          <div className="relative z-10 mx-auto flex max-w-7xl flex-col justify-center">
            <div className="max-w-5xl">
              <p className="reveal mb-6 text-xs font-semibold uppercase text-[#9fc4df]">
                AI-native operating company
              </p>
              <h1 className="reveal reveal-delay-1 text-balance text-5xl font-semibold leading-[1.02] sm:text-7xl lg:text-8xl">
                Reducing trust cost in complex decisions.
              </h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-3xl text-xl leading-8 text-[#d9d2c5] sm:text-2xl sm:leading-9">
                We build AI-native platforms for markets where information is
                fragmented, trust is expensive, and execution matters.
              </p>
              <div className="mt-10 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#thesis"
                  className="inline-flex justify-center rounded-full bg-[#f6f0e6] px-6 py-3 text-sm font-semibold text-[#11100d] transition hover:bg-white"
                >
                  Read our thesis
                </a>
                <a
                  href="#companies"
                  className="inline-flex justify-center rounded-full border border-[#f6f0e6]/25 px-6 py-3 text-sm font-semibold text-[#f6f0e6] transition hover:border-[#87b7d8]/70 hover:text-white"
                >
                  View companies
                </a>
              </div>
            </div>
            <div className="mt-10 grid gap-3 border-t border-white/12 pt-5 text-xs font-semibold uppercase text-[#b9b2a5] sm:mt-12 sm:pt-6 sm:grid-cols-3">
              <span>AI Capability</span>
              <span>Local Access</span>
              <span>Scientific Sourcing</span>
            </div>
          </div>
        </section>

        <section className="bg-[#f6f0e6] px-5 py-24 sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Problem"
              title="The problem is not information. The problem is trust."
              body="In complex markets, people are rarely short of options. They are overwhelmed by fragmented information, unverified claims, opaque networks, inconsistent quality, and execution risk. The real challenge is knowing what matters, who to trust, and which path is worth taking."
            />
            <div className="mt-14 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {problemCards.map((card) => (
                <article
                  key={card}
                  className="rounded-lg border border-[#ddd5c7] bg-[#fbf7ee] p-6"
                >
                  <div className="mb-8 h-px w-16 bg-[#87b7d8]" />
                  <h3 className="text-lg font-semibold text-[#1c1b17]">
                    {card}
                  </h3>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="thesis"
          className="bg-[#201f1b] px-5 py-24 text-[#f6f0e6] sm:px-8 lg:py-32"
        >
          <div className="mx-auto grid max-w-7xl gap-14 lg:grid-cols-[1fr_0.82fr] lg:items-end">
            <SectionHeader
              eyebrow="Thesis"
              title="Trust cost is the hidden tax on modern decisions."
              body="Every complex decision carries invisible costs: the time spent comparing options, the uncertainty of choosing the wrong partner, the difficulty of verifying quality, and the friction that appears after a decision is made."
              light
            />
            <div className="rounded-lg border border-white/10 bg-white/[0.04] p-7">
              <p className="text-2xl leading-9 text-[#efe7d8]">
                Xentra reduces that cost through AI, structured data, expert
                networks, and operational execution.
              </p>
              <div className="mt-8 grid gap-3 sm:grid-cols-2">
                {thesisPillars.map((pillar) => (
                  <div
                    key={pillar}
                    className="border border-white/10 bg-[#11100d]/40 px-4 py-4 text-sm font-medium text-[#d8d2c7]"
                  >
                    {pillar}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="operating-system"
          className="bg-[#f6f0e6] px-5 py-24 sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Operating System"
              title="Our operating system"
              body="We start with the decision itself, then build the product, network, and workflow around it."
            />
            <OperatingFlow />
          </div>
        </section>

        <section
          id="companies"
          className="bg-[#ebe3d5] px-5 py-24 sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader
              eyebrow="Companies"
              title="Three verticals. One thesis."
              body="Different markets require different products. The underlying pattern is the same: high uncertainty, high trust cost, and high execution friction."
            />
            <div className="mt-14 grid gap-6 lg:grid-cols-3">
              {companies.map((company) => (
                <CompanyCard key={company.title} {...company} />
              ))}
            </div>
          </div>
        </section>

        <section className="bg-[#11100d] px-5 py-24 text-[#f6f0e6] sm:px-8 lg:py-32">
          <div className="mx-auto grid max-w-7xl gap-12 lg:grid-cols-[0.8fr_1fr] lg:items-center">
            <SectionHeader
              eyebrow="Why now"
              title="AI changes the decision layer."
              body="AI is changing how decisions are made, but raw intelligence is not enough. In trust-heavy markets, better decisions require structured data, domain context, verified networks, and real-world execution."
              light
            />
            <blockquote className="border-l border-[#87b7d8] pl-7 text-3xl font-semibold leading-tight text-[#f6f0e6] sm:text-4xl">
              We do not believe AI replaces trust. We believe AI makes trust
              easier to evaluate, organize, and act on.
            </blockquote>
          </div>
        </section>

        <section
          id="principles"
          className="bg-[#f6f0e6] px-5 py-24 sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <SectionHeader eyebrow="Principles" title="Principles" />
            <div className="mt-14 grid gap-x-10 gap-y-12 md:grid-cols-2">
              {principles.map((principle, index) => (
                <article
                  key={principle.title}
                  className="border-t border-[#cfc7b8] pt-6"
                >
                  <p className="text-xs font-semibold uppercase text-[#6d91ab]">
                    0{index + 1}
                  </p>
                  <h3 className="mt-5 text-2xl font-semibold text-[#171613]">
                    {principle.title}
                  </h3>
                  <p className="mt-4 text-base leading-7 text-[#5f5b52]">
                    {principle.body}
                  </p>
                </article>
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="bg-[#201f1b] px-5 py-24 text-[#f6f0e6] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-4xl">
              <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-7xl">
                Different markets. Same thesis.
              </h2>
              <p className="mt-8 max-w-2xl text-xl leading-8 text-[#d8d2c7]">
                Reduce trust cost. Improve decision quality. Make complex
                decisions easier to execute.
              </p>
              <a
                href="#companies"
                className="mt-10 inline-flex rounded-full bg-[#f6f0e6] px-6 py-3 text-sm font-semibold text-[#11100d] transition hover:bg-white"
              >
                Explore our companies
              </a>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#11100d] px-5 py-12 text-[#d8d2c7] sm:px-8">
        <div className="mx-auto grid max-w-7xl gap-10 border-t border-white/10 pt-10 md:grid-cols-[1fr_1.4fr_1fr]">
          <div>
            <p className="text-sm font-semibold uppercase text-[#f6f0e6]">
              Xentra
            </p>
            <p className="mt-4 max-w-xs text-sm leading-6">
              AI-native platforms for trust-heavy decisions.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-5">
            {navItems
              .filter((item) =>
                ["Thesis", "Companies", "Contact"].includes(item.label),
              )
              .map((item) => (
                <a
                  key={item.href}
                  href={item.href}
                  className="text-sm transition hover:text-white"
                >
                  {item.label}
                </a>
              ))}
          </nav>
          <div className="text-sm leading-6">
            <p>For partnerships, operating opportunities, and new verticals:</p>
            <a
              href="mailto:contact@xentra.ai"
              className="mt-2 inline-flex text-[#f6f0e6] transition hover:text-[#9fc4df]"
            >
              contact@xentra.ai
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
