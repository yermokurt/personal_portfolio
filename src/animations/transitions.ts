export const transitions = {
  // Premium easing — smooth deceleration
  premium: {
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    duration: 0.7,
  },
  // Bouncy spring feel
  bounceSoft: {
    ease: [0.34, 1.56, 0.64, 1] as [number, number, number, number],
    duration: 0.6,
  },
  // Quick snappy
  snappy: {
    ease: [0.25, 0.46, 0.45, 0.94] as [number, number, number, number],
    duration: 0.4,
  },
  // Slow cinematic
  cinematic: {
    ease: [0.22, 1, 0.36, 1] as [number, number, number, number],
    duration: 1.2,
  },
  // Ultra fast
  instant: {
    duration: 0.2,
    ease: "easeOut" as const,
  },
};

export const springConfig = {
  gentle: { type: "spring" as const, stiffness: 120, damping: 20 },
  responsive: { type: "spring" as const, stiffness: 300, damping: 30 },
  bouncy: { type: "spring" as const, stiffness: 400, damping: 25 },
  stiff: { type: "spring" as const, stiffness: 500, damping: 40 },
};

export const viewportConfig = {
  once: true,
  margin: "-80px",
};
