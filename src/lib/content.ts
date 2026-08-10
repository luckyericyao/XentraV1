import { siteReviewDate } from "@/lib/site-meta";

export type Locale = "en" | "zh";

export type EvidenceProof = {
  label: string;
  href: string;
};

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
    proof: EvidenceProof[];
  };
};

export type SiteContent = {
  lang: string;
  navItems: { label: string; href: string }[];
  languageSwitch: { label: string; href: string; lang: string };
  hero: {
    eyebrow: string;
    title: string;
    titleLines?: string[];
    subtitle?: string;
    body: string[];
    primaryCta: string;
    primaryHref: string;
    secondaryCta: string;
    secondaryHref: string;
    tags: string[];
    ledger: { value: string; label: string }[];
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
    systemBody: string;
    systemItems: { title: string; body: string }[];
    companyRoleLabel: string;
    companyRole: string;
    evidenceLabel: string;
    evidenceVerifiedLabel: string;
    proofLabel: string;
    audienceLabel: string;
    decisionLabel: string;
    deliveryLabel: string;
    chapterNavLabel: string;
    backLabel: string;
    previousLabel: string;
    nextLabel: string;
    modelLabel: string;
  };
  model: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  contact: {
    eyebrow: string;
    title: string;
    bodyPrefix: string;
    body?: string[];
    pathwaysLabel: string;
    intakeNote: string;
    pathways: {
      audience: string;
      title: string;
      body: string;
      mailto: string;
    }[];
    companiesLabel: string;
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
    privacyLabel: string;
    privacyHref: string;
  };
};

const companyLinks = {
  agentCoach: "https://agentcoach-three.vercel.app/",
  localhost: "https://localhostchinav1.vercel.app/",
  bioaxis: "https://bioaxisv3.vercel.app/",
};

const evidenceLinks = {
  agentCoach: {
    industries: `${companyLinks.agentCoach}#industries`,
    access: `${companyLinks.agentCoach}#waitlist`,
    coaches: `${companyLinks.agentCoach}#coaches`,
  },
  localhost: {
    routes: `${companyLinks.localhost}journeys`,
    inquiry: `${companyLinks.localhost}inquiry?type=traveler`,
    trust: `${companyLinks.localhost}trust`,
  },
  bioaxis: {
    readySupply: `${companyLinks.bioaxis}ready-supply`,
    equivalents: `${companyLinks.bioaxis}equivalent-finder`,
    quote: `${companyLinks.bioaxis}request-quote`,
  },
} as const;

const contactEmail = "contact@xentra.ai";
const createContactMailto = (subject: string, body?: string) =>
  `mailto:${contactEmail}?subject=${encodeURIComponent(subject)}${
    body ? `&body=${encodeURIComponent(body)}` : ""
  }`;

const contactPrompts = {
  en: {
    general: [
      "Market or domain:",
      "What you currently operate or know:",
      "What you would like to discuss:",
    ].join("\n\n"),
    operators: [
      "Market or domain:",
      "What you currently operate:",
      "What you would like to build with Xentra:",
    ].join("\n\n"),
    experts: [
      "Market or domain:",
      "Where judgment or execution breaks down:",
      "What expertise or context you bring:",
    ].join("\n\n"),
    capital: [
      "Markets or themes you back:",
      "Your investment horizon:",
      "What you would like to explore with Xentra:",
    ].join("\n\n"),
  },
  zh: {
    general: ["市场或行业：", "你正在运营或掌握的资源：", "希望讨论的方向："].join(
      "\n\n",
    ),
    operators: ["市场或行业：", "你正在运营的业务：", "希望与 Xentra 共同建立什么："].join(
      "\n\n",
    ),
    experts: [
      "市场或行业：",
      "哪里最需要专业判断或现实验证：",
      "你能带来的经验或语境：",
    ].join("\n\n"),
    capital: [
      "你关注的市场或方向：",
      "你的投资周期：",
      "希望与 Xentra 探讨什么：",
    ].join("\n\n"),
  },
};

