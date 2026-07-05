export type ExperienceEntry = {
  role: string;
  org: string;
  period: string;
  location: string;
  bullets: string[];
  skills: string[];
};

export const experience: ExperienceEntry[] = [
  {
    role: "Computer Vision & AI Engineer",
    org: "LearNN",
    period: "December 2025 – May 2026",
    location: "Remote",
    bullets: [
      "Developed an AI-powered food consumption analysis system using YOLO11-based detection, segmentation, and classification models.",
      "Managed the complete ML pipeline — dataset collection, annotation, preprocessing, training, validation, and evaluation.",
      "Used Roboflow for dataset annotation, quality assurance, and dataset management across multiple food-recognition tasks.",
      "Designed CV workflows for food detection, plate localization, image normalization, and meal consumption estimation.",
      "Built algorithms estimating food intake by comparing before/after meal images with segmentation and area-based analysis.",
      "Ran multimodal AI research comparing prompt-engineering strategies and image-processing approaches, including PIL vs. Base64 submission methods.",
      "Developed AI-powered food recommendation and fitness coaching agents for personalized nutrition and workout guidance.",
    ],
    skills: ["Computer Vision", "GenAI & Agents", "Data & Visualization"],
  },
  {
    role: "WordPress Developer",
    org: "CLADO",
    period: "July 2025 – December 2025",
    location: "Remote — Peshawar",
    bullets: [
      "Built and managed the official site for the Pakistan Literature Festival (PLF).",
      "Customized themes, plugins, and layouts for a visually compelling, user-centric event experience.",
      "Integrated media galleries, event registration systems, and rolling content updates.",
      "Collaborated with cultural and program teams to reflect Clado's mission across diverse audiences.",
    ],
    skills: ["Web & WordPress"],
  },
  {
    role: "WordPress Developer",
    org: "Kurram Welfare Home",
    period: "January 2025 – June 2025",
    location: "Remote — Peshawar",
    bullets: [
      "Designed and built the official site representing KWH's mission and community initiatives.",
      "Customized themes and plugins for a clear, donor-friendly interface.",
      "Implemented responsive design and foundational SEO to grow reach on desktop and mobile.",
      "Trained staff to independently manage and update site content.",
    ],
    skills: ["Web & WordPress"],
  },
  {
    role: "WordPress Developer",
    org: "Second Chance (E-commerce Store)",
    period: "August 2024 – December 2025",
    location: "Onsite — NIC Peshawar",
    bullets: [
      "Built a full WooCommerce store for a resale and sustainable-shopping brand.",
      "Customized themes/plugins for smooth product browsing and checkout flow.",
      "Integrated secure payment gateways, inventory management, and order tracking.",
      "Optimized for mobile responsiveness and SEO; provided ongoing maintenance and performance tuning.",
    ],
    skills: ["Web & WordPress", "Backend & Languages"],
  },
  {
    role: "WordPress Developer Intern",
    org: "Bolt Marketing",
    period: "July 2023 – January 2024",
    location: "Onsite — University Road, Peshawar",
    bullets: [
      "Learned theme customization, plugin integration, and content management fundamentals.",
      "Key project: developed and launched ReadPakistan, a literacy-focused knowledge-sharing site.",
      "Optimized site structure for navigation and content publishing.",
    ],
    skills: ["Web & WordPress"],
  },
];

export type FreelanceEntry = {
  title: string;
  org: string;
  bullets: string[];
  skills: string[];
};

export const freelance: FreelanceEntry[] = [
  {
    title: "WordPress",
    org: "Securage Security",
    bullets: [
      "Built the official site for a manned-guarding and alarm-response security company using WordPress + Elementor.",
      "Implemented responsive design and SEO best practices for accessibility across devices.",
    ],
    skills: ["Web & WordPress"],
  },
  {
    title: "WordPress",
    org: "Future Serve Consultants",
    bullets: [
      "Built a custom site to showcase services and strengthen digital presence.",
      "Implemented responsive layouts, SEO, and speed improvements; integrated contact forms and CMS-managed service pages.",
    ],
    skills: ["Web & WordPress"],
  },
  {
    title: "WordPress Developer",
    org: "Alliance of Excellence (NGO)",
    bullets: [
      "Designed and maintained responsive WordPress sites tailored to client needs, including WooCommerce stores.",
      "Optimized for SEO, performance, and mobile responsiveness; provided client training and technical support.",
    ],
    skills: ["Web & WordPress"],
  },
];
