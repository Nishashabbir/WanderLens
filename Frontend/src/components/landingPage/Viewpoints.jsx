import { Star, MapPin, Bookmark } from "lucide-react";
import { viewpoints } from "./data";

export default function Viewpoints() {
  return (
    <section id="viewpoints" className="bg-ink">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
        <div className="max-w-2xl">
          <span className="text-xs font-semibold uppercase tracking-[0.2em] text-[color:var(--primary-glow)]">
            Featured viewpoints
          </span>
          <h2 className="mt-3 text-3xl font-semibold text-primary-foreground sm:text-4xl">
            The spots people climb for
          </h2>
          <p className="mt-3 text-pretty text-primary-foreground/70">
            Every viewpoint comes with the exact location, the best hour to be there and photos from
            people who made the trip.
          </p>
        </div>

        <div className="mt-12 grid gap-5 lg:grid-cols-3">
          {viewpoints.map((v) => (
            <article
              key={v.name}
              className={`group relative isolate overflow-hidden rounded-3xl ${
                v.span ? "lg:col-span-2 lg:row-span-2 h-[340px] lg:h-[520px]" : "h-[340px] lg:h-[250px]"
              }`}
            >
              <img
                src={v.image}
                alt={`${v.name} viewpoint in ${v.location}`}
                loading="lazy"
                width={1200}
                height={900}
                className="absolute inset-0 h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-[image:var(--gradient-dusk)]" />
              <button
                aria-label={`Save ${v.name}`}
                className="absolute right-4 top-4 grid h-9 w-9 place-items-center rounded-full bg-primary-foreground/15 text-primary-foreground backdrop-blur-md transition-colors hover:bg-primary-foreground/30"
              >
                <Bookmark className="h-4 w-4" />
              </button>
              <div className="absolute inset-x-0 bottom-0 p-6">
                <div className="flex items-center gap-2 text-xs text-primary-foreground/80">
                  <MapPin className="h-3.5 w-3.5" /> {v.location}
                </div>
                <h3 className="mt-2 text-2xl font-semibold text-primary-foreground">{v.name}</h3>
                <p className="mt-1 text-sm text-primary-foreground/75">{v.note}</p>
                <div className="mt-4 inline-flex items-center gap-1.5 rounded-full bg-primary-foreground/15 px-3 py-1.5 text-xs font-medium text-primary-foreground backdrop-blur-md">
                  <Star className="h-3.5 w-3.5 fill-[color:var(--primary-glow)] text-[color:var(--primary-glow)]" />
                  {v.rating} · {v.reviews} reviews
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}