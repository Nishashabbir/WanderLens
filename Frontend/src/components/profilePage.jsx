import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import PageNavbar from "./PageNavbar";
import { api, toSavedCard } from "@/api";
import { useAuth } from "@/context/AuthContext";

export default function Profile() {
  const { user, loading, logout } = useAuth();
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState("Overview");
  const [savedPlaces, setSavedPlaces] = useState([]);
  const [trips, setTrips] = useState([]);

  useEffect(() => {
    if (loading) return;
    if (!user) {
      navigate("/login");
      return;
    }
    let active = true;
    api
      .savedPlaces()
      .then((items) => {
        if (active) setSavedPlaces((items || []).map(toSavedCard));
      })
      .catch(() => {});
    api
      .trips()
      .then((items) => {
        if (active) setTrips(items || []);
      })
      .catch(() => {});
    return () => {
      active = false;
    };
  }, [loading, user, navigate]);

  if (loading || !user) return null;

  const name = user.name || "Explorer";
  const initials = name
    .split(/\s+/)
    .map((part) => part[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  const memberSince = user.createdAt
    ? new Date(user.createdAt).toLocaleDateString(undefined, {
        month: "long",
        year: "numeric",
      })
    : "2026";

  const placesSaved = savedPlaces.length;
  const tripsPlanned = trips.length;
  const placesExplored = savedPlaces.filter((s) => s.itemType === "Place").length;
  const viewpoints = savedPlaces.filter((s) => s.itemType === "Viewpoint").length;

  const activities = [
    {
      title: `${placesSaved} places in your collection`,
      time: "Saved across your journeys",
      icon: "bookmark",
    },
    {
      title: `${tripsPlanned} trips planned`,
      time: "Ready for your next adventure",
      icon: "compass",
    },
    {
      title: `Profile updated`,
      time: memberSince,
      icon: "heart",
    },
  ];

  const handleLogout = async () => {
    await logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-[#f6f0e6] text-[#2d1a12]">

      {/* =====================================================
          TOP NAVIGATION
      ====================================================== */}

      <PageNavbar />


      {/* =====================================================
          MAIN
      ====================================================== */}

      <main className="mx-auto max-w-[1500px] px-5 py-8 lg:px-10 lg:py-12">


        {/* =================================================
            PROFILE HERO
        ================================================== */}

        <section className="relative overflow-hidden rounded-[30px] bg-[#321d14] shadow-[0_20px_60px_rgba(45,26,18,0.15)]">

          {/* Background image */}
          <div
            className="absolute inset-0 bg-cover bg-center opacity-55"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1800&q=90')",
            }}
          />

          {/* Gradient */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#24140e]/95 via-[#321d14]/75 to-[#321d14]/20" />

          {/* Decorative circle */}
          <div className="absolute -right-32 -top-40 h-[500px] w-[500px] rounded-full border border-white/10" />

          <div className="absolute -right-20 -top-28 h-[360px] w-[360px] rounded-full border border-white/10" />


          <div className="relative px-7 py-9 md:px-12 md:py-12 lg:py-14">

            <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">


              {/* Profile */}
              <div className="flex flex-col gap-6 sm:flex-row sm:items-center">

                {/* Avatar */}
                <div className="relative">

                  <div className="flex h-28 w-28 items-center justify-center rounded-full border-[5px] border-white/30 bg-[#e87908] font-serif text-4xl font-bold text-white shadow-2xl">
                    {initials}
                  </div>

                  <div className="absolute bottom-1 right-1 flex h-8 w-8 items-center justify-center rounded-full border-4 border-[#321d14] bg-[#e87908]">
                    <CompassIcon className="h-3.5 w-3.5 text-white" />
                  </div>

                </div>


                <div>

                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.22em] text-[#f29a37]">
                    Your journey
                  </p>

                  <h1 className="font-serif text-4xl font-bold text-white md:text-5xl">
                    {name}
                  </h1>

                  <p className="mt-3 max-w-[480px] text-sm leading-6 text-white/70 md:text-base">
                    Collecting places, chasing sunsets, and keeping
                    a little piece of every journey.
                  </p>

                </div>

              </div>


              {/* Edit button */}
              <button className="flex w-fit items-center gap-2 rounded-full border border-white/20 bg-white/10 px-5 py-3 text-sm font-medium text-white backdrop-blur-md transition hover:bg-white/20">

                <EditIcon className="h-4 w-4" />

                Edit profile

              </button>

            </div>

          </div>

        </section>


        {/* =================================================
            CONTENT GRID
        ================================================== */}

        <div className="mt-8 grid gap-8 lg:grid-cols-[1fr_340px]">


          {/* =================================================
              LEFT COLUMN
          ================================================= */}

          <div className="space-y-8">


            {/* Stats */}
            <section className="grid grid-cols-2 overflow-hidden rounded-[24px] border border-[#e0d6c8] bg-[#fffdf9] md:grid-cols-4">

              <Stat
                number={placesSaved}
                label="Places saved"
              />

              <Stat
                number={tripsPlanned}
                label="Trips planned"
              />

              <Stat
                number={placesExplored}
                label="Places explored"
              />

              <Stat
                number={viewpoints}
                label="Viewpoints"
              />

            </section>


            {/* =================================================
                SAVED PLACES
            ================================================== */}

            <section>

              <div className="mb-5 flex items-end justify-between">

                <div>

                  <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e87908]">
                    Your collection
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-bold">
                    Saved places
                  </h2>

                </div>

                <button className="hidden items-center gap-2 text-sm font-medium text-[#e87908] sm:flex">
                  View all
                  <ArrowIcon className="h-4 w-4" />
                </button>

              </div>


              <div className="grid gap-5 md:grid-cols-3">

                {savedPlaces.map((place) => (

                  <div
                    key={place.name}
                    className="group relative h-[340px] overflow-hidden rounded-[22px] bg-black"
                  >

                    <img
                      src={place.image}
                      alt={place.name}
                      className="absolute inset-0 h-full w-full object-cover transition duration-700 group-hover:scale-105"
                    />

                    <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-black/10" />


                    {/* Bookmark */}
                    <button className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/15 text-white backdrop-blur-md transition hover:bg-[#e87908]">

                      <BookmarkIcon className="h-4 w-4" />

                    </button>


                    {/* Text */}
                    <div className="absolute bottom-5 left-5 right-5">

                      <span className="rounded-full bg-white/15 px-3 py-1 text-[11px] font-medium text-white backdrop-blur-md">
                        {place.category}
                      </span>

                      <h3 className="mt-3 font-serif text-2xl font-bold text-white">
                        {place.name}
                      </h3>

                      <div className="mt-2 flex items-center gap-2 text-xs text-white/70">

                        <PinIcon className="h-3.5 w-3.5" />

                        {place.location}

                      </div>

                    </div>

                  </div>

                ))}

              </div>

            </section>


            {/* =================================================
                UPCOMING TRIP
            ================================================== */}

            <section className="relative overflow-hidden rounded-[25px] bg-[#e87908]">

              <div className="absolute right-0 top-0 h-full w-[50%] opacity-40">

                <div
                  className="h-full w-full bg-cover bg-center"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1578895101408-1a36b834405b?auto=format&fit=crop&w=900&q=85')",
                  }}
                />

              </div>

              <div className="absolute inset-0 bg-gradient-to-r from-[#e87908] via-[#e87908]/95 to-transparent" />


              <div className="relative p-7 md:p-9">

                <div className="flex items-center gap-2 text-xs font-semibold uppercase tracking-[0.2em] text-white/70">
                  <CalendarIcon className="h-4 w-4" />
                  Next adventure
                </div>

                <h2 className="mt-4 font-serif text-3xl font-bold text-white">
                  {trips[0]
                    ? `${trips[0].name || "Your trip"} is waiting.`
                    : "Skardu, here we come."}
                </h2>

                <p className="mt-2 max-w-[430px] text-sm leading-6 text-white/80">
                  Your planned trip is waiting. Explore lakes,
                  mountains and places far beyond the ordinary.
                </p>

                <button className="mt-6 rounded-full bg-[#321d14] px-5 py-3 text-sm font-medium text-white transition hover:bg-[#44271b]">
                  View trip
                </button>

              </div>

            </section>


            {/* =================================================
                ACTIVITY
            ================================================== */}

            <section>

              <div className="mb-5">

                <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e87908]">
                  Your trail
                </p>

                <h2 className="mt-2 font-serif text-3xl font-bold">
                  Recent activity
                </h2>

              </div>


              <div className="rounded-[24px] border border-[#e0d6c8] bg-[#fffdf9]">

                {activities.map((activity, index) => (

                  <div
                    key={activity.title}
                    className={`flex items-center gap-4 px-6 py-5 ${
                      index !== activities.length - 1
                        ? "border-b border-[#eee7dd]"
                        : ""
                    }`}
                  >

                    <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#f5eadb] text-[#e87908]">

                      {activity.icon === "bookmark" && (
                        <BookmarkIcon className="h-4 w-4" />
                      )}

                      {activity.icon === "compass" && (
                        <CompassIcon className="h-4 w-4" />
                      )}

                      {activity.icon === "heart" && (
                        <HeartIcon className="h-4 w-4" />
                      )}

                    </div>

                    <div className="flex-1">

                      <p className="text-sm font-medium">
                        {activity.title}
                      </p>

                      <p className="mt-1 text-xs text-[#8a7d73]">
                        {activity.time}
                      </p>

                    </div>

                    <ArrowIcon className="h-4 w-4 text-[#a99d93]" />

                  </div>

                ))}

              </div>

            </section>

          </div>


          {/* =================================================
              RIGHT SIDEBAR
          ================================================== */}

          <aside className="space-y-6">


            {/* Profile Information */}
            <section className="rounded-[24px] border border-[#e0d6c8] bg-[#fffdf9] p-6">

              <div className="flex items-center justify-between">

                <h3 className="font-serif text-2xl font-bold">
                  Profile
                </h3>

                <button className="text-[#e87908]">
                  <EditIcon className="h-4 w-4" />
                </button>

              </div>


              <div className="mt-6 space-y-5">

                <InfoRow
                  label="Email"
                  value={user.email || ""}
                />

                <InfoRow
                  label="Location"
                  value={user.profile?.location || "Pakistan"}
                />

                <InfoRow
                  label="Member since"
                  value={memberSince}
                />

              </div>

            </section>


            {/* Preferences */}
            <section className="rounded-[24px] border border-[#e0d6c8] bg-[#fffdf9] p-6">

              <p className="text-xs font-semibold uppercase tracking-[0.2em] text-[#e87908]">
                Preferences
              </p>

              <h3 className="mt-2 font-serif text-2xl font-bold">
                Your kind of places
              </h3>


              <div className="mt-5 flex flex-wrap gap-2">

                {[
                  "Mountains",
                  "Nature",
                  "Adventure",
                  "Viewpoints",
                  "Food",
                ].map((item) => (

                  <span
                    key={item}
                    className="rounded-full border border-[#e1d6c9] bg-[#f8f1e7] px-3.5 py-2 text-xs font-medium text-[#594940]"
                  >
                    {item}
                  </span>

                ))}

              </div>

            </section>


            {/* Navigation */}
            <section className="rounded-[24px] border border-[#e0d6c8] bg-[#fffdf9] p-3">

              <ProfileLink
                icon={<UserIcon />}
                label="Profile information"
                active={activeTab === "Profile"}
                onClick={() => setActiveTab("Profile")}
              />

              <ProfileLink
                icon={<BookmarkIcon />}
                label="Saved places"
                active={activeTab === "Saved"}
                onClick={() => setActiveTab("Saved")}
              />

              <ProfileLink
                icon={<CompassIcon />}
                label="My trips"
                active={activeTab === "Trips"}
                onClick={() => setActiveTab("Trips")}
              />

              <ProfileLink
                icon={<SettingsIcon />}
                label="Preferences"
                active={activeTab === "Preferences"}
                onClick={() => setActiveTab("Preferences")}
              />

            </section>


            {/* Logout */}
            <button
            onClick={handleLogout}
            className="group flex w-full items-center justify-center gap-3 rounded-[20px] border border-[#e0d6c8] bg-transparent px-5 py-4 text-sm font-medium text-[#8a5c4a] transition hover:border-[#c96b45] hover:bg-[#fff5ef]"
          >

              <LogoutIcon className="h-4 w-4 transition group-hover:-translate-x-1" />

              Log out

            </button>

          </aside>

        </div>

      </main>

    </div>
  );
}


