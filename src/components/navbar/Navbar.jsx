import MobileNavbar from "./MobileNavbar";
import useScrollTo from "../../utils/useScrollTo";
import { useState } from "react";
import { CgMenu, CgShoppingCart } from "react-icons/cg";
import { navLinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";
import { useSelector } from "react-redux";

function Navbar() {
  const scrollToSection = useScrollTo();
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.shopping.inCart);

  return (
    <>
      <nav className="flex items-center justify-between h-[10vh] w-full absolute top-0 left-0 z-30 right-0 px-12 mt-3 text-white bg-transparent">
        <div className="text-2xl h-20 w-20"><img src="/logo.png"/></div>

        <ul className="relative hidden items-center justify-center gap-0 transition duration-200 ease-in-out md:flex">
          {navLinks.map((link, index) => (
            <li key={index} className="group relative z-10 flex w-full">
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
              <span className="absolute left-[10%] top-full z-[-1] h-[5%] w-[80%] scale-0 bg-primary transition duration-300 ease-in-out group-hover:scale-100"></span>
            </li>
          ))}
        </ul>

        <Link to="/shoppingCartPage" className="relative ml-auto text-4xl hidden md:flex">
          <TfiShoppingCart className="text-white transition hover:text-primaryHover" />
          {cart.length > 0 && (
            <span className="absolute -top-1 right-2.5 flex size-5 animate-bounce items-center justify-center rounded-full bg-red-500 text-base text-white">
              {cart.length}
            </span>
          )}
        </Link>
        <CgMenu
          className="absolute right-[7%] top-[30%] size-10 cursor-pointer transition-colors hover:text-primary md:hidden"
          onClick={() => setIsOpen(true)}
        />
      </nav>

      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;
