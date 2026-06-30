import { CompanyCard } from "@/components/CompanyCard";
import { DecisionGraph } from "@/components/DecisionGraph";
import { Header } from "@/components/Header";
import { OperatingFlow } from "@/components/OperatingFlow";
import { companies, navItems } from "@/lib/content";

export default function Home() {
  const splitPanelClasses = [
    "from-[#132033] via-[#18263a] to-[#0a0d12] text-[#eef5fb]",
    "from-[#1c241f] via-[#2d3325] to-[#0b0d0a] text-[#f2efe4]",
    "from-[#241722] via-[#2a2637] to-[#0a0c12] text-[#f4eef3]",
  ];

  const splitAccentClasses = [
    "text-[#9db6cf] border-[#9db6cf]/35",
    "text-[#c7c18f] border-[#c7c18f]/35",
    "text-[#c9a7b8] border-[#c9a7b8]/35",
  ];

  return (
    <>
      <Header />
      <main id="top">
        <section className="relative isolate flex min-h-[92svh] overflow-hidden bg-[#080908] px-5 pb-8 pt-24 text-[#f4f0e8] sm:px-8 lg:pt-28">
          <div className="hero-color-field" aria-hidden="true" />
          <DecisionGraph />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
            <div className="max-w-6xl">
              <p className="reveal mb-8 text-xs uppercase text-[#6f8faf]">
                AI-native operating group
              </p>
              <h1 className="reveal reveal-delay-1 text-balance text-6xl font-medium leading-[0.96] sm:text-8xl lg:text-[6.3rem] 2xl:text-[8rem]">
                Reducing trust cost{" "}
                <span className="block">in complex decisions.</span>
              </h1>
              <p className="reveal reveal-delay-2 mt-8 max-w-2xl text-base leading-7 text-[#b7b0a5] sm:text-lg">
                Xentra is an AI-native operating group building vertical
                companies for markets where information is fragmented, trust is
                expensive, and execution matters.
              </p>
              <div className="mt-10 space-y-4">
                <a
                  href="#companies"
                  className="inline-flex justify-center rounded-full border border-[rgba(244,240,232,0.18)] px-6 py-3 text-sm text-[#f4f0e8] transition hover:border-[#6f8faf] hover:text-white"
                >
                  Explore companies
                </a>
                <p className="max-w-xl text-sm leading-6 text-[#8f8a82]">
                  Parent company of AI Agent Coach, Localhost, and BioAxis.
                </p>
              </div>
            </div>
            <div className="mt-10 flex flex-wrap gap-x-4 gap-y-2 border-t border-[rgba(244,240,232,0.12)] pt-5 text-xs uppercase text-[#8f8a82]">
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
              One group thesis. Multiple vertical companies.
            </h2>
            <div>
              <div className="max-w-xl space-y-6 text-base leading-7 text-[#4d4942]">
                <p>
                  Xentra builds companies around the same decision pattern:
                  fragmented information, high uncertainty, expensive trust,
                  and real-world execution risk.
                </p>
                <p>
                  Xentra uses AI, structured data, expert networks, and
                  operational systems to make complex decisions easier to
                  evaluate and act on.
                </p>
              </div>
              <blockquote className="mt-16 border-t border-[#111111]/18 pt-8 text-balance text-4xl font-medium leading-tight text-[#111111] sm:text-5xl">
                Trust cost is the hidden tax on modern decisions.
              </blockquote>
            </div>
          </div>
        </section>

        <section
          id="companies"
          className="bg-[#f4f0e8] px-5 py-24 text-[#111111] sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="mb-5 text-xs uppercase text-[#5f7f9c]">
                  Operating Companies
                </p>
                <h2 className="text-balance text-5xl font-medium leading-tight sm:text-6xl">
                  Operating companies
                </h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-[#5e5a52]">
                Independent brands. Shared decision infrastructure.
              </p>
            </div>
            <div className="mt-16 grid gap-5 lg:grid-cols-3">
              {companies.map((company) => (
                <CompanyCard key={company.title} {...company} />
              ))}
            </div>
            <div className="mt-20 grid gap-8 lg:grid-cols-[0.72fr_1.28fr] lg:items-start">
              <div className="lg:sticky lg:top-28">
                <p className="mb-5 text-xs uppercase text-[#5f7f9c]">
                  Company Separation
                </p>
                <h3 className="text-balance text-4xl font-medium leading-tight sm:text-5xl">
                  First aligned by thesis. Then separated by market.
                </h3>
                <p className="mt-6 max-w-md text-sm leading-7 text-[#5e5a52]">
                  The parent company keeps the operating logic shared. Each
                  vertical company develops its own customer surface, network,
                  and execution system.
                </p>
              </div>
              <div className="space-y-5">
                {companies.map((company, index) => (
                  <article
                    key={`${company.title}-split`}
                    className={`min-h-[320px] rounded-lg border border-white/14 bg-gradient-to-br p-7 shadow-[0_28px_80px_rgba(17,17,17,0.12)] sm:p-9 ${splitPanelClasses[index]}`}
                  >
                    <div className="flex flex-col justify-between gap-8 sm:flex-row">
                      <div>
                        <p
                          className={`w-fit border-b pb-2 text-xs uppercase ${splitAccentClasses[index]}`}
                        >
                          {company.category}
                        </p>
                        <h4 className="mt-10 text-4xl font-medium leading-tight sm:text-5xl">
                          {company.title}
                        </h4>
                      </div>
                      <p className="text-sm text-white/50">{company.repo}</p>
                    </div>
                    <p className="mt-14 max-w-2xl text-xl leading-8 text-white/75">
                      {company.splitLine}
                    </p>
                    <div className="mt-10 border-t border-white/14 pt-5 text-sm text-white/55">
                      {company.signal}
                    </div>
                  </article>
                ))}
              </div>
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
                The Xentra operating model
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[#8f8a82]">
                We start with trust-heavy decisions, then build the data,
                product, network, and execution layer around them.
              </p>
            </div>
            <OperatingFlow />
          </div>
        </section>

        <section className="bg-[#ede7dc] px-5 py-24 text-[#111111] sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="mb-5 text-xs uppercase text-[#5f7f9c]">
                  Group Architecture
                </p>
                <h2 className="text-balance text-5xl font-medium leading-tight sm:text-6xl">
                  Built as a group, not a single product.
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-base leading-7 text-[#4d4942]">
                  Xentra does not force different markets into one generic
                  platform. Each company owns its vertical, customer, and
                  product experience. The group provides the shared thesis,
                  AI-native operating logic, and decision infrastructure.
                </p>
                <div className="mt-12 rounded-lg border border-[#111111]/14 bg-[#f4f0e8] p-5 sm:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                    <div className="flex min-h-28 items-center justify-center rounded-lg border border-[#111111]/12 bg-[#ede7dc] px-8 py-7 text-2xl font-medium text-[#111111]">
                      Xentra
                    </div>
                    <div className="hidden items-center px-2 text-[#5f7f9c] md:flex">
                      &rarr;
                    </div>
                    <div className="grid flex-1 gap-3 md:grid-cols-3">
                      {companies.map((company) => (
                        <div
                          key={company.title}
                          className="rounded-lg border border-[#111111]/12 bg-[#ede7dc] p-5"
                        >
                          <p className="text-base text-[#111111]">
                            {company.title}
                          </p>
                          <p className="mt-3 text-sm text-[#5e5a52]">
                            {company.category}
                          </p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
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
                <span className="block">Same decision problem.</span>
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
              AI-native operating group for trust-heavy decisions.
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