const contactMailto = {
  en: createContactMailto("Xentra partnership inquiry", contactPrompts.en.general),
  zh: createContactMailto("Xentra 业务合作咨询", contactPrompts.zh.general),
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
    languageSwitch: { label: "中文", href: "/zh", lang: "zh-CN" },
    hero: {
      eyebrow: "Parent operating group",
      title: "Decision infrastructure for trust-heavy markets.",
      body: [
        "Xentra builds vertical companies where information is fragmented, trust is expensive, and execution quality determines outcomes.",
      ],
      primaryCta: "View companies",
      primaryHref: "#companies",
      secondaryCta: "Contact",
      secondaryHref: "#contact",
      tags: ["AI Capability", "Local Access", "Scientific Sourcing"],
      ledger: [
        { value: "01", label: "parent operating thesis" },
        { value: "03", label: "operating companies" },
        { value: "04", label: "shared operating moves" },
      ],
      note: "Information is abundant. Judgment is expensive. Trust is scarce.",
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
    build: {
      eyebrow: "What We Build",
      title: "Operating companies, not standalone tools.",
      body: [
        "Xentra enters a specific market, finds the recurring decisions that slow it down, and builds the company around the work required to deliver a better outcome.",
        "The parent group provides shared systems. Each operator stays accountable to the customer, the context, and the final handoff.",
      ],
    },
    companies: {
      eyebrow: "Operating Companies",
      title: "Three markets. One operating thesis.",
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
            proof: [
              {
                label: "Industry coach directory",
                href: evidenceLinks.agentCoach.industries,
              },
              { label: "Access request", href: evidenceLinks.agentCoach.access },
              {
                label: "Coach application",
                href: evidenceLinks.agentCoach.coaches,
              },
            ],
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
            proof: [
              { label: "Route previews", href: evidenceLinks.localhost.routes },
              {
                label: "Private route intake",
                href: evidenceLinks.localhost.inquiry,
              },
              {
                label: "Published trust model",
                href: evidenceLinks.localhost.trust,
              },
            ],
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
            proof: [
              {
                label: "Ready-supply paths",
                href: evidenceLinks.bioaxis.readySupply,
              },
              {
                label: "Equivalent finder",
                href: evidenceLinks.bioaxis.equivalents,
              },
              { label: "RFQ workflow", href: evidenceLinks.bioaxis.quote },
            ],
          },
        },
      ],
    },
    portfolio: {
      eyebrow: "Group Architecture",
      title: "Shared capabilities. Accountable operators.",
      body: "Xentra centralizes the work that compounds across markets. Each company stays close to its customer and owns delivery.",
      systemLabel: "Parent operating group",
      systemBody: "The repeatable system behind each company.",
      systemItems: [
        {
          title: "Market selection",
          body: "Find recurring decisions where information is fragmented and execution matters.",
        },
        {
          title: "Decision products",
          body: "Turn repeated judgment into structured, AI-assisted workflows.",
        },
        {
          title: "Verification design",
          body: "Define where evidence, experts, and human review must enter.",
        },
        {
          title: "Company systems",
          body: "Build the product, brand, and operating rhythm around the market.",
        },
      ],
      companyRoleLabel: "Operating company",
      companyRole: "Owns market, customer, and delivery",
      evidenceLabel: "Public product evidence",
      evidenceVerifiedLabel: `Checked ${siteReviewDate.english}`,
      proofLabel: "Available on the public site",
      audienceLabel: "Serves",
      decisionLabel: "Clarifies",
      deliveryLabel: "Delivers",
      chapterNavLabel: "Portfolio chapter navigation",
      backLabel: "Back to architecture",
      previousLabel: "Previous company",
      nextLabel: "Next company",
      modelLabel: "Operating model",
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
    directions: {
      eyebrow: "New Directions",
      title: "The next company starts with a hard-to-serve market.",
      body: [
        "We look for markets where information is abundant but difficult to compare, trust depends on context, and the final result still requires real-world execution.",
      ],
      signals: [
        "The right choice is difficult to see.",
        "A wrong decision is expensive.",
        "Trust depends on context, not reach.",
        "Customers pay for certainty.",
        "Delivery cannot be abstracted away.",
      ],
    },
    contact: {
      eyebrow: "Partnerships",
      title: "Build with Xentra.",
      body: [
        "We work with operators, specialists, and capital partners who can stay with a market for the long term.",
      ],
      pathwaysLabel: "Choose a conversation",
      intakeNote:
        "Each path opens a prefilled email brief. Nothing is submitted on this site.",
      pathways: [
        {
          audience: "Operators",
          title: "Build an operating company.",
          body: "For people with market access, domain context, and the ability to own delivery.",
          mailto: createContactMailto(
            "Xentra operating company discussion",
            contactPrompts.en.operators,
          ),
        },
        {
          audience: "Experts",
          title: "Bring domain judgment.",
          body: "For specialists who know where trust, context, and execution break down.",
          mailto: createContactMailto(
            "Xentra domain partnership",
            contactPrompts.en.experts,
          ),
        },
        {
          audience: "Capital",
          title: "Back durable verticals.",
          body: "For capital partners exploring long-term company formation in complex markets.",
          mailto: createContactMailto(
            "Xentra capital partnership",
            contactPrompts.en.capital,
          ),
        },
      ],
      companiesLabel: "Company inquiries",
      bodyPrefix: "Contact:",
      ctaLabel: "contact@xentra.ai",
      email: contactEmail,
      mailto: contactMailto.en,
      copyLabel: "Copy email",
      copiedLabel: "Copied",
      copyErrorLabel: "Copy failed",
    },
    footer: {
      line: "Xentra — AI-native operating group for trust-heavy markets.",
      backToTopLabel: "Back to top",
      privacyLabel: "Privacy",
      privacyHref: "/privacy",
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
    languageSwitch: { label: "EN", href: "/", lang: "en" },
    hero: {
      eyebrow: "AI 原生运营集团",
      title: "把复杂市场，做成可信系统。",
      titleLines: ["把复杂市场，", "做成可信系统。"],
      subtitle: "Xentra 是一家 AI 原生运营集团。",
      body: [
        "我们进入信息很多、判断困难、结果依赖执行的市场，建立垂直运营公司，用 AI 提高判断效率，用真实运营完成交付。",
      ],
      primaryCta: "查看业务",
      primaryHref: "#companies",
      secondaryCta: "了解方法",
      secondaryHref: "#model",
      tags: [],
      ledger: [
        { value: "01", label: "母公司方法" },
        { value: "03", label: "垂直业务公司" },
        { value: "04", label: "共用运营动作" },
      ],
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
    build: {
      eyebrow: "我们建立什么",
      title: "我们建立垂直运营公司。",
      body: [
        "每家公司进入一个具体市场，处理一个反复发生、却始终难以判断和交付的问题。",
        "Xentra 负责共用的方法、系统与技术；业务公司负责客户、语境和结果。",
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
            proof: [
              { label: "行业教练目录", href: evidenceLinks.agentCoach.industries },
              { label: "用户准入申请", href: evidenceLinks.agentCoach.access },
              { label: "教练加入入口", href: evidenceLinks.agentCoach.coaches },
            ],
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
            proof: [
              { label: "公开路线样本", href: evidenceLinks.localhost.routes },
              { label: "私人路线需求表", href: evidenceLinks.localhost.inquiry },
              { label: "信任机制说明", href: evidenceLinks.localhost.trust },
            ],
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
            proof: [
              { label: "现货供应路径", href: evidenceLinks.bioaxis.readySupply },
              { label: "替代品匹配入口", href: evidenceLinks.bioaxis.equivalents },
              { label: "询价工作流", href: evidenceLinks.bioaxis.quote },
            ],
          },
        },
      ],
    },
    portfolio: {
      eyebrow: "集团架构",
      title: "集团复用能力，业务承担结果。",
      body: "Xentra 集中建设可跨市场复用的能力；每家公司贴近客户，独立负责市场与交付。",
      systemLabel: "AI 原生运营集团",
      systemBody: "建设每家公司背后可复用的系统。",
      systemItems: [
        {
          title: "选择市场",
          body: "寻找信息分散、判断困难且执行决定结果的长期问题。",
        },
        {
          title: "建立判断产品",
          body: "把反复发生的判断整理成 AI 辅助流程。",
        },
        {
          title: "设定验证标准",
          body: "明确哪些环节必须引入证据、专家与人工确认。",
        },
        {
          title: "搭建公司系统",
          body: "围绕具体市场建立产品、品牌与运营节奏。",
        },
      ],
      companyRoleLabel: "业务公司",
      companyRole: "负责市场、客户与交付",
      evidenceLabel: "公开业务证据",
      evidenceVerifiedLabel: `核验于 ${siteReviewDate.chinese}`,
      proofLabel: "公开网站当前提供",
      audienceLabel: "服务对象",
      decisionLabel: "关键判断",
      deliveryLabel: "实际交付",
      chapterNavLabel: "业务章节导航",
      backLabel: "返回集团架构",
      previousLabel: "上一家公司",
      nextLabel: "下一家公司",
      modelLabel: "运营方法",
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
    directions: {
      eyebrow: "新业务方向",
      title: "从难服务的市场开始。",
      body: [
        "我们寻找的不是更大的流量入口，而是那些信息很多、选择难比、信任稀缺，且最终结果依赖现实交付的市场。",
      ],
      signals: [
        "信息足够多，仍然难判断",
        "选择足够多，仍然不敢决定",
        "用户愿意为确定性付费",
        "关键语境无法被纯软件替代",
        "结果必须有人负责交付",
      ],
    },
    contact: {
      eyebrow: "与 Xentra 合作",
      title: "共同建立长期业务。",
      body: [
        "我们寻找真正理解市场，能够长期投入运营、专业判断或资本支持的合作方。",
      ],
      pathwaysLabel: "选择合作方向",
      intakeNote:
        "点击任一方向，会打开一封预填邮件。不会在本页提交信息。",
      pathways: [
        {
          audience: "运营者",
          title: "共同建立业务。",
          body: "适合熟悉具体市场，并能长期负责运营与交付的团队。",
          mailto: createContactMailto(
            "Xentra 垂直业务合作",
            contactPrompts.zh.operators,
          ),
        },
        {
          audience: "行业专家",
          title: "提供专业判断。",
          body: "适合了解行业规则、信任关系与交付难点的专业人士。",
          mailto: createContactMailto(
            "Xentra 行业专家合作",
            contactPrompts.zh.experts,
          ),
        },
        {
          audience: "资本伙伴",
          title: "讨论长期建设。",
          body: "适合关注垂直业务建设与长期价值的资本伙伴。",
          mailto: createContactMailto(
            "Xentra 资本合作",
            contactPrompts.zh.capital,
          ),
        },
      ],
      companiesLabel: "具体业务咨询",
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
      privacyLabel: "隐私说明",
      privacyHref: "/zh/privacy",
    },
  },
};
