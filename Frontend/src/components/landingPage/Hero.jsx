import { useState } from "react";
import { Search, MapPin } from "lucide-react";
import hero from "@/assets/hero.jpg";

const suggestions = ["Hunza", "Islamabad", "Skardu", "Lahore", "Fairy Meadows"];

export default function Hero() {
  const [query, setQuery] = useState("");

  return (
    <section id="top" className="relative min-h-[92vh] w-full overflow-hidden">
      <img
        src={hero}
        alt="Sunrise over a Karakoram mountain valley with a river winding through it"
        width={1920}
        height={1280}
        className="absolute inset-0 h-full w-full object-cover"
      />
      <div className="absolute inset-0 bg-[linear-gradient(180deg,oklch(0.2_0.04_45/0.62)_0%,oklch(0.2_0.04_45/0.35)_45%,oklch(0.985_0.012_84/0.95)_100%)]" />

      <div className="relative mx-auto flex min-h-[92vh] max-w-4xl flex-col items-center justify-center px-5 pt-28 pb-20 text-center">
        <span className="animate-rise mb-6 inline-flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-4 py-1.5 text-xs font-medium tracking-wide text-primary-foreground backdrop-blur-md">
          <MapPin className="h-3.5 w-3.5" /> 1,400+ places across 60 destinations
        </span>

        <h1 className="animate-rise text-balance text-5xl font-semibold leading-[1.05] text-primary-foreground sm:text-6xl md:text-7xl">
          Discover places worth
          <span className="block italic text-[color:var(--primary-glow)]">travelling for.</span>
        </h1>

        <p className="animate-rise mt-6 max-w-xl text-pretty text-base text-primary-foreground/85 sm:text-lg">
          Search any city and open it up — famous landmarks, scenic viewpoints, historic sites,
          trails and the food worth planning a day around.
        </p>

        <form
          id="search"
          onSubmit={(e) => e.preventDefault()}
          className="animate-rise mt-10 w-full max-w-2xl"
        >
          <div className="flex items-center gap-2 rounded-full border border-primary-foreground/25 bg-background/90 p-2 pl-5 shadow-[var(--shadow-lift)] backdrop-blur-xl">
            <Search className="h-5 w-5 shrink-0 text-muted-foreground" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search a city, destination, viewpoint or attraction..."
              className="min-w-0 flex-1 bg-transparent py-3 text-sm text-foreground outline-none placeholder:text-muted-foreground sm:text-base"
            />
            <button
              type="submit"
              className="shrink-0 rounded-full bg-[image:var(--gradient-warm)] px-5 py-3 text-sm font-semibold text-primary-foreground transition-transform hover:-translate-y-0.5 sm:px-7"
            >
              Explore
            </button>
          </div>
          <div className="mt-4 flex flex-wrap items-center justify-center gap-2 text-xs text-primary-foreground/80">
            <span className="mr-1">Try</span>
            {suggestions.map((s) => (
              <button
                key={s}
                type="button"
                onClick={() => setQuery(s)}
                className="rounded-full border border-primary-foreground/25 bg-primary-foreground/10 px-3 py-1.5 backdrop-blur-md transition-colors hover:bg-primary-foreground/20"
              >
                {s}
              </button>
            ))}
          </div>
        </form>
      </div>
    </section>
  );
}