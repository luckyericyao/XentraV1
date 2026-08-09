export type Locale = "en" | "zh";

export type Company = {
  slug: string;
  title: string;
  vertical: string;
  layer?: string;
  headline: string;
  body?: string[];
  problem?: string;
  useCases?: string[];
  href: string;
  evidence: {
    image: string;
    imageAlt: string;
    audience: string;
    decision: string;
    delivery: string;
  };
};

export type SiteContent = {
  lang: string;
  navItems: { label: string; href: string }[];
  languageSwitch: { label: string; href: string };
  hero: {
    eyebrow: string;
    title: string;
    subtitle?: string;
    body: string[];
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
    tags: string[];
    note?: string;
  };
  thesis: {
    eyebrow: string;
    title: string;
    body?: string[];
    points: { title: string; body?: string }[];
    closing?: string[];
  };
  build?: {
    eyebrow: string;
    title: string;
    body: string[];
  };
  companies: {
    eyebrow: string;
    title: string;
    body: string[];
    principles?: string[];
    chapterLabel: string;
    visitLabel: string;
    externalLinkLabel: string;
    detailsLabel: string;
    useCasesLabel: string;
    items: Company[];
  };
  portfolio: {
    eyebrow: string;
    title: string;
    body: string;
    systemLabel: string;
    systemItems: string[];
    evidenceLabel: string;
    audienceLabel: string;
    decisionLabel: string;
    deliveryLabel: string;
  };
  model: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  contact: {
    title: string;
    bodyPrefix: string;
    body?: string[];
    ctaLabel?: string;
    email: string;
    mailto: string;
    copyLabel: string;
    copiedLabel: string;
    copyErrorLabel: string;
  };
  directions?: {
    eyebrow: string;
    title: string;
    body: string[];
    signals: string[];
  };
  footer: {
    line: string;
    backToTopLabel: string;
  };
};

const companyLinks = {
  agentCoach: "https://agentcoach-three.vercel.app/",
  localhost: "https://localhostchinav1.vercel.app/",
  bioaxis: "https://bioaxisv3.vercel.app/",
};

const contactEmail = "contact@xentra.ai";
const contactMailto = {
  en: `mailto:${contactEmail}?subject=${encodeURIComponent("Xentra partnership inquiry")}`,
  zh: `mailto:${contactEmail}?subject=${encodeURIComponent("Xentra 业务合作咨询")}`,
};

