export type Locale = "en" | "zh";

export type Company = {
  slug: string;
  title: string;
  vertical: string;
  layer?: string;
  headline: string;
  body?: string;
  problem?: string;
  architecture?: string;
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
    body: string[];
    visitLabel: string;
    items: Company[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    body?: string[];
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
    body?: string[];
    ctaLabel?: string;
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
      body: [
        "Each company owns its market. Xentra owns the operating thesis.",
      ],
      visitLabel: "Visit site",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "AI Capability",
          layer: "AI capability layer",
          headline: "For teams adopting AI into real workflows.",
          architecture: "AI adoption and workflow execution",
          href: companyLinks.agentCoach,
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "Local Access",
          layer: "Local access layer",
          headline: "Private cultural travel through trusted local hosts.",
          architecture: "trusted local access and cultural context",
          href: companyLinks.localhost,
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "Scientific Sourcing",
          layer: "Scientific sourcing layer",
          headline: "One-stop sourcing intelligence for life science consumables.",
          architecture: "scientific sourcing and procurement intelligence",
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
      { label: "集团理念", href: "#thesis" },
      { label: "业务布局", href: "#companies" },
      { label: "运营方法", href: "#model" },
      { label: "联系", href: "#contact" },
    ],
    languageSwitch: { label: "EN", href: "/" },
    hero: {
      eyebrow: "AI 原生运营集团",
      title: "为复杂市场，建立可信的决策与执行系统。",
      body: [
        "在很多高价值场景里，真正的难点不是找不到信息，而是不知道该信谁、怎么判断、谁能交付。",
        "Xentra 建立垂直运营公司，用 AI 处理信息与判断，用真实运营完成验证与交付。我们进入那些信息混乱、判断门槛高、信任成本高、执行质量直接决定结果的市场。",
      ],
      primaryCta: "查看业务布局",
      primaryHref: "#companies",
      secondaryCta: "了解集团方法",
      secondaryHref: "#model",
      tags: ["信息结构", "AI 判断", "人工验证", "真实交付"],
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
        "Xentra 的方法，是把这些复杂决策拆解成结构化信息、AI 判断、人工验证和真实世界执行。我们不只提供工具，而是建立能够持续运行的垂直运营公司。",
    },
    companies: {
      eyebrow: "Operating Companies",
      title: "不同市场，同一种底层问题。",
      body: [
        "Xentra 旗下公司进入不同市场，但解决的是同一种底层问题：复杂决策里的信任与执行。",
        "表面上，它们分别属于 AI 工作、私人旅行和生命科学采购。底层上，它们都在处理同一件事：当信息不透明、判断成本高、交付质量重要时，用户需要一个更可信的系统。",
      ],
      visitLabel: "访问网站",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "企业 AI 落地",
          headline: "帮助团队把 AI 从概念带入真实工作流。",
          body: "我们关注的不是“会不会用 AI”，而是企业如何把 AI 变成稳定、可复制、可管理的生产力。AI Agent Coach 将工具、流程、角色和具体任务结合起来，让 AI 真正进入日常工作。",
          problem: "企业 AI 采用中的判断成本与执行落差。",
          architecture: "AI adoption and workflow execution",
          href: companyLinks.agentCoach,
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "可信本地旅行",
          headline: "为高端私人旅行建立可信的本地进入方式。",
          body: "真正稀缺的不是路线，而是知道哪里值得去、谁值得信、如何进入真实的本地语境。Localhost 通过本地主理人、私密路线和文化判断，帮助旅行者进入一个地方真实的一面。",
          problem: "陌生环境里的本地信任与文化判断。",
          architecture: "trusted local access and cultural context",
          href: companyLinks.localhost,
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "生命科学供应",
          headline: "为生命科学实验室建立更清晰的采购判断系统。",
          body: "在品牌、规格、替代品和供应渠道高度碎片化的市场里，BioAxis 帮助实验室更快找到合适、可靠、可交付的耗材选择。",
          problem: "科学采购中的信息碎片化与替代品判断。",
          architecture: "scientific sourcing and procurement intelligence",
          href: companyLinks.bioaxis,
        },
      ],
    },
    architecture: {
      eyebrow: "Group Architecture",
      title: "一个母公司方法，多个垂直市场入口。",
      body: [
        "Xentra 在母公司层面沉淀方法、技术和运营判断。每一家垂直公司面向一个具体市场，拥有独立的用户、场景和交付路径。",
        "共享的是方法，不是模板。统一的是底层判断，不是表面业务。",
      ],
      parentLabel: "AI-native operating group",
    },
    model: {
      eyebrow: "Operating Method",
      title: "从信息到交付，Xentra 只做能够闭合的系统。",
      steps: [
        {
          title: "把混乱信息变成结构",
          body: "把分散、不可比较、难判断的信息整理成可理解、可筛选、可行动的结构。复杂市场的第一步，不是更多信息，而是更好的结构。",
        },
        {
          title: "用 AI 缩短判断过程",
          body: "让 AI 承担搜索、比较、匹配、排序和初步判断，提高决策效率。AI 不替代所有判断，但可以大幅压缩低质量筛选的时间。",
        },
        {
          title: "在关键节点加入人工验证",
          body: "不是所有判断都应该交给模型。越高价值的决策，越需要经验、语境和真实反馈。Xentra 的系统在人和 AI 之间做明确分工。",
        },
        {
          title: "用运营完成交付闭环",
          body: "判断之后必须有人执行。Xentra 的垂直公司负责把建议变成实际结果，确保系统不是停留在推荐，而是进入真实交付。",
        },
      ],
    },
    contact: {
      title: "复杂市场不缺信息，缺的是可信系统。",
      body: [
        "Xentra 持续寻找新的垂直市场：信息碎片化、判断门槛高、信任成本高，并且最终结果依赖真实执行。",
        "如果你正在构建、投资或运营这类市场，我们可以交流。",
      ],
      bodyPrefix: "联系 Xentra：",
      ctaLabel: "联系 Xentra",
    },
    footer: {
      line: "Xentra — AI 原生运营集团，为复杂市场建立可信的决策与执行系统。",
    },
  },
};
