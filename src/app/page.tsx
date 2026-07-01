import { CompanyCard } from "@/components/CompanyCard";
import { DecisionGraph } from "@/components/DecisionGraph";
import { Header } from "@/components/Header";
import { OperatingFlow } from "@/components/OperatingFlow";
import { companies } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="relative isolate flex min-h-[calc(100svh-4rem)] overflow-hidden bg-[#0B0D10] px-5 py-20 text-[#F3EEE5] sm:px-8 lg:py-28">
          <div className="hero-color-field" aria-hidden="true" />
          <DecisionGraph />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
            <div className="max-w-7xl">
              <p className="eyebrow reveal mb-8 text-[#8FA7C0]">
                Operating group
              </p>
              <h1 className="hero-title reveal reveal-delay-1 max-w-6xl text-balance">
                Decision infrastructure for trust-heavy markets.
              </h1>
              <p className="reveal reveal-delay-2 mt-9 max-w-2xl text-base leading-7 text-[#A6AFB8] sm:text-lg sm:leading-8">
                Xentra builds vertical companies where information is
                fragmented, trust is expensive, and execution quality
                determines outcomes.
              </p>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#companies"
                  className="inline-flex justify-center rounded-full bg-[#F3EEE5] px-6 py-3 text-sm font-medium text-[#0B0D10] transition hover:bg-[#E6DED1]"
                >
                  View companies
                </a>
                <a
                  href="#contact"
                  className="inline-flex justify-center rounded-full border border-[rgba(255,255,255,0.12)] px-6 py-3 text-sm font-medium text-[#F3EEE5] transition hover:border-[#B7C4D3] hover:text-[#B7C4D3]"
                >
                  Contact
                </a>
              </div>
            </div>
            <div className="eyebrow mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-[rgba(255,255,255,0.08)] pt-5 text-[#6E7680]">
              <span>AI Capability</span>
              <span aria-hidden="true">/</span>
              <span>Local Access</span>
              <span aria-hidden="true">/</span>
              <span>Scientific Sourcing</span>
            </div>
          </div>
        </section>

        <section
          id="thesis"
          className="border-y border-[rgba(255,255,255,0.08)] bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-12 lg:grid-cols-[0.88fr_1.12fr] lg:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#8FA7C0]">Thesis</p>
                <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                  Trust cost is the hidden tax on complex markets.
                </h2>
              </div>
              <div className="grid gap-3 sm:grid-cols-3">
                {[
                  "Fragmented information",
                  "Expensive trust",
                  "Execution quality",
                ].map((item) => (
                  <div
                    key={item}
                    className="scroll-rise rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-5 text-sm font-medium text-[#F3EEE5]"
                  >
                    {item}
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="companies"
          className="bg-[#0B0D10] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#8FA7C0]">
                  Portfolio Companies
                </p>
                <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                  Vertical companies, shared infrastructure.
                </h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-[#A6AFB8]">
                Each company owns its market. Xentra owns the operating thesis.
              </p>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {companies.map((company) => (
                <CompanyCard key={company.title} {...company} />
              ))}
            </div>
          </div>
        </section>

        <section className="border-y border-[rgba(255,255,255,0.08)] bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32">
          <div className="mx-auto max-w-7xl">
            <div className="mx-auto max-w-3xl text-center">
              <p className="eyebrow mb-5 text-[#8FA7C0]">Group Architecture</p>
              <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                Xentra at the center. Vertical companies underneath.
              </h2>
            </div>
            <div className="mt-16">
              <div className="architecture-card mx-auto max-w-xs rounded-lg border border-[rgba(255,255,255,0.1)] bg-[#161B21] p-6 text-center shadow-[0_30px_90px_rgba(11,13,16,0.22)]">
                <p className="text-2xl font-semibold text-[#F3EEE5]">Xentra</p>
                <p className="mt-3 text-sm text-[#A6AFB8]">Parent company</p>
              </div>
              <div
                className="architecture-line mx-auto h-12 w-px bg-[rgba(183,196,211,0.26)]"
                aria-hidden="true"
              />
              <div
                className="architecture-line mx-auto hidden h-px max-w-4xl bg-[rgba(183,196,211,0.2)] md:block"
                aria-hidden="true"
              />
              <div className="grid gap-4 md:grid-cols-3">
                {companies.map((company) => (
                  <div
                    key={`${company.slug}-architecture`}
                    className="architecture-node flex flex-col items-center"
                  >
                    <div
                      className="architecture-line h-8 w-px bg-[rgba(183,196,211,0.2)]"
                      aria-hidden="true"
                    />
                    <div className="w-full rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-6 text-center">
                      <p className="text-xl font-semibold text-[#F3EEE5]">
                        {company.title}
                      </p>
                      <p className="mt-3 text-sm text-[#A6AFB8]">
                        {company.vertical}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section
          id="model"
          className="bg-[#0B0D10] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5 text-[#8FA7C0]">Operating Model</p>
              <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                Four moves. Repeated across markets.
              </h2>
            </div>
            <OperatingFlow />
          </div>
        </section>

        <section
          id="contact"
          className="border-t border-[rgba(255,255,255,0.08)] bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-32"
        >
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[1fr_0.65fr] lg:items-end">
              <h2 className="font-serif text-balance text-6xl font-normal leading-[0.98] sm:text-8xl">
                High-trust markets need operating systems.
              </h2>
              <div className="max-w-md text-sm leading-7 text-[#A6AFB8]">
                <p>
                  Partnerships, operating opportunities, and new verticals:{" "}
                  <a
                    href="mailto:contact@xentra.ai"
                    className="text-[#F3EEE5] transition hover:text-[#B7C4D3]"
                  >
                    contact@xentra.ai
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#0B0D10] px-5 py-10 text-[#6E7680] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-[rgba(255,255,255,0.08)] pt-8 lg:flex-row">
          <p className="text-sm leading-6 text-[#A6AFB8]">
            Xentra &mdash; AI-enabled operating group for trust-heavy decisions.
          </p>
          <div className="flex flex-wrap gap-x-6 gap-y-3">
            {companies.map((company) => (
              <a
                key={`${company.slug}-footer`}
                href={`#${company.slug}`}
                className="text-sm transition hover:text-[#F3EEE5]"
              >
                {company.title}
              </a>
            ))}
            <a
              href="mailto:contact@xentra.ai"
              className="text-sm transition hover:text-[#F3EEE5]"
            >
              contact@xentra.ai
            </a>
          </div>
        </div>
      </footer>
    </>
  );
}
