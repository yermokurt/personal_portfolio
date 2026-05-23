export interface Achievement {
  id: string;
  value: string;
  label: string;
  description: string;
  icon: string;
}

export const achievements: Achievement[] = [
  {
    id: "projects",
    value: "15+",
    label: "Projects Completed",
    description: "Delivered across design, development, and branding",
    icon: "HiOutlineCollection",
  },
  {
    id: "clients",
    value: "15+",
    label: "Satisfied Clients",
    description: "Freelance and contract projects across multiple industries",
    icon: "HiOutlineUsers",
  },
  {
    id: "experience",
    value: "4+",
    label: "Total Years Experience",
    description: "In graphic design, UI/UX, and frontend development",
    icon: "HiOutlineClock",
  },
  {
    id: "skills",
    value: "20+",
    label: "Technical Skills",
    description: "Spanning design tools, frameworks, and programming languages",
    icon: "HiOutlineLightningBolt",
  },
];
