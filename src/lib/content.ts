export type Locale = "en" | "zh";

export type Company = {
  slug: string;
  title: string;
  vertical: string;
  layer: string;
  headline: string;
  href: string;
};

export type SiteContent = {
  lang: string;
  navItems: { label: string; href: string }[];
  languageSwitch: { label: string; href: string };
  hero: {
    eyebrow: string;
    title: string;
    body: string;
    companiesCta: string;
    contactCta: string;
    tags: string[];
  };
  thesis: {
    eyebrow: string;
    title: string;
    points: string[];
  };
  companies: {
    eyebrow: string;
    title: string;
    body: string;
    visitLabel: string;
    items: Company[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    parentLabel: string;
  };
  model: {
    eyebrow: string;
    title: string;
    steps: { title: string; body: string }[];
  };
  contact: {
    title: string;
    bodyPrefix: string;
  };
  footer: {
    line: string;
  };
};

const companyLinks = {
  agentCoach: "https://agentcoach-three.vercel.app/",
  localhost: "https://localhostchinav1.vercel.app/",
  bioaxis: "https://bioaxisv3.vercel.app/",
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
      body: "Xentra builds vertical companies where information is fragmented, trust is expensive, and execution quality determines outcomes.",
      companiesCta: "View companies",
      contactCta: "Contact",
      tags: ["AI Capability", "Local Access", "Scientific Sourcing"],
    },
    thesis: {
      eyebrow: "Thesis",
      title: "Trust cost is the hidden tax on complex markets.",
      points: [
        "Fragmented information",
        "Expensive trust",
        "Execution quality",
      ],
    },
    companies: {
      eyebrow: "Portfolio Companies",
      title: "Vertical companies, shared infrastructure.",
      body: "Each company owns its market. Xentra owns the operating thesis.",
      visitLabel: "Visit site",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "AI Capability",
          layer: "AI capability layer",
          headline: "For teams adopting AI into real workflows.",
          href: companyLinks.agentCoach,
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "Local Access",
          layer: "Local access layer",
          headline: "Private cultural travel through trusted local hosts.",
          href: companyLinks.localhost,
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "Scientific Sourcing",
          layer: "Scientific sourcing layer",
          headline: "One-stop sourcing intelligence for life science consumables.",
          href: companyLinks.bioaxis,
        },
      ],
    },
    architecture: {
      eyebrow: "Group Architecture",
      title: "Xentra at the center. Vertical companies underneath.",
      parentLabel: "Parent company",
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
      title: "High-trust markets need operating systems.",
      bodyPrefix: "Partnerships, operating opportunities, and new verticals:",
    },
    footer: {
      line: "Xentra - AI-enabled operating group for trust-heavy decisions.",
    },
  },
  zh: {
    lang: "zh-CN",
    navItems: [
      { label: "理念", href: "#thesis" },
      { label: "分公司", href: "#companies" },
      { label: "模型", href: "#model" },
      { label: "联系", href: "#contact" },
    ],
    languageSwitch: { label: "EN", href: "/" },
    hero: {
      eyebrow: "运营集团",
      title: "面向高信任成本市场的决策基础设施。",
      body: "Xentra 构建垂直公司，服务于信息碎片化、信任成本高、执行质量决定结果的市场。",
      companiesCta: "查看分公司",
      contactCta: "联系",
      tags: ["AI 能力", "本地连接", "科学采购"],
    },
    thesis: {
      eyebrow: "集团理念",
      title: "信任成本，是复杂市场里最隐形的税。",
      points: ["信息碎片化", "信任成本高", "执行质量决定结果"],
    },
    companies: {
      eyebrow: "分公司组合",
      title: "垂直公司，共享决策基础设施。",
      body: "每家公司拥有自己的市场，Xentra 提供共同的运营理念。",
      visitLabel: "访问网站",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "AI 能力",
          layer: "AI 能力层",
          headline: "帮助团队把 AI 真正带入实际工作流。",
          href: companyLinks.agentCoach,
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "本地连接",
          layer: "本地连接层",
          headline: "通过可信本地主理人提供私人文化旅行体验。",
          href: companyLinks.localhost,
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "科学采购",
          layer: "科学采购层",
          headline: "为生命科学耗材提供一站式采购情报。",
          href: companyLinks.bioaxis,
        },
      ],
    },
    architecture: {
      eyebrow: "集团架构",
      title: "Xentra 位于中心，垂直公司在下方展开。",
      parentLabel: "母公司",
    },
    model: {
      eyebrow: "运营模型",
      title: "四个动作，跨市场重复执行。",
      steps: [
        {
          title: "结构化",
          body: "把碎片化信息变成可使用的系统。",
        },
        {
          title: "推理",
          body: "用 AI 比较、筛选、匹配和排序。",
        },
        {
          title: "验证",
          body: "在需要判断的地方加入可信人工语境。",
        },
        {
          title: "执行",
          body: "通过真实世界运营闭合最后一环。",
        },
      ],
    },
    contact: {
      title: "高信任市场，需要可执行的运营系统。",
      bodyPrefix: "合作、运营机会与新垂直方向：",
    },
    footer: {
      line: "Xentra - 面向高信任成本决策的 AI 驱动运营集团。",
    },
  },
};
