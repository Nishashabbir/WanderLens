import { Link, useLocation } from "react-router-dom";
import { Compass, Search } from "lucide-react";
import { useAuth } from "@/context/AuthContext";

const links = [
  { label: "Home", to: "/" },
  { label: "Explore", to: "/explore" },
  { label: "Destinations", to: "/destination/hunza" },
  { label: "Viewpoints", to: "/viewpoints" },
  { label: "Experiences", to: "/explore" },
  { label: "Trips", to: "/trips" },
];

export default function PageNavbar({ variant = "sticky" }) {
  const { pathname } = useLocation();
  const { user } = useAuth();

  const dark = variant !== "sticky";

  const isActive = (to) =>
    pathname === to || (to !== "/" && pathname.startsWith(to));

  const linkClass = (to) =>
    `text-sm transition ${dark ? "hover:text-white" : "hover:text-[#e87908]"} ${
      isActive(to)
        ? dark
          ? "font-semibold text-white"
          : "font-semibold text-[#e87908]"
        : dark
          ? "text-white/70"
          : "text-[#6d5e55]"
    }`;

  const inner = (
    <>
      <Link to="/" className="flex items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e87908]">
          <Compass className={`h-5 w-5 ${dark ? "text-white" : ""}`} />
        </div>
        <span
          className={`font-serif text-[25px] font-bold ${
            dark ? "text-white" : ""
          }`}
        >
          Wanderlens
        </span>
      </Link>

      <div className="hidden items-center gap-9 md:flex">
        {links.map((l) => (
          <Link key={l.label} to={l.to} className={linkClass(l.to)}>
            {l.label}
          </Link>
        ))}
      </div>

      <div className="flex items-center gap-4">
        <button
          className={`hidden h-10 w-10 items-center justify-center rounded-full border md:flex ${
            dark
              ? "border-white/25 bg-white/10 text-white backdrop-blur-md hover:bg-white hover:text-[#301c14]"
              : "border-[#d8cfc2] bg-white/60"
          }`}
        >
          <Search className="h-4 w-4" />
        </button>

        <Link
          to="/profile"
          className="flex h-11 w-11 items-center justify-center rounded-full bg-[#321d14] text-sm font-semibold text-white"
        >
          {(user?.name || "U")
            .split(/\s+/)
            .map((part) => part[0])
            .join("")
            .slice(0, 2)
            .toUpperCase()}
        </Link>
      </div>
    </>
  );

  if (variant === "hero") {
    return (
      <header className="absolute left-0 right-0 top-0 z-50">
        <div className="mx-auto flex max-w-[1500px] items-center justify-between px-6 py-7 lg:px-10">
          {inner}
        </div>
      </header>
    );
  }

  if (variant === "inline") {
    return <nav className="flex items-center justify-between">{inner}</nav>;
  }

  return (
    <header className="sticky top-0 z-50 border-b border-[#dfd5c7]/70 bg-[#f7f1e7]/90 backdrop-blur-xl">
      <div className="mx-auto flex h-[82px] max-w-[1500px] items-center justify-between px-5 lg:px-10">
        {inner}
      </div>
    </header>
  );
}