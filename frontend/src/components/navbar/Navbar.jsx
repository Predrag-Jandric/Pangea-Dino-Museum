import MobileNavbar from "./MobileNavbar";
import { useState } from "react";
import { CgMenu } from "react-icons/cg";
import { navLinks } from "../../utils/data";
import { Link } from "react-router-dom";
import { TfiShoppingCart } from "react-icons/tfi";
import { useSelector } from "react-redux";
import logo from "../../assets/hero/logo.png";

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const cart = useSelector((state) => state.shopping.inCart);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    const element = document.getElementById(href);
    if (element) {
      const topPosition = element.offsetTop - 70;
      window.scrollTo({
        top: topPosition,
        behavior: "smooth",
      });
      window.history.pushState(null, null, `#${href}`);
    }
  };

  function handleJumpToTop(e) {
    e.preventDefault();
    window.scrollTo({ top: 0, behavior: "smooth" });
  }

  return (
    <>
      <nav className="fixed z-40 flex h-[10vh] w-full items-center justify-between bg-primary bg-opacity-90 px-6 py-6 text-lg text-white shadow-custom backdrop-blur-sm">
        <Link
          onClick={handleJumpToTop}
          to="/"
          className="flex size-14 items-center gap-4"
        >
          <img src={logo} alt="logo" />
          <p className="font-titles text-2xl font-thin tracking-widest">
            Pangea
          </p>
        </Link>
        <div className="flex">
          <div className="hidden md:flex">
            {navLinks.map((link, index) => (
              <a
                key={index}
                rel="noopener noreferrer"
                href={`#${link.href}`}
                onClick={(e) => handleNavClick(e, link.href)}
                className="relative flex min-w-[7rem] cursor-pointer items-center justify-center px-5 py-2 transition-all duration-200 ease-in-out before:absolute before:left-0 before:top-0 before:z-[-1] before:h-full before:w-full before:origin-left before:scale-x-0 before:bg-primaryHover before:transition-transform before:duration-300 before:ease-in-out hover:before:scale-x-100"
              >
                {link.label}
              </a>
            ))}
          </div>

          <Link
            to="/shoppingCartPage"
            className="relative right-0 ml-4 hidden text-4xl transition-all hover:right-1.5 md:flex"
          >
            <TfiShoppingCart />
            {cart.length > 0 && (
              <span className="absolute -top-2 right-2.5 flex size-5 animate-bounce items-center justify-center rounded-full bg-alert text-sm font-bold text-white">
                {cart.length}
              </span>
            )}
          </Link>
          <CgMenu
            className="size-10 cursor-pointer transition-all hover:mr-1.5 md:hidden"
            onClick={() => setIsOpen(true)}
          />
        </div>
      </nav>

      <MobileNavbar isOpen={isOpen} setIsOpen={setIsOpen} />
    </>
  );
}

export default Navbar;
