import { ArrowUpRight } from "lucide-react";
import { destinations } from "./data";
import SectionHeading from "./SectionHeading";

export default function Destinations() {
  return (
    <section id="destinations" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <div className="flex flex-wrap items-end justify-between gap-6">
        <SectionHeading
          eyebrow="Popular destinations"
          title="Start with a city, end up somewhere unexpected"
          text="Each destination opens into hundreds of places — mapped, rated and photographed by travellers."
        />
        <a
          href="#explore"
          className="inline-flex items-center gap-1.5 text-sm font-semibold text-primary hover:underline"
        >
          Browse all 60 <ArrowUpRight className="h-4 w-4" />
        </a>
      </div>

      <div className="mt-12 grid gap-5 md:grid-cols-6">
        {destinations.map((d, i) => (
          <article
            key={d.name}
            className={`group relative isolate overflow-hidden rounded-3xl ${
              i < 2 ? "md:col-span-3 md:h-[380px]" : "md:col-span-2 md:h-[300px]"
            } h-[280px]`}
          >
            <img
              src={d.image}
              alt={`${d.name}, ${d.region}`}
              loading="lazy"
              width={800}
              height={1000}
              className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-108"
            />
            <div className="absolute inset-0 bg-[image:var(--gradient-dusk)]" />
            <div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 p-6">
              <div>
                <span className="rounded-full bg-primary-foreground/15 px-2.5 py-1 text-[11px] font-medium text-primary-foreground backdrop-blur-md">
                  {d.tag}
                </span>
                <h3 className="mt-3 text-2xl font-semibold text-primary-foreground">{d.name}</h3>
                <p className="text-sm text-primary-foreground/75">
                  {d.region} · {d.places} places
                </p>
              </div>
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur-md transition-transform group-hover:-translate-y-1">
                <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}