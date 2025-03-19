import { navLinks } from "../utils/data.js";
import useScrollTo from "../utils/useScrollTo.js";
import { teamMembers } from "../utils/data.js";
import chinguLogo from "../assets/chingu-logo.png";
import { Link } from "react-router-dom";

function Footer() {
  const scrollToSection = useScrollTo();
  return (
    <footer className="bg-primary text-white">
      <section className="container mx-auto flex flex-col justify-between gap-12 px-6 py-20 md:flex-row xl:px-8">
        {/* navigation  */}
        <article className="flex-1">
          <h3 className="mb-7 font-titles text-xl font-normal tracking-widest">
            Navigation
          </h3>
          <div className="flex h-full list-none flex-col gap-3">
            {navLinks.map((link) => (
              <a
                key={link.label}
                href={`#${link.href}`}
                className="w-20 transition-all hover:pl-2"
                onClick={(e) => {
                  e.preventDefault();
                  scrollToSection(link.href);
                }}
              >
                {link.label}
              </a>
            ))}
            <Link
              to="/shoppingCartPage"
              className="w-fit transition-all hover:pl-2"
            >
              Shopping Cart
            </Link>
          </div>
        </article>

        {/* team */}
        <article className="flex-1">
          <h3 className="mb-7 font-titles text-xl font-normal tracking-widest">
            Team
          </h3>
          <div className="flex flex-col gap-3">
            {teamMembers.map((member, index) => (
              <a
                key={index}
                className="w-fit transition-all hover:pl-2"
                target="_blank"
                href={member.link}
              >
                {member.name} - {member.role}
              </a>
            ))}
          </div>
        </article>

        {/* chingu */}
        <article className="flex flex-1 flex-col gap-3">
          <h3 className="mb-7 font-titles text-xl font-normal tracking-widest">
            Organisation
          </h3>
          <a
            className="transition-all hover:pl-2"
            target="_blank"
            href="https://www.chingu.io/"
          >
            <img src={chinguLogo} className="h-16" alt="chingu logo" />
          </a>

          <p className="mt-4">
            This project was built by Chingu Team 33. Chingu is a global
            collaboration platform and coding community.
          </p>
        </article>
      </section>
    </footer>
  );
}

export default Footer;
