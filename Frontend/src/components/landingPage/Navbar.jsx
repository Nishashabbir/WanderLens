import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Search, Compass, Menu } from "lucide-react";

const links = ["Explore", "Destinations", "Viewpoints", "Experiences"];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${
        scrolled
          ? "bg-background/85 backdrop-blur-xl border-b border-border py-3"
          : "bg-transparent py-5"
      }`}
    >
      <nav className="mx-auto flex max-w-7xl items-center gap-6 px-5 sm:px-8">
        <a
          href="#top"
          className={`flex items-center gap-2 text-lg font-semibold tracking-tight ${
            scrolled ? "text-foreground" : "text-primary-foreground"
          }`}
        >
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-[image:var(--gradient-warm)] text-primary-foreground shadow-[var(--shadow-soft)]">
            <Compass className="h-5 w-5" />
          </span>
          <span style={{ fontFamily: "var(--font-display)" }}>Wanderlens</span>
        </a>

        <ul
          className={`ml-4 hidden items-center gap-7 text-sm font-medium md:flex ${
            scrolled ? "text-muted-foreground" : "text-primary-foreground/85"
          }`}
        >
          {links.map((l) => (
            <li key={l}>
              <a href={`#${l.toLowerCase()}`} className="transition-colors hover:text-primary">
                {l}
              </a>
            </li>
          ))}
        </ul>

        <div className="ml-auto flex items-center gap-2 sm:gap-3">
          <a
            href="#search"
            aria-label="Search destinations"
            className={`grid h-10 w-10 place-items-center rounded-full border transition-colors ${
              scrolled
                ? "border-border text-foreground hover:bg-secondary"
                : "border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
            }`}
          >
            <Search className="h-4 w-4" />
          </a>
          <Link
            to="/login"
            className="hidden rounded-full bg-[image:var(--gradient-warm)] px-5 py-2.5 text-sm font-semibold text-primary-foreground shadow-[var(--shadow-soft)] transition-transform hover:-translate-y-0.5 sm:block"
          >
            Log in
          </Link>
          <button
            aria-label="Menu"
            className={`grid h-10 w-10 place-items-center rounded-full border md:hidden ${
              scrolled ? "border-border text-foreground" : "border-primary-foreground/30 text-primary-foreground"
            }`}
          >
            <Menu className="h-4 w-4" />
          </button>
        </div>
      </nav>
    </header>
  );
}