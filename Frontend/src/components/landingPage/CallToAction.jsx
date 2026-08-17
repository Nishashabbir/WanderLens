export default function CallToAction() {
  return (
    <section className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="relative overflow-hidden rounded-[2rem] bg-[image:var(--gradient-warm)] px-8 py-16 text-center sm:px-16 sm:py-24">
        <div className="absolute -right-16 -top-20 h-64 w-64 rounded-full bg-primary-foreground/15 blur-2xl" />
        <div className="absolute -bottom-24 -left-10 h-72 w-72 rounded-full bg-accent/25 blur-3xl" />
        <div className="relative">
          <h2 className="text-balance text-4xl font-semibold text-primary-foreground sm:text-5xl">
            Where will you explore next?
          </h2>
          <p className="mx-auto mt-4 max-w-lg text-pretty text-primary-foreground/85">
            Type a destination and see what's waiting inside it.
          </p>
          <a
            href="#search"
            className="mt-9 inline-block rounded-full bg-ink px-8 py-4 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-lift)] transition-transform hover:-translate-y-0.5"
          >
            Start Exploring
          </a>
        </div>
      </div>
    </section>
  );
}