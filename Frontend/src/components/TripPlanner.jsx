import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const STORAGE_KEY = "wanderlens_trips";

/* =========================================================
   SAMPLE PLACES
   Later these will come from your backend/database.
========================================================= */

const placesData = [
  {
    id: 1,
    name: "Baltit Fort",
    location: "Karimabad, Hunza",
    category: "Historical",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 2,
    name: "Attabad Lake",
    location: "Gojal, Hunza",
    category: "Nature",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1500534623283-312aade485b7?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 3,
    name: "Eagle's Nest",
    location: "Duikar, Hunza",
    category: "Viewpoint",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 4,
    name: "Altit Fort",
    location: "Altit, Hunza",
    category: "Historical",
    rating: 4.7,
    image:
      "https://images.unsplash.com/photo-1528127269322-539801943592?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 5,
    name: "Passu Cones",
    location: "Gojal, Hunza",
    category: "Nature",
    rating: 4.9,
    image:
      "https://images.unsplash.com/photo-1464278533981-50106e6176b1?auto=format&fit=crop&w=900&q=85",
  },
  {
    id: 6,
    name: "Khunjerab Pass",
    location: "Hunza",
    category: "Adventure",
    rating: 4.8,
    image:
      "https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=900&q=85",
  },
];


/* =========================================================
   MAIN COMPONENT
========================================================= */

