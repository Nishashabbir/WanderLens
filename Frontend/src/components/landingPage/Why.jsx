import { reasons } from "./data";
import SectionHeading from "./SectionHeading";

export default function Why() {
  return (
    <section className="border-y border-border bg-sand/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading eyebrow="Why Wanderlens" title="Built around one question: where should I go?" />
        <div className="mt-12 grid gap-px overflow-hidden rounded-3xl border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
          {reasons.map((r, i) => (
            <div key={r.title} className="bg-card p-7">
              <span className="text-sm font-semibold text-primary">0{i + 1}</span>
              <h3 className="mt-3 text-lg font-semibold text-foreground">{r.title}</h3>
              <p className="mt-2 text-sm text-muted-foreground">{r.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}