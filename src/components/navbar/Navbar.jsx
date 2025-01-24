import MobileNavbar from "./MobileNavbar";
import useScrollTo from "../../utils/useScrollTo";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { navLinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";
import { useSelector } from "react-redux";

function Navbar() {
  const scrollToSection = useScrollTo(170);
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.shopping.inCart);

  return (
    <>
      <nav className="absolute left-0 right-0 top-0 z-30 flex h-[10vh] w-full items-center justify-between bg-transparent px-12 text-white">
        <p className="text-2xl">Logo</p>

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
                className="relative cursor-pointer px-5 py-2 text-xl transition duration-200 ease-in-out group-hover:before:scale-100"
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
