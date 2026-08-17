import { useEffect, useState } from "react";
import { Star, ArrowUpRight } from "lucide-react";
import { api, toTrendingPlace } from "@/api";
import SectionHeading from "./SectionHeading";

export default function Trending() {
  const [trending, setTrending] = useState([]);

  useEffect(() => {
    let active = true;
    api
      .places({ limit: 3, sort: "popularity" })
      .then((data) => {
        if (active) setTrending((data?.items || []).map(toTrendingPlace));
      })
      .catch(() => {
        if (active) setTrending([]);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <section id="experiences" className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-28">
      <SectionHeading
        eyebrow="Trending right now"
        title="Places travellers are opening this week"
        text="Fresh photos, current conditions and honest ratings from people who just got back."
      />

      <div className="mt-12 grid gap-6 md:grid-cols-3">
        {trending.map((t) => (
          <article
            key={t.name}
            className="group surface-card overflow-hidden rounded-3xl transition-all hover:-translate-y-1.5 hover:shadow-[var(--shadow-lift)]"
          >
            <div className="relative h-56 overflow-hidden">
              <img
                src={t.image}
                alt={t.name}
                loading="lazy"
                width={800}
                height={800}
                className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105"
              />
              <span className="absolute left-4 top-4 rounded-full bg-background/90 px-3 py-1 text-[11px] font-semibold text-foreground backdrop-blur">
                {t.category}
              </span>
            </div>
            <div className="p-6">
              <div className="flex items-start justify-between gap-3">
                <div>
                  <h3 className="text-xl font-semibold text-foreground">{t.name}</h3>
                  <p className="text-sm text-muted-foreground">{t.city}</p>
                </div>
                <span className="inline-flex shrink-0 items-center gap-1 rounded-full bg-secondary px-2.5 py-1 text-xs font-semibold text-secondary-foreground">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  {t.rating}
                </span>
              </div>
              <p className="mt-3 text-sm text-pretty text-muted-foreground">{t.blurb}</p>
              <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-primary">
                View place <ArrowUpRight className="h-4 w-4" />
              </span>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}