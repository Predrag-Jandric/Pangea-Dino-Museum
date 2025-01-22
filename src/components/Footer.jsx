import { navLinks } from "../utils/data";
import useScrollTo from "../utils/useScrollTo";

function Footer() {
  const scrollToSection = useScrollTo();
  return (
    <footer className="bg-gray-800 text-white">
      <section className="container mx-auto flex flex-col justify-between gap-12 p-8 py-20 md:flex-row">
        {/* navigation  */}
        <article className="flex-1">
          <h3 className="mb-7 text-lg font-semibold">Navigation</h3>
          <div className="flex list-none flex-col gap-2">
            {navLinks.map((link) => (
              <li key={link.label}>
                <a
                  href={`#${link.href}`}
                  className="hover:underline"
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
          <h3 className="mb-7 text-lg font-semibold">Team</h3>
          <div className="flex flex-col gap-2">
            <a
              className="hover:underline"
              target="_blank"
              href="https://www.linkedin.com/in/estelle-couture-41422b47/"
            >
              Estelle Wraight - Product Owner
            </a>
            <a
              className="hover:underline"
              target="_blank"
              href="https://www.linkedin.com/in/promise-akabudu/"
            >
              Promise Akabudu - Product Owner
            </a>
            <a
              className="hover:underline"
              target="_blank"
              href="https://www.linkedin.com/in/afrah-ali-251264269/"
            >
              Afrah Ali - Scrum Master
            </a>
            <a
              className="hover:underline"
              target="_blank"
              href="https://github.com/Dayo1900"
            >
              Dayo Abdul - Developer
            </a>
            <a
              className="hover:underline"
              target="_blank"
              href="https://www.linkedin.com/in/predrag-jandric/"
            >
              Predrag Jandric - Developer
            </a>
            <a
              className="hover:underline"
              target="_blank"
              href="https://www.linkedin.com/in/gregminezzi"
            >
              Greg Minezzi - Developer
            </a>
            <a
              className="hover:underline"
              target="_blank"
              href="https://www.linkedin.com/in/ziad-shaarawy-629a5721b/"
            >
              Ziad Shaarawy - Developer
            </a>
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
