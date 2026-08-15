import { useState } from "react";
import { Link } from "react-router-dom";
import PageNavbar from "./PageNavbar";

export default function Explore() {
  const [search, setSearch] = useState("Hunza");
  const [activeCategory, setActiveCategory] = useState("All");
  const [sortBy, setSortBy] = useState("Popular");
  const [saved, setSaved] = useState([]);
  const [visibleCount, setVisibleCount] = useState(6);
  const [mobileFilters, setMobileFilters] = useState(false);

  const places = [
    {
      id: 1,
      name: "Attabad Lake",
      location: "Hunza, Gilgit-Baltistan",
      category: "Nature",
      type: "Destination",
      rating: "4.9",
      reviews: "284",
      image:
        "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1000&q=85",
      description:
        "Turquoise waters surrounded by dramatic mountain peaks.",
      tag: "Must visit",
    },
    {
      id: 2,
      name: "Eagle's Nest",
      location: "Duikar, Hunza",
      category: "Viewpoints",
      type: "Viewpoint",
      rating: "4.8",
      reviews: "193",
      image:
        "https://images.unsplash.com/photo-1589553416260-f586c8f1514f?auto=format&fit=crop&w=1000&q=85",
      description:
        "A breathtaking viewpoint overlooking the Hunza Valley.",
      tag: "Sunrise",
    },
    {
      id: 3,
      name: "Altit Fort",
      location: "Altit, Hunza",
      category: "Historical",
      type: "Place",
      rating: "4.7",
      reviews: "157",
      image:
        "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1000&q=85",
      description:
        "An ancient fort with centuries of history and mountain views.",
      tag: "Heritage",
    },
    {
      id: 4,
      name: "Fairy Meadows",
      location: "Diamer, Gilgit-Baltistan",
      category: "Nature",
      type: "Destination",
      rating: "4.9",
      reviews: "421",
      image:
        "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=1000&q=85",
      description:
        "A peaceful alpine meadow beneath the legendary Nanga Parbat.",
      tag: "Popular",
    },
    {
      id: 5,
      name: "Khunjerab Pass",
      location: "Hunza, Gilgit-Baltistan",
      category: "Adventure",
      type: "Destination",
      rating: "4.8",
      reviews: "238",
      image:
        "https://images.unsplash.com/photo-1518002054494-3a6f94352e9d?auto=format&fit=crop&w=1000&q=85",
      description:
        "High-altitude landscapes where Pakistan meets the Karakoram.",
      tag: "Adventure",
    },
    {
      id: 6,
      name: "Passu Cones",
      location: "Gojal, Hunza",
      category: "Viewpoints",
      type: "Viewpoint",
      rating: "4.9",
      reviews: "316",
      image:
        "https://images.unsplash.com/photo-1530789253388-582c481c54b0?auto=format&fit=crop&w=1000&q=85",
      description:
        "Iconic sharp peaks rising dramatically above the valley.",
      tag: "Iconic",
    },
    {
      id: 7,
      name: "Baltit Fort",
      location: "Karimabad, Hunza",
      category: "Historical",
      type: "Place",
      rating: "4.8",
      reviews: "201",
      image:
        "https://images.unsplash.com/photo-1605649487212-47bdab064df7?auto=format&fit=crop&w=1000&q=85",
      description:
        "A historic fort overlooking the heart of Hunza.",
      tag: "Heritage",
    },
    {
      id: 8,
      name: "Hussaini Bridge",
      location: "Gojal, Hunza",
      category: "Adventure",
      type: "Experience",
      rating: "4.6",
      reviews: "174",
      image:
        "https://images.unsplash.com/photo-1520637836862-4d197d17c13a?auto=format&fit=crop&w=1000&q=85",
      description:
        "A thrilling walk across one of the valley's famous bridges.",
      tag: "Thrill",
    },
    {
      id: 9,
      name: "Rakaposhi View Point",
      location: "Nagar Valley",
      category: "Viewpoints",
      type: "Viewpoint",
      rating: "4.9",
      reviews: "128",
      image:
        "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=1000&q=85",
      description:
        "An incredible perspective of the mighty Rakaposhi.",
      tag: "Scenic",
    },
  ];

  const categories = [
    "All",
    "Nature",
    "Mountains",
    "Historical",
    "Viewpoints",
    "Adventure",
    "Food",
  ];

  const filteredPlaces = places
    .filter((place) => {
      if (activeCategory === "All") return true;
      return place.category === activeCategory;
    })
    .filter((place) => {
      if (!search.trim()) return true;

      const query = search.toLowerCase();

      return (
        place.name.toLowerCase().includes(query) ||
        place.location.toLowerCase().includes(query) ||
        place.category.toLowerCase().includes(query)
      );
    });

  const visiblePlaces = filteredPlaces.slice(0, visibleCount);

  const toggleSaved = (id) => {
    setSaved((current) =>
      current.includes(id)
        ? current.filter((item) => item !== id)
        : [...current, id]
    );
  };

  const handleLoadMore = () => {
    setVisibleCount((current) => current + 3);
  };

  return (
    <div className="min-h-screen bg-[#f7f1e7] text-[#2d1a12]">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <PageNavbar />


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1500px] px-5 py-9 lg:px-10 lg:py-12">


        {/* =================================================
            PAGE INTRO
        ================================================== */}

        <section>

          <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
            Explore the world
          </p>

          <div className="mt-3 flex flex-col justify-between gap-5 lg:flex-row lg:items-end">

            <div>

              <h1 className="font-serif text-4xl font-bold leading-tight tracking-[-1px] md:text-5xl">
                Find places worth
                <br />
                <span className="italic text-[#e87908]">
                  traveling for.
                </span>
              </h1>

              <p className="mt-4 max-w-[620px] text-[15px] leading-7 text-[#766a62]">
                Discover landmarks, hidden viewpoints, historic places,
                trails and experiences curated for curious travellers.
              </p>

            </div>

            <p className="text-sm text-[#85786e]">
              {filteredPlaces.length} places found
            </p>

          </div>

        </section>


        {/* =================================================
            SEARCH
        ================================================== */}

        <section className="mt-8 rounded-[24px] border border-[#ded4c7] bg-[#fffdf9] p-3 shadow-[0_10px_40px_rgba(50,29,20,0.06)]">

          <div className="flex flex-col gap-3 lg:flex-row">

            {/* Search input */}
            <div className="relative flex-1">

              <SearchIcon className="absolute left-5 top-1/2 h-5 w-5 -translate-y-1/2 text-[#766a62]" />

              <input
                value={search}
                onChange={(e) => {
                  setSearch(e.target.value);
                  setVisibleCount(6);
                }}
                placeholder="Search a city, place, viewpoint..."
                className="h-[58px] w-full rounded-[18px] bg-[#f8f3eb] pl-14 pr-5 text-[15px] outline-none placeholder:text-[#a0958c] focus:ring-2 focus:ring-[#e87908]/20"
              />

            </div>


            {/* Search button */}
            <button className="h-[58px] rounded-[18px] bg-[#e87908] px-8 text-sm font-semibold text-white shadow-md shadow-orange-500/20 transition hover:bg-[#d96d00] lg:px-10">
              Search
            </button>

          </div>

        </section>


        {/* =================================================
            CATEGORY CHIPS
        ================================================== */}

        <div className="mt-7 flex gap-2.5 overflow-x-auto pb-2">

          {categories.map((category) => (

            <button
              key={category}
              onClick={() => {
                setActiveCategory(category);
                setVisibleCount(6);
              }}
              className={`whitespace-nowrap rounded-full px-5 py-2.5 text-sm transition ${
                activeCategory === category
                  ? "bg-[#321d14] text-white"
                  : "border border-[#ddd2c5] bg-[#fffdf9] text-[#6c5e55] hover:border-[#e87908] hover:text-[#e87908]"
              }`}
            >
              {category}
            </button>

          ))}

        </div>


        {/* =================================================
            MOBILE FILTER BUTTON
        ================================================== */}

        <button
          onClick={() => setMobileFilters(!mobileFilters)}
          className="mt-5 flex w-full items-center justify-center gap-2 rounded-[16px] border border-[#ddd2c5] bg-[#fffdf9] py-3 text-sm font-medium lg:hidden"
        >

          <FilterIcon className="h-4 w-4" />

          Filters & sorting

        </button>


        {/* =================================================
            CONTENT
        ================================================== */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[230px_1fr]">


          {/* =================================================
              FILTER SIDEBAR
          ================================================== */}

          <aside
            className={`${
              mobileFilters ? "block" : "hidden"
            } lg:block`}
          >

            <div className="sticky top-[105px] rounded-[22px] border border-[#ded4c7] bg-[#fffdf9] p-5">

              <div className="flex items-center justify-between">

                <h3 className="font-serif text-xl font-bold">
                  Filters
                </h3>

                <button
                  onClick={() => {
                    setActiveCategory("All");
                    setSearch("");
                  }}
                  className="text-xs font-medium text-[#e87908]"
                >
                  Clear
                </button>

              </div>


              {/* Place type */}
              <div className="mt-7">

                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#998c82]">
                  Place type
                </p>

                <div className="mt-4 space-y-3">

                  {[
                    "Destination",
                    "Viewpoint",
                    "Place",
                    "Experience",
                  ].map((type) => (

                    <label
                      key={type}
                      className="flex cursor-pointer items-center gap-3 text-sm text-[#5f5149]"
                    >

                      <input
                        type="checkbox"
                        className="h-4 w-4 rounded border-[#cfc3b6] accent-[#e87908]"
                      />

                      {type}

                    </label>

                  ))}

                </div>

              </div>


              {/* Rating */}
              <div className="mt-8 border-t border-[#eee7dd] pt-6">

                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#998c82]">
                  Rating
                </p>

                <div className="mt-4 space-y-3">

                  {[
                    "4.5 & above",
                    "4.0 & above",
                    "3.5 & above",
                  ].map((rating) => (

                    <label
                      key={rating}
                      className="flex cursor-pointer items-center gap-3 text-sm text-[#5f5149]"
                    >

                      <input
                        type="radio"
                        name="rating"
                        className="h-4 w-4 accent-[#e87908]"
                      />

                      {rating}

                    </label>

                  ))}

                </div>

              </div>


              {/* Categories */}
              <div className="mt-8 border-t border-[#eee7dd] pt-6">

                <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#998c82]">
                  Category
                </p>

                <div className="mt-4 space-y-3">

                  {[
                    "Nature",
                    "Mountains",
                    "Historical",
                    "Adventure",
                    "Food",
                  ].map((category) => (

                    <label
                      key={category}
                      className="flex cursor-pointer items-center gap-3 text-sm text-[#5f5149]"
                    >

                      <input
                        type="checkbox"
                        className="h-4 w-4 accent-[#e87908]"
                      />

                      {category}

                    </label>

                  ))}

                </div>

              </div>

            </div>

          </aside>


          {/* =================================================
              RESULTS
          ================================================== */}

          <section>


            {/* Results toolbar */}
            <div className="mb-6 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

              <div>

                <p className="text-sm text-[#756960]">

                  Showing{" "}

                  <span className="font-semibold text-[#321d14]">
                    {visiblePlaces.length}
                  </span>{" "}

                  of{" "}

                  <span className="font-semibold text-[#321d14]">
                    {filteredPlaces.length}
                  </span>{" "}

                  places

                </p>

              </div>


              {/* Sort */}
              <div className="flex items-center gap-3">

                <span className="text-sm text-[#8a7d73]">
                  Sort by
                </span>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="rounded-full border border-[#ddd2c5] bg-[#fffdf9] px-4 py-2.5 text-sm font-medium outline-none focus:border-[#e87908]"
                >
                  <option>Popular</option>
                  <option>Top rated</option>
                  <option>Newest</option>
                  <option>A-Z</option>
                </select>

              </div>

            </div>


            {/* =================================================
                EMPTY STATE
            ================================================== */}

            {filteredPlaces.length === 0 && (

              <div className="flex min-h-[450px] flex-col items-center justify-center rounded-[25px] border border-[#ded4c7] bg-[#fffdf9] px-6 text-center">

                <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#f4e7d5]">

                  <SearchIcon className="h-8 w-8 text-[#e87908]" />

                </div>

                <h2 className="mt-6 font-serif text-3xl font-bold">
                  Nothing found here.
                </h2>

                <p className="mt-3 max-w-[430px] text-sm leading-6 text-[#81756c]">
                  We couldn't find a place matching your search.
                  Try another destination or remove some filters.
                </p>

                <button
                  onClick={() => {
                    setSearch("");
                    setActiveCategory("All");
                  }}
                  className="mt-6 rounded-full bg-[#321d14] px-6 py-3 text-sm font-medium text-white"
                >
                  Explore everything
                </button>

              </div>

            )}


            {/* =================================================
                RESULT GRID
            ================================================== */}

            {filteredPlaces.length > 0 && (

              <>

                <div className="grid gap-5 md:grid-cols-2 xl:grid-cols-3">

                  {visiblePlaces.map((place) => (

                    <PlaceCard
                      key={place.id}
                      place={place}
                      saved={saved.includes(place.id)}
                      onSave={() => toggleSaved(place.id)}
                    />

                  ))}

                </div>


                {/* Load more */}
                {visibleCount < filteredPlaces.length && (

                  <div className="mt-10 flex justify-center">

                    <button
                      onClick={handleLoadMore}
                      className="group flex items-center gap-3 rounded-full border border-[#cfc2b5] bg-[#fffdf9] px-7 py-3.5 text-sm font-medium transition hover:border-[#e87908] hover:text-[#e87908]"
                    >

                      Load more places

                      <ArrowDownIcon className="h-4 w-4 transition group-hover:translate-y-1" />

                    </button>

                  </div>

                )}

              </>

            )}

          </section>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   PLACE CARD
========================================================= */

function PlaceCard({ place, saved, onSave }) {
  return (
    <article className="group overflow-hidden rounded-[23px] border border-[#e1d7ca] bg-[#fffdf9] transition duration-300 hover:-translate-y-1 hover:shadow-[0_18px_45px_rgba(50,29,20,0.11)]">

      {/* Image */}
      <div className="relative h-[275px] overflow-hidden">

        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
        />

        {/* Image gradient */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-black/10" />


        {/* Type */}
        <span className="absolute left-4 top-4 rounded-full bg-black/30 px-3 py-1.5 text-[11px] font-medium text-white backdrop-blur-md">
          {place.type}
        </span>


        {/* Save */}
        <button
          onClick={onSave}
          className={`absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full backdrop-blur-md transition ${
            saved
              ? "bg-[#e87908] text-white"
              : "bg-white/20 text-white hover:bg-white hover:text-[#321d14]"
          }`}
        >

          <BookmarkIcon
            className={`h-4 w-4 ${saved ? "fill-current" : ""}`}
          />

        </button>


        {/* Bottom image info */}
        <div className="absolute bottom-4 left-4 flex items-center gap-2">

          <span className="rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-[#321d14]">
            {place.tag}
          </span>

        </div>

      </div>


      {/* Content */}
      <div className="p-5">

        <div className="flex items-start justify-between gap-3">

          <div>

            <h3 className="font-serif text-[23px] font-bold leading-tight">
              {place.name}
            </h3>

            <div className="mt-2 flex items-center gap-1.5 text-xs text-[#85786e]">

              <PinIcon className="h-3.5 w-3.5" />

              {place.location}

            </div>

          </div>


          {/* Rating */}
          <div className="flex shrink-0 items-center gap-1 rounded-full bg-[#f7ead8] px-2.5 py-1.5">

            <StarIcon className="h-3.5 w-3.5 fill-[#e87908] text-[#e87908]" />

            <span className="text-xs font-semibold">
              {place.rating}
            </span>

          </div>

        </div>


        <p className="mt-4 line-clamp-2 text-sm leading-6 text-[#756960]">
          {place.description}
        </p>


        <div className="mt-5 flex items-center justify-between border-t border-[#eee7dd] pt-4">

          <span className="text-xs text-[#998c82]">
            {place.reviews} traveller reviews
          </span>

          <Link
            to={`/place/${encodeURIComponent(place.name.toLowerCase())}`}
            className="flex items-center gap-2 text-xs font-semibold text-[#e87908]"
          >

            Explore

            <ArrowIcon className="h-3.5 w-3.5 transition group-hover:translate-x-1" />

          </Link>

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   ICONS
========================================================= */

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