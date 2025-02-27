import { navLinks } from "../utils/data.js";
import useScrollTo from "../utils/useScrollTo.js";
import { teamMembers } from "../utils/data.js";

function Footer() {
  const scrollToSection = useScrollTo();
  return (
    <footer className="bg-primary text-white">
      <section className="container mx-auto flex flex-col justify-between gap-12 p-8 py-20 md:flex-row">
        {/* navigation  */}
        <article className="flex-1">
          <h3 className="mb-7 text-xl tracking-widest font-normal font-titles">
            Navigation
          </h3>
          <div className="h-full flex list-none flex-col gap-3">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={`#${link.href}`}
                  className="hover:pl-2 transition-all"
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                >
                  {link.label}
                </a>
              </li>
            ))}
          </div>
        </article>

        {/* team */}
        <article className="flex-1">
          <h3 className="mb-7 text-xl tracking-widest font-normal font-titles">
            Team
          </h3>
          <div className="flex flex-col gap-3">
            {teamMembers.map((member, index) => (
              <a key={index} className="underline hover:pl-2 transition-all" target="_blank" href={member.link}>
                {member.name} - {member.role}
              </a>
            ))}
          </div>
        </article>

        {/* chingu */}
        <article className="flex flex-1 flex-col gap-3">
          <h3 className="mb-7 text-xl tracking-widest font-normal font-titles">
            Organisation
          </h3>
          <a className="hover:pl-2 transition-all" target="_blank" href="https://www.chingu.io/">
            <img src="/chingu-logo.png" className="h-16" alt="chingu logo" />
          </a>

          <p className="mt-4">
            This project was built by Chingu Team 33.
            Chingu is a global collaboration platform and coding community.
          </p>
        </article>
      </section>
    </footer>
  );
}

export default Footer;
