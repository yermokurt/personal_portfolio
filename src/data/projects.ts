export interface ProjectAction {
  label: string;
  type: "gallery" | "paper" | "github" | "demo" | "external";
  url?: string;
}

export interface Project {
  id: string;
  title: string;
  shortDescription: string;
  overview: string;
  technologies: string[];
  category: string[];
  featuredImage: string;
  galleryImages?: string[];
  researchPaperUrl?: string;
  githubUrl?: string;
  liveDemoUrl?: string;
  process: string;
  challenges: string;
  uiuxApproach: string;
  completionDate: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
  actions?: ProjectAction[];
}

export const projects: Project[] = [
  {
    id: "sfs50",
    title: "SFS50 Donation Management System",
    shortDescription:
      "A local donation management platform streamlining donor records, inventory tracking, and transparent administrative reporting.",
    overview:
      "SFS50 is a comprehensive donation management platform built to help local organizations coordinate donor intelligence, track financial and in-kind items, and generate structural financial transparency reports. The system is engineered to streamline record-keeping and optimize local management workflows.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    category: ["Full Stack", "Localhost Application"],
    featuredImage: "/projects/sfs50.png",
    galleryImages: [
      "/projects/sfs50.png"
    ],
    researchPaperUrl: "https://drive.google.com/file/d/17D2hwMwn2uEI9SA05dGLU-qxu1h4Ldvo/view?usp=drive_link",
    process:
      "The architecture was initiated by gathering field workflow specifications. Database tables were normalized to log financial history with zero collision risks. The frontend interface was designed with a heavy emphasis on form layouts, clean administrative summaries, and fast query execution times.",
    challenges:
      "Developing a rigid role-based access control paradigm that maintained high usability for non-technical users was a key challenge. Optimizing localized SQL aggregate queries for generating rapid ledger balances was also resolved via comprehensive database indexing.",
    uiuxApproach:
      "The interface focuses on typographic scanability and rapid data entries. Clean financial ledgers, dense administrative filtering grids, and robust structural tables ensure that coordinators can locate specific profiles and audit contribution history with minimal friction.",
    completionDate: "2024",
    featured: true,
    status: "completed",
    actions: [
      { label: "Documentation", type: "paper", url: "https://drive.google.com/file/d/17D2hwMwn2uEI9SA05dGLU-qxu1h4Ldvo/view?usp=drive_link" },
      { label: "System Screenshots", type: "gallery" }
    ],
  },
  {
    id: "motowatch",
    title: "MotoWatch: AI-Powered Evolution",
    shortDescription:
      "An AI-assisted tracking evolution of SFS50 featuring automated recommendation engines, predictive modeling, and modernized dashboards.",
    overview:
      "MotoWatch represents the intelligent next-generation step from the SFS50 foundation. It introduces machine learning components to automate asset prediction, minimize repetitive data logging, and represent trends inside a highly modern, cinematic dashboard structure.",
    technologies: ["React", "Python", "TensorFlow", "Node.js", "PostgreSQL"],
    category: ["Full Stack", "Localhost Application"],
    featuredImage: "/projects/motowatch1.png",
    galleryImages: [
      "/projects/motowatch1.png",
      "/projects/motowatch2.png"
    ],
    researchPaperUrl: "https://drive.google.com/file/d/1tN_PL1pC3WBeskGTdfu0xVzHtZ7uo9yA/view?usp=drive_link",
    process:
      "The system splits predictive intelligence into a lightweight Python microservice, exposing REST end-points to feed a fast-rendering React client. Models analyze operational data to suggest optimized stock assignments and identify anomalies dynamically.",
    challenges:
      "Synchronizing real-time predictive predictions with local user states required creating highly resilient API integrations. Striking the right balance to make machine learning alerts feel non-intrusive required multiple rounds of design iterations.",
    uiuxApproach:
      "Adopts a deeply technical, dark editorial aesthetic. Soft visual glow boundaries emphasize automated notifications, while standard analytical charts and statistics represent key information clearly and efficiently.",
    completionDate: "2025",
    featured: true,
    status: "completed",
    actions: [
      { label: "Documentation", type: "paper", url: "https://drive.google.com/file/d/1tN_PL1pC3WBeskGTdfu0xVzHtZ7uo9yA/view?usp=drive_link" },
      { label: "System Screenshots", type: "gallery" }
    ],
  },
  {
    id: "postpal",
    title: "PostPal Discussion Platform",
    shortDescription:
      "A modern social discussion client featuring infinite nested comment threads, optimistic UI states, and recursive frontend rendering systems.",
    overview:
      "PostPal is a community-driven discussion frontend designed around threaded conversations, content discovery, and elegant client state operations. It features a fully responsive feed layout, complex interactive mechanics (such as nested threaded comments, dynamic sorting, and mock upvote/downvote operations), and a highly polished dark-theme interaction model.",
    technologies: ["React", "TypeScript", "Tailwind CSS", "Framer Motion", "Mock JSON DB", "REST API Client"],
    category: ["Frontend Only"],
    featuredImage: "/projects/PostPal1.png",
    galleryImages: [
      "/projects/PostPal1.png",
      "/projects/postpal2.png"
    ],
    githubUrl: "https://github.com/yermokurt/ITELECT3_finals_json",
    researchPaperUrl: "https://drive.google.com/file/d/1eU5Bipz6BKamM7-Gs9fx3yhzhjsv62v8/view?usp=drive_link",
    process:
      "Built strictly as a highly responsive client-side showcase, the application utilizes highly optimized state models to handle deeply nested threaded comment trees. The UI coordinates with a local JSON-driven data mockup file to simulate real-time backend updates and optimistic local caching, delivering a seamless social interface.",
    challenges:
      "Optimizing recursive renderings for infinite nested comment threads in pure React without layout jumps or lag was a major technical focus. This was solved by designing flat comment schemas with depth keys, utilizing virtualization patterns, and integrating Framer Motion layout transitions for an extremely organic feel.",
    uiuxApproach:
      "Every gesture and micro-interaction is calibrated to look premium and responsive. High-performance dark layout schemas, subtle glassmorphic indicators, smooth thread collapsible guidelines, and tactile upvote/downvote transitions keep focus on the readability of the discussion cards.",
    completionDate: "2025",
    featured: true,
    status: "completed",
    actions: [
      { label: "GitHub Repository", type: "github", url: "https://github.com/yermokurt/ITELECT3_finals_json" },
      { label: "Documentation", type: "paper", url: "https://drive.google.com/file/d/1eU5Bipz6BKamM7-Gs9fx3yhzhjsv62v8/view?usp=drive_link" },
      { label: "System Screenshots", type: "gallery" }
    ],
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectById = (id: string) => projects.find((p) => p.id === id);
export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category.includes(category));
