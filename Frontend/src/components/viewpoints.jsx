import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import PageNavbar from "./PageNavbar";
import k2 from "@/assets/k2.jpg";
import rakaposhi from "@/assets/rakaposhi.jpg";
import fairymeedows from "@/assets/fairymeadows.jpg";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function Viewpoints() {
  const [search, setSearch] = useState("");
  const [destination, setDestination] = useState("All");
  const [category, setCategory] = useState("All");
  const [sort, setSort] = useState("Top rated");
  const [saved, setSaved] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [showFilters, setShowFilters] = useState(false);

  const viewpoints = [
    {
      id: 1,
      name: "Eagle's Nest",
      destination: "Hunza",
      category: "Mountain",
      rating: 4.9,
      reviews: 328,
      bestTime: "Sunrise",
      elevation: "2,800m",
      description:
        "Watch the entire Hunza Valley slowly light up beneath the Karakoram.",
      image:
        "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1600&q=90",
      featured: true,
    },
    {
      id: 2,
      name: "Passu Viewpoint",
      destination: "Hunza",
      category: "Mountain",
      rating: 4.9,
      reviews: 281,
      bestTime: "Golden hour",
      elevation: "2,400m",
      description:
        "The iconic Passu Cones rising dramatically from the valley floor.",
      image:
        "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 3,
      name: "Rakaposhi View Point",
      destination: "Nagar",
      category: "Mountain",
      rating: 4.8,
      reviews: 196,
      bestTime: "Sunset",
      elevation: "2,100m",
      description:
        "A wide open view towards one of Pakistan's most spectacular peaks.",
      image: rakaposhi , 
    },
    {
      id: 4,
      name: "Deosai Lookout",
      destination: "Skardu",
      category: "Nature",
      rating: 4.8,
      reviews: 174,
      bestTime: "Morning",
      elevation: "4,000m",
      description:
        "Endless high-altitude plains stretching toward distant mountains.",
      image:
        "https://images.unsplash.com/photo-1533130061792-64b345e4a833?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 5,
      name: "Shangrila View",
      destination: "Skardu",
      category: "Lake",
      rating: 4.7,
      reviews: 243,
      bestTime: "Late afternoon",
      elevation: "2,500m",
      description:
        "A peaceful mountain landscape surrounding the famous Shangrila Lake.",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 6,
      name: "Fairy Meadows Ridge",
      destination: "Diamer",
      category: "Nature",
      rating: 4.9,
      reviews: 312,
      bestTime: "Sunrise",
      elevation: "3,300m",
      description:
        "One of the most dramatic perspectives of Nanga Parbat.",
      image: fairymeedows , 
    },
    {
      id: 7,
      name: "Naltar Valley View",
      destination: "Gilgit",
      category: "Nature",
      rating: 4.7,
      reviews: 129,
      bestTime: "Afternoon",
      elevation: "3,100m",
      description:
        "Dense forests, dramatic peaks and a valley that feels completely remote.",
      image:
        "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=1200&q=85",
    },
    {
      id: 8,
      name: "K2 View Point",
      destination: "Skardu",
      category: "Mountain",
      rating: 5.0,
      reviews: 96,
      bestTime: "Clear mornings",
      elevation: "3,500m",
      description:
        "A spectacular mountain panorama for serious landscape lovers.",
      image: k2 , 
    },
  ];

  const destinations = [
    "All",
    "Hunza",
    "Skardu",
    "Nagar",
    "Diamer",
    "Gilgit",
  ];

  const categories = [
    "All",
    "Mountain",
    "Nature",
    "Lake",
    "City",
  ];

  const filtered = useMemo(() => {
    let result = viewpoints.filter((item) => {
      const query = search.toLowerCase();

      const matchesSearch =
        !query ||
        item.name.toLowerCase().includes(query) ||
        item.destination.toLowerCase().includes(query) ||
        item.category.toLowerCase().includes(query);

      const matchesDestination =
        destination === "All" || item.destination === destination;

      const matchesCategory =
        category === "All" || item.category === category;

      return (
        matchesSearch &&
        matchesDestination &&
        matchesCategory
      );
    });

    if (sort === "Top rated") {
      result.sort((a, b) => b.rating - a.rating);
    }

    if (sort === "Most reviewed") {
      result.sort((a, b) => b.reviews - a.reviews);
    }

    if (sort === "A-Z") {
      result.sort((a, b) => a.name.localeCompare(b.name));
    }

    return result;
  }, [search, destination, category, sort]);

  const visible = filtered.slice(0, visibleCount);

  const toggleSave = (id) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const resetFilters = () => {
    setSearch("");
    setDestination("All");
    setCategory("All");
    setSort("Top rated");
    setVisibleCount(6);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f1e7] text-[#301c14]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative overflow-hidden bg-[#2c1911]">

        {/* Decorative circles */}

        <div className="absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full border-[70px] border-white/[0.035]" />

        <div className="absolute -bottom-60 -left-40 h-[550px] w-[550px] rounded-full border-[80px] border-[#e87908]/[0.05]" />


        <div className="relative mx-auto max-w-[1500px] px-5 pb-16 pt-7 lg:px-10 lg:pb-24">


          {/* NAVBAR */}

          <PageNavbar variant="inline" />


          {/* HERO TEXT */}

          <div className="mx-auto mt-20 max-w-[900px] text-center">

            <p className="animate-fade-up text-xs font-semibold uppercase tracking-[0.3em] text-[#f28a12]">
              See the world differently
            </p>

            <h1 className="animate-fade-up-delay mt-5 font-serif text-6xl font-bold leading-[0.9] tracking-[-3px] text-white md:text-8xl">

              Views worth
              <br />

              <span className="italic text-[#f28a12]">
                the journey.
              </span>

            </h1>

            <p className="mx-auto mt-7 max-w-[600px] text-sm leading-7 text-white/60 md:text-base">
              Discover the places where mountains, valleys, lakes
              and cities reveal themselves at their best.
            </p>

          </div>


          {/* SEARCH */}

          <div className="relative z-10 mx-auto mt-12 max-w-[900px]">

            <div className="flex flex-col gap-2 rounded-[24px] border border-white/10 bg-white/[0.08] p-2 backdrop-blur-xl sm:flex-row">

              <div className="relative flex-1">

                <SearchIcon className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-white/40" />

                <input
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setVisibleCount(6);
                  }}
                  placeholder="Search viewpoints, destinations..."
                  className="h-14 w-full rounded-[18px] bg-white/[0.08] pl-14 pr-5 text-sm text-white outline-none placeholder:text-white/35 focus:bg-white/[0.12]"
                />

              </div>

              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex h-14 items-center justify-center gap-2 rounded-[18px] bg-[#e87908] px-7 text-sm font-semibold text-white transition duration-300 hover:bg-[#f28a1d] hover:shadow-lg hover:shadow-orange-900/30"
              >

                <FilterIcon className="h-4 w-4" />

                Filters

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          FILTER AREA
      ====================================================== */}

      <section className="sticky top-0 z-40 border-b border-[#ded3c5] bg-[#f7f1e7]/95 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1500px] items-center gap-3 overflow-x-auto px-5 py-4 lg:px-10">

          <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-[0.15em] text-[#998b80]">
            Destination
          </span>

          {destinations.map((item) => (

            <button
              key={item}
              onClick={() => {
                setDestination(item);
                setVisibleCount(6);
              }}
              className={`shrink-0 rounded-full px-4 py-2 text-xs font-medium transition duration-300 ${
                destination === item
                  ? "bg-[#301c14] text-white"
                  : "border border-[#d9cec0] bg-[#fffdf9] text-[#76685f] hover:border-[#e87908] hover:text-[#e87908]"
              }`}
            >
              {item}
            </button>

          ))}

        </div>

      </section>


      {/* =====================================================
          MAIN CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-[1500px] px-5 py-12 lg:px-10 lg:py-16">


        {/* FILTER PANEL */}

        <div
          className={`grid overflow-hidden transition-all duration-500 ${
            showFilters
              ? "mb-10 max-h-[500px] opacity-100"
              : "max-h-0 opacity-0"
          }`}
        >

          <div className="rounded-[25px] border border-[#ded3c5] bg-[#fffdf9] p-6">

            <div className="grid gap-8 md:grid-cols-3">

              <FilterGroup title="Category">

                <div className="flex flex-wrap gap-2">

                  {categories.map((item) => (

                    <button
                      key={item}
                      onClick={() => setCategory(item)}
                      className={`rounded-full px-4 py-2 text-xs transition ${
                        category === item
                          ? "bg-[#e87908] text-white"
                          : "bg-[#f4ede3] text-[#75675e] hover:bg-[#eadfce]"
                      }`}
                    >
                      {item}
                    </button>

                  ))}

                </div>

              </FilterGroup>


              <FilterGroup title="Rating">

                <div className="flex gap-2">

                  {["4.5+", "4.0+", "3.5+"].map((rating) => (

                    <button
                      key={rating}
                      className="rounded-full border border-[#ddd1c3] px-4 py-2 text-xs text-[#75675e] transition hover:border-[#e87908] hover:text-[#e87908]"
                    >
                      ★ {rating}
                    </button>

                  ))}

                </div>

              </FilterGroup>


              <FilterGroup title="Reset">

                <button
                  onClick={resetFilters}
                  className="flex items-center gap-2 text-sm font-medium text-[#e87908] transition hover:gap-3"
                >

                  Reset all filters

                  <ArrowIcon className="h-4 w-4" />

                </button>

              </FilterGroup>

            </div>

          </div>

        </div>


        {/* =================================================
            TOP BAR
        ================================================== */}

        <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e87908]">
              Curated viewpoints
            </p>

            <h2 className="mt-3 font-serif text-4xl font-bold tracking-[-1px] md:text-5xl">
              Find your perspective.
            </h2>

            <p className="mt-3 text-sm text-[#83766d]">
              {filtered.length} viewpoints waiting to be discovered
            </p>

          </div>


          {/* SORT */}

          <div className="flex items-center gap-3">

            <span className="text-xs text-[#93867c]">
              Sort
            </span>

            <select
              value={sort}
              onChange={(e) => setSort(e.target.value)}
              className="rounded-full border border-[#d8cdc0] bg-[#fffdf9] px-5 py-2.5 text-xs font-medium outline-none transition focus:border-[#e87908]"
            >

              <option>Top rated</option>
              <option>Most reviewed</option>
              <option>A-Z</option>

            </select>

          </div>

        </div>


        {/* =================================================
            FEATURED VIEWPOINT
        ================================================== */}

        {filtered.length > 0 && filtered[0].featured && (

          <Link
            to={`/place/${slugify(filtered[0].name)}`}
            className="group relative mt-10 block h-[550px] overflow-hidden rounded-[30px] bg-[#24150f]"
          >

            <img
              src={filtered[0].image}
              alt={filtered[0].name}
              className="absolute inset-0 h-full w-full object-cover transition duration-[1400ms] ease-out group-hover:scale-105"
            />

            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/20 to-transparent" />

            <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />


            {/* Featured label */}

            <div className="absolute left-7 top-7">

              <span className="rounded-full border border-white/20 bg-black/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                Featured viewpoint
              </span>

            </div>


            {/* Save */}

            <button
              onClick={() => toggleSave(filtered[0].id)}
              className={`absolute right-7 top-7 flex h-11 w-11 items-center justify-center rounded-full backdrop-blur-md transition duration-300 ${
                saved.includes(filtered[0].id)
                  ? "bg-[#e87908] text-white"
                  : "bg-white/15 text-white hover:bg-white hover:text-[#301c14]"
              }`}
            >

              <BookmarkIcon
                className={`h-4 w-4 ${
                  saved.includes(filtered[0].id)
                    ? "fill-current"
                    : ""
                }`}
              />

            </button>


            {/* Content */}

            <div className="absolute bottom-9 left-7 max-w-[650px] text-white md:left-10 md:bottom-12">

              <div className="flex items-center gap-3 text-xs text-white/60">

                <span>{filtered[0].destination}</span>

                <span>•</span>

                <span>{filtered[0].elevation}</span>

              </div>

              <h3 className="mt-3 font-serif text-5xl font-bold tracking-[-1px] md:text-7xl">
                {filtered[0].name}
              </h3>

              <p className="mt-4 max-w-[550px] text-sm leading-6 text-white/70 md:text-base">
                {filtered[0].description}
              </p>

              <div className="mt-6 flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">

                  <StarIcon className="h-4 w-4 fill-[#f28a12] text-[#f28a12]" />

                  <span className="text-sm font-semibold">
                    {filtered[0].rating}
                  </span>

                  <span className="text-xs text-white/50">
                    ({filtered[0].reviews})
                  </span>

                </div>

                <span className="rounded-full bg-white/10 px-4 py-2 text-xs backdrop-blur-md">
                  Best at {filtered[0].bestTime.toLowerCase()}
                </span>

              </div>

            </div>

          </Link>

        )}


        {/* =================================================
            CATEGORY STRIP
        ================================================== */}

        <div className="mt-12 flex items-center gap-3 overflow-x-auto pb-2">

          <span className="mr-2 shrink-0 text-xs font-semibold uppercase tracking-[0.15em] text-[#998b80]">
            Explore by mood
          </span>

          {[
            "Mountain",
            "Nature",
            "Lake",
            "City",
          ].map((item) => (

            <button
              key={item}
              onClick={() => {
                setCategory(item);
                setVisibleCount(6);
              }}
              className={`flex shrink-0 items-center gap-2 rounded-full border px-4 py-2.5 text-xs transition ${
                category === item
                  ? "border-[#e87908] bg-[#e87908] text-white"
                  : "border-[#ddd2c5] bg-[#fffdf9] text-[#76685f] hover:border-[#e87908]"
              }`}
            >

              <span
                className={`h-1.5 w-1.5 rounded-full ${
                  category === item
                    ? "bg-white"
                    : "bg-[#e87908]"
                }`}
              />

              {item}

            </button>

          ))}

        </div>


        {/* =================================================
            VIEWPOINT GRID
        ================================================== */}

        {filtered.length > 0 ? (

          <div className="mt-8 grid gap-5 md:grid-cols-2 lg:grid-cols-3">

            {visible.map((view, index) => (

              <ViewpointCard
                key={view.id}
                view={view}
                saved={saved.includes(view.id)}
                onSave={() => toggleSave(view.id)}
                featured={index === 1}
              />

            ))}

          </div>

        ) : (

          /* EMPTY */

          <div className="mt-10 flex min-h-[450px] flex-col items-center justify-center rounded-[28px] border border-[#ded3c5] bg-[#fffdf9] text-center">

            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f3e7d7]">

              <CompassIcon className="h-8 w-8 text-[#e87908]" />

            </div>

            <h3 className="mt-6 font-serif text-3xl font-bold">
              No viewpoints found.
            </h3>

            <p className="mt-3 max-w-[400px] text-sm leading-6 text-[#81746b]">
              Try another destination, category or search term.
              The mountains aren't hiding forever.
            </p>

            <button
              onClick={resetFilters}
              className="mt-6 rounded-full bg-[#301c14] px-6 py-3 text-sm font-medium text-white transition hover:bg-[#47281d]"
            >
              Reset search
            </button>

          </div>

        )}


        {/* =================================================
            LOAD MORE
        ================================================== */}

        {visibleCount < filtered.length && (

          <div className="mt-12 flex justify-center">

            <button
              onClick={() => setVisibleCount((n) => n + 3)}
              className="group flex items-center gap-3 rounded-full border border-[#d3c7b9] bg-[#fffdf9] px-7 py-3.5 text-sm font-medium transition duration-300 hover:-translate-y-1 hover:border-[#e87908] hover:text-[#e87908] hover:shadow-lg"
            >

              Load more viewpoints

              <ArrowDownIcon className="h-4 w-4 transition group-hover:translate-y-1" />

            </button>

          </div>

        )}

      </main>


      {/* =====================================================
          BOTTOM CTA
      ====================================================== */}

      <section className="px-5 pb-12">

        <div className="relative mx-auto max-w-[1500px] overflow-hidden rounded-[30px] bg-[#e87908] px-7 py-16 md:px-16">

          <div className="absolute -right-24 -top-32 h-[350px] w-[350px] rounded-full border-[60px] border-white/10" />

          <div className="relative flex flex-col justify-between gap-8 md:flex-row md:items-center">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/60">
                Keep exploring
              </p>

              <h2 className="mt-3 max-w-[700px] font-serif text-4xl font-bold leading-tight text-white md:text-5xl">
                The best view is usually
                <span className="italic"> somewhere ahead.</span>
              </h2>

            </div>

            <Link to="/destination/hunza" className="group flex shrink-0 items-center gap-3 self-start rounded-full bg-[#301c14] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:scale-105 md:self-auto">

              Explore destinations

              <ArrowIcon className="h-4 w-4 transition group-hover:translate-x-1" />

            </Link>

          </div>

        </div>

      </section>


      {/* =====================================================
          ANIMATIONS
      ====================================================== */}

      <style>{`

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(25px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        @keyframes fadeUpDelay {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-up {
          animation: fadeUp 0.8s ease-out both;
        }

        .animate-fade-up-delay {
          animation: fadeUpDelay 1s 0.15s ease-out both;
        }

      `}</style>

    </div>
  );
}


