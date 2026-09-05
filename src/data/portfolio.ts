export const profile = {
  name: "Kurt Collin G. Yermo",
  shortName: "Kurt Yermo",
  role: "Designer & Developer",
  introduction: "Building practical digital products, web systems, and AI-assisted tools.",
  about: [
    "I’m Kurt — an IT student who designs and builds web products around the people who will use them.",
    "My background spans UI/UX design, frontend engineering, brand identity, and content creation. It helps me carry a project from its visual direction through to the working interface.",
    "I enjoy translating messy requirements into focused user flows, reusable components, and visual systems that fit the job at hand.",
  ],
  practices: ["Design", "Development", "Systems"],
};

export const applications = [
  { id: "work", title: "Work", description: "Project files & case studies", code: "01" },
  { id: "about", title: "About", description: "The person behind the work", code: "02" },
  { id: "experience", title: "Experience", description: "A log of professional work", code: "03" },
  { id: "tech", title: "Tech Explorer", description: "Tools connected to projects", code: "04" },
  { id: "resume", title: "Resume.pdf", description: "View my professional resume", code: "05" },
  { id: "contact", title: "Contact", description: "Start a conversation", code: "06" },
  { id: "browser", title: "Browser", description: "A directory of portfolio destinations", code: "07" },
  { id: "playground", title: "Playground", description: "Small games and experiments", code: "08" },
  { id: "terminal", title: "Terminal", description: "A simulated KurtOS portfolio shell", code: "09" },
] as const;

export type AppId = (typeof applications)[number]["id"];
export function isAppId(value: string | null): value is AppId {
  return applications.some((app) => app.id === value);
}
