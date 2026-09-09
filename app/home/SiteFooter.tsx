import { ArrowUpRight, Code, Mail } from 'lucide-react';

// HOMEPAGE COPY: Edit contact and credit text here.
export function SiteFooter() {
  return (
    <footer>
      <p>
        Collected, preserved, and reimagined by Michael Lane—with gratitude and
        unreasonable affection.
      </p>
      <div className="footer-links">
        <a href="mailto:hello@newzork.ai">
          <Mail size={14} /> Contact Michael
        </a>
        <a
          href="https://github.com/arsindelve/ZorkAI"
          target="_blank"
          rel="noreferrer"
        >
          <Code size={14} /> ZorkAI on GitHub <ArrowUpRight size={14} />
        </a>
      </div>
    </footer>
  );
}
