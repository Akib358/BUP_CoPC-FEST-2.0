export const useScrollReveal = (delay = 0) => {
  return {
    hidden: { opacity: 0, y: 35 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 70,
        damping: 15,
        delay: delay,
      }
    }
  };
};