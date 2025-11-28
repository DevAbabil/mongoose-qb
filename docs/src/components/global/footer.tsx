import Logo from "./logo";

const Footer = () => {
  const currentYear = new Date().getFullYear();

  const footerSections = [
    {
      title: "Resources",
      links: [
        {
          label: "mongoose-qb on npm",
          href: "https://www.npmjs.com/package/mongoose-qb",
        },
        {
          label: "Mongoose Docs",
          href: "https://mongoosejs.com/docs/",
        },
        { label: "DevAbabil", href: "https://devababil.com" },
      ],
    },
    {
      title: "Community",
      links: [
        {
          label: "GitHub Repository",
          href: "https://github.com/devababil/mongoose-qb",
        },
        {
          label: "Report Issues",
          href: "https://github.com/devababil/mongoose-qb/issues",
        },
        {
          label: "Discussions",
          href: "https://github.com/devababil/mongoose-qb/discussions",
        },
      ],
    },
    {
      title: "About",
      links: [
        {
          label: "MIT License",
          href: "https://github.com/DevAbabil/mongoose-qb/blob/master/LICENSE",
        },
        { label: "DevAbabil Team", href: "https://github.com/DevAbabil" },
        {
          label: "Contributing",
          href: "https://github.com/devababil/mongoose-qb",
        },
      ],
    },
  ];

  return (
    <footer className="border-t border-border/40 bg-muted/30 space-y-5">
      <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 lg:px-8">
        {/* Main footer grid */}
        <div className="grid gap-8 md:grid-cols-4">
          <div className="space-y-3">
            <div className="flex items-center gap-2">
              <Logo width={32} height={32} />
              <h3 className="font-semibold">mongoose-qb</h3>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              A powerful and extensible query builder for Mongoose with full
              TypeScript support.
            </p>
          </div>

          {/* Dynamic footer sections */}
          {footerSections.map((section) => (
            <div key={section.title} className="space-y-3">
              <h4 className="text-sm font-semibold text-foreground">
                {section.title}
              </h4>
              <ul className="space-y-2">
                {section.links.map((link) => (
                  <li key={link.label}>
                    <a
                      href={link.href}
                      target={
                        link.href.startsWith("http") ? "_blank" : undefined
                      }
                      rel={
                        link.href.startsWith("http")
                          ? "noopener noreferrer"
                          : undefined
                      }
                      className="text-sm text-muted-foreground hover:text-foreground hover:text-brand-500 transition-colors duration-200"
                    >
                      {link.label}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>

        {/* Bottom section */}
        <div className="flex flex-col items-center justify-between gap-4 border-t border-border/40 pt-8 text-sm text-muted-foreground sm:flex-row mt-8">
          <div className="text-center sm:text-left">
            <p>MIT License © {currentYear} DevAbabil</p>
            <p className="text-xs">
              Built with ❤️ by{" "}
              <a
                href="https://github.com/DevAbabil"
                target="_blank"
                rel="noopener noreferrer"
                className="hover:text-foreground transition-colors"
              >
                DevAbabil
              </a>
            </p>
          </div>
          <div className="flex gap-6">
            <a
              href="https://github.com/devababil/mongoose-qb"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              GitHub
            </a>
            <a
              href="https://www.npmjs.com/package/mongoose-qb"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              npm
            </a>
            <a
              href="https://devababil.com"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:text-foreground transition-colors"
            >
              Website
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
