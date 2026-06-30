import { CompanyCard } from "@/components/CompanyCard";
import { DecisionGraph } from "@/components/DecisionGraph";
import { Header } from "@/components/Header";
import { OperatingFlow } from "@/components/OperatingFlow";
import { companies, navItems } from "@/lib/content";

export default function Home() {
  return (
    <>
      <Header />
      <main id="top">
        <section className="relative isolate flex min-h-[94svh] overflow-hidden bg-[#050505] px-5 pb-10 pt-28 text-[#f4f0e8] sm:px-8 lg:pt-32">
          <DecisionGraph />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
            <div className="max-w-6xl">
              <p className="reveal mb-8 text-xs uppercase text-[#6f8faf]">
                AI-native operating company
              </p>
              <h1 className="reveal reveal-delay-1 text-balance text-6xl font-medium leading-[0.96] sm:text-8xl lg:text-[6.3rem] 2xl:text-[8rem]">
                Reducing trust cost{" "}
                <span className="block">in complex decisions.</span>
              </h1>
              <p className="reveal reveal-delay-2 mt-9 max-w-2xl text-base leading-7 text-[#b7b0a5] sm:text-lg">
                Xentra builds AI-native platforms for markets where information
                is fragmented, trust is expensive, and execution matters.
              </p>
              <div className="mt-12">
                <a
                  href="#companies"
                  className="inline-flex justify-center rounded-full border border-[rgba(244,240,232,0.18)] px-6 py-3 text-sm text-[#f4f0e8] transition hover:border-[#6f8faf] hover:text-white"
                >
                  View companies
                </a>
              </div>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-4 gap-y-2 border-t border-[rgba(244,240,232,0.12)] pt-6 text-xs uppercase text-[#8f8a82]">
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
          className="bg-[#ede7dc] px-5 py-24 text-[#111111] sm:px-8 lg:py-36"
        >
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="text-balance text-5xl font-medium leading-tight sm:text-6xl lg:text-7xl">
              The problem is not information. The problem is trust.
            </h2>
            <div>
              <div className="max-w-xl space-y-6 text-base leading-7 text-[#4d4942]">
                <p>
                  In complex markets, people are rarely short of options. They
                  are short of reliable judgment.
                </p>
                <p>
                  Xentra uses AI, structured data, expert networks, and
                  operational execution to reduce decision friction where trust
                  matters most.
                </p>
              </div>
              <blockquote className="mt-16 border-t border-[#111111]/18 pt-8 text-balance text-4xl font-medium leading-tight text-[#111111] sm:text-5xl">
                Trust cost is the hidden tax on modern decisions.
              </blockquote>
            </div>
          </div>
        </section>

        <section className="bg-[#111111] px-5 py-24 text-[#f4f0e8] sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="mb-5 text-xs uppercase text-[#6f8faf]">
                Operating Model
              </p>
              <h2 className="text-balance text-5xl font-medium leading-tight sm:text-6xl">
                How Xentra works
              </h2>
            </div>
            <OperatingFlow />
          </div>
        </section>

        <section
          id="companies"
          className="bg-[#050505] px-5 py-24 text-[#f4f0e8] sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <h2 className="text-balance text-5xl font-medium leading-tight sm:text-6xl">
                Three verticals. One thesis.
              </h2>
              <p className="max-w-sm text-base leading-7 text-[#8f8a82]">
                Different markets. Same decision problem.
              </p>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {companies.map((company) => (
                <CompanyCard key={company.title} {...company} />
              ))}
            </div>
          </div>
        </section>

        <section
          id="contact"
          className="bg-[#050505] px-5 py-24 text-[#f4f0e8] sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-7xl border-t border-[rgba(244,240,232,0.14)] pt-20">
            <div className="grid gap-14 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <h2 className="text-balance text-6xl font-medium leading-[0.96] sm:text-8xl">
                Different markets.{" "}
                <span className="block">Same thesis.</span>
              </h2>
              <div className="max-w-md text-sm leading-7 text-[#8f8a82]">
                <p>
                  Reduce trust cost. Improve decision quality. Make complex
                  decisions easier to execute.
                </p>
                <p className="mt-8">
                  For partnerships, operating opportunities, and new verticals:{" "}
                  <a
                    href="mailto:contact@xentra.ai"
                    className="text-[#f4f0e8] transition hover:text-[#9db6cf]"
                  >
                    contact@xentra.ai
                  </a>
                </p>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="bg-[#050505] px-5 py-10 text-[#8f8a82] sm:px-8">
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-[rgba(244,240,232,0.10)] pt-8 md:flex-row">
          <div>
            <p className="text-sm font-medium uppercase text-[#f4f0e8]">Xentra</p>
            <p className="mt-3 text-sm leading-6">
              AI-native platforms for trust-heavy decisions.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm transition hover:text-[#f4f0e8]"
              >
                {item.label}
              </a>
            ))}
          </nav>
        </div>
      </footer>
    </>
  );
}
