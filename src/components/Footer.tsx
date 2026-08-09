import { GITHUB_URL, LINKEDIN_URL } from '../config/links';

const Footer = () => {
  const currentYear = new Date().getFullYear();
  
  return (
    <footer className="py-12 bg-apple-bg dark:bg-slate-950 border-t border-apple dark:border-white/10">
      <div className="section-container">
        <div className="flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="text-apple-secondary text-sm font-medium">
            <p>© {currentYear} Anderson Cataldo. Todos os direitos reservados.</p>
          </div>
          <div className="flex gap-8">
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer" className="text-apple-secondary hover:text-apple-text text-sm font-bold transition-colors">LinkedIn</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer" className="text-apple-secondary hover:text-apple-text text-sm font-bold transition-colors">GitHub</a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
