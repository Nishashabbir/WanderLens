import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import fairyImage from "@/assets/travel2.jpg";
import hunza from "@/assets/hunza1.webp";
import skardu from "@/assets/skardu2.jpg";
import PageNavbar from "./PageNavbar";
import { api, toPlaceDetail, toRelatedPlace } from "@/api";
import { useAuth } from "@/context/AuthContext";

const slugify = (value) =>
  value
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-");

export default function PlaceDetails() {
  const { name } = useParams();
  const { user } = useAuth();
  const [saved, setSaved] = useState(false);
  const [addedToTrip, setAddedToTrip] = useState(false);
  const [activeImage, setActiveImage] = useState(0);
  const [place, setPlace] = useState(null);
  const [relatedPlaces, setRelatedPlaces] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    let active = true;
    (async () => {
      try {
        const placeDoc = await api.placeByName(name);
        if (!active || !placeDoc) return;
        setPlace(toPlaceDetail(placeDoc));
        const destinationId = placeDoc.destination?._id || placeDoc.destination;
        if (destinationId) {
          const relatedRes = await api.places({ destination: destinationId, limit: 6 });
          const related = (relatedRes?.items || [])
            .filter((p) => String(p._id) !== String(placeDoc._id))
            .map(toRelatedPlace);
          if (active) setRelatedPlaces(related.slice(0, 3));
        }
      } catch {
        if (active) {
          setPlace(null);
          setRelatedPlaces([]);
        }
      }
    })();
    return () => {
      active = false;
    };
  }, [name]);

  const current =
    place || {
      name: "Loading…",
      destination: "",
      region: "",
      category: "Place",
      type: "Place",
      location: "",
      rating: 0,
      reviews: 0,
      images: [fairyImage, hunza, skardu],
      description: "Loading this place…",
      openingHours: "",
      entryFee: 0,
      bestTime: "",
      duration: "",
    };

  const images = current.images;

  const entryFeeLabel = current.entryFee
    ? `PKR ${current.entryFee}`
    : "Free";

  const toggleSave = async () => {
    if (!user) return navigate("/login");
    if (saved) {
      await api.unsavePlace(current.id);
      setSaved(false);
    } else {
      await api.savePlace(current.type === "Viewpoint" ? "Viewpoint" : "Place", current.id);
      setSaved(true);
    }
  };

  const addToTrip = () => {
    setAddedToTrip(true);
    navigate(`/trips?place=${encodeURIComponent(slugify(current.name))}`);
  };

  return (
    <div className="min-h-screen overflow-x-hidden bg-[#f7f1e7] text-[#301c14]">

      {/* =====================================================
          NAVBAR
      ====================================================== */}

      <PageNavbar variant="hero" />


      {/* =====================================================
          IMAGE GALLERY
      ====================================================== */}

      <section className="relative h-[78vh] min-h-[650px] bg-[#24150f]">

        {/* Main image */}

        <img
          src={images[activeImage]}
          alt={current.name}
          className="absolute inset-0 h-full w-full object-cover transition duration-700"
        />

        {/* Overlay */}

        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-black/30" />


        {/* Back */}

        <Link
          to="/viewpoints"
          className="absolute left-5 top-28 z-10 flex items-center gap-2 rounded-full border border-white/20 bg-black/20 px-4 py-2.5 text-xs text-white backdrop-blur-md transition hover:bg-white hover:text-[#301c14] lg:left-10"
        >

          <ArrowLeftIcon className="h-4 w-4" />

          Back to viewpoints

        </Link>


        {/* Gallery thumbnails */}

        <div className="absolute bottom-32 right-5 z-10 flex gap-2 lg:right-10">

          {images.map((image, index) => (

            <button
              key={image}
              onClick={() => setActiveImage(index)}
              className={`relative h-16 w-20 overflow-hidden rounded-xl border-2 transition duration-300 ${
                activeImage === index
                  ? "border-[#e87908] opacity-100"
                  : "border-white/20 opacity-60 hover:opacity-100"
              }`}
            >

              <img
                src={image}
                alt=""
                className="h-full w-full object-cover"
              />

            </button>

          ))}

        </div>


        {/* Hero information */}

        <div className="absolute bottom-0 left-0 right-0">

          <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 px-5 pb-10 lg:flex-row lg:items-end lg:px-10 lg:pb-14">

            <div className="max-w-[800px] text-white">

              <div className="mb-4 flex flex-wrap items-center gap-3 text-xs text-white/65">

                <span>{current.destination || "Pakistan"}</span>

                <span>•</span>

                <span>{current.region}</span>

                <span>•</span>

                <span>{current.category}</span>

              </div>

              <h1 className="font-serif text-6xl font-bold tracking-[-3px] md:text-8xl">
                {current.name}
              </h1>

              <div className="mt-5 flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2 rounded-full bg-white/10 px-4 py-2 backdrop-blur-md">

                  <StarIcon className="h-4 w-4 fill-[#f28a12] text-[#f28a12]" />

                  <span className="text-sm font-semibold">
                    {current.rating}
                  </span>

                  <span className="text-xs text-white/50">
                    {current.reviews} reviews
                  </span>

                </div>

                <div className="flex items-center gap-2 text-sm text-white/70">

                  <PinIcon className="h-4 w-4" />

                  {current.location}

                </div>

              </div>

            </div>


            {/* Floating actions */}

            <div className="flex gap-3">

              <button
                onClick={toggleSave}
                className={`flex h-12 items-center gap-2 rounded-full px-5 text-sm font-medium backdrop-blur-md transition duration-300 ${
                  saved
                    ? "bg-[#e87908] text-white"
                    : "border border-white/20 bg-white/10 text-white hover:bg-white hover:text-[#301c14]"
                }`}
              >

                <BookmarkIcon
                  className={`h-4 w-4 ${
                    saved ? "fill-current" : ""
                  }`}
                />

                {saved ? "Saved" : "Save"}

              </button>


              <button
                onClick={addToTrip}
                className="flex h-12 items-center gap-2 rounded-full bg-[#e87908] px-6 text-sm font-semibold text-white transition duration-300 hover:bg-[#f28a12] hover:scale-[1.03]"
              >

                <PlusIcon className="h-4 w-4" />

                {addedToTrip ? "Added to trip" : "Add to trip"}

              </button>

            </div>

          </div>

        </div>

      </section>


      {/* =====================================================
          CONTENT
      ====================================================== */}

      <main className="mx-auto max-w-[1500px] px-5 py-14 lg:px-10 lg:py-20">

        <div className="grid gap-14 lg:grid-cols-[1fr_380px]">


          {/* =================================================
              LEFT
          ================================================= */}

          <div>


            {/* INTRO */}

            <section>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
                About this place
              </p>

              <h2 className="mt-4 max-w-[800px] font-serif text-4xl font-bold leading-tight tracking-[-1px] md:text-5xl">
                Where the mountains
                <span className="italic text-[#e87908]">
                  {" "}open up.
                </span>
              </h2>

              <p className="mt-7 max-w-[850px] text-[15px] leading-8 text-[#71645c]">
                {current.description ||
                  `${current.name} is a place worth discovering on your next journey.`}
              </p>

              <p className="mt-5 max-w-[850px] text-[15px] leading-8 text-[#71645c]">
                Plan to visit during{" "}
                {current.bestTime
                  ? current.bestTime.toLowerCase()
                  : "the best light"}, with roughly {current.duration || "1–2 hours"} on
                site.
              </p>

            </section>


            {/* QUICK FACTS */}

            <section className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-[25px] border border-[#ded3c5] bg-[#ded3c5] md:grid-cols-4">

              <InfoBox
                icon={<ClockIcon />}
                label="Best time"
                value={current.bestTime || "Anytime"}
              />

              <InfoBox
                icon={<MountainIcon />}
                label="Type"
                value={current.category}
              />

              <InfoBox
                icon={<TicketIcon />}
                label="Entry fee"
                value={entryFeeLabel}
              />

              <InfoBox
                icon={<SunIcon />}
                label="Ideal stay"
                value={current.duration || "1–2 hours"}
              />

            </section>


            {/* =================================================
                VISITING INFORMATION
            ================================================== */}

            <section className="mt-16">

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
                Plan your visit
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold">
                Visiting information
              </h2>


              <div className="mt-8 divide-y divide-[#ded3c5] border-y border-[#ded3c5]">

                <VisitRow
                  icon={<ClockIcon />}
                  title="Opening hours"
                  value={current.openingHours || "See local listing"}
                />

                <VisitRow
                  icon={<TicketIcon />}
                  title="Entry fee"
                  value={entryFeeLabel}
                />

                <VisitRow
                  icon={<CarIcon />}
                  title="Getting there"
                  value={current.location || "Check local directions"}
                />

                <VisitRow
                  icon={<SunIcon />}
                  title="Best experience"
                  value={current.bestTime || "Golden hour"}
                />

              </div>

            </section>


            {/* =================================================
                MAP
            ================================================== */}

            <section className="mt-16">

              <div className="flex items-end justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
                    Location
                  </p>

                  <h2 className="mt-3 font-serif text-4xl font-bold">
                    Find your way here.
                  </h2>

                </div>

                <button className="hidden items-center gap-2 rounded-full border border-[#d8ccc0] bg-[#fffdf9] px-5 py-2.5 text-xs font-medium transition hover:border-[#e87908] hover:text-[#e87908] sm:flex">

                  Open directions

                  <ArrowIcon className="h-3.5 w-3.5" />

                </button>

              </div>


              {/* Fake map — replace with Google/Mapbox later */}

              <div className="relative mt-7 h-[400px] overflow-hidden rounded-[28px] border border-[#ddd1c4] bg-[#e8dfd3]">

                {/* Map pattern */}

                <div className="absolute inset-0 opacity-30">

                  <div className="absolute left-[15%] top-[20%] h-[150px] w-[450px] rotate-12 rounded-[50%] border-[35px] border-[#c7b9a8]" />

                  <div className="absolute right-[5%] top-[40%] h-[180px] w-[500px] -rotate-12 rounded-[50%] border-[30px] border-[#c7b9a8]" />

                  <div className="absolute bottom-[10%] left-[30%] h-[100px] w-[400px] rotate-6 rounded-[50%] border-[25px] border-[#c7b9a8]" />

                </div>


                {/* Roads */}

                <div className="absolute left-0 top-[48%] h-[2px] w-full rotate-6 bg-white/80" />

                <div className="absolute left-[40%] top-0 h-full w-[2px] rotate-[15deg] bg-white/80" />

                <div className="absolute left-[20%] top-0 h-full w-[2px] -rotate-[35deg] bg-white/60" />


                {/* Location pin */}

                <div className="absolute left-[50%] top-[45%] -translate-x-1/2 -translate-y-1/2">

                  <div className="absolute inset-[-14px] animate-ping rounded-full bg-[#e87908]/20" />

                  <div className="relative flex h-14 w-14 items-center justify-center rounded-full bg-[#e87908] text-white shadow-[0_10px_30px_rgba(232,121,8,0.35)]">

                    <PinIcon className="h-6 w-6" />

                  </div>

                </div>


                {/* Label */}

                <div className="absolute left-[calc(50%+40px)] top-[calc(45%-10px)] rounded-xl bg-white px-4 py-3 shadow-xl">

                  <p className="font-serif text-sm font-bold">
                    {current.name}
                  </p>

                  <p className="mt-1 text-[10px] text-[#8d8178]">
                    {current.location}
                  </p>

                </div>

              </div>

            </section>

          </div>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="relative">

            <div className="sticky top-8">


              {/* TRIP CARD */}

              <div className="overflow-hidden rounded-[28px] border border-[#ded3c5] bg-[#fffdf9] shadow-[0_20px_60px_rgba(48,28,20,0.07)]">

                <div className="bg-[#301c14] p-7 text-white">

                  <p className="text-xs uppercase tracking-[0.2em] text-white/50">
                    Plan your visit
                  </p>

                  <h3 className="mt-3 font-serif text-3xl font-bold">
                    {current.name}
                  </h3>

                  <div className="mt-4 flex items-center gap-2">

                    <StarIcon className="h-4 w-4 fill-[#f28a12] text-[#f28a12]" />

                    <span className="text-sm font-semibold">
                      {current.rating}
                    </span>

                    <span className="text-xs text-white/50">
                      · {current.reviews} reviews
                    </span>

                  </div>

                </div>


                <div className="p-7">

                  <div className="space-y-5">

                    <SidebarInfo
                      icon={<ClockIcon />}
                      label="Opening hours"
                      value={current.openingHours || "See listing"}
                    />

                    <SidebarInfo
                      icon={<TicketIcon />}
                      label="Entry fee"
                      value={entryFeeLabel}
                    />

                    <SidebarInfo
                      icon={<PinIcon />}
                      label="Location"
                      value={current.location}
                    />

                  </div>


                  <div className="my-7 h-px bg-[#eee6dc]" />


                  <button
                    onClick={addToTrip}
                    className={`flex h-14 w-full items-center justify-center gap-2 rounded-full text-sm font-semibold transition duration-300 ${
                      addedToTrip
                        ? "bg-[#301c14] text-white"
                        : "bg-[#e87908] text-white hover:bg-[#f28a12] hover:shadow-lg hover:shadow-orange-200"
                    }`}
                  >

                    <PlusIcon className="h-4 w-4" />

                    {addedToTrip
                      ? "Added to your trip"
                      : "Add to my trip"}

                  </button>


                  <button
                    onClick={toggleSave}
                    className="mt-3 flex h-14 w-full items-center justify-center gap-2 rounded-full border border-[#d9cec1] text-sm font-medium transition hover:border-[#e87908] hover:text-[#e87908]"
                  >

                    <BookmarkIcon
                      className={`h-4 w-4 ${
                        saved ? "fill-current text-[#e87908]" : ""
                      }`}
                    />

                    {saved ? "Saved to collection" : "Save place"}

                  </button>

                </div>

              </div>


              {/* TIP */}

              <div className="mt-5 rounded-[25px] bg-[#e8dbc9] p-6">

                <div className="flex gap-4">

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#fffaf2] text-[#e87908]">

                    <SparkleIcon className="h-4 w-4" />

                  </div>

                  <div>

                    <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#8d7765]">
                      Wanderlens tip
                    </p>

                    <p className="mt-2 text-sm leading-6 text-[#604f43]">
                      Arrive around 30 minutes before sunrise.
                      The first light hitting the peaks is worth
                      the early wake-up.
                    </p>

                  </div>

                </div>

              </div>

            </div>

          </aside>

        </div>


        {/* =====================================================
            RELATED PLACES
        ====================================================== */}

        <section className="mt-24 border-t border-[#ded3c5] pt-16">

          <div className="flex flex-col justify-between gap-5 md:flex-row md:items-end">

            <div>

              <p className="text-xs font-semibold uppercase tracking-[0.25em] text-[#e87908]">
                Keep exploring
              </p>

              <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">
                More around {current.destination || "here"}.
              </h2>

            </div>

            <button className="flex items-center gap-2 self-start text-sm font-medium text-[#e87908]">

              View all

              <ArrowIcon className="h-4 w-4" />

            </button>

          </div>


          <div className="mt-10 grid gap-5 md:grid-cols-3">

            {relatedPlaces.map((place) => (

              <RelatedCard
                key={place.name}
                place={place}
              />

            ))}

          </div>

        </section>

      </main>


      {/* =====================================================
          FOOTER
      ====================================================== */}

      <footer className="bg-[#301c14] px-5 py-12 text-white lg:px-10">

        <div className="mx-auto flex max-w-[1500px] flex-col justify-between gap-8 md:flex-row md:items-center">

          <div>

            <div className="flex items-center gap-3">

              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#e87908]">

                <CompassIcon className="h-4 w-4" />

              </div>

              <span className="font-serif text-2xl font-bold">
                Wanderlens
              </span>

            </div>

            <p className="mt-3 text-xs text-white/40">
              Discover places worth remembering.
            </p>

          </div>

          <p className="text-xs text-white/30">
            © 2026 Wanderlens. Explore responsibly.
          </p>

        </div>

      </footer>

    </div>
  );
}