/* =========================================================
   COMPONENTS
========================================================= */

function Stat({ number, label }) {
  return (
    <div className="border-b border-[#e8dfd4] px-5 py-6 text-center md:border-b-0 md:border-r last:border-r-0">

      <p className="font-serif text-3xl font-bold text-[#321d14]">
        {number}
      </p>

      <p className="mt-1 text-xs text-[#8a7d73]">
        {label}
      </p>

    </div>
  );
}


function InfoRow({ label, value }) {
  return (
    <div>

      <p className="text-[11px] font-semibold uppercase tracking-[0.15em] text-[#a0948a]">
        {label}
      </p>

      <p className="mt-1 text-sm font-medium text-[#403129]">
        {value}
      </p>

    </div>
  );
}


function ProfileLink({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`flex w-full items-center gap-4 rounded-[16px] px-4 py-3.5 text-left text-sm transition ${
        active
          ? "bg-[#f6e8d6] font-medium text-[#e87908]"
          : "text-[#66574e] hover:bg-[#faf4eb]"
      }`}
    >

      <span
        className={`flex h-9 w-9 items-center justify-center rounded-full ${
          active
            ? "bg-[#e87908] text-white"
            : "bg-[#f5eee5] text-[#776960]"
        }`}
      >
        {icon}
      </span>

      {label}

      <ArrowIcon className="ml-auto h-4 w-4 opacity-50" />

    </button>
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


function EditIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M12 20H21" />
      <path d="M16.5 3.5A2.1 2.1 0 0119.5 6.5L8 18L3 19L4 14L16.5 3.5Z" />
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


function HeartIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M20.8 8.8C20.8 14 12 20 12 20S3.2 14 3.2 8.8C3.2 5.8 5.3 4 7.8 4C9.5 4 11 4.9 12 6.2C13 4.9 14.5 4 16.2 4C18.7 4 20.8 5.8 20.8 8.8Z" />
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


function CalendarIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <rect x="3" y="5" width="18" height="16" rx="2" />
      <path d="M16 3V7M8 3V7M3 10H21" />
    </svg>
  );
}


function UserIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <circle cx="12" cy="8" r="3.5" />
      <path d="M5 20C5.7 16.5 8 14.5 12 14.5C16 14.5 18.3 16.5 19 20" />
    </svg>
  );
}


function SettingsIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
    >
      <circle cx="12" cy="12" r="3" />
      <path d="M19.4 15A1.7 1.7 0 0021 13.4V10.6A1.7 1.7 0 0019.4 9L18 8.5A7 7 0 0017 7L17.5 5.6A1.7 1.7 0 0016.7 3.5L14.3 2.5A1.7 1.7 0 0012.7 3.2L12 4.5L10 4.5L9.3 3.2A1.7 1.7 0 007.7 2.5L5.3 3.5A1.7 1.7 0 004.5 5.6L5 7A7 7 0 004 8.5L2.6 9A1.7 1.7 0 001 10.6V13.4A1.7 1.7 0 002.6 15L4 15.5A7 7 0 005 17L4.5 18.4A1.7 1.7 0 005.3 20.5L7.7 21.5A1.7 1.7 0 009.3 20.8L10 19.5H12L12.7 20.8A1.7 1.7 0 0014.3 21.5L16.7 20.5A1.7 1.7 0 0017.5 18.4L17 17A7 7 0 0018 15.5L19.4 15Z" />
    </svg>
  );
}


function LogoutIcon({ className = "h-5 w-5" }) {
  return (
    <svg
      className={className}
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >
      <path d="M10 17L15 12L10 7" />
      <path d="M15 12H3" />
      <path d="M21 19V5A2 2 0 0019 3H13" />
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