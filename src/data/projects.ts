export interface ProjectAction {
  label: string;
  type: "gallery" | "paper" | "github" | "website" | "external";
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
  websiteUrl?: string;
  process: string;
  challenges: string;
  uiuxApproach: string;
  completionDate: string;
  featured: boolean;
  status: "completed" | "in-progress" | "planned";
  actions?: ProjectAction[];
}

const projectEntries: Project[] = [
  {
    id: "sfs50",
    title: "SFS50 Donation Management System",
    shortDescription:
      "A local donation management platform streamlining donor records, inventory tracking, and transparent administrative reporting.",
    overview:
      "SFS50 is a comprehensive donation management platform built to help local organizations coordinate donor intelligence, track financial and in-kind items, and generate structural financial transparency reports. The system is engineered to streamline record-keeping and optimize local management workflows.",
    technologies: ["PHP", "MySQL", "JavaScript", "HTML5", "CSS3", "Bootstrap"],
    category: ["Full Stack"],
    featuredImage: "/projects/sfs50.jpg",
    galleryImages: [
      "/projects/sfs50.jpg"
    ],
    researchPaperUrl: "https://drive.google.com/file/d/17D2hwMwn2uEI9SA05dGLU-qxu1h4Ldvo/view?usp=drive_link",
    process:
      "I mapped the organization’s existing donor, inventory, and reporting workflows before building the database and administration screens. The result was a practical tool for entering records, checking stock, and preparing reports.",
    challenges:
      "The main challenge was balancing role-based access with straightforward screens for non-technical staff. I also structured the data and queries so reports could combine financial and in-kind donations reliably.",
    uiuxApproach:
      "The interface prioritizes readable records, quick data entry, and clear tables so coordinators can find donor histories and contribution details without unnecessary steps.",
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
    title: "MotoWatch: Computer Vision Tracking",
    shortDescription:
      "A computer-vision-assisted tracking concept that explores automated monitoring, predictions, and a modern operations dashboard.",
    overview:
      "MotoWatch builds on the tracking ideas explored in SFS50. It combines a React dashboard with Python-based computer vision and prediction experiments to reduce manual logging and surface operational trends.",
    technologies: ["React", "Python", "TensorFlow", "Node.js", "PostgreSQL"],
    category: ["Full Stack", "Computer Vision"],
    featuredImage: "/projects/motowatch1.png",
    galleryImages: [
      "/projects/motowatch1.png",
      "/projects/motowatch2.png"
    ],
    researchPaperUrl: "https://drive.google.com/file/d/1tN_PL1pC3WBeskGTdfu0xVzHtZ7uo9yA/view?usp=drive_link",
    process:
      "The concept separates the React client from a lightweight Python service. The dashboard consumes model outputs to present predictions and potential issues alongside ordinary operational data.",
    challenges:
      "The key design problem was presenting model outputs as useful signals rather than distractions. I explored clear status states and dashboard placement that keep people in control of the final decision.",
    uiuxApproach:
      "The dashboard uses strong hierarchy, status cues, and data summaries to separate routine tasks from computer-vision and prediction signals.",
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
      "A discussion client with nested comments, responsive feeds, and interactive client-side states.",
    overview:
      "PostPal is a frontend discussion experience built around threaded conversations and content discovery. It includes responsive feeds, nested comments, sorting, and mock voting interactions.",
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
      "I built it as a client-side showcase using reusable React components and a local JSON dataset. The interaction model simulates updates while keeping the comment structure easy to follow.",
    challenges:
      "Nested comment rendering was the main challenge. I used a predictable comment structure and clear depth cues to keep longer threads readable and interactions stable.",
    uiuxApproach:
      "The UI emphasizes reading comfort: clear thread depth, distinct voting controls, responsive spacing, and dark-theme contrast that keeps the conversation central.",
    completionDate: "2025",
    featured: true,
    status: "completed",
    actions: [
      { label: "GitHub Repository", type: "github", url: "https://github.com/yermokurt/ITELECT3_finals_json" },
      { label: "Documentation", type: "paper", url: "https://drive.google.com/file/d/1eU5Bipz6BKamM7-Gs9fx3yhzhjsv62v8/view?usp=drive_link" },
      { label: "System Screenshots", type: "gallery" }
    ],
  },
  {
    id: "taisync",
    title: "TaiSync Travel Companion",
    shortDescription:
      "A mobile-first trip companion for groups planning, coordinating, and enjoying a Taiwan trip together.",
    overview:
      "TaiSync is a shared travel companion that brings itineraries, expenses, group coordination, and trip information into one mobile-first experience for people travelling in Taiwan.",
    technologies: ["Next.js", "React", "TypeScript", "Tailwind CSS", "Zustand", "Supabase", "IndexedDB", "Serwist PWA", "MapLibre", "Leaflet"],
    category: ["Full Stack"],
    featuredImage: "/projects/TaiSync/Screenshot (1).png",
    galleryImages: [
      "/projects/TaiSync/Screenshot (1).png",
      "/projects/TaiSync/Screenshot (2).png",
      "/projects/TaiSync/Screenshot (3).png",
      "/projects/TaiSync/Screenshot (4).png",
      "/projects/TaiSync/Screenshot (5).png",
      "/projects/TaiSync/Screenshot (6).png",
      "/projects/TaiSync/Screenshot (7).png",
    ],
    websiteUrl: "https://taisync.vercel.app/",
    process:
      "The app was built from reusable React components, Supabase real-time data, and offline caching so important trip information remains available while people are moving between places.",
    challenges:
      "TaiSync supports shared itinerary changes, group expenses, member coordination, limited connectivity, and offline access while avoiding unnecessary API calls.",
    uiuxApproach:
      "The experience takes cues from travel apps: immersive imagery, compact trip cards, maps, timelines, and mobile interactions instead of a traditional dashboard layout.",
    completionDate: "2026",
    featured: true,
    status: "completed",
    actions: [
      { label: "Visit Website", type: "website", url: "https://taisync.vercel.app/" },
      { label: "View Gallery", type: "gallery" },
    ],
  },
  {
    id: "1pm-club",
    title: "1PM Club Café Pre-order",
    shortDescription:
      "A café pre-order platform for customized drinks, scheduled pickup, payment options, and real-time order tracking.",
    overview:
      "1PM Club helps customers order customized drinks, choose a pickup time, pay by QR or cash, and follow their order status. A role-based staff dashboard supports the day-to-day café workflow.",
    technologies: ["Next.js", "TypeScript", "Supabase", "PostgreSQL", "Tailwind CSS", "Nodemailer", "Vercel"],
    category: ["Full Stack"],
    featuredImage: "/projects/1PM/Screenshot (8).png",
    galleryImages: [
      "/projects/1PM/Screenshot (8).png",
      "/projects/1PM/Screenshot (9).png",
      "/projects/1PM/Screenshot (10).png",
      "/projects/1PM/Screenshot (11).png",
      "/projects/1PM/Screenshot (12).png",
      "/projects/1PM/Screenshot (13).png",
      "/projects/1PM/Screenshot (14).png",
      "/projects/1PM/Screenshot (15).png",
    ],
    websiteUrl: "https://1pmclub.vercel.app/",
    process:
      "The product evolved through customer ordering flows and a staff dashboard for menu management, order handling, reports, capacity control, and notifications.",
    challenges:
      "The system handles shared daily cup capacity, cutoff-based pickup slots, real-time order updates, guest tracking, email notifications, rate limiting, and reporting from filtered order data.",
    uiuxApproach:
      "The interface uses a bold editorial café style with clear selection states, responsive mobile navigation, accessible order progress indicators, and multiple themes across devices.",
    completionDate: "2026",
    featured: true,
    status: "completed",
    actions: [
      { label: "Visit Website", type: "website", url: "https://1pmclub.vercel.app/" },
      { label: "View Gallery", type: "gallery" },
    ],
  },
];

const projectOrder = ["motowatch", "taisync", "1pm-club", "sfs50", "postpal"];

export const projects = [...projectEntries].sort(
  (a, b) => projectOrder.indexOf(a.id) - projectOrder.indexOf(b.id)
);

export const getFeaturedProjects = () => projects.filter((p) => p.featured);
export const getProjectById = (id: string) => projects.find((p) => p.id === id);
export const getProjectsByCategory = (category: string) =>
  projects.filter((p) => p.category.includes(category));
