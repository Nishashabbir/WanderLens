import { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import PageNavbar from "./PageNavbar";
import { destinations as fallbackData } from "./destinationData";
import { api, toDestinationDetail } from "@/api";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function DestinationDetails() {
  const { name } = useParams();
  const [activeTab, setActiveTab] = useState("Overview");
  const [saved, setSaved] = useState(false);
  const [data, setData] = useState(fallbackData[name] || fallbackData.hunza);

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const destination = await api.destinationByName(name);
        if (!active || !destination) return;
        const [placesRes, viewpointsRes, allRes] = await Promise.all([
          api.places({ destination: destination._id, limit: 100 }),
          api.viewpoints({ destination: destination._id, limit: 100 }),
          api.destinations({ limit: 100 }),
        ]);
        const places = placesRes?.items || [];
        const viewpoints = viewpointsRes?.items || [];
        const others = (allRes?.items || []).filter(
          (d) => String(d._id) !== String(destination._id)
        );
        if (active) setData(toDestinationDetail(destination, places, viewpoints, others));
      } catch {
        if (active) setData(fallbackData[name] || fallbackData.hunza);
      }
    })();
    return () => {
      active = false;
    };
  }, [name]);

  const navigation = [
    "Overview",
    "Places",
    "Viewpoints",
    "Activities",
    "Travel guide",
  ];

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f1e7] text-[#301c14]">

      {/* =====================================================
          HERO
      ====================================================== */}

      <section className="relative min-h-[780px] overflow-hidden bg-[#24150f]">

        {/* Background image */}
        <div
          className="absolute inset-0 scale-[1.08] bg-cover bg-center animate-heroZoom"
          style={{
            backgroundImage: `url(${data.heroImage})`,
          }}
        />

        {/* Cinematic overlays */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/55 via-black/10 to-[#24150f]" />

        <div className="absolute inset-0 bg-gradient-to-r from-black/45 via-transparent to-black/20" />


        {/* =================================================
            NAVBAR
        ================================================== */}

        <PageNavbar variant="hero" />


        {/* =================================================
            HERO CONTENT
        ================================================== */}

        <div className="relative z-10 mx-auto flex min-h-[680px] max-w-[1500px] items-end px-6 pb-24 lg:px-10">

          <div className="max-w-[850px] animate-fadeUp">

            <div className="mb-5 flex items-center gap-3">

              <span className="rounded-full border border-white/25 bg-black/20 px-4 py-2 text-xs font-medium text-white backdrop-blur-md">
                {data.region}
              </span>

              <span className="text-sm text-white/70">
                Pakistan
              </span>

            </div>


            <h1 className="font-serif text-6xl font-bold leading-[0.9] tracking-[-3px] text-white sm:text-7xl lg:text-[105px]">

              {data.name}

              <span className="ml-3 italic text-[#f28a12]">
                {data.suffix}
              </span>

            </h1>


            <p className="mt-7 max-w-[650px] text-base leading-7 text-white/80 md:text-lg">

              {data.heroText}

            </p>


            <div className="mt-8 flex flex-wrap gap-3">

              <Link
                to="/explore"
                className="group flex items-center gap-3 rounded-full bg-[#e87908] px-7 py-4 text-sm font-semibold text-white transition duration-300 hover:scale-[1.03] hover:bg-[#f28a1d]"
              >

                Explore places

                <ArrowIcon className="h-4 w-4 transition duration-300 group-hover:translate-x-1" />

              </Link>


              <button
                onClick={() => setSaved(!saved)}
                className={`flex items-center gap-2 rounded-full border px-6 py-4 text-sm font-medium backdrop-blur-md transition ${
                  saved
                    ? "border-[#e87908] bg-[#e87908] text-white"
                    : "border-white/30 bg-white/10 text-white hover:bg-white hover:text-[#301c14]"
                }`}
              >

                <BookmarkIcon
                  className={`h-4 w-4 ${saved ? "fill-current" : ""}`}
                />

                {saved ? "Saved" : "Save destination"}

              </button>

            </div>

          </div>

        </div>


        {/* Scroll indicator */}

        <div className="absolute bottom-7 right-8 z-20 hidden items-center gap-3 text-xs text-white/60 md:flex">

          <span>Scroll to explore</span>

          <div className="h-10 w-[1px] bg-white/40" />

          <ArrowDownIcon className="h-4 w-4 animate-bounce" />

        </div>

      </section>


      {/* =====================================================
          DESTINATION STATS
      ====================================================== */}

      <section className="relative z-20 mx-auto -mt-8 max-w-[1350px] px-5">

        <div className="grid overflow-hidden rounded-[25px] border border-[#dfd3c5] bg-[#fffdf9] shadow-[0_25px_70px_rgba(50,29,20,0.12)] md:grid-cols-4">

          {data.stats.map((stat) => (
            <Stat
              key={stat.label}
              number={stat.number}
              label={stat.label}
            />
          ))}

        </div>

      </section>


      {/* =====================================================
          STICKY DESTINATION NAV
      ====================================================== */}

      <div className="sticky top-0 z-40 mt-14 border-y border-[#ded3c5] bg-[#f7f1e7]/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1350px] items-center gap-7 overflow-x-auto px-5">

          {navigation.map((item) => (

            <button
              key={item}
              onClick={() => setActiveTab(item)}
              className={`relative whitespace-nowrap py-5 text-sm transition ${
                activeTab === item
                  ? "font-semibold text-[#e87908]"
                  : "text-[#75675e] hover:text-[#301c14]"
              }`}
            >

              {item}

              {activeTab === item && (
                <span className="absolute bottom-0 left-0 h-[2px] w-full bg-[#e87908]" />
              )}

            </button>

          ))}

        </div>

      </div>


      {/* =====================================================
          OVERVIEW
      ====================================================== */}

      <section className="mx-auto max-w-[1350px] px-5 py-24 lg:py-32">

        <div className="grid gap-14 lg:grid-cols-[0.8fr_1.2fr]">

          <div>

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
              {data.overviewTop}
            </p>

            <h2 className="mt-4 max-w-[500px] font-serif text-5xl font-bold leading-[1] tracking-[-1px] md:text-6xl">

              {data.overviewTitleLead}
              <span className="italic text-[#e87908]">
                {data.overviewTitleAccent}
              </span>

            </h2>

          </div>


          <div className="max-w-[700px]">

            <p className="text-xl leading-9 text-[#594a41]">

              {data.overviewLead}

            </p>

            <p className="mt-6 text-[15px] leading-8 text-[#83766d]">

              {data.overviewBody}

            </p>


            <div className="mt-9 flex flex-wrap gap-2">

              {data.tags.map((tag) => (

                <span
                  key={tag}
                  className="rounded-full border border-[#d8ccbd] bg-[#fffdf9] px-4 py-2 text-xs text-[#75675e]"
                >
                  {tag}
                </span>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          POPULAR PLACES
      ====================================================== */}

      <section className="bg-[#301c14] px-5 py-24 text-white lg:py-32">

        <div className="mx-auto max-w-[1350px]">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f28a12]">
                Start here
              </p>

              <h2 className="mt-4 font-serif text-5xl font-bold tracking-[-1px] md:text-6xl">
                Places worth
                <br />
                <span className="italic text-[#f28a12]">
                  the detour.
                </span>
              </h2>

            </div>

            <Link
              to="/explore"
              className="flex items-center gap-2 text-sm text-white/70 transition hover:text-[#f28a12]"
            >

              View all places

              <ArrowIcon className="h-4 w-4" />

            </Link>

          </div>


          {/* Large editorial cards */}

          <div className="mt-14 grid gap-5 lg:grid-cols-3">

            {data.attractions.map((place, index) => (

              <Link
                key={place.name}
                to={`/place/${slugify(place.name)}`}
                className={`group relative block overflow-hidden rounded-[25px] ${
                  index === 0
                    ? "lg:col-span-2 lg:h-[570px]"
                    : "lg:h-[570px]"
                } h-[430px]`}
              >

                <img
                  src={place.image}
                  alt={place.name}
                  className="absolute inset-0 h-full w-full object-cover transition duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-transparent" />


                <div className="absolute left-6 right-6 top-6 flex justify-between">

                  <span className="rounded-full border border-white/20 bg-black/20 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                    {place.category}
                  </span>

                  <button className="flex h-10 w-10 items-center justify-center rounded-full bg-white/15 backdrop-blur-md transition hover:bg-[#e87908]">

                    <ArrowIcon className="h-4 w-4 -rotate-45" />

                  </button>

                </div>


                <div className="absolute bottom-7 left-7 right-7">

                  <h3 className="font-serif text-4xl font-bold">
                    {place.name}
                  </h3>

                  <p className="mt-3 max-w-[500px] text-sm leading-6 text-white/70">
                    {place.description}
                  </p>

                  <div className="mt-5 h-[1px] w-0 bg-[#f28a12] transition-all duration-700 group-hover:w-full" />

                </div>

              </Link>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          ACTIVITIES
      ====================================================== */}

      <section className="px-5 py-24 lg:py-32">

        <div className="mx-auto max-w-[1350px]">

          <div className="text-center">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
              Do something memorable
            </p>

            <h2 className="mt-4 font-serif text-5xl font-bold tracking-[-1px] md:text-6xl">
              Your kind of
              <span className="italic text-[#e87908]">
                adventure.
              </span>
            </h2>

          </div>


          <div className="mt-14 grid gap-4 md:grid-cols-5">

            {data.activities.map((activity) => (

              <div
                key={activity.title}
                className="group cursor-pointer rounded-[22px] border border-[#ded3c5] bg-[#fffdf9] p-7 transition duration-500 hover:-translate-y-2 hover:border-[#e87908] hover:shadow-[0_20px_50px_rgba(50,29,20,0.09)]"
              >

                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#f4e7d5] text-xl text-[#e87908] transition duration-500 group-hover:rotate-12 group-hover:bg-[#e87908] group-hover:text-white">

                  {activity.icon}

                </div>

                <h3 className="mt-7 font-serif text-xl font-bold">
                  {activity.title}
                </h3>

                <div className="mt-5 flex justify-end">

                  <ArrowIcon className="h-4 w-4 text-[#a09389] transition duration-300 group-hover:translate-x-1 group-hover:text-[#e87908]" />

                </div>

              </div>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          VIEWPOINTS
      ====================================================== */}

      <section className="overflow-hidden bg-[#eee4d5] px-5 py-24 lg:py-32">

        <div className="mx-auto max-w-[1350px]">

          <div className="grid gap-10 lg:grid-cols-[0.55fr_1.45fr]">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
                Don't miss this
              </p>

              <h2 className="mt-4 font-serif text-5xl font-bold leading-[0.95] md:text-6xl">

                The views
                <br />

                <span className="italic">
                  people climb for.
                </span>

              </h2>

              <p className="mt-6 max-w-[400px] text-sm leading-7 text-[#766960]">
                Some landscapes are worth waking up early for.
                These are the viewpoints we would put at the
                top of the list.
              </p>

            </div>


            <div className="flex gap-5 overflow-x-auto pb-5">

              {data.viewpoints.map((view) => (

                <Link
                  key={view.name}
                  to={`/place/${slugify(view.name)}`}
                  className="group block min-w-[300px] overflow-hidden rounded-[25px] bg-[#fffdf9] md:min-w-[370px]"
                >

                  <div className="relative h-[350px] overflow-hidden">

                    <img
                      src={view.image}
                      alt={view.name}
                      className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />

                    <span className="absolute bottom-5 left-5 rounded-full bg-black/30 px-3 py-1.5 text-xs text-white backdrop-blur-md">
                      {view.time}
                    </span>

                  </div>

                  <div className="p-6">

                    <h3 className="font-serif text-2xl font-bold">
                      {view.name}
                    </h3>

                    <p className="mt-2 text-sm text-[#867970]">
                      {view.place}
                    </p>

                  </div>

                </Link>

              ))}

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          TRAVEL GUIDE + MAP
      ====================================================== */}

      <section className="px-5 py-24 lg:py-32">

        <div className="mx-auto max-w-[1350px]">

          <div className="grid gap-8 lg:grid-cols-[0.85fr_1.15fr]">


            {/* Travel info */}

            <div className="rounded-[28px] bg-[#301c14] p-8 text-white md:p-10">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#f28a12]">
                Before you go
              </p>

              <h2 className="mt-4 font-serif text-4xl font-bold">
                Travel notes.
              </h2>

              <div className="mt-10 divide-y divide-white/10">

                {data.travelInfo.map((info) => (
                  <TravelInfo
                    key={info.title}
                    icon={info.icon}
                    title={info.title}
                    value={info.value}
                  />
                ))}

              </div>

            </div>


            {/* Map */}

            <div className="relative min-h-[500px] overflow-hidden rounded-[28px] border border-[#dcd1c3] bg-[#ded4c4]">

              {/* Map-like background */}

              <div className="absolute inset-0 opacity-50">

                <div className="absolute left-[15%] top-[10%] h-[180px] w-[180px] rounded-full border-[35px] border-[#c5baa9]" />

                <div className="absolute right-[10%] top-[20%] h-[250px] w-[250px] rotate-45 border-[25px] border-[#c5baa9]" />

                <div className="absolute bottom-[5%] left-[35%] h-[300px] w-[90px] rotate-[30deg] bg-[#c5baa9]/60" />

                <div className="absolute left-0 right-0 top-[50%] h-[2px] rotate-[12deg] bg-[#b8ad9b]" />

                <div className="absolute left-[10%] right-0 top-[70%] h-[2px] -rotate-[8deg] bg-[#b8ad9b]" />

              </div>


              {/* Location pins */}

              {data.mapPins.map((pin) => (
                <MapPin
                  key={pin.label}
                  top={pin.top}
                  left={pin.left}
                  active={pin.active}
                  label={pin.label}
                />
              ))}


              <div className="absolute bottom-7 left-7 rounded-[18px] bg-[#fffdf9]/95 p-5 shadow-xl backdrop-blur-md">

                <p className="text-xs uppercase tracking-[0.18em] text-[#988a80]">
                  Destination map
                </p>

                <p className="mt-1 font-serif text-xl font-bold">
                  {data.mapLabel}
                </p>

                <button className="mt-3 flex items-center gap-2 text-xs font-semibold text-[#e87908]">

                  Open full map

                  <ArrowIcon className="h-3.5 w-3.5" />

                </button>

              </div>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          NEARBY DESTINATIONS
      ====================================================== */}

      <section className="border-t border-[#ded3c5] px-5 py-24 lg:py-28">

        <div className="mx-auto max-w-[1350px]">

          <div className="flex items-end justify-between">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
                Keep going
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">
                Nearby destinations
              </h2>

            </div>

            <button className="hidden items-center gap-2 text-sm font-medium text-[#e87908] md:flex">

              Explore more

              <ArrowIcon className="h-4 w-4" />

            </button>

          </div>


          <div className="mt-12 grid gap-5 md:grid-cols-3">

            {data.nearby.map((destination) => (

              <article
                key={destination.name}
                className="group relative h-[330px] overflow-hidden rounded-[25px]"
              >

                <img
                  src={destination.image}
                  alt={destination.name}
                  className="h-full w-full object-cover transition duration-1000 group-hover:scale-110"
                />

                <div className="absolute inset-0 bg-gradient-to-t from-black/75 via-transparent to-transparent" />

                <div className="absolute bottom-6 left-6">

                  <p className="text-xs text-white/60">
                    {destination.distance}
                  </p>

                  <h3 className="mt-1 font-serif text-3xl font-bold text-white">
                    {destination.name}
                  </h3>

                </div>

              </article>

            ))}

          </div>

        </div>

      </section>


      {/* =====================================================
          FOOTER CTA
      ====================================================== */}

      <section className="px-5 pb-12">

        <div className="relative mx-auto max-w-[1350px] overflow-hidden rounded-[30px] bg-[#e87908] px-7 py-16 text-center md:px-10">

          <div className="absolute -right-20 -top-20 h-60 w-60 rounded-full border-[40px] border-white/10" />

          <div className="absolute -bottom-32 -left-20 h-72 w-72 rounded-full border-[50px] border-white/10" />

          <div className="relative">

            <p className="text-xs font-semibold uppercase tracking-[0.25em] text-white/70">
              Your next story
            </p>

            <h2 className="mx-auto mt-4 max-w-[700px] font-serif text-4xl font-bold text-white md:text-6xl">
              Some places should be experienced, not just seen.
            </h2>

            <button className="mt-8 rounded-full bg-[#301c14] px-8 py-4 text-sm font-semibold text-white transition duration-300 hover:scale-105 hover:bg-[#40261b]">
              Start exploring
            </button>

          </div>

        </div>

      </section>


      {/* =====================================================
          ANIMATION STYLES
      ====================================================== */}

      <style>{`
        @keyframes heroZoom {
          0% {
            transform: scale(1.08);
          }

          100% {
            transform: scale(1.15);
          }
        }

        @keyframes fadeUp {
          from {
            opacity: 0;
            transform: translateY(35px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-heroZoom {
          animation: heroZoom 14s ease-out forwards;
        }

        .animate-fadeUp {
          animation: fadeUp 1s ease-out forwards;
        }
      `}</style>

    </div>
  );
}


/* =========================================================
   STAT
========================================================= */

function Stat({ number, label }) {
  return (
    <div className="group border-b border-[#e5dbce] p-7 text-center transition duration-300 hover:bg-[#faf5ed] md:border-b-0 md:border-r last:border-r-0">

      <p className="font-serif text-3xl font-bold text-[#301c14] transition duration-300 group-hover:text-[#e87908]">
        {number}
      </p>

      <p className="mt-2 text-xs uppercase tracking-[0.12em] text-[#95887e]">
        {label}
      </p>

    </div>
  );
}


/* =========================================================
   TRAVEL INFO
========================================================= */

function TravelInfo({ icon, title, value }) {
  return (
    <div className="flex items-center gap-5 py-5">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-white/10 text-[#f28a12]">
        {icon}
      </div>

      <div>

        <p className="text-xs text-white/50">
          {title}
        </p>

        <p className="mt-1 text-sm font-medium">
          {value}
        </p>

      </div>

    </div>
  );
}


/* =========================================================
   MAP PIN
========================================================= */

function MapPin({ top, left, label, active = false }) {
  return (
    <div
      className="absolute"
      style={{
        top,
        left,
      }}
    >

      <div className="group relative">

        <div
          className={`absolute -inset-3 animate-ping rounded-full ${
            active ? "bg-[#e87908]/30" : "bg-transparent"
          }`}
        />

        <div
          className={`relative flex h-10 w-10 items-center justify-center rounded-full border-4 border-[#fffdf9] shadow-xl ${
            active
              ? "bg-[#e87908]"
              : "bg-[#301c14]"
          }`}
        >

          <PinIcon className="h-4 w-4 text-white" />

        </div>


        <div className="absolute left-1/2 top-[48px] -translate-x-1/2 whitespace-nowrap rounded-full bg-[#301c14] px-3 py-1.5 text-xs font-medium text-white shadow-lg">
          {label}
        </div>

      </div>

    </div>
  );
}


/* =========================================================
   ICONS
========================================================= */

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