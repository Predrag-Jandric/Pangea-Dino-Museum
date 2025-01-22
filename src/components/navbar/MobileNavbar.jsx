import { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import useScrollTo from "../../utils/useScrollTo";
import { IoCloseOutline } from "react-icons/io5";
import {CgShoppingCart } from "react-icons/cg";
import { motion } from "framer-motion";
import { navLinks } from "../../utils/data";

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            "nav",
            { transform: "translateX(0)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.4 },
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
        ]
      : [
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          ["nav", { transform: "translateX(100%)" }, { at: "-0.1" }],
        ];

    // Button animations are independent
    const buttonAnimations = [
      [
        "path.top",
        { d: isOpen ? "M 3 16.5 L 17 2.5" : "M 2 2.5 L 20 2.5" },
        { ease: "easeOut", duration: 0.1 },
      ],
      [
        "path.middle",
        { opacity: isOpen ? 0 : 1 },
        { ease: "easeOut", duration: 0.1 },
      ],
      [
        "path.bottom",
        { d: isOpen ? "M 3 2.5 L 17 16.346" : "M 2 16.346 L 20 16.346" },
        { ease: "easeOut", duration: 0.1 },
      ],
    ];

    // Animate the button and menu separately
    animate([...buttonAnimations]);
    animate([...menuAnimations]);
  }, [animate, isOpen]);

  return scope;
}

export default function MobileNavbar({ isOpen, setIsOpen }) {
  const scrollToSection = useScrollTo(170);
  const [clickable, setClickable] = useState(true);
  const scope = useMenuAnimation(isOpen);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    if (isOpen) {
      document.body.style.overflow = "hidden";
      // document.body.classList.add("blur-background");
    } else {
      document.body.style.overflow = "auto";
      // document.body.classList.remove("blur-background");
    }

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [isOpen, setIsOpen]);

  const handleToggle = () => {
    if (!clickable) return;
    setClickable(false);
    setIsOpen((prev) => !prev);
    setTimeout(() => setClickable(true), 800);
  };

  return (
    <div ref={scope}>
      <nav className="fixed h-full text-white top-0 left-0 w-full bg-slate-700 pt-10 z-40  translate-x-full transition-colors">
        <ul className="flex flex-col gap-y-6 px-8 relative">
          <motion.div className="flex mb-4 px-5 justify-between items-center w-full">
            <p className="text-2xl hover:text-primary cursor-pointer"><CgShoppingCart /></p>
            <motion.div
              onClick={handleToggle}
              initial={{ scale: 1, opacity: 1 }}
              animate={
                isOpen
                  ? { scale: 1, opacity: 1, rotate: 0 }
                  : { scale: 0.7, opacity: 0, rotate: 90 }
              }
              transition={{ duration: 0.3, ease: "easeInOut" }}
            >
              <IoCloseOutline className="size-12 cursor-pointer hover:text-primary transition-colors" />
            </motion.div>
          </motion.div>
          {navLinks.map((link, index) => (
            <li key={index} className="relative flex w-full z-10 group">
              <a
                rel="noopener noreferrer"
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                  setIsOpen(false);
                }}
                className="text-3xl w-full py-2 px-5 cursor-pointer transition ease-in-out duration-200 relative group-hover:before:scale-100 hover:text-primary "
              >
                {link.label}
              </a>
              <span className="absolute top-full left-5 w-32 h-[3px] bg-primary scale-x-0 origin-left z-[-1] transition-transform ease-in-out duration-300 group-hover:scale-x-100"></span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
