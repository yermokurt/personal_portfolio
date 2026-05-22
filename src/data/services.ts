export interface Service {
  id: string;
  title: string;
  description: string;
  icon: string;
  features: string[];
  accent?: string;
}

export const services: Service[] = [
  {
    id: "uiux",
    title: "UI/UX Design",
    description:
      "Crafting intuitive, beautiful interfaces that balance aesthetics with usability. From wireframes to high-fidelity prototypes — I design experiences users love.",
    icon: "HiOutlineSparkles",
    features: [
      "User research & persona mapping",
      "Wireframing & prototyping",
      "High-fidelity UI design",
      "Design system creation",
      "Usability testing",
    ],
  },
  {
    id: "frontend",
    title: "Frontend Development",
    description:
      "Building fast, responsive, and accessible web applications with modern frameworks. Clean code architecture with a focus on performance and user experience.",
    icon: "HiOutlineCode",
    features: [
      "React & Next.js development",
      "Responsive layouts",
      "Animation & interaction",
      "API integration",
      "Performance optimization",
    ],
  },
  {
    id: "branding",
    title: "Branding Design",
    description:
      "Developing cohesive brand identities that communicate your value. From logo design to complete brand systems that make your business unforgettable.",
    icon: "HiOutlineLightBulb",
    features: [
      "Logo & mark design",
      "Brand color palettes",
      "Typography selection",
      "Brand guidelines",
      "Visual identity systems",
    ],
  },
  {
    id: "portfolio",
    title: "Portfolio Website Design",
    description:
      "Designing stunning portfolio websites that get you noticed. Premium, conversion-focused layouts that showcase your work at the highest level.",
    icon: "HiOutlineDesktopComputer",
    features: [
      "Custom premium designs",
      "Framer Motion animations",
      "SEO optimization",
      "Mobile-first approach",
      "Fast delivery",
    ],
  },
  {
    id: "social",
    title: "Social Media Design",
    description:
      "Creating scroll-stopping social media visuals and consistent content systems that build brand recognition and drive engagement across platforms.",
    icon: "HiOutlinePhotograph",
    features: [
      "Post & story templates",
      "Content calendar design",
      "Reel thumbnail creation",
      "Ad creatives",
      "Platform-specific optimization",
    ],
  },
];
