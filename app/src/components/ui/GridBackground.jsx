export default function GridBackground() {
  return (
    <div className="fixed inset-0 z-0 pointer-events-none overflow-hidden">
      {/* Perspective grid */}
      <div
        className="absolute inset-0"
        style={{
          backgroundImage: `
            linear-gradient(rgba(26, 26, 46, 0.5) 1px, transparent 1px),
            linear-gradient(90deg, rgba(26, 26, 46, 0.5) 1px, transparent 1px)
          `,
          backgroundSize: '60px 60px',
          transform: 'perspective(500px) rotateX(60deg)',
          transformOrigin: 'center top',
          maskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.15) 60%, transparent 100%)',
          WebkitMaskImage:
            'linear-gradient(to bottom, transparent 0%, rgba(0,0,0,0.3) 20%, rgba(0,0,0,0.15) 60%, transparent 100%)',
        }}
      />

      {/* Horizon glow line */}
      <div
        className="absolute top-1/3 left-1/2 -translate-x-1/2 h-[2px] w-4/5"
        style={{
          background: 'linear-gradient(90deg, transparent, #FB0C0C, transparent)',
          boxShadow: '0 0 40px #FB0C0C, 0 0 80px rgba(251, 12, 12, 0.3)',
          opacity: 0.2,
        }}
      />

      {/* Ambient radial glow */}
      <div
        className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[600px]"
        style={{
          background:
            'radial-gradient(ellipse at center top, rgba(251, 12, 12, 0.06) 0%, transparent 70%)',
        }}
      />
    </div>
  );
}
