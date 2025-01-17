function Footer() {
  return (
    <footer className="bg-gray-800 text-white">
      <section className="container mx-auto flex flex-col md:flex-row justify-between gap-12 p-8 py-20">
        {/* navigation  */}
        <article className="flex-1">
          <h3 className="text-lg font-semibold mb-7">Navigation</h3>
          <div className="flex flex-col gap-2 list-none">
            {/* needs to be mapped over in the future with data from data.js */}
            <li>
              <a href="#" className="hover:underline">
                Link1
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Link2
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Link3
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Link4
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Link6
              </a>
            </li>
            <li>
              <a href="#" className="hover:underline">
                Link7
              </a>
            </li>
          </div>
        </article>

        {/* team */}
        <article className="flex-1">
          <h3 className="text-lg font-semibold mb-7">Team</h3>
          <div className="flex flex-col gap-2">
            <a
              className="hover:underline"
              target="_blank"
              href="https://www.linkedin.com/in/evaristocaraballo/"
            >
              Evaristo Caraballo - Product Owner
            </a>
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
        <article className="flex-1 flex flex-col gap-2">
          <h3 className="text-lg font-semibold mb-7">Organisation</h3>
          <a target="_blank" href="https://www.chingu.io/">
            <img
              src="src/assets/chingu-logo.png"
              className="h-16"
              alt="chingu logo"
            />
          </a>

          <p className="text-gray-400 mt-4">
            This project was built by Team 33 as part of the Chingu Voyage 53.
            Chingu is a global collaboration platform and coding community.
          </p>

          <a
            className="text-gray-400 mt-4"
            href="https://github.com/chingu-voyages/V53-tier3-team-33"
          >
            {" "}
            GitHub Repo
          </a>
        </article>
      </section>

      <p className="bg-slate-900 text-slate-300 h-12 flex items-center justify-center">
        &copy; {new Date().getFullYear()} Chingu. All rights reserved.
      </p>
    </footer>
  );
}

export default Footer;
