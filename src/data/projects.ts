export interface ProjectAction {
  label: string;
  type: "gallery" | "paper" | "github" | "demo" | "external";
  url?: string; // Optional depending on type
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
      "A local donation management platform streamlining donor records, inventory management, and administrative reporting for organizations.",
    overview:
      "SFS50 is a comprehensive local donation management system built to help non-profit organizations efficiently manage donor information, track monetary and in-kind contributions, generate reports, and maintain transparent records. The system focuses on organizational workflows and management efficiency.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML", "CSS", "Bootstrap"],
    category: ["Full Stack", "Web App"],
    featuredImage: "/projects/sfs50.png",
    galleryImages: [
      "/projects/sfs50.png",
      "/projects/sfs50-dashboard.png",
      "/projects/sfs50-inventory.png"
    ],
    researchPaperUrl: "/projects/sfs50-paper.pdf",
    process:
      "The development began with requirements gathering from non-profit stakeholders. Database schemas were designed to model donor records and contribution history. The frontend was iteratively designed with usability as a priority, focusing on dashboard efficiency and clean data visualization.",
    challenges:
      "One of the main challenges was designing a role-based access control system that balanced security with ease of use for non-technical administrators. Optimizing local database queries for generating large financial reports was also a significant technical hurdle.",
    uiuxApproach:
      "The UI prioritizes clarity and efficiency — administrators need to find donor records and generate reports quickly. Clean data tables, intuitive filtering, and a consistent navigation structure were central to the design decisions.",
    completionDate: "2024",
    featured: true,
    status: "completed",
    actions: [
      { label: "Research Paper", type: "paper", url: "/projects/sfs50-paper.pdf" },
      { label: "System Screenshots", type: "gallery" }
    ],
  },
  {
    id: "motowatch",
    title: "MotoWatch: AI-Powered Evolution",
    shortDescription:
      "An AI-Powered Evolution of the SFS50 System featuring intelligent recommendations, automated workflows, and modernized dashboards.",
    overview:
      "MotoWatch represents the intelligent leap forward from the SFS50 ecosystem. It integrates AI-assisted workflows and automation systems to dramatically reduce manual data entry. By analyzing patterns, it provides intelligent recommendations and creates a highly modernized, efficiency-driven dashboard experience.",
    technologies: ["React", "Python", "TensorFlow", "Node.js", "PostgreSQL"],
    category: ["AI", "Full Stack", "Web App"],
    featuredImage: "/projects/motowatch.png",
    galleryImages: [
      "/projects/motowatch.png",
      "/projects/motowatch-ai.png"
    ],
    researchPaperUrl: "/projects/motowatch-paper.pdf",
    process:
      "The architecture was split into a machine learning microservice and a responsive frontend dashboard. Models were trained to identify patterns in organizational workflows, which were then exposed via a REST API to populate the highly interactive React frontend.",
    challenges:
      "Integrating Python-based AI models into a real-time web application required careful orchestration. Ensuring the intelligent recommendations felt helpful rather than intrusive demanded numerous UI iterations and user testing sessions.",
    uiuxApproach:
      "The design language feels intelligent, modern, and advanced. Subtle animations draw attention to AI-generated insights, while the core workflow remains unobstructed. Dark mode was utilized to create a sleek, futuristic aesthetic.",
    completionDate: "2025",
    featured: true,
    status: "completed",
    actions: [
      { label: "AI Workflow", type: "gallery" },
      { label: "Technical Breakdown", type: "gallery" },
      { label: "Research Paper", type: "paper", url: "/projects/motowatch-paper.pdf" }
    ],
  },
  {
    id: "postpal",
    title: "PostPal Discussion Platform",
    shortDescription:
      "A modern social discussion platform inspired by Reddit, featuring threaded discussions, a responsive feed system, and premium interaction design.",
    overview:
      "PostPal is a community-driven platform designed around threaded conversations and content discovery. It features a robust responsive feed system, complex user interactions (upvotes, nesting, awards), and a highly polished UI/UX that feels both familiar and distinctly premium.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Prisma", "PostgreSQL"],
    category: ["Frontend", "Full Stack", "Social"],
    githubUrl: "https://github.com/yermokurt/postpal",
    featuredImage: "/projects/postpal.png",
    galleryImages: [
      "/projects/postpal.png",
      "/projects/postpal-feed.png",
      "/projects/postpal-thread.png"
    ],
    process:
      "Starting with a complex relational database design for threaded comments, the backend was built with Prisma. The frontend utilized Next.js Server Components to render deep comment trees efficiently before pushing interactive states to client components.",
    challenges:
      "Rendering infinitely nested comment threads without performance degradation required recursive component patterns and virtualization. State management for optimistic UI updates (like immediate upvote feedback) was complex but critical for a premium feel.",
    uiuxApproach:
      "The focus was on readability and interaction fluidity. Modern social media layouts were employed, utilizing responsive feed cards, smooth micro-interactions, and clear visual hierarchy to ensure content remains the star of the application.",
    completionDate: "2025",
    featured: true,
    status: "completed",
    actions: [
      { label: "Platform Overview", type: "gallery" },
      { label: "UI Showcase", type: "gallery" },
      { label: "GitHub Repository", type: "github", url: "https://github.com/yermokurt/postpal" }
    ],
  },
];

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectById = (id: string) => projects.find((p) => p.id === id);
export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category.includes(category));