/* =========================================================
   VIEWPOINT CARD
========================================================= */

function ViewpointCard({
  view,
  saved,
  onSave,
  featured,
}) {
  return (
    <article
      className={`group overflow-hidden rounded-[25px] border border-[#dfd4c7] bg-[#fffdf9] transition duration-500 hover:-translate-y-2 hover:shadow-[0_25px_60px_rgba(48,28,20,0.12)] ${
        featured ? "md:translate-y-8" : ""
      }`}
    >

      {/* IMAGE */}

      <div className="relative h-[350px] overflow-hidden">

        <img
          src={view.image}
          alt={view.name}
          className="h-full w-full object-cover transition duration-[1000ms] ease-out group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/65 via-transparent to-transparent opacity-80" />


        {/* Category */}

        <span className="absolute left-5 top-5 rounded-full bg-black/25 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
          {view.category}
        </span>


        {/* Save */}

        <button
          onClick={onSave}
          className={`absolute right-5 top-5 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition duration-300 ${
            saved
              ? "bg-[#e87908] text-white"
              : "bg-white/15 text-white hover:bg-white hover:text-[#301c14]"
          }`}
        >

          <BookmarkIcon
            className={`h-4 w-4 ${
              saved ? "fill-current" : ""
            }`}
          />

        </button>


        {/* Bottom image info */}

        <div className="absolute bottom-5 left-5 flex items-center gap-2 text-white">

          <PinIcon className="h-3.5 w-3.5" />

          <span className="text-xs">
            {view.destination}
          </span>

        </div>

      </div>


      {/* CONTENT */}

      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div>

            <h3 className="font-serif text-[24px] font-bold leading-tight">
              {view.name}
            </h3>

            <p className="mt-2 text-xs text-[#91847a]">
              {view.elevation}
            </p>

          </div>


          {/* Rating */}

          <div className="flex shrink-0 items-center gap-1.5 rounded-full bg-[#f5e8d8] px-3 py-1.5">

            <StarIcon className="h-3.5 w-3.5 fill-[#e87908] text-[#e87908]" />

            <span className="text-xs font-bold">
              {view.rating}
            </span>

          </div>

        </div>


        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#766960]">
          {view.description}
        </p>


        <div className="mt-5 flex items-center justify-between border-t border-[#eee6dc] pt-4">

          <div>

            <p className="text-[10px] uppercase tracking-[0.12em] text-[#a0948a]">
              Best time
            </p>

            <p className="mt-1 text-xs font-medium text-[#4d3d34]">
              {view.bestTime}
            </p>

          </div>


          <Link
            to={`/place/${slugify(view.name)}`}
            className="group/link flex items-center gap-2 text-xs font-semibold text-[#e87908]"
          >

            View

            <ArrowIcon className="h-3.5 w-3.5 transition group-hover/link:translate-x-1" />

          </Link>

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   FILTER GROUP
========================================================= */

function FilterGroup({ title, children }) {
  return (
    <div>

      <p className="mb-4 text-xs font-semibold uppercase tracking-[0.15em] text-[#998b80]">
        {title}
      </p>

      {children}

    </div>
  );
}


/* =========================================================
   ICONS
========================================================= */

function CompassIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z" />
    </svg>
  );
}


function SearchIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="11" cy="11" r="6.5" />
      <path d="M16 16L21 21" />
    </svg>
  );
}


function FilterIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M4 6H20" />
      <path d="M7 12H17" />
      <path d="M10 18H14" />
    </svg>
  );
}


function BookmarkIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M6 4.5A2 2 0 018 2.5H16A2 2 0 0118 4.5V21L12 17.5L6 21V4.5Z" />
    </svg>
  );
}


function PinIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20 10C20 15.5 12 21 12 21S4 15.5 4 10C4 5.6 7.6 3 12 3S20 5.6 20 10Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}


function StarIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 3L14.8 8.7L21 9.6L16.5 14L17.6 20.2L12 17.3L6.4 20.2L7.5 14L3 9.6L9.2 8.7L12 3Z" />
    </svg>
  );
}


function ArrowIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </svg>
  );
}


function ArrowDownIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 5V19" />
      <path d="M6 13L12 19L18 13" />
    </svg>
  );
}