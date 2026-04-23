import { useEffect, useState } from 'react';
import { CONTENT } from '../content.js';

const SECTION_IDS = CONTENT.nav.links.map((l) => l.href.replace(/^#/, ''));

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeId, setActiveId] = useState(null);
  const [progress, setProgress] = useState(0); // 0..1

  // Scroll + progress
  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY;
      setScrolled(y > 8);

      const doc = document.documentElement;
      const max = Math.max(doc.scrollHeight - doc.clientHeight, 1);
      setProgress(Math.min(1, Math.max(0, y / max)));
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    window.addEventListener('resize', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onScroll);
    };
  }, []);

  // Scroll-spy: highlight whichever section currently owns the center of the viewport.
  useEffect(() => {
    const targets = SECTION_IDS.map((id) => document.getElementById(id)).filter(Boolean);
    if (!targets.length) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const viewportBandCenter = window.innerHeight * 0.42;
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => {
            const ac = (a.boundingClientRect.top + a.boundingClientRect.bottom) / 2;
            const bc = (b.boundingClientRect.top + b.boundingClientRect.bottom) / 2;
            const ad = Math.abs(ac - viewportBandCenter);
            const bd = Math.abs(bc - viewportBandCenter);
            if (ad !== bd) return ad - bd;
            return b.intersectionRatio - a.intersectionRatio;
          });
        if (visible[0]) setActiveId(visible[0].target.id);
      },
      {
        // Trigger band: middle strip of viewport to reduce edge flicker.
        rootMargin: '-28% 0px -42% 0px',
        threshold: [0.2, 0.45, 0.7, 1],
      },
    );

    targets.forEach((t) => observer.observe(t));
    return () => observer.disconnect();
  }, []);

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 20,
        background: scrolled ? 'rgba(15, 16, 17, 0.82)' : 'rgba(10, 10, 15, 0.0)',
        backdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(14px) saturate(140%)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        transition: 'background 180ms ease, border-color 180ms ease, backdrop-filter 180ms ease',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: 64,
        }}
      >
        <a
          href="#top"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 8,
            color: 'var(--text-primary)',
            fontWeight: 590,
            fontSize: 15,
            letterSpacing: '-0.2px',
          }}
        >
          <img
            src="/logo.svg"
            alt="Insurgo"
            style={{
              height: 44,
              width: 'auto',
              objectFit: 'contain',
              filter: 'drop-shadow(0 0 10px rgba(251, 12, 12, 0.22))',
            }}
          />
        </a>

        <nav
          aria-label="Primary"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 28,
          }}
          className="nav-desktop"
        >
          {CONTENT.nav.links.map((l) => {
            const id = l.href.replace(/^#/, '');
            const isActive = activeId === id;
            return (
              <a
                key={l.href}
                href={l.href}
                aria-current={isActive ? 'true' : undefined}
                style={{
                  position: 'relative',
                  fontSize: 14,
                  fontWeight: 510,
                  color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                  transition: 'color 140ms ease',
                  paddingBottom: 2,
                }}
              >
                {l.label}
                <span
                  aria-hidden
                  style={{
                    position: 'absolute',
                    left: 0,
                    right: 0,
                    bottom: -4,
                    height: 2,
                    borderRadius: 2,
                    background: 'var(--accent)',
                    transform: isActive ? 'scaleX(1)' : 'scaleX(0)',
                    transformOrigin: 'left center',
                    transition: 'transform 220ms cubic-bezier(0.22, 1, 0.36, 1)',
                  }}
                />
              </a>
            );
          })}
        </nav>

        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <a
            href={CONTENT.nav.cta.href}
            className="btn btn-primary"
            style={{ padding: '8px 14px' }}
          >
            {CONTENT.nav.cta.label}
          </a>
          <button
            type="button"
            aria-label="Toggle menu"
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((v) => !v)}
            className="nav-mobile-toggle"
            style={{
              background: 'rgba(255,255,255,0.03)',
              border: '1px solid var(--border-standard)',
              borderRadius: 6,
              padding: 8,
              color: 'var(--text-primary)',
              display: 'none',
              cursor: 'pointer',
            }}
          >
            <svg
              width="16"
              height="16"
              viewBox="0 0 16 16"
              fill="none"
              stroke="currentColor"
              strokeWidth="1.5"
            >
              {menuOpen ? (
                <path d="M3 3l10 10M13 3L3 13" />
              ) : (
                <path d="M2 5h12M2 8h12M2 11h12" />
              )}
            </svg>
          </button>
        </div>
      </div>

      {/* Scroll-progress bar — bottom 1px of the header */}
      <div
        aria-hidden
        style={{
          position: 'absolute',
          left: 0,
          bottom: 0,
          height: 1,
          width: `${progress * 100}%`,
          background:
            'linear-gradient(90deg, transparent, var(--accent) 30%, var(--accent) 70%, transparent)',
          opacity: progress > 0.005 ? 0.9 : 0,
          transition: 'opacity 160ms ease',
          pointerEvents: 'none',
        }}
      />

      {menuOpen && (
        <div
          className="nav-mobile-panel"
          style={{
            borderTop: '1px solid var(--border-subtle)',
            background: 'rgba(15, 16, 17, 0.96)',
            backdropFilter: 'blur(12px)',
          }}
        >
          <div
            className="container"
            style={{
              display: 'flex',
              flexDirection: 'column',
              gap: 4,
              padding: '12px 0 16px',
            }}
          >
            {CONTENT.nav.links.map((l) => {
              const id = l.href.replace(/^#/, '');
              const isActive = activeId === id;
              return (
                <a
                  key={l.href}
                  href={l.href}
                  onClick={() => setMenuOpen(false)}
                  aria-current={isActive ? 'true' : undefined}
                  style={{
                    padding: '10px 0',
                    color: isActive ? 'var(--text-primary)' : 'var(--text-secondary)',
                    fontWeight: 510,
                    borderBottom: '1px solid var(--border-subtle)',
                    display: 'flex',
                    alignItems: 'center',
                    gap: 10,
                  }}
                >
                  {isActive && (
                    <span
                      aria-hidden
                      style={{
                        width: 6,
                        height: 6,
                        borderRadius: '50%',
                        background: 'var(--accent)',
                      }}
                    />
                  )}
                  {l.label}
                </a>
              );
            })}
          </div>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-desktop { display: none !important; }
          .nav-mobile-toggle { display: inline-flex !important; align-items: center; justify-content: center; }
        }
      `}</style>
    </header>
  );
}