/* =========================================================
   COMPONENTS
========================================================= */

function InfoBox({ icon, label, value }) {
  return (
    <div className="bg-[#fffdf9] p-5 md:p-6">

      <div className="text-[#e87908]">
        {icon}
      </div>

      <p className="mt-4 text-[10px] font-semibold uppercase tracking-[0.15em] text-[#a0958b]">
        {label}
      </p>

      <p className="mt-1 text-sm font-semibold">
        {value}
      </p>

    </div>
  );
}


function VisitRow({ icon, title, value }) {
  return (
    <div className="flex items-center gap-5 py-5">

      <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#efe4d5] text-[#e87908]">
        {icon}
      </div>

      <div className="flex-1">

        <p className="text-sm font-semibold">
          {title}
        </p>

        <p className="mt-1 text-sm text-[#81746b]">
          {value}
        </p>

      </div>

    </div>
  );
}


function SidebarInfo({ icon, label, value }) {
  return (
    <div className="flex items-center gap-4">

      <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#f2e7d9] text-[#e87908]">
        {icon}
      </div>

      <div>

        <p className="text-[10px] uppercase tracking-[0.15em] text-[#a09489]">
          {label}
        </p>

        <p className="mt-1 text-sm font-medium">
          {value}
        </p>

      </div>

    </div>
  );
}


