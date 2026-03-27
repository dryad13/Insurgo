export default function SectionWrapper({ children, id, className = '' }) {
  return (
    <section id={id} className={`relative z-10 py-20 md:py-28 ${className}`}>
      <div className="max-w-6xl mx-auto px-5 md:px-8">{children}</div>
    </section>
  );
}
