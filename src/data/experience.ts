export interface ExperienceEntry {
  id: string;
  role: string;
  company: string;
  companyType: string;
  period: string;
  location?: string;
  description: string;
  highlights: string[];
  type: "work" | "internship" | "freelance" | "education";
}

export const experiences: ExperienceEntry[] = [
  {
    id: "freelance-graphic",
    role: "Freelance Graphic Designer",
    company: "Self-Employed",
    companyType: "Freelance",
    period: "2019 — Present",
    description:
      "Providing end-to-end graphic design services to clients across various industries including food and beverage, retail, and personal branding. Specializing in brand identity creation, social media design, and marketing materials.",
    highlights: [
      "Designed full brand identity systems for multiple local businesses",
      "Created high-converting social media content and ad creatives",
      "Managed client relationships from brief to final delivery",
      "Maintained consistent design quality across 20+ client projects",
    ],
    type: "freelance",
  },
  {
    id: "social-media-manager",
    role: "Social Media Page Manager",
    company: "Local Business Clients",
    companyType: "Contract",
    period: "2024 — 2025",
    description:
      "Managed social media presence for local business clients, handling content planning, design, scheduling, and performance analysis. Grew follower counts and improved engagement rates through consistent, on-brand content strategies.",
    highlights: [
      "Planned and executed monthly social media content calendars",
      "Designed branded post templates ensuring visual consistency",
      "Analyzed metrics and adjusted strategies to improve reach",
      "Collaborated with business owners to align content with goals",
    ],
    type: "work",
  },
  {
    id: "internship",
    role: "IT Intern",
    company: "Verafede Inc.",
    companyType: "Internship",
    period: "2026",
    description:
      "Completed a structured IT internship gaining hands-on experience with real-world systems, software development workflows, and professional team collaboration. Applied academic knowledge in a production environment.",
    highlights: [
      "Contributed to active development projects using HTML, CSS, and JavaScript",
      "Participated in code reviews and team stand-up meetings",
      "Documented technical processes and created system reports",
      "Applied UI/UX principles to internal tooling improvements",
    ],
    type: "internship",
  },
];
