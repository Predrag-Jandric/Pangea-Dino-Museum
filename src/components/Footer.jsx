import { navLinks } from "../utils/data";
import useScrollTo from "../utils/useScrollTo";
import { teamMembers } from "../utils/data.js";

function Footer() {
  const scrollToSection = useScrollTo(170);
  return (
    <footer className="bg-gray-800 text-white">
      <section className="container mx-auto flex flex-col justify-between gap-12 p-8 py-20 md:flex-row">
        {/* navigation  */}
        <article className="flex-1">
          <h3 className="mb-7 text-lg font-semibold">Navigation</h3>
          <ul className="flex list-none flex-col gap-2">
            {navLinks.map((link, index) => (
              <li key={index} className="">
                <a
                  rel="noopener noreferrer"
                  href={`#${link.href}`}
                  onClick={(e) => {
                    e.preventDefault();
                    scrollToSection(link.href);
                  }}
                  className="cursor-pointer transition hover:underline"
                >
                  {link.label}
                </a>
              </li>
            ))}
          </ul>
        </article>

        {/* team */}
        <article className="flex-1">
          <h3 className="mb-7 text-lg font-semibold">Team</h3>
          <div className="flex flex-col gap-2">
            {teamMembers.map((member, index) => (
              <a
                key={index}
                className="hover:underline"
                target="_blank"
                href={member.link}
              >
                {member.name} - {member.role}
              </a>
            ))}
          </div>
        </article>

        {/* chingu */}
        <article className="flex flex-1 flex-col gap-2">
          <h3 className="mb-7 text-lg font-semibold">Organisation</h3>
          <a target="_blank" href="https://www.chingu.io/">
            <img
              src="src/assets/chingu-logo.png"
              className="h-16"
              alt="chingu logo"
            />
          </a>

          <p className="mt-4 text-gray-400">
            This project was built by Team 33 as part of the Chingu Voyage 53.
            Chingu is a global collaboration platform and coding community.
          </p>

          <a
            className="mt-4 text-gray-400"
            href="https://github.com/chingu-voyages/V53-tier3-team-33"
          >
            {" "}
            GitHub Repo
          </a>
        </article>
      </section>

      <p className="flex h-12 items-center justify-center bg-slate-900 text-slate-300">
        &copy; {new Date().getFullYear()} Chingu. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
