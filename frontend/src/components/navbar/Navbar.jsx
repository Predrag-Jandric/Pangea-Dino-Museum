import MobileNavbar from "./MobileNavbar";
import useScrollTo from "../../utils/useScrollTo";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { navLinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";
import { useSelector } from "react-redux";

function Navbar() {
  const scrollToSection = useScrollTo(0);
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.shopping.inCart);

  return (
    <>
      <nav className="fixed md:absolute left-0 right-0 top-0 z-30 flex h-[10vh] w-full items-center justify-between  text-white pt-3 p-5 md:p-12">
        <div className="flex h-20 w-20 items-center font-pressStart md:text-base lg:text-xl text-primary">
          <img src="/logo.png" />
          <p className="hidden md:block">DiNostalgia</p>
        </div>
        <div className="flex">
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
                  className="text-secondary relative cursor-pointer px-5 py-2 lg:text-lg transition duration-200 ease-in-out group-hover:before:scale-100"
                >
                  {link.label}
                </a>
                <span className="bg-highlight absolute left-[10%] top-full z-[-1] h-[5%] w-[80%] scale-0 transition duration-300 ease-in-out group-hover:scale-100"></span>
              </li>
            ))}
          </ul>

          <Link
            to="/shoppingCartPage"
            className="relative hidden text-4xl md:flex"
          >
            <TfiShoppingCart className="text-primary hover:text-highlight ml-3 transition" />
            {cart.length > 0 && (
              <span className="absolute -top-1 right-2.5 flex size-5 animate-bounce items-center justify-center rounded-full bg-primary text-base text-light">
                {cart.length}
              </span>
            )}
          </Link>
          <CgMenu
            className="hover:text-highlight size-10 cursor-pointer transition-colors md:hidden"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>

      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;
