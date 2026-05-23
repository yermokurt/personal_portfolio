export interface Capability {
  title: string;
  description: string;
  skills: string[];
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  capabilities: Capability[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "creative",
    title: "Creative Capabilities",
    description: "Design systems, visual storytelling, and user-centric branding processes.",
    capabilities: [
      {
        title: "UI/UX Design",
        description: "Designing intuitive, beautiful, and user-centric interfaces. Crafting clean layout mockups, high-fidelity design systems, and responsive prototypes in Figma.",
        skills: ["Figma", "Wireframing", "Design Systems", "Prototyping", "User Flows", "A/B Testing"],
      },
      {
        title: "Brand Identity",
        description: "Developing cohesive visual systems, logos, typography, vector assets, and visual directions that align design aesthetics with functional brand values.",
        skills: ["Typography", "Visual Systems", "Branding", "Visual Direction", "Vector Art", "Style Guides"],
      },
      {
        title: "Content Creation",
        description: "Authoring high-impact promotional graphics, typography layouts, social visual materials, and coherent visual content strategies.",
        skills: ["Social Media Design", "Content Strategy", "Marketing Visuals", "Layout Composition", "Visual Design"],
      },
      {
        title: "Creative Tools",
        description: "Leveraging standard graphics suites to edit professional vector shapes, manipulate photography, and design high-fidelity static assets.",
        skills: ["Adobe Photoshop", "Adobe Illustrator", "Digital Illustration", "Graphic Design", "Vector Graphics"],
      },
    ],
  },
  {
    id: "technical",
    title: "Technical Capabilities",
    description: "Frontend engineering, clean code structures, and full-stack software development environments.",
    capabilities: [
      {
        title: "Frontend Development",
        description: "Building fast, semantic, and highly interactive user interfaces. Constructing smooth transitions, modular components, and premium responsive layouts.",
        skills: ["React", "Next.js", "TypeScript", "Tailwind CSS", "Framer Motion", "HTML5 & CSS3", "JavaScript"],
      },
      {
        title: "Backend & Systems",
        description: "Designing structured database models, implementing server-side API routers, creating middleware, and managing runtime security environments.",
        skills: ["PHP", "MySQL", "Java", "Python", "Next.js API Routes", "Database Design", "SQL"],
      },
      {
        title: "Data & Analytics",
        description: "Sourcing business data parameters, styling analytical database models, cleaning data, and presenting metrics in interactive dashboards.",
        skills: ["Power BI", "Data Visualization", "Excel Reports", "Custom Dashboards", "Data Cleaning"],
      },
      {
        title: "Tools & Workflows",
        description: "Managing seamless project pipelines, automated continuous deployment environments, package builders, and responsive web debug testing.",
        skills: ["Git & GitHub", "Vercel", "NPM / Yarn", "Chrome DevTools", "Webflow", "Linux Bash"],
      },
    ],
  },
];
