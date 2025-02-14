import { useCallback } from "react";

function useScrollTo(offset = 0) {
  const scrollToSection = useCallback(
    (targetId) => {
      const target = document.getElementById(targetId);
      if (target) {
        const topPosition = target.offsetTop - offset;
        window.scrollTo({
          top: topPosition,
          behavior: "smooth",
        });
      }
    },
    [offset]
  );

  return scrollToSection;
}

export default useScrollTo;
