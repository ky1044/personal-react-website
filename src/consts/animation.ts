const prefersReducedMotion = () => {
  if (typeof window !== "undefined") {
    return window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  }
  return false;
};

export const animationVariants = {
  container: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.5,
      },
    },
  },
  containerQuick: {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        duration: 1,
        staggerChildren: 0.25,
      },
    },
  },
  individual: {
    hidden: { y: 20, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.5 },
      },
    },
  },

  individualLarge: {
    hidden: { y: 50, opacity: 0 },
    show: {
      y: 0,
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.5 },
      },
    },
  },

  panDown: {
    hidden: { opacity: 0, height: 0 },
    show: {
      height: "auto",
      opacity: 1,
      transition: {
        y: { type: "spring", stiffness: 100, damping: 20 },
        opacity: { duration: 0.5 },
      },
    },
  },
};
