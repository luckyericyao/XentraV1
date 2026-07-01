export type Locale = "en" | "zh";

export type Company = {
  slug: string;
  title: string;
  vertical: string;
  layer?: string;
  headline: string;
  body?: string;
  href: string;
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
  };
  thesis: {
    eyebrow: string;
    title: string;
    body?: string[];
    points: { title: string; body?: string }[];
    closing?: string;
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
      eyebrow: "AI-Native Operating Group",
      title: "AI 原生运营集团",
      subtitle: "为复杂市场，建立可信的决策与执行系统。",
      body: [
        "在很多高价值场景里，真正的难点不是找不到信息，而是不知道该信谁、怎么判断、谁能交付。",
        "Xentra 建立垂直运营公司，用 AI 处理信息与判断，用真实运营完成验证与交付。我们进入那些信息混乱、判断门槛高、执行质量直接决定结果的市场。",
      ],
      primaryCta: "查看业务布局",
      primaryHref: "#companies",
      secondaryCta: "了解集团方法",
      secondaryHref: "#model",
      tags: ["信息结构", "AI 判断", "人工验证", "真实运营"],
    },
    thesis: {
      eyebrow: "Group Thesis",
      title: "我们关注的不是低成本流量市场，而是高判断成本市场。",
      body: ["这些市场通常有三个共同点："],
      points: [
        {
          title: "信息很多，但真正可用的信息很少。",
        },
        {
          title: "选择很多，但用户很难判断谁可信。",
        },
        {
          title: "流程很长，而最终结果高度依赖执行质量。",
        },
      ],
      closing:
        "Xentra 的方法，是把复杂决策拆解成结构化信息、AI 判断、人工验证和真实世界执行。我们不只提供工具，而是建立能够持续运行的垂直公司。",
    },
    companies: {
      eyebrow: "Operating Companies",
      title: "不同市场，同一种底层问题。",
      body: "Xentra 旗下公司进入不同市场，但解决的是同一种底层问题：复杂决策里的信任与执行。",
      visitLabel: "访问网站",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "AI 能力建设",
          headline: "帮助团队把 AI 从概念带入真实工作流。",
          body: "我们关注的不是“会不会用 AI”，而是企业如何把 AI 变成稳定、可复制、可管理的生产力。",
          href: companyLinks.agentCoach,
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "本地信任网络",
          headline: "为高端私人旅行建立可信的本地进入方式。",
          body: "真正稀缺的不是路线，而是知道哪里值得去、谁值得信、如何进入真实的本地语境。",
          href: companyLinks.localhost,
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "生命科学供应",
          headline: "为生命科学实验室建立更清晰的采购判断系统。",
          body: "在品牌、规格、替代品和供应渠道高度碎片化的市场里，BioAxis 帮助实验室更快找到合适、可靠、可交付的耗材选择。",
          href: companyLinks.bioaxis,
        },
      ],
    },
    architecture: {
      eyebrow: "集团架构",
      title: "母公司建立方法，业务公司进入市场。",
      parentLabel: "AI 原生运营集团",
    },
    model: {
      eyebrow: "Operating Method",
      title: "一套可复制的运营方法。",
      steps: [
        {
          title: "把混乱信息变成结构",
          body: "把分散、不可比较、难判断的信息整理成可理解、可筛选、可行动的结构。",
        },
        {
          title: "用 AI 缩短判断过程",
          body: "让 AI 承担搜索、比较、匹配、排序和初步判断，提高决策效率。",
        },
        {
          title: "在关键节点加入人工验证",
          body: "不是所有判断都应该交给模型。越高价值的决策，越需要经验、语境和真实反馈。",
        },
        {
          title: "用运营完成交付闭环",
          body: "判断之后必须有人执行。Xentra 的垂直公司负责把建议变成实际结果。",
        },
      ],
    },
    contact: {
      title: "新的业务方向，从同一类问题开始。",
      bodyPrefix: "合作与新业务拓展：",
    },
    footer: {
      line: "Xentra 不做单点工具。我们建立垂直运营公司，把复杂市场里的信息、判断、信任和执行连接起来。",
    },
  },
};