export const siteContent: Record<Locale, SiteContent> = {
  en: {
    lang: "en",
    navItems: [
      { label: "Thesis", href: "#thesis" },
      { label: "Companies", href: "#companies" },
      { label: "Model", href: "#model" },
      { label: "Contact", href: "#contact" },
    ],
    languageSwitch: { label: "中文", href: "/zh" },
    hero: {
      eyebrow: "Operating group",
      title: "Decision infrastructure for trust-heavy markets.",
      body: [
        "Xentra builds vertical companies where information is fragmented, trust is expensive, and execution quality determines outcomes.",
      ],
      primaryCta: "View companies",
      primaryHref: "#companies",
      secondaryCta: "Contact",
      secondaryHref: "#contact",
      tags: ["AI Capability", "Local Access", "Scientific Sourcing"],
    },
    thesis: {
      eyebrow: "Thesis",
      title: "Trust cost is the hidden tax on complex markets.",
      points: [
        { title: "Fragmented information" },
        { title: "Expensive trust" },
        { title: "Execution quality" },
      ],
    },
    companies: {
      eyebrow: "Portfolio Companies",
      title: "Vertical companies, shared infrastructure.",
      body: [
        "Each company owns its market. Xentra owns the operating thesis.",
      ],
      chapterLabel: "Explore company",
      visitLabel: "Visit site",
      externalLinkLabel: "opens in a new tab",
      detailsLabel: "Read operating brief",
      useCasesLabel: "Use cases",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "AI Capability",
          layer: "AI capability layer",
          headline: "For teams adopting AI into real workflows.",
          href: companyLinks.agentCoach,
          evidence: {
            image: "/images/portfolio/ai-agent-coach.jpg",
            imageAlt:
              "AI Agent Coach homepage showing professional AI coaches organized by industry.",
            audience: "Professionals and teams working in complex industries.",
            decision:
              "Which coach and workflow fit the field and decision at hand.",
            delivery:
              "Industry-specific AI coaches, structured guidance, and professional review.",
          },
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "Local Access",
          layer: "Local access layer",
          headline: "Private cultural travel through trusted local hosts.",
          href: companyLinks.localhost,
          evidence: {
            image: "/images/portfolio/localhost.jpg",
            imageAlt:
              "Localhost Global homepage showing a private China route shaped by local hosts.",
            audience: "International travelers seeking a private way into China.",
            decision:
              "Which places, hosts, and local context are worth trusting.",
            delivery:
              "Private route design, host matching, cultural context, and practical support.",
          },
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "Scientific Sourcing",
          layer: "Scientific sourcing layer",
          headline: "One-stop sourcing intelligence for life science consumables.",
          href: companyLinks.bioaxis,
          evidence: {
            image: "/images/portfolio/bioaxis.jpg",
            imageAlt:
              "BioAxis homepage showing a structured sourcing request for life science consumables.",
            audience: "Life science buyers and laboratories sourcing consumables.",
            decision:
              "Which product, equivalent, document path, and supplier route fit the request.",
            delivery:
              "Equivalent review, sample paths, supplier documents, and RFQ-ready briefs.",
          },
        },
      ],
    },
    portfolio: {
      eyebrow: "Operating Companies",
      title: "Three markets. One operating system.",
      body: "The companies begin together, then separate into the market, decision, and delivery surface each one owns.",
      systemLabel: "Shared by Xentra",
      systemItems: [
        "Structure the market",
        "Apply AI judgment",
        "Verify where trust matters",
        "Deliver through operations",
      ],
      evidenceLabel: "Live company surface",
      audienceLabel: "Serves",
      decisionLabel: "Clarifies",
      deliveryLabel: "Delivers",
    },
    model: {
      eyebrow: "Operating Model",
      title: "Four moves. Repeated across markets.",
      steps: [
        {
          title: "Structure",
          body: "Turn fragmented information into usable systems.",
        },
        {
          title: "Reason",
          body: "Compare, filter, match, and prioritize with AI.",
        },
        {
          title: "Verify",
          body: "Add trusted human context where judgment matters.",
        },
        {
          title: "Execute",
          body: "Close the loop through real-world execution.",
        },
      ],
    },
    contact: {
      title: "Build with Xentra.",
      body: [
        "We partner with operators, domain experts, and capital partners to build vertical companies in trust-heavy markets.",
      ],
      bodyPrefix: "Contact:",
      ctaLabel: "contact@xentra.ai",
      email: contactEmail,
      mailto: contactMailto.en,
      copyLabel: "Copy email",
      copiedLabel: "Copied",
      copyErrorLabel: "Copy failed",
    },
    footer: {
      line: "Xentra — AI-enabled operating group for trust-heavy decisions.",
      backToTopLabel: "Back to top",
    },
  },
  zh: {
    lang: "zh-CN",
    navItems: [
      { label: "理念", href: "#thesis" },
      { label: "业务", href: "#companies" },
      { label: "方法", href: "#model" },
      { label: "联系", href: "#contact" },
    ],
    languageSwitch: { label: "EN", href: "/" },
    hero: {
      eyebrow: "AI 原生运营集团",
      title: "把复杂市场，做成可信系统。",
      subtitle: "Xentra 是一家 AI 原生运营集团。",
      body: [
        "我们进入信息很多、判断困难、结果依赖执行的市场，建立垂直运营公司，用 AI 提高判断效率，用真实运营完成交付。",
      ],
      primaryCta: "查看业务",
      primaryHref: "#companies",
      secondaryCta: "了解方法",
      secondaryHref: "#model",
      tags: [],
      note: "信息很多。判断很贵。信任很稀缺。",
    },
    thesis: {
      eyebrow: "集团理念",
      title: "信息从来不缺，缺的是可信判断。",
      body: [
        "很多行业真正缺少的，不是选择，而是可信的判断。",
      ],
      points: [
        {
          title: "信息多，质量不一。",
        },
        {
          title: "选择多，信任不足。",
        },
        {
          title: "结果取决于执行。",
        },
      ],
      closing: [
        "Xentra 把信息处理、AI 判断、人工验证和现实交付组织在一起。",
      ],
    },
    companies: {
      eyebrow: "业务布局",
      title: "不同市场，同一种底层问题。",
      body: [
        "企业 AI、私人旅行和生命科学供应，看似不同，却都要求用户在碎片信息中做高价值决定。",
      ],
      chapterLabel: "展开业务",
      visitLabel: "访问网站",
      externalLinkLabel: "在新窗口打开",
      detailsLabel: "查看业务说明",
      useCasesLabel: "适用场景",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "企业 AI 落地",
          headline: "让 AI 真正进入工作流。",
          body: [
            "AgentCoach 以行业为入口，把专业经验、AI 指导和具体决策场景组织成可使用的职业教练。",
          ],
          href: companyLinks.agentCoach,
          evidence: {
            image: "/images/portfolio/ai-agent-coach.jpg",
            imageAlt: "AI Agent Coach 官网，展示按行业组织的专业 AI 教练。",
            audience: "面对复杂行业决策的专业人士与团队。",
            decision: "当前问题适合哪类教练、哪种工作方式。",
            delivery: "行业化 AI 教练、结构化指导与专业复核。",
          },
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "可信本地旅行",
          headline: "重新定义高端私人旅行的本地进入方式。",
          body: [
            "Localhost 为希望深入理解中国的国际旅行者，提供私人路线、本地主理人匹配与现实行程支持。",
          ],
          href: companyLinks.localhost,
          evidence: {
            image: "/images/portfolio/localhost.jpg",
            imageAlt: "Localhost Global 官网，展示由本地主理人设计的私人中国路线。",
            audience: "希望以私人方式进入中国的国际旅行者。",
            decision: "哪些地方、主理人和文化语境值得信任。",
            delivery: "私人路线、主理人匹配、文化解释与现实支持。",
          },
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "生命科学供应",
          headline: "让生命科学采购更清晰。",
          body: [
            "BioAxis 把产品清单、替代匹配、样品、文件和询价需求整理成清晰的采购路径。",
          ],
          href: companyLinks.bioaxis,
          evidence: {
            image: "/images/portfolio/bioaxis.jpg",
            imageAlt: "BioAxis 官网，展示生命科学耗材的结构化采购请求。",
            audience: "采购生命科学耗材的实验室与专业买方。",
            decision: "哪种产品、替代品、文件和供应路径符合需求。",
            delivery: "替代评估、样品路径、供应文件与询价简报。",
          },
        },
      ],
    },
    portfolio: {
      eyebrow: "业务展开",
      title: "同一套方法，进入三个具体市场。",
      body: "先看集团如何识别问题，再看每家公司如何面对用户、完成判断和交付。",
      systemLabel: "Xentra 共同能力",
      systemItems: [
        "整理市场信息",
        "用 AI 提高判断效率",
        "在关键节点验证",
        "由业务完成交付",
      ],
      evidenceLabel: "业务网站实景",
      audienceLabel: "服务对象",
      decisionLabel: "关键判断",
      deliveryLabel: "实际交付",
    },
    model: {
      eyebrow: "运营方法",
      title: "一套方法，反复进入具体市场。",
      steps: [
        {
          title: "整理",
          body: "把分散、难比较的信息整理成可行动的结构。",
        },
        {
          title: "判断",
          body: "让 AI 承担搜索、匹配、比较和排序。",
        },
        {
          title: "验证",
          body: "在关键节点保留经验、语境和真实性核验。",
        },
        {
          title: "交付",
          body: "由垂直业务把建议变成真实结果。",
        },
      ],
    },
    contact: {
      title: "与 Xentra 讨论新的垂直业务机会。",
      body: [
        "我们与运营者、行业专家和资本伙伴共同讨论新的垂直业务。",
      ],
      bodyPrefix: "邮箱：",
      ctaLabel: "contact@xentra.ai",
      email: contactEmail,
      mailto: contactMailto.zh,
      copyLabel: "复制邮箱",
      copiedLabel: "已复制",
      copyErrorLabel: "复制失败",
    },
    footer: {
      line: "Xentra — 把复杂市场，做成可信系统。",
      backToTopLabel: "返回顶部",
    },
  },
};
