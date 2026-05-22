export interface Skill {
  name: string;
  icon?: string;
  level?: "beginner" | "intermediate" | "advanced" | "expert";
}

export interface SkillCategory {
  id: string;
  title: string;
  description: string;
  skills: Skill[];
}

export const skillCategories: SkillCategory[] = [
  {
    id: "creative",
    title: "Creative Skills",
    description: "Design, branding, and visual communication expertise",
    skills: [
      { name: "Graphic Design", level: "advanced" },
      { name: "UI/UX Design", level: "advanced" },
      { name: "Branding & Identity", level: "advanced" },
      { name: "Typography", level: "expert" },
      { name: "Social Media Design", level: "expert" },
      { name: "Content Creation", level: "advanced" },
      { name: "Figma", level: "advanced" },
      { name: "Adobe Photoshop", level: "intermediate" },
    ],
  },
  {
    id: "technical",
    title: "Technical Skills",
    description: "Frontend engineering and full-stack development capabilities",
    skills: [
      { name: "HTML", level: "expert" },
      { name: "CSS", level: "expert" },
      { name: "JavaScript", level: "advanced" },
      { name: "TypeScript", level: "intermediate" },
      { name: "React", level: "advanced" },
      { name: "Next.js", level: "advanced" },
      { name: "Tailwind CSS", level: "expert" },
      { name: "PHP", level: "intermediate" },
      { name: "SQL", level: "intermediate" },
      { name: "Java", level: "intermediate" },
      { name: "Git & GitHub", level: "advanced" },
      { name: "Power BI", level: "intermediate" },
    ],
  },
];
