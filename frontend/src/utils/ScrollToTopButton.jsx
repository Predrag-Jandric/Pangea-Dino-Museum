import { useEffect, useState } from "react";
import { GrLinkTop } from "react-icons/gr";

export default function ScrollToTopButton() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const toggleVisibility = () => {
      if (window.pageYOffset > 600) {
        setIsVisible(true);
      } else {
        setIsVisible(false);
      }
    };

    window.addEventListener("scroll", toggleVisibility);

    return () => window.removeEventListener("scroll", toggleVisibility);
  }, []);

  function handleJumpToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <button
      type="button"
      onClick={handleJumpToTop}
      className={`fixed bottom-10 right-1 z-35 rounded-full border border-primary bg-white p-3.5 text-black sm:hover:mb-1 shadow-md transition-all duration-300 hover:bg-white sm:hover:text-primary ${
        isVisible ? "opacity-100" : "opacity-0"
      }`}
      aria-label="Scroll to top"
      title="To top"
    >
      <GrLinkTop />
    </button>
  );
}