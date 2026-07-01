import { CompanyCard } from "@/components/CompanyCard";
import { DecisionGraph } from "@/components/DecisionGraph";
import { Header } from "@/components/Header";
import { OperatingFlow } from "@/components/OperatingFlow";
import { companies, navItems } from "@/lib/content";

export default function Home() {
  const splitPanelClasses = [
    "from-[#121923] via-[#17202B] to-[#0B0D10]",
    "from-[#171B1A] via-[#20231F] to-[#0B0D10]",
    "from-[#171720] via-[#1D202A] to-[#0B0D10]",
  ];

  const splitAccentClasses = [
    "text-[#B7C4D3] border-[#B7C4D3]/35",
    "text-[#AEB6AA] border-[#AEB6AA]/35",
    "text-[#B8B1C4] border-[#B8B1C4]/35",
  ];

  return (
    <>
      <Header />
      <main id="top">
        <section className="relative isolate flex min-h-[92svh] overflow-hidden bg-[#0B0D10] px-5 pb-10 pt-24 text-[#F3EEE5] sm:px-8 lg:pt-28">
          <div className="hero-color-field" aria-hidden="true" />
          <DecisionGraph />
          <div className="relative z-10 mx-auto flex w-full max-w-7xl flex-col justify-center">
            <div className="max-w-6xl">
              <p className="eyebrow reveal mb-8 text-[#8FA7C0]">
                AI-native operating group
              </p>
              <h1 className="hero-title reveal reveal-delay-1 max-w-6xl text-balance">
                Reducing trust cost{" "}
                <span className="block">in complex decisions.</span>
              </h1>
              <p className="reveal reveal-delay-2 mt-9 max-w-2xl text-base leading-7 text-[#A6AFB8] sm:text-lg sm:leading-8">
                Xentra is an AI-native operating group building vertical
                companies for markets where information is fragmented, trust is
                expensive, and execution matters.
              </p>
              <div className="mt-11 flex flex-col gap-3 sm:flex-row">
                <a
                  href="#companies"
                  className="inline-flex justify-center rounded-full bg-[#F3EEE5] px-6 py-3 text-sm font-medium text-[#0B0D10] transition hover:bg-[#E6DED1]"
                >
                  Explore companies
                </a>
                <a
                  href="#thesis"
                  className="inline-flex justify-center rounded-full border border-[rgba(255,255,255,0.12)] px-6 py-3 text-sm font-medium text-[#F3EEE5] transition hover:border-[#B7C4D3] hover:text-[#B7C4D3]"
                >
                  View thesis
                </a>
              </div>
              <p className="mt-5 max-w-xl text-sm leading-6 text-[#6E7680]">
                Parent company of AI Agent Coach, Localhost, and BioAxis.
              </p>
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
          className="border-t border-[rgba(255,255,255,0.08)] bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-36"
        >
          <div className="mx-auto grid max-w-7xl gap-16 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
            <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl lg:text-7xl">
              One group thesis. Multiple vertical companies.
            </h2>
            <div>
              <div className="max-w-xl space-y-7 text-base leading-7 text-[#A6AFB8] sm:text-lg sm:leading-8">
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
              <blockquote className="mt-16 border-t border-[rgba(255,255,255,0.08)] pt-8 text-balance text-4xl font-medium leading-tight text-[#F3EEE5] sm:text-5xl">
                Trust cost is the hidden tax on modern decisions.
              </blockquote>
            </div>
          </div>
        </section>

        <section
          id="companies"
          className="bg-[#0B0D10] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-7xl">
            <div className="flex flex-col justify-between gap-6 md:flex-row md:items-end">
              <div>
                <p className="eyebrow mb-5 text-[#8FA7C0]">
                  Operating Companies
                </p>
                <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                  Operating companies
                </h2>
              </div>
              <p className="max-w-sm text-base leading-7 text-[#A6AFB8]">
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
                <p className="eyebrow mb-5 text-[#8FA7C0]">
                  Company Separation
                </p>
                <h3 className="text-balance text-4xl font-semibold leading-tight sm:text-5xl">
                  First aligned by thesis. Then separated by market.
                </h3>
                <p className="mt-6 max-w-md text-sm leading-7 text-[#A6AFB8]">
                  The parent company keeps the operating logic shared. Each
                  vertical company develops its own customer surface, network,
                  and execution system.
                </p>
              </div>
              <div className="space-y-5">
                {companies.map((company, index) => (
                  <article
                    key={`${company.title}-split`}
                    className={`min-h-[320px] rounded-lg border border-[rgba(255,255,255,0.08)] bg-gradient-to-br p-7 shadow-[0_30px_90px_rgba(11,13,16,0.24)] transition duration-300 hover:-translate-y-1 hover:border-[rgba(183,196,211,0.28)] sm:p-9 ${splitPanelClasses[index]}`}
                  >
                    <div className="flex flex-col justify-between gap-8 sm:flex-row">
                      <div>
                        <p
                          className={`eyebrow w-fit border-b pb-2 ${splitAccentClasses[index]}`}
                        >
                          {company.category}
                        </p>
                        <h4 className="mt-10 text-4xl font-semibold leading-tight text-[#F3EEE5] sm:text-5xl">
                          {company.title}
                        </h4>
                      </div>
                      <p className="text-sm text-[#6E7680]">{company.repo}</p>
                    </div>
                    <p className="mt-14 max-w-2xl text-xl leading-9 text-[#C8D0D8]">
                      {company.splitLine}
                    </p>
                    <div className="mt-10 border-t border-[rgba(255,255,255,0.08)] pt-5 text-sm leading-6 text-[#A6AFB8]">
                      {company.signal}
                    </div>
                  </article>
                ))}
              </div>
            </div>
          </div>
        </section>

        <section className="border-y border-[rgba(255,255,255,0.08)] bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="max-w-3xl">
              <p className="eyebrow mb-5 text-[#8FA7C0]">
                Operating Model
              </p>
              <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                The Xentra operating model
              </h2>
              <p className="mt-7 max-w-2xl text-base leading-7 text-[#A6AFB8]">
                We start with trust-heavy decisions, then build the data,
                product, network, and execution layer around them.
              </p>
            </div>
            <OperatingFlow />
          </div>
        </section>

        <section className="bg-[#0B0D10] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-36">
          <div className="mx-auto max-w-7xl">
            <div className="grid gap-14 lg:grid-cols-[0.9fr_1.1fr] lg:items-start">
              <div>
                <p className="eyebrow mb-5 text-[#8FA7C0]">
                  Group Architecture
                </p>
                <h2 className="text-balance text-5xl font-semibold leading-tight sm:text-6xl">
                  Built as a group, not a single product.
                </h2>
              </div>
              <div>
                <p className="max-w-2xl text-base leading-7 text-[#A6AFB8]">
                  Xentra does not force different markets into one generic
                  platform. Each company owns its vertical, customer, and
                  product experience. The group provides the shared thesis,
                  AI-native operating logic, and decision infrastructure.
                </p>
                <div className="mt-12 rounded-lg border border-[rgba(255,255,255,0.08)] bg-white/[0.03] p-5 sm:p-6">
                  <div className="flex flex-col gap-4 md:flex-row md:items-stretch">
                    <div className="flex min-h-28 items-center justify-center rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#161B21] px-8 py-7 text-2xl font-semibold text-[#F3EEE5]">
                      Xentra
                    </div>
                    <div className="hidden items-center px-2 text-[#8FA7C0] md:flex">
                      &rarr;
                    </div>
                    <div className="grid flex-1 gap-3 md:grid-cols-3">
                      {companies.map((company) => (
                        <div
                          key={company.title}
                          className="rounded-lg border border-[rgba(255,255,255,0.08)] bg-[#161B21] p-5"
                        >
                          <p className="text-base font-medium text-[#F3EEE5]">
                            {company.title}
                          </p>
                          <p className="mt-3 text-sm leading-6 text-[#A6AFB8]">
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
          className="bg-[#11151A] px-5 py-24 text-[#F3EEE5] sm:px-8 lg:py-36"
        >
          <div className="mx-auto max-w-7xl border-t border-[rgba(255,255,255,0.08)] pt-20">
            <div className="grid gap-14 lg:grid-cols-[1fr_0.72fr] lg:items-end">
              <h2 className="font-serif text-balance text-6xl font-normal leading-[0.98] sm:text-8xl">
                Different markets.{" "}
                <span className="block">Same decision problem.</span>
              </h2>
              <div className="max-w-md text-sm leading-7 text-[#A6AFB8]">
                <p>
                  Reduce trust cost. Improve decision quality. Make complex
                  decisions easier to execute.
                </p>
                <p className="mt-8">
                  For partnerships, operating opportunities, and new verticals:{" "}
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
        <div className="mx-auto flex max-w-7xl flex-col justify-between gap-6 border-t border-[rgba(255,255,255,0.08)] pt-8 md:flex-row">
          <div>
            <p className="eyebrow text-[#F3EEE5]">Xentra</p>
            <p className="mt-3 text-sm leading-6">
              AI-native operating group for trust-heavy decisions.
            </p>
          </div>
          <nav aria-label="Footer navigation" className="flex flex-wrap gap-6">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="text-sm transition hover:text-[#F3EEE5]"
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
