import styles from "./Footer.module.css";

interface FooterLink {
  label: string;
  href: string;
  download?: boolean;
  external?: boolean;
}

const ELSEWHERE_LINKS: FooterLink[] = [
  {
    label: "Download CV",
    href: "/assets/Mykyta_Kashcheiev_CV.pdf",
    download: true,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/-nickkdigital/",
    external: true,
  },
  {
    label: "GitHub",
    href: "https://github.com/nikita343",
    external: true,
  },
];

const INDEX_LINKS: FooterLink[] = [
  { label: "Work", href: "#work" },
  { label: "Services", href: "#services" },
  { label: "About", href: "#about" },
  { label: "Booking", href: "#book" },
];

const renderLinkExtras = (l: FooterLink) => {
  if (l.download) return null;
  return <> ↗</>;
};

const linkProps = (l: FooterLink) => ({
  href: l.href,
  ...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {}),
  ...(l.download ? { download: true } : {}),
});

export const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="container">
        <div data-grid12="" className={styles.grid}>
          <div className={styles.contactCol}>
            <div className={`eyebrow ${styles.contactLabel}`}>
              <span className="num">[ END ]</span> ELSEWHERE
            </div>
            <h2 className={`display-md ${styles.heading}`}>
              Have a project?
              <br />
              <a
                href="mailto:nicksbureau@gmail.com"
                className={`link-line italic ${styles.headingLink}`}
              >
                Contact me now<span className="arr">↗</span>
              </a>
            </h2>
          </div>
          <div className={styles.linksCol}>
            <div className={`eyebrow ${styles.linksLabel}`}>ELSEWHERE</div>
            <ul className={styles.linksList}>
              {ELSEWHERE_LINKS.map((l) => (
                <li key={l.href}>
                  <a className="link-line" {...linkProps(l)}>
                    {l.label}
                    {renderLinkExtras(l)}
                    {l.download && <span className={styles.cvBadge}>PDF</span>}
                  </a>
                </li>
              ))}
            </ul>
          </div>
          <div className={styles.linksCol}>
            <div className={`eyebrow ${styles.linksLabel}`}>INDEX</div>
            <ul className={styles.linksList}>
              {INDEX_LINKS.map((l) => (
                <li key={l.href}>
                  <a className="link-line" {...linkProps(l)}>
                    {l.label} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className={styles.wordmark}>
          Mykyta<span className={styles.wordmarkDot}>.</span>
        </div>

        <div className={styles.copyright}>
          <span>© 2026 Mykyta K. — All rights reserved</span>
        </div>
      </div>
    </footer>
  );
};
