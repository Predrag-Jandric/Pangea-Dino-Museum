import { useState, useEffect } from "react";
import { useAnimate, stagger } from "framer-motion";
import useScrollTo from "../../utils/useScrollTo";
import { IoCloseOutline } from "react-icons/io5";
import {CgShoppingCart } from "react-icons/cg";
import { motion } from "framer-motion";
import { navLinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";
import { useSelector } from "react-redux";

function useMenuAnimation(isOpen) {
  const [scope, animate] = useAnimate();

  useEffect(() => {
    const menuAnimations = isOpen
      ? [
          [
            "nav",
            { transform: "translateX(0)" },
            { ease: [0.08, 0.65, 0.53, 0.96], duration: 0.3 },
          ],
          [
            "li",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: stagger(0.05), at: "-0.1" },
          ],
          [
            ".cart-icon",
            { transform: "scale(1)", opacity: 1, filter: "blur(0px)" },
            { delay: 0, duration: 0.2, at: "-0.3" },
          ],
        ]
      : [
          [
            "li",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { delay: stagger(0.05, { from: "last" }), at: "<" },
          ],
          ["nav", { transform: "translateX(100%)" }, { at: "-0.1" }],
          [
            ".cart-icon",
            { transform: "scale(0.5)", opacity: 0, filter: "blur(10px)" },
            { duration: 0.2, at: "<" },
          ],
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
  const scrollToSection = useScrollTo();
  const [clickable, setClickable] = useState(true);
  const scope = useMenuAnimation(isOpen);
  const cart = useSelector((state) => state.shopping.inCart);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 768) {
        setIsOpen(false);
      }
    };
    window.addEventListener("resize", handleResize);

    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
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
      <nav className="fixed left-0 top-0 z-40 h-full w-full translate-x-full bg-dark/80 pt-10 text-white transition-colors">
        <ul className="relative flex flex-col gap-y-6 px-8">
          <motion.div className="mb-4 flex w-full items-center justify-between px-5">
            <Link
              to="/shoppingCartPage"
              className="cart-icon relative mr-auto text-4xl"
            >
              <TfiShoppingCart className="text-secondary transition hover:text-highlight" />
              {cart.length > 0 && (
                <span className="absolute -top-1 right-2.5 flex h-5 w-5 animate-bounce items-center justify-center rounded-full bg-red-500 text-xs text-white">
                  {cart.length}
                </span>
              )}
            </Link>

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
              <IoCloseOutline className="size-12 cursor-pointer hover:text-primaryHover transition-colors" />
            </motion.div>
          </motion.div>
          {navLinks.map((link, index) => (
            <li key={index} className="group relative z-10 flex w-full">
              <a
                rel="noopener noreferrer"
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                  setIsOpen(false);
                }}
                className="relative w-full cursor-pointer px-5 py-2 text-3xl transition duration-200 ease-in-out hover:text-secondary text-secondary group-hover:before:scale-100"
              >
                {link.label}
              </a>
              <span className="absolute left-5 top-full z-[-1] h-[3px] w-32 origin-left scale-x-0 bg-highlight transition-transform duration-300 ease-in-out group-hover:scale-x-100"></span>
            </li>
          ))}
        </ul>
      </nav>
    </div>
  );
}