export default function TripPlanner() {

  const navigate = useNavigate();

  /* -------------------------------------------------------
     TRIPS
  ------------------------------------------------------- */

  const [trips, setTrips] = useState([]);

  const [activeTrip, setActiveTrip] = useState(null);


  /* -------------------------------------------------------
     CREATE TRIP MODAL
  ------------------------------------------------------- */

  const [showCreateModal, setShowCreateModal] =
    useState(false);

  const [tripName, setTripName] = useState("");

  const [destination, setDestination] =
    useState("");

  const [startDate, setStartDate] =
    useState("");

  const [endDate, setEndDate] =
    useState("");


  /* -------------------------------------------------------
     PLACE PICKER
  ------------------------------------------------------- */

  const [showPlacePicker, setShowPlacePicker] =
    useState(false);

  const [selectedDay, setSelectedDay] =
    useState(null);

  const [search, setSearch] = useState("");


  /* -------------------------------------------------------
     LOAD SAVED TRIPS
  ------------------------------------------------------- */

  useEffect(() => {

    const savedTrips =
      JSON.parse(
        localStorage.getItem(STORAGE_KEY)
      ) || [];

    setTrips(savedTrips);

  }, []);


  /* =======================================================
     SAVE TRIPS TO LOCAL STORAGE
  ======================================================= */

  const saveTripsToStorage = (updatedTrips) => {

    localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify(updatedTrips)
    );

    setTrips(updatedTrips);
  };


  /* =======================================================
     CREATE TRIP
  ======================================================= */

  const createTrip = () => {

    if (!tripName.trim() || !destination) {
      return;
    }

    const newTrip = {

      id: Date.now(),

      name: tripName.trim(),

      destination,

      startDate,

      endDate,

      createdAt:
        new Date().toISOString(),

      days: [

        {
          id: Date.now() + 1,

          title: "Day 1",

          places: [],
        },

      ],
    };


    const updatedTrips = [
      ...trips,
      newTrip,
    ];


    saveTripsToStorage(updatedTrips);

    setActiveTrip(newTrip);

    setTripName("");

    setDestination("");

    setStartDate("");

    setEndDate("");

    setShowCreateModal(false);
  };


  /* =======================================================
     UPDATE ACTIVE TRIP
  ======================================================= */

  const updateTrip = (updatedTrip) => {

    setActiveTrip(updatedTrip);


    const updatedTrips =
      trips.map((trip) =>
        trip.id === updatedTrip.id
          ? updatedTrip
          : trip
      );


    saveTripsToStorage(updatedTrips);
  };


  /* =======================================================
     ADD DAY
  ======================================================= */

  const addDay = () => {

    if (!activeTrip) return;


    const newDay = {

      id: Date.now(),

      title:
        `Day ${activeTrip.days.length + 1}`,

      places: [],
    };


    const updatedTrip = {

      ...activeTrip,

      days: [
        ...activeTrip.days,
        newDay,
      ],
    };


    updateTrip(updatedTrip);
  };


  /* =======================================================
     OPEN PLACE PICKER
  ======================================================= */

  const openPlacePicker = (dayId) => {

    setSelectedDay(dayId);

    setSearch("");

    setShowPlacePicker(true);
  };


  /* =======================================================
     ADD PLACE TO DAY
  ======================================================= */

  const addPlaceToDay = (place) => {

    if (!activeTrip || !selectedDay) {
      return;
    }


    /* Prevent duplicate place */

    const alreadyAdded =
      activeTrip.days.some((day) =>
        day.places.some(
          (existingPlace) =>
            existingPlace.id === place.id
        )
      );


    if (alreadyAdded) {
      return;
    }


    const updatedTrip = {

      ...activeTrip,

      days:

        activeTrip.days.map((day) =>

          day.id === selectedDay

            ? {

                ...day,

                places: [
                  ...day.places,
                  {
                    ...place,
                    addedAt:
                      new Date().toISOString(),
                  },
                ],

              }

            : day
        ),
    };


    updateTrip(updatedTrip);

    setShowPlacePicker(false);
  };


  /* =======================================================
     REMOVE PLACE
  ======================================================= */

  const removePlace = (
    dayId,
    placeId
  ) => {

    if (!activeTrip) return;


    const updatedTrip = {

      ...activeTrip,

      days:

        activeTrip.days.map((day) =>

          day.id === dayId

            ? {

                ...day,

                places:
                  day.places.filter(
                    (place) =>
                      place.id !== placeId
                  ),
              }

            : day
        ),
    };


    updateTrip(updatedTrip);
  };


  /* =======================================================
     DELETE DAY
  ======================================================= */

  const deleteDay = (dayId) => {

    if (!activeTrip) return;

    if (activeTrip.days.length === 1) {
      return;
    }


    const updatedTrip = {

      ...activeTrip,

      days:
        activeTrip.days.filter(
          (day) =>
            day.id !== dayId
        ),
    };


    updateTrip(updatedTrip);
  };


  /* =======================================================
     DELETE TRIP
  ======================================================= */

  const deleteTrip = (tripId) => {

    const updatedTrips =
      trips.filter(
        (trip) =>
          trip.id !== tripId
      );


    saveTripsToStorage(updatedTrips);

    setActiveTrip(null);
  };


  /* =======================================================
     SEARCH PLACES
  ======================================================= */

  const filteredPlaces =
    placesData.filter((place) => {

      const text =
        `${place.name}
        ${place.location}
        ${place.category}`
          .toLowerCase();

      return text.includes(
        search.toLowerCase()
      );

    });


  /* =======================================================
     RENDER
  ======================================================= */

  return (

    <div className="min-h-screen bg-[#f7f1e7] text-[#301c14]">


      {/* ===================================================
          NAVBAR
      =================================================== */}

      <nav className="border-b border-[#ded3c5] bg-[#f7f1e7]/90 backdrop-blur-xl">

        <div className="mx-auto flex max-w-[1400px] items-center justify-between px-6 py-5">

          {/* LOGO */}

          <button
            onClick={() =>
              navigate("/")
            }
            className="flex items-center gap-3"
          >

            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#e87908] text-white">

              <CompassIcon />

            </div>

            <span className="font-serif text-2xl font-bold">
              Wanderlens
            </span>

          </button>


          {/* NAVIGATION */}

          <div className="hidden items-center gap-8 text-sm md:flex">

            <button
              onClick={() =>
                navigate("/explore")
              }
              className="transition hover:text-[#e87908]"
            >
              Explore
            </button>

            <button
              onClick={() =>
                navigate("/viewpoints")
              }
              className="transition hover:text-[#e87908]"
            >
              Viewpoints
            </button>

            <button
              className="font-semibold text-[#e87908]"
            >
              My Trips
            </button>

            <button
              onClick={() =>
                navigate("/profile")
              }
              className="transition hover:text-[#e87908]"
            >
              Profile
            </button>

          </div>


          {/* USER */}

          <button
            onClick={() =>
              navigate("/profile")
            }
            className="flex h-10 w-10 items-center justify-center rounded-full bg-[#301c14] text-xs font-bold text-white"
          >
            NS
          </button>

        </div>

      </nav>


      {/* ===================================================
          HERO
      =================================================== */}

      <section className="mx-auto max-w-[1400px] px-6 pb-12 pt-16">

        <p className="text-xs font-bold uppercase tracking-[0.25em] text-[#e87908]">
          Your journeys
        </p>


        <div className="mt-4 flex flex-col justify-between gap-7 md:flex-row md:items-end">

          <div>

            <h1 className="font-serif text-5xl font-bold tracking-[-2px] md:text-7xl">

              Plan your

              <span className="italic text-[#e87908]">
                {" "}next adventure.
              </span>

            </h1>


            <p className="mt-5 max-w-xl text-sm leading-7 text-[#766960]">

              Create your own itinerary, collect
              places you want to visit and organize
              your journey day by day.

            </p>

          </div>


          <button
            onClick={() =>
              setShowCreateModal(true)
            }
            className="flex items-center justify-center gap-2 rounded-full bg-[#e87908] px-6 py-3.5 text-sm font-semibold text-white shadow-lg transition duration-300 hover:-translate-y-1 hover:bg-[#f28a12]"
          >

            <PlusIcon />

            Create new trip

          </button>

        </div>

      </section>


      {/* ===================================================
          MAIN CONTENT
      =================================================== */}

      <main className="mx-auto max-w-[1400px] px-6 pb-20">


        {/* =================================================
            NO ACTIVE TRIP
        ================================================= */}

        {!activeTrip && (

          <>

            {/* NO TRIPS */}

            {trips.length === 0 ? (

              <div className="rounded-[35px] border border-dashed border-[#cfc1b3] bg-[#fffdf9] px-6 py-20 text-center">

                <div className="mx-auto flex h-20 w-20 items-center justify-center rounded-full bg-[#eee1d2] text-[#e87908]">

                  <MapIcon />

                </div>


                <h2 className="mt-7 font-serif text-4xl font-bold">

                  Your next story starts here.

                </h2>


                <p className="mx-auto mt-4 max-w-lg text-sm leading-7 text-[#8f8278]">

                  You haven't created a trip yet.
                  Start planning your adventure
                  and turn your favorite places
                  into a real itinerary.

                </p>


                <button
                  onClick={() =>
                    setShowCreateModal(true)
                  }
                  className="mt-7 rounded-full bg-[#301c14] px-7 py-3.5 text-sm font-semibold text-white transition hover:bg-[#e87908]"
                >

                  Create my first trip

                </button>

              </div>

            ) : (

              /* =============================================
                 EXISTING TRIPS
              ============================================== */

              <div>

                <div className="mb-7">

                  <p className="text-xs uppercase tracking-[0.2em] text-[#a0958b]">
                    Saved journeys
                  </p>

                  <h2 className="mt-2 font-serif text-3xl font-bold">
                    Your trips
                  </h2>

                </div>


                <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">

                  {trips.map((trip) => (

                    <div
                      key={trip.id}
                      className="group overflow-hidden rounded-[28px] border border-[#ded3c5] bg-[#fffdf9] transition duration-300 hover:-translate-y-2 hover:shadow-2xl"
                    >

                      {/* IMAGE */}

                      <div className="h-48 overflow-hidden">

                        <img
                          src="https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=900&q=85"
                          alt=""
                          className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                        />

                      </div>


                      {/* CONTENT */}

                      <div className="p-6">

                        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-[#e87908]">
                          {trip.destination}
                        </p>


                        <h3 className="mt-2 font-serif text-2xl font-bold">
                          {trip.name}
                        </h3>


                        <div className="mt-3 flex items-center gap-4 text-xs text-[#968a81]">

                          <span>
                            {trip.days.length} days
                          </span>

                          <span>
                            •
                          </span>

                          <span>
                            {trip.days.reduce(
                              (total, day) =>
                                total +
                                day.places.length,
                              0
                            )}{" "}
                            places
                          </span>

                        </div>


                        <button
                          onClick={() =>
                            setActiveTrip(trip)
                          }
                          className="mt-6 w-full rounded-full bg-[#301c14] py-3 text-xs font-semibold text-white transition hover:bg-[#e87908]"
                        >
                          Open itinerary
                        </button>

                      </div>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </>

        )}


        {/* =================================================
            ACTIVE TRIP
        ================================================== */}

        {activeTrip && (

          <div>


            {/* BACK */}

            <button
              onClick={() =>
                setActiveTrip(null)
              }
              className="mb-7 flex items-center gap-2 text-sm text-[#83766d] transition hover:text-[#e87908]"
            >

              <ArrowLeftIcon />

              Back to my trips

            </button>


            {/* TRIP HEADER */}

            <div className="rounded-[30px] bg-[#301c14] p-7 text-white md:p-10">

              <div className="flex flex-col justify-between gap-7 md:flex-row md:items-end">

                <div>

                  <p className="text-xs uppercase tracking-[0.2em] text-[#e87908]">
                    {activeTrip.destination}
                  </p>


                  <h2 className="mt-3 font-serif text-4xl font-bold md:text-5xl">
                    {activeTrip.name}
                  </h2>


                  <p className="mt-3 text-sm text-white/50">

                    {activeTrip.startDate ||
                      "Date not selected"}

                    {" → "}

                    {activeTrip.endDate ||
                      "Date not selected"}

                  </p>

                </div>


                <div className="flex gap-3">

                  <button
                    onClick={() =>
                      navigate("/profile")
                    }
                    className="rounded-full border border-white/10 px-5 py-2.5 text-xs text-white/70 transition hover:bg-white/10"
                  >
                    View in profile
                  </button>


                  <button
                    onClick={() =>
                      deleteTrip(activeTrip.id)
                    }
                    className="rounded-full border border-white/10 px-5 py-2.5 text-xs text-white/60 transition hover:border-red-400 hover:text-red-400"
                  >
                    Delete trip
                  </button>

                </div>

              </div>

            </div>


            {/* DAYS */}

            <div className="mt-8 space-y-6">

              {activeTrip.days.map(
                (day, index) => (

                  <div
                    key={day.id}
                    className="rounded-[28px] border border-[#ded3c5] bg-[#fffdf9] p-6 md:p-8"
                  >


                    {/* DAY HEADER */}

                    <div className="flex items-center justify-between">

                      <div>

                        <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e87908]">
                          Day {index + 1}
                        </p>


                        <h3 className="mt-2 font-serif text-3xl font-bold">
                          {day.title}
                        </h3>

                      </div>


                      <div className="flex items-center gap-3">

                        <span className="rounded-full bg-[#eee1d2] px-4 py-2 text-xs text-[#766960]">

                          {day.places.length}{" "}

                          {day.places.length === 1
                            ? "place"
                            : "places"}

                        </span>


                        {activeTrip.days.length >
                          1 && (

                          <button
                            onClick={() =>
                              deleteDay(day.id)
                            }
                            className="text-xs text-[#a0958b] transition hover:text-red-500"
                          >
                            Delete day
                          </button>

                        )}

                      </div>

                    </div>


                    {/* PLACES */}

                    {day.places.length === 0 ? (

                      <div className="mt-7 rounded-[20px] border border-dashed border-[#d4c7b9] bg-[#faf6f0] p-8 text-center">

                        <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-[#eee1d2] text-[#e87908]">

                          <MapPinIcon />

                        </div>


                        <p className="mt-4 text-sm text-[#958980]">

                          Nothing planned for this day yet.

                        </p>

                      </div>

                    ) : (

                      <div className="mt-7 space-y-4">

                        {day.places.map(
                          (place, placeIndex) => (

                            <div
                              key={place.id}
                              className="group flex flex-col overflow-hidden rounded-[22px] border border-[#e2d8ce] bg-[#faf8f4] transition hover:-translate-y-1 hover:shadow-lg sm:flex-row"
                            >

                              <img
                                src={place.image}
                                alt={place.name}
                                className="h-40 w-full object-cover sm:w-52"
                              />


                              <div className="flex flex-1 items-center justify-between p-5">

                                <div>

                                  <div className="flex items-center gap-2">

                                    <span className="flex h-6 w-6 items-center justify-center rounded-full bg-[#e87908] text-[10px] font-bold text-white">
                                      {placeIndex + 1}
                                    </span>

                                    <span className="text-[10px] uppercase tracking-[0.15em] text-[#a0958b]">
                                      {place.category}
                                    </span>

                                  </div>


                                  <h4 className="mt-2 font-serif text-xl font-bold">
                                    {place.name}
                                  </h4>


                                  <p className="mt-1 flex items-center gap-1 text-xs text-[#958980]">

                                    <MapPinIcon />

                                    {place.location}

                                  </p>


                                  <p className="mt-2 text-xs text-[#e87908]">
                                    ★ {place.rating}
                                  </p>

                                </div>


                                <button
                                  onClick={() =>
                                    removePlace(
                                      day.id,
                                      place.id
                                    )
                                  }
                                  className="text-xs text-[#a0958b] transition hover:text-red-500"
                                >

                                  Remove

                                </button>

                              </div>

                            </div>

                          )
                        )}

                      </div>

                    )}


                    {/* ADD PLACE */}

                    <button
                      onClick={() =>
                        openPlacePicker(day.id)
                      }
                      className="mt-6 flex w-full items-center justify-center gap-2 rounded-[20px] border border-dashed border-[#cfc1b3] py-4 text-xs font-semibold text-[#8f8278] transition hover:border-[#e87908] hover:bg-[#faf2e7] hover:text-[#e87908]"
                    >

                      <PlusIcon />

                      Add place to Day {index + 1}

                    </button>

                  </div>

                )
              )}


              {/* ADD DAY */}

              <button
                onClick={addDay}
                className="flex w-full items-center justify-center gap-2 rounded-[22px] border border-dashed border-[#cfc1b3] py-5 text-sm font-semibold text-[#8f8278] transition hover:border-[#e87908] hover:bg-[#fffaf4] hover:text-[#e87908]"
              >

                <PlusIcon />

                Add another day

              </button>

            </div>


            {/* SAVED MESSAGE */}

            <div className="mt-8 flex items-center justify-between rounded-[24px] bg-[#efe2d2] px-6 py-5">

              <div className="flex items-center gap-3">

                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#301c14] text-white">

                  <CheckIcon />

                </div>


                <div>

                  <p className="text-sm font-semibold">
                    Trip saved
                  </p>

                  <p className="mt-1 text-xs text-[#8f8278]">
                    Your itinerary is saved to your profile.
                  </p>

                </div>

              </div>


              <button
                onClick={() =>
                  navigate("/profile")
                }
                className="rounded-full bg-[#301c14] px-5 py-2.5 text-xs font-semibold text-white transition hover:bg-[#e87908]"
              >
                View profile
              </button>

            </div>

          </div>

        )}

      </main>


      {/* ===================================================
          CREATE TRIP MODAL
      =================================================== */}

      {showCreateModal && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#21130e]/60 px-5 backdrop-blur-sm">

          <div className="w-full max-w-xl rounded-[32px] bg-[#fffdf9] p-7 shadow-2xl md:p-9">


            {/* HEADER */}

            <div className="flex items-start justify-between">

              <div>

                <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e87908]">
                  New journey
                </p>


                <h2 className="mt-2 font-serif text-3xl font-bold">
                  Create your trip
                </h2>


                <p className="mt-2 text-sm text-[#968a81]">
                  Give your adventure a name and choose
                  where you're heading.
                </p>

              </div>


              <button
                onClick={() =>
                  setShowCreateModal(false)
                }
                className="text-[#958980] transition hover:text-[#301c14]"
              >

                <CloseIcon />

              </button>

            </div>


            {/* FORM */}

            <div className="mt-8 space-y-5">


              {/* NAME */}

              <div>

                <label className="text-xs font-semibold">
                  Trip name
                </label>


                <input
                  value={tripName}
                  onChange={(e) =>
                    setTripName(
                      e.target.value
                    )
                  }
                  placeholder="e.g. Northern Adventure"
                  className="mt-2 w-full rounded-2xl border border-[#ddd1c5] bg-[#faf7f2] px-4 py-3.5 text-sm outline-none transition focus:border-[#e87908]"
                />

              </div>


              {/* DESTINATION */}

              <div>

                <label className="text-xs font-semibold">
                  Destination
                </label>


                <select
                  value={destination}
                  onChange={(e) =>
                    setDestination(
                      e.target.value
                    )
                  }
                  className="mt-2 w-full rounded-2xl border border-[#ddd1c5] bg-[#faf7f2] px-4 py-3.5 text-sm outline-none focus:border-[#e87908]"
                >

                  <option value="">
                    Select destination
                  </option>

                  <option value="Hunza Valley">
                    Hunza Valley
                  </option>

                  <option value="Skardu">
                    Skardu
                  </option>

                  <option value="Swat">
                    Swat
                  </option>

                  <option value="Murree">
                    Murree
                  </option>

                  <option value="Lahore">
                    Lahore
                  </option>

                </select>

              </div>


              {/* DATES */}

              <div className="grid gap-4 sm:grid-cols-2">

                <div>

                  <label className="text-xs font-semibold">
                    Start date
                  </label>


                  <input
                    type="date"
                    value={startDate}
                    onChange={(e) =>
                      setStartDate(
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-[#ddd1c5] bg-[#faf7f2] px-4 py-3.5 text-sm outline-none focus:border-[#e87908]"
                  />

                </div>


                <div>

                  <label className="text-xs font-semibold">
                    End date
                  </label>


                  <input
                    type="date"
                    value={endDate}
                    onChange={(e) =>
                      setEndDate(
                        e.target.value
                      )
                    }
                    className="mt-2 w-full rounded-2xl border border-[#ddd1c5] bg-[#faf7f2] px-4 py-3.5 text-sm outline-none focus:border-[#e87908]"
                  />

                </div>

              </div>

            </div>


            {/* CREATE BUTTON */}

            <button
              onClick={createTrip}
              disabled={
                !tripName.trim() ||
                !destination
              }
              className="mt-8 w-full rounded-full bg-[#301c14] py-4 text-sm font-semibold text-white transition hover:bg-[#e87908] disabled:cursor-not-allowed disabled:opacity-40"
            >

              Create trip

            </button>

          </div>

        </div>

      )}


      {/* ===================================================
          PLACE PICKER
      =================================================== */}

      {showPlacePicker && (

        <div className="fixed inset-0 z-50 flex items-center justify-center bg-[#21130e]/60 px-5 backdrop-blur-sm">

          <div className="flex max-h-[90vh] w-full max-w-3xl flex-col overflow-hidden rounded-[32px] bg-[#fffdf9] shadow-2xl">


            {/* HEADER */}

            <div className="border-b border-[#e1d7cd] p-6 md:p-8">

              <div className="flex items-start justify-between">

                <div>

                  <p className="text-xs font-bold uppercase tracking-[0.2em] text-[#e87908]">
                    Build your itinerary
                  </p>


                  <h2 className="mt-2 font-serif text-3xl font-bold">
                    Add a place
                  </h2>


                  <p className="mt-2 text-sm text-[#968a81]">
                    Choose somewhere you want to visit.
                  </p>

                </div>


                <button
                  onClick={() =>
                    setShowPlacePicker(false)
                  }
                  className="text-[#958980]"
                >

                  <CloseIcon />

                </button>

              </div>


              {/* SEARCH */}

              <div className="relative mt-6">

                <SearchIcon />

                <input
                  value={search}
                  onChange={(e) =>
                    setSearch(
                      e.target.value
                    )
                  }
                  placeholder="Search places, viewpoints or activities..."
                  className="w-full rounded-2xl border border-[#ddd1c5] bg-[#faf7f2] py-3.5 pl-11 pr-4 text-sm outline-none transition focus:border-[#e87908]"
                />

              </div>

            </div>


            {/* PLACES */}

            <div className="overflow-y-auto p-6 md:p-8">

              <div className="grid gap-4 md:grid-cols-2">

                {filteredPlaces.map(
                  (place) => {

                    const alreadyAdded =
                      activeTrip?.days.some(
                        (day) =>
                          day.places.some(
                            (existing) =>
                              existing.id ===
                              place.id
                          )
                      );


                    return (

                      <div
                        key={place.id}
                        className="group overflow-hidden rounded-[22px] border border-[#e2d8ce] bg-[#faf8f4] transition duration-300 hover:-translate-y-1 hover:shadow-lg"
                      >

                        <div className="relative h-36 overflow-hidden">

                          <img
                            src={place.image}
                            alt={place.name}
                            className="h-full w-full object-cover transition duration-700 group-hover:scale-105"
                          />


                          <span className="absolute left-3 top-3 rounded-full bg-[#301c14]/80 px-3 py-1.5 text-[9px] font-bold uppercase tracking-[0.1em] text-white backdrop-blur">
                            {place.category}
                          </span>

                        </div>


                        <div className="p-4">

                          <div className="flex items-start justify-between gap-3">

                            <div>

                              <h3 className="font-serif text-xl font-bold">
                                {place.name}
                              </h3>


                              <p className="mt-1 flex items-center gap-1 text-xs text-[#958980]">

                                <MapPinIcon />

                                {place.location}

                              </p>

                            </div>


                            <span className="text-xs font-semibold text-[#e87908]">
                              ★ {place.rating}
                            </span>

                          </div>


                          <button
                            disabled={
                              alreadyAdded
                            }
                            onClick={() =>
                              addPlaceToDay(
                                place
                              )
                            }
                            className={`mt-4 w-full rounded-full py-2.5 text-xs font-semibold transition ${
                              alreadyAdded
                                ? "bg-[#e8dfd5] text-[#a0958b]"
                                : "bg-[#301c14] text-white hover:bg-[#e87908]"
                            }`}
                          >

                            {alreadyAdded
                              ? "Already added"
                              : "Add to itinerary"}

                          </button>

                        </div>

                      </div>

                    );

                  }
                )}

              </div>


              {/* NO RESULTS */}

              {filteredPlaces.length ===
                0 && (

                <div className="py-16 text-center">

                  <p className="font-serif text-2xl font-bold">
                    No places found
                  </p>

                  <p className="mt-2 text-sm text-[#968a81]">
                    Try searching for something else.
                  </p>

                </div>

              )}

            </div>


            {/* FOOTER */}

            <div className="border-t border-[#e1d7cd] p-5">

              <button
                onClick={() =>
                  setShowPlacePicker(false)
                }
                className="w-full rounded-full border border-[#d8cdc1] py-3 text-sm font-semibold transition hover:border-[#e87908] hover:text-[#e87908]"
              >
                Done
              </button>

            </div>

          </div>

        </div>

      )}

    </div>
  );
}


/* =========================================================
   ICONS
========================================================= */

function CompassIcon() {

  return (

    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >

      <circle
        cx="12"
        cy="12"
        r="9"
      />

      <path d="M15.5 8.5L13.5 13.5L8.5 15.5L10.5 10.5L15.5 8.5Z" />

    </svg>

  );
}


function PlusIcon() {

  return (

    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >

      <path d="M12 5V19" />

      <path d="M5 12H19" />

    </svg>

  );
}


function MapIcon() {

  return (

    <svg
      className="h-8 w-8"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.5"
    >

      <path d="M9 18L3 21V6L9 3L15 6L21 3V18L15 21L9 18Z" />

      <path d="M9 3V18" />

      <path d="M15 6V21" />

    </svg>

  );
}


function MapPinIcon() {

  return (

    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >

      <path d="M20 10C20 15.5 12 21 12 21S4 15.5 4 10C4 5.6 7.6 3 12 3S20 5.6 20 10Z" />

      <circle
        cx="12"
        cy="10"
        r="2.5"
      />

    </svg>

  );
}


function ArrowLeftIcon() {

  return (

    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >

      <path d="M19 12H5" />

      <path d="M12 19L5 12L12 5" />

    </svg>

  );
}


function CloseIcon() {

  return (

    <svg
      className="h-5 w-5"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >

      <path d="M6 6L18 18" />

      <path d="M18 6L6 18" />

    </svg>

  );
}


function CheckIcon() {

  return (

    <svg
      className="h-4 w-4"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
    >

      <path d="M5 12L10 17L19 7" />

    </svg>

  );
}


function SearchIcon() {

  return (

    <svg
      className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#a0958b]"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.8"
    >

      <circle
        cx="11"
        cy="11"
        r="7"
      />

      <path d="M16 16L21 21" />

    </svg>

  );
}