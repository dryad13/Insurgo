import { CONTENT } from '../content';

export default function Footer() {
  return (
    <footer className="relative z-10 border-t border-white/5">
      <div className="max-w-6xl mx-auto px-5 md:px-8 py-12">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-4">
            <img
              src="/logo.svg"
              alt="Insurgo"
              className="h-8 w-auto opacity-60"
            />
          </div>

          <p className="text-sm text-white/30">{CONTENT.footer.tagline}</p>

          <div className="flex gap-6">
            {CONTENT.footer.links.map((link) => (
              <a
                key={link}
                href={`#${link.toLowerCase()}`}
                className="text-xs text-white/30 hover:text-white/60 transition-colors"
              >
                {link}
              </a>
            ))}
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-white/5 text-center">
          <p className="text-xs text-white/30">
            &copy; {new Date().getFullYear()} Insurgo. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}