function RelatedCard({ place }) {
  return (
    <article className="group overflow-hidden rounded-[25px] border border-[#ded3c5] bg-[#fffdf9] transition duration-500 hover:-translate-y-2 hover:shadow-[0_20px_50px_rgba(48,28,20,0.1)]">

      <div className="relative h-[280px] overflow-hidden">

        <img
          src={place.image}
          alt={place.name}
          className="h-full w-full object-cover transition duration-[1000ms] group-hover:scale-110"
        />

        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        <div className="absolute bottom-5 left-5 text-white">

          <p className="text-xs text-white/60">
            {place.location}
          </p>

          <h3 className="mt-1 font-serif text-2xl font-bold">
            {place.name}
          </h3>

        </div>

        <div className="absolute right-5 top-5 flex items-center gap-1 rounded-full bg-black/25 px-3 py-1.5 text-xs text-white backdrop-blur-md">

          <StarIcon className="h-3 w-3 fill-[#f28a12] text-[#f28a12]" />

          {place.rating}

        </div>

      </div>

    </article>
  );
}


/* =========================================================
   ICONS
========================================================= */

function CompassIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z" />
    </svg>
  );
}

function ArrowIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 12H19" />
      <path d="M13 6L19 12L13 18" />
    </svg>
  );
}

function ArrowLeftIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M19 12H5" />
      <path d="M11 6L5 12L11 18" />
    </svg>
  );
}

function PlusIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 5V19" />
      <path d="M5 12H19" />
    </svg>
  );
}

function BookmarkIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M6 4.5A2 2 0 018 2.5H16A2 2 0 0118 4.5V21L12 17.5L6 21V4.5Z" />
    </svg>
  );
}

function PinIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M20 10C20 15.5 12 21 12 21S4 15.5 4 10C4 5.6 7.6 3 12 3S20 5.6 20 10Z" />
      <circle cx="12" cy="10" r="2.5" />
    </svg>
  );
}

function StarIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3L14.8 8.7L21 9.6L16.5 14L17.6 20.2L12 17.3L6.4 20.2L7.5 14L3 9.6L9.2 8.7L12 3Z" />
    </svg>
  );
}

function ClockIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="9" />
      <path d="M12 7V12L15.5 14" />
    </svg>
  );
}

function MountainIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M3 19L9 7L13 13L16 9L21 19H3Z" />
      <path d="M7 12L9 15" />
    </svg>
  );
}

function TicketIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M4 7A2 2 0 016 5H18A2 2 0 0120 7V10A2 2 0 0020 14V17A2 2 0 0118 19H6A2 2 0 014 17V14A2 2 0 004 10V7Z" />
      <path d="M12 7V9" />
      <path d="M12 11V13" />
      <path d="M12 15V17" />
    </svg>
  );
}

function SunIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <circle cx="12" cy="12" r="4" />
      <path d="M12 2V5" />
      <path d="M12 19V22" />
      <path d="M2 12H5" />
      <path d="M19 12H22" />
      <path d="M4.9 4.9L7 7" />
      <path d="M17 17L19.1 19.1" />
      <path d="M19.1 4.9L17 7" />
      <path d="M7 17L4.9 19.1" />
    </svg>
  );
}

function CarIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M5 17H3V11L5 6H19L21 11V17H19" />
      <path d="M5 17V19H8V17" />
      <path d="M16 17V19H19V17" />
      <path d="M3 11H21" />
      <circle cx="7" cy="14" r="1.5" />
      <circle cx="17" cy="14" r="1.5" />
    </svg>
  );
}

function SparkleIcon({ className = "h-5 w-5" }) {
  return (
    <svg className={className} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8">
      <path d="M12 3L13.5 9.5L20 11L13.5 12.5L12 19L10.5 12.5L4 11L10.5 9.5L12 3Z" />
    </svg>
  );
}