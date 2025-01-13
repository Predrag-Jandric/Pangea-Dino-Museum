import MobileNavbar from "./MobileNavbar";
import useScrollTo from "../../utils/useScrollTo";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { navLinks } from "../../utils/data";

function Navbar() {
  const scrollToSection = useScrollTo(170);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <nav className="flex items-center justify-center h-[10vh] px-32 w-full absolute top-0 left-0 right-0 md:px-12">
        <ul className="relative hidden sm:flex items-center justify-center gap-0 transition ease-in-out duration-200">
          {navLinks.map((link, index) => (
            <li key={index} className="relative flex w-full z-10 group">
              <a
                rel="noopener noreferrer"
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="text-white text-xl py-2 px-5 cursor-pointer transition ease-in-out duration-200 relative group-hover:before:scale-100"
              >
                {link.label}
              </a>
              <span className="absolute top-full left-[10%] w-[80%] h-[5%] bg-primary scale-0 z-[-1] transition ease-in-out duration-300 group-hover:scale-100"></span>
            </li>
          ))}
        </ul>
        <CgMenu
          className="absolute sm:hidden size-10 top-[30%] right-[7%] cursor-pointer hover:text-primary transition-colors"
          onClick={() => setIsOpen(true)}
        />
      </nav>

      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;
