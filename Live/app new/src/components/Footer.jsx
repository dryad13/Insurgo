import { CONTENT } from '../content.js';

export default function Footer() {
  const { tagline, columns, copyright } = CONTENT.footer;

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        paddingTop: 48,
        paddingBottom: 48,
        marginTop: 32,
      }}
    >
      <div
        className="container"
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
          gap: 32,
          alignItems: 'start',
        }}
      >
        <div>
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 8,
              color: 'var(--text-primary)',
              fontWeight: 590,
              fontSize: 15,
              letterSpacing: '-0.2px',
              marginBottom: 12,
            }}
          >
            <img
              src="/logo.svg"
              alt="Insurgo"
              style={{
                height: 42,
                width: 'auto',
                objectFit: 'contain',
                filter: 'drop-shadow(0 0 8px rgba(251, 12, 12, 0.2))',
              }}
            />
          </div>
          <p className="small" style={{ maxWidth: '32ch' }}>
            {tagline}
          </p>
        </div>

        {columns.map((col) => (
          <div key={col.heading}>
            <div
              className="mono"
              style={{
                fontSize: 11,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--text-tertiary)',
                marginBottom: 12,
              }}
            >
              {col.heading}
            </div>
            <ul
              style={{
                listStyle: 'none',
                margin: 0,
                padding: 0,
                display: 'flex',
                flexDirection: 'column',
                gap: 8,
              }}
            >
              {col.links.map((l) => (
                <li key={l.href}>
                  <a
                    href={l.href}
                    style={{
                      fontSize: 14,
                      color: 'var(--text-secondary)',
                      fontWeight: 510,
                    }}
                  >
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div
        className="container"
        style={{
          marginTop: 48,
          paddingTop: 24,
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: 12,
        }}
      >
        <span
          className="mono"
          style={{ fontSize: 12, color: 'var(--text-quaternary)' }}
        >
          {copyright}
        </span>
        <a
          href="mailto:hello@insurgo.systems"
          className="mono"
          style={{
            fontSize: 12,
            color: 'var(--text-tertiary)',
            fontWeight: 510,
          }}
        >
          hello@insurgo.systems
        </a>
      </div>
    </footer>
  );
}
