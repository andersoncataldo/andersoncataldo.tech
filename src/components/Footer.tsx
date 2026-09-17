import { GITHUB_URL, LINKEDIN_URL, WHATSAPP_URL } from '../config/links';
import { useLanguage } from '../context/LanguageContext';

const Footer = () => {
  const { t } = useLanguage();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="py-12 bg-apple-surface border-t border-slate-200 dark:border-slate-800 text-apple-secondary text-xs sm:text-sm">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="space-y-1 text-center md:text-left">
            <p className="font-bold text-apple-text">{t.footer.tagline}</p>
            <p className="text-apple-secondary text-xs">
              {t.footer.builtWith}
            </p>
            {/* text-apple-muted garante contraste ≥ 4.5:1 nos dois temas (WCAG AA ✅) */}
            <p className="text-[11px] text-apple-muted">
              © {currentYear} Anderson Cataldo. {t.footer.rights}
            </p>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-6 font-semibold">
            <a
              href="#inicio"
              className="text-apple-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              {t.footer.backToTop}
            </a>
            <a
              href={LINKEDIN_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={GITHUB_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              GitHub
            </a>
            <a
              href={WHATSAPP_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="text-apple-secondary hover:text-indigo-600 dark:hover:text-indigo-400 transition-colors"
            >
              WhatsApp
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
