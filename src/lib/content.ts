export type Locale = "en" | "zh";

export type Company = {
  slug: string;
  title: string;
  vertical: string;
  layer?: string;
  headline: string;
  body?: string[];
  problem?: string;
  architecture?: string;
  useCases?: string[];
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
    visitLabel: string;
    externalLinkLabel: string;
    detailsLabel: string;
    items: Company[];
  };
  architecture: {
    eyebrow: string;
    title: string;
    body?: string[];
    parentLabel: string;
    questions?: string[];
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
      visitLabel: "Visit site",
      externalLinkLabel: "opens in a new tab",
      detailsLabel: "Read operating brief",
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
      eyebrow: "AI 原生运营集团",
      title: "把复杂市场，做成可信系统。",
      subtitle: "Xentra 是一家 AI 原生运营集团。",
      body: [
        "我们进入那些信息足够多、判断仍然困难、结果高度依赖执行的市场，建立垂直业务，把混乱的信息、真实的需求和可交付的服务连接起来。",
        "不是做一个工具。而是把一个难判断、难信任、难交付的市场，重新组织成可以运行的系统。",
      ],
      primaryCta: "查看业务",
      primaryHref: "#companies",
      secondaryCta: "了解方法",
      secondaryHref: "#model",
      tags: [],
      note: "信息很多。判断很贵。信任很稀缺。",
    },
    thesis: {
      eyebrow: "Group Thesis",
      title: "信息从来不缺，缺的是可信判断。",
      body: [
        "很多行业的问题，并不是没有供应方、没有内容、没有服务，也不是用户不知道自己想要什么。",
        "真正的难点在于：",
      ],
      points: [
        {
          title: "信息太多，但质量参差不齐。",
        },
        {
          title: "选择太多，但很难判断谁值得信任。",
        },
        {
          title: "流程太长，但结果往往取决于最后的执行细节。",
        },
      ],
      closing: [
        "这些市场不适合只用流量解决，也不适合只用软件解决。",
        "它们需要一个新的运营结构：用 AI 提高信息处理和判断效率，用人工经验完成关键验证，用真实运营把结果交付出来。",
        "这就是 Xentra 关注的市场。",
      ],
    },
    build: {
      eyebrow: "What We Build",
      title: "我们建立垂直运营公司。",
      body: [
        "Xentra 不追逐短期流量，也不包装概念型产品。",
        "每家公司都进入一个具体市场，解决一个具体场景里的信任问题、判断问题和交付问题。",
        "我们的工作不是让用户看到更多选择，而是帮助用户更快理解什么值得选择、为什么值得选择，以及下一步如何落地。",
      ],
    },
    companies: {
      eyebrow: "Operating Companies",
      title: "不同市场，同一种底层问题。",
      body: [
        "Xentra 旗下业务看上去分布在不同领域：企业 AI、私人旅行、生命科学采购。",
        "但它们面对的是同一种市场结构：",
      ],
      principles: [
        "用户需要做高价值决策。",
        "信息来源高度碎片化。",
        "判断错误的成本很高。",
        "最终结果依赖真实执行。",
        "Xentra 的母公司价值，就是把这种问题识别出来，并建立可复制的运营方法。",
      ],
      visitLabel: "访问网站",
      externalLinkLabel: "在新窗口打开",
      detailsLabel: "查看业务说明",
      items: [
        {
          slug: "ai-agent-coach",
          title: "AI Agent Coach",
          vertical: "企业 AI 落地",
          headline: "让 AI 真正进入工作流。",
          body: [
            "AI Agent Coach 面向企业和专业团队，帮助他们把 AI 从工具尝试，推进到真实工作场景。",
            "重点不是教人“使用 AI”，而是帮助团队重新设计任务流程、角色分工和交付方式，让 AI 成为稳定、可管理、可复制的生产力。",
          ],
          useCases: [
            "销售与业务开发",
            "市场与内容生产",
            "知识管理",
            "客户沟通",
            "内部运营自动化",
          ],
          architecture: "AI adoption and workflow execution",
          href: companyLinks.agentCoach,
        },
        {
          slug: "localhost",
          title: "Localhost",
          vertical: "可信本地旅行",
          headline: "重新定义高端私人旅行的本地进入方式。",
          body: [
            "真正稀缺的旅行资源，不是景点、攻略或酒店列表，而是可信的本地判断。",
            "Localhost 为高净值和深度旅行用户建立一种更可靠的本地进入方式：理解文化语境，识别真实体验，连接可信资源，并完成路线、接待和执行安排。",
            "我们关注的不是“去哪玩”，而是如何进入一个地方真正值得被看见的部分。",
          ],
          architecture: "trusted local access and cultural context",
          href: companyLinks.localhost,
        },
        {
          slug: "bioaxis",
          title: "BioAxis",
          vertical: "生命科学供应",
          headline: "让生命科学采购更清晰。",
          body: [
            "实验室采购不是简单比价。",
            "在耗材、试剂、替代品、品牌、规格和供应渠道高度分散的市场里，用户真正需要的是更快判断什么合适、什么可靠、什么可以交付。",
            "BioAxis 为生命科学实验室建立一站式采购判断与供应系统，帮助用户更高效地完成产品查找、替代匹配、询价和交付确认。",
            "我们解决的不是“有没有货”，而是如何在复杂供应市场里做出更可靠的采购决策。",
          ],
          architecture: "scientific sourcing and procurement intelligence",
          href: companyLinks.bioaxis,
        },
      ],
    },
    architecture: {
      eyebrow: "Group Architecture",
      title: "Xentra 是母公司，不是品牌集合。",
      body: [
        "母公司负责方法、系统、技术和资本配置。垂直业务负责进入市场、理解用户、验证需求和完成交付。",
        "每一家业务公司都必须回答三个问题：",
      ],
      parentLabel: "AI-native operating group",
      questions: [
        "这个市场的信任成本在哪里？",
        "AI 可以在哪些环节提高判断效率？",
        "真实运营如何把结果交付出来？",
        "只有同时满足这三个条件的方向，才适合成为 Xentra 的长期业务。",
      ],
    },
    model: {
      eyebrow: "Operating Method",
      title: "从具体市场出发，而不是从概念出发。",
      steps: [
        {
          title: "看清市场结构",
          body: "先判断这个市场是否足够复杂：信息是否碎片化，选择是否难比较，用户是否需要高信任度决策。",
        },
        {
          title: "重组信息",
          body: "把分散的信息、供应、服务和经验整理成可理解、可比较、可行动的结构。",
        },
        {
          title: "引入 AI 判断",
          body: "用 AI 承担搜索、归纳、匹配、排序和初步决策支持，降低重复判断成本。",
        },
        {
          title: "加入人工验证",
          body: "在关键环节引入人的经验、语境判断和真实性验证，避免把高价值决策完全交给模型。",
        },
        {
          title: "完成真实交付",
          body: "由垂直业务负责最后一公里，让判断不止停留在建议，而是变成可以执行的结果。",
        },
      ],
    },
    directions: {
      eyebrow: "New Verticals",
      title: "我们持续寻找新的复杂市场。",
      body: [
        "合适的市场通常有几个特征：",
        "如果一个市场同时具备这些特征，Xentra 会考虑建立新的垂直运营公司。",
      ],
      signals: [
        "信息充足，但判断困难。",
        "供给很多，但信任不足。",
        "用户愿意为确定性付费。",
        "执行质量直接影响最终结果。",
        "现有平台只解决了发现问题，没有解决判断和交付问题。",
      ],
    },
    contact: {
      title: "与 Xentra 讨论新的垂直业务机会。",
      body: [
        "Xentra 关注那些尚未被软件充分改造的复杂市场。",
        "如果你正在建设类似方向，或希望与 Xentra 探讨新的垂直业务机会，可以联系我们。",
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
    },
  },
};
