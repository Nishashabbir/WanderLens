import { Compass } from "lucide-react";

const groups = [
  { title: "Explore", items: ["Destinations", "Viewpoints", "Categories", "Trending places"] },
  { title: "Travellers", items: ["Saved places", "Trip planner", "Add a place", "Community"] },
  { title: "Company", items: ["About", "Contact", "Privacy", "Terms"] },
];

export default function Footer() {
  return (
    <footer className="border-t border-border bg-ink">
      <div className="mx-auto grid max-w-7xl gap-10 px-5 py-16 sm:px-8 md:grid-cols-[1.4fr_repeat(3,1fr)]">
        <div>
          <div className="flex items-center gap-2 text-lg font-semibold text-primary-foreground">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-warm)]">
              <Compass className="h-5 w-5" />
            </span>
            <span style={{ fontFamily: "var(--font-display)" }}>Wanderlens</span>
          </div>
          <p className="mt-4 max-w-xs text-sm text-primary-foreground/60">
            A place to discover destinations, explore what's inside them and decide where to go next.
          </p>
        </div>
        {groups.map((g) => (
          <div key={g.title}>
            <h3 className="text-sm font-semibold text-primary-foreground">{g.title}</h3>
            <ul className="mt-4 space-y-2.5 text-sm text-primary-foreground/60">
              {g.items.map((i) => (
                <li key={i}>
                  <a href="#top" className="transition-colors hover:text-[color:var(--primary-glow)]">
                    {i}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-primary-foreground/10 px-5 py-6 text-center text-xs text-primary-foreground/50 sm:px-8">
        © {new Date().getFullYear()} Wanderlens. Travel further, wander closer.
      </div>
    </footer>
  );
}