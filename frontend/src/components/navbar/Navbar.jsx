import MobileNavbar from "./MobileNavbar";
import useScrollTo from "../../utils/useScrollTo";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { navLinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";
import { useSelector } from "react-redux";
import logo from "../../assets/logo.png";

function Navbar() {
  const scrollToSection = useScrollTo(0);
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.shopping.inCart);

  return (
    <>
      <nav className="fixed md:absolute left-0 right-0 top-0 z-30 flex h-[10vh] w-full text-lg items-center justify-between text-white px-6 py-14">
        <div className="flex gap-4 h-20 w-20 items-center">
          <img src={logo} alt="logo" />
          <p className="text-2xl tracking-widest font-thin font-titles">
            Pangea
          </p>
        </div>
        <div className="flex">
          <div className="hidden md:flex">
            {navLinks.map((link, index) => (
              <a
                key={index}
                rel="noopener noreferrer"
                href={`#${link.href}`}
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
                className="relative flex items-center justify-center min-w-[7rem] px-5 py-2 cursor-pointer 
      transition duration-200 ease-in-out 
      before:absolute before:left-0 before:top-0 before:h-full before:w-full before:origin-left before:scale-x-0 
      before:bg-primaryHover before:transition-transform before:duration-300 before:ease-in-out 
      hover:before:scale-x-100 before:z-[-1]"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            to="/shoppingCartPage"
            className="relative right-0 transition-all hover:right-1.5 ml-4 hidden text-4xl md:flex"
          >
            <TfiShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 right-2.5 flex size-5 animate-bounce items-center justify-center font-bold text-sm text-dark rounded-full bg-alert">
                {cart.length}
              </span>
            )}
          </Link>
          <CgMenu
            className="hover:rotate-90 transition-all size-10 cursor-pointer md:hidden"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>

      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;
