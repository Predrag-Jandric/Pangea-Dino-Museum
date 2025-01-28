import MobileNavbar from "./MobileNavbar";
import useScrollTo from "../../utils/useScrollTo";
import { useState } from "react";
import { CgMenu, CgShoppingCart } from "react-icons/cg";
import { navLinks } from "../../utils/data";

function Navbar() {
  const scrollToSection = useScrollTo();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-between h-[10vh] w-full absolute top-0 left-0 z-30 right-0 px-12 mt-3 text-white bg-transparent">
        <div className="text-2xl h-20 w-20"><img src="/logo.png"/></div>

        <ul className="relative hidden md:flex items-center justify-center gap-0 transition ease-in-out duration-200">
          {navLinks.map((link, index) => (
            <li key={index} className="relative flex w-full z-10 group">
              <a
                rel="noopener noreferrer"
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-lg py-2 px-5 cursor-pointer transition ease-in-out duration-200 relative group-hover:before:scale-100"
              >
                {link.label}
              </a>
              <span className="absolute top-full left-[10%] w-[80%] h-[5%] bg-primary scale-0 z-[-1] transition ease-in-out duration-300 group-hover:scale-100"></span>
            </li>
          ))}
        </ul>

        <p className="text-2xl hidden md:flex hover:text-primaryHover transition"><CgShoppingCart /></p>
        <CgMenu
          className="absolute md:hidden size-10 right-[7%] cursor-pointer hover:text-primary transition-colors"
          onClick={() => setIsOpen(true)}
        />
      </nav>

      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;
