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
    points: { title: string; body?: string }[];
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
        { title: "Fragmented information" },
        { title: "Expensive trust" },
        { title: "Execution quality" },
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
      { label: "业务", href: "#companies" },
      { label: "方法", href: "#model" },
      { label: "联系", href: "#contact" },
    ],
    languageSwitch: { label: "EN", href: "/" },
    hero: {
      eyebrow: "运营集团",
      title: "复杂决策，需要新的信任基础设施。",
      body: "Xentra 构建并运营垂直业务，服务于信息分散、判断成本高、执行质量决定结果的市场。",
      companiesCta: "查看业务",
      contactCta: "联系",
      tags: ["AI 能力建设", "本地信任网络", "生命科学供应"],
    },
    thesis: {
      eyebrow: "理念",
      title: "复杂市场的核心问题，不是信息不足，而是判断失真。",
      points: [
        {
          title: "信息分散",
          body: "来源复杂，标准不一，难以直接比较。",
        },
        {
          title: "判断昂贵",
          body: "关键决策依赖经验、语境和可信关系。",
        },
        {
          title: "执行不可替代",
          body: "真正的结果，仍然发生在现实世界。",
        },
      ],
    },
    companies: {
      eyebrow: "业务矩阵",
      title: "不同市场，同一套运营逻辑。",
      body: "业务面对市场，集团提供方法。",
      visitLabel: "访问网站",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "AI 能力建设",
          layer: "AI 能力建设",
          headline: "帮助个人与团队把 AI 转化为真实工作能力，而不只是工具使用。",
          href: companyLinks.agentCoach,
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "本地信任网络",
          layer: "本地信任网络",
          headline: "通过可信本地主理人，重构私人文化旅行的进入方式。",
          href: companyLinks.localhost,
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "生命科学供应",
          layer: "生命科学供应",
          headline: "为生命科学实验室提供更清晰、更高效的耗材采购路径。",
          href: companyLinks.bioaxis,
        },
      ],
    },
    architecture: {
      eyebrow: "集团架构",
      title: "集团提供方法，业务面对市场。",
      parentLabel: "集团",
    },
    model: {
      eyebrow: "方法",
      title: "可复制的运营方法。",
      steps: [
        {
          title: "结构化",
          body: "将分散信息整理为可判断的系统。",
        },
        {
          title: "推理",
          body: "用 AI 辅助比较、筛选、匹配与排序。",
        },
        {
          title: "验证",
          body: "在关键节点引入真实语境与可信判断。",
        },
        {
          title: "执行",
          body: "通过现实运营完成最后一公里。",
        },
      ],
    },
    contact: {
      title: "面向合作、业务拓展与新垂直方向。",
      bodyPrefix: "联系：",
    },
    footer: {
      line: "Xentra — 为复杂决策建立可信运营系统。",
    },
  },
};
