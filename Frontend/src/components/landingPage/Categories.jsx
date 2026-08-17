import { useEffect, useState } from "react";
import { Mountain, Landmark, Leaf, Waves, Binoculars, Compass, UtensilsCrossed } from "lucide-react";
import { api, toCategory } from "@/api";
import SectionHeading from "./SectionHeading";

const icons = {
  Mountains: Mountain,
  Historical: Landmark,
  Nature: Leaf,
  Beaches: Waves,
  Viewpoints: Binoculars,
  Adventure: Compass,
  Food: UtensilsCrossed,
};

export default function Categories() {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    let active = true;
    api
      .categories()
      .then((data) => {
        if (active) setCategories((data || []).map(toCategory));
      })
      .catch(() => {
        if (active) setCategories([]);
      });
    return () => {
      active = false;
    };
  }, []);
  return (
    <section id="explore" className="border-y border-border bg-sand/50">
      <div className="mx-auto max-w-7xl px-5 py-20 sm:px-8 sm:py-24">
        <SectionHeading
          eyebrow="Explore by category"
          title="What kind of place are you after?"
          align="center"
        />
        <div className="mt-12 flex flex-wrap justify-center gap-4">
          {categories.map((c) => {
            const Icon = icons[c.name] ?? Compass;
            return (
            <button
              key={c.name}
              className="group flex min-w-[150px] flex-col items-start gap-3 rounded-2xl border border-border bg-card px-5 py-5 text-left shadow-[var(--shadow-soft)] transition-all hover:-translate-y-1 hover:border-primary/40"
            >
              <span className="grid h-11 w-11 place-items-center rounded-xl bg-secondary text-primary transition-colors group-hover:bg-[image:var(--gradient-warm)] group-hover:text-primary-foreground">
                <Icon className="h-5 w-5" />
              </span>
              <span>
                <span className="block text-sm font-semibold text-foreground">{c.name}</span>
                <span className="block text-xs text-muted-foreground">{c.count} places</span>
              </span>
            </button>
            );
          })}
        </div>
      </div>
    </section>
  );
}