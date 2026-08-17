import hunza from "@/assets/hunza valley.jpg";
import islamabadHero from "@/assets/islamabad.jpg";
import lahoreHero from "@/assets/lahore1.jpg";
import skarduHero from "@/assets/skardu2.jpg";
import karachiHero from "@/assets/karachi1.jpg";

import baltitFort from "@/assets/baltitFort.jpg";
import faisalMosque from "@/assets/Faisal-Mosque.webp";
import damanKoh from "@/assets/vp-daman.jpg";
import eagleNest from "@/assets/vp-eagle.jpg";
import fairyMeadows from "@/assets/fairymeadows.jpg";
import foodStreet from "@/assets/tr-food.jpg";
import rohtasFort from "@/assets/tr-fort.jpg";
import lulusarLake from "@/assets/tr-lake.jpg";
import attabadLake from "@/assets/attabadLake.webp";
import rakaposhi from "@/assets/rakaposhi.jpg";
import lahoreFort from "@/assets/lahoreFort.jpg";

export const destinations = {
  hunza: {
    name: "Hunza",
    suffix: "Valley.",
    region: "Gilgit-Baltistan",
    heroImage: hunza,
    heroText:
      "Where ancient forts, glacier-fed rivers and enormous mountains turn an ordinary journey into something you remember for years.",
    stats: [
      { number: "84", label: "places to discover" },
      { number: "18", label: "viewpoints" },
      { number: "4.9", label: "traveller rating" },
      { number: "May–Oct", label: "best time to visit" },
    ],
    overviewTop: "The feeling",
    overviewTitleLead: "A valley that",
    overviewTitleAccent: "stays with you.",
    overviewLead:
      "Hunza is not simply a destination you tick off a list. It is a place of slow mornings, enormous landscapes and villages tucked between mountains.",
    overviewBody:
      "Explore ancient forts, follow rivers through narrow valleys, meet local communities and find viewpoints where the landscape seems to stretch forever.",
    tags: ["Karakoram", "Culture", "Mountains", "Photography", "Adventure"],
    attractions: [
      {
        name: "Attabad Lake",
        category: "Nature",
        description:
          "Impossible turquoise water surrounded by some of the Karakoram's most dramatic peaks.",
        image: attabadLake,
      },
      {
        name: "Baltit Fort",
        category: "Heritage",
        description:
          "A centuries-old fort overlooking Karimabad and the valley beyond.",
        image: baltitFort,
      },
      {
        name: "Passu Cones",
        category: "Viewpoint",
        description:
          "Sharp, unforgettable peaks rising above the quiet village of Passu.",
        image:
          "https://images.unsplash.com/photo-1521292270410-a8c4d716d518?auto=format&fit=crop&w=1400&q=85",
      },
    ],
    activities: [
      { title: "Lake boating", icon: "↗" },
      { title: "Mountain trekking", icon: "⌁" },
      { title: "Fort exploration", icon: "◇" },
      { title: "Local food", icon: "✦" },
      { title: "Photography", icon: "◎" },
    ],
    viewpoints: [
      {
        name: "Eagle's Nest",
        place: "Duikar",
        image: eagleNest,
        time: "Best at sunrise",
      },
      {
        name: "Rakaposhi View",
        place: "Nagar Valley",
        image: rakaposhi,
        time: "Best at sunset",
      },
      {
        name: "Passu Viewpoint",
        place: "Gojal",
        image:
          "https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?auto=format&fit=crop&w=1200&q=85",
        time: "Golden hour",
      },
    ],
    travelInfo: [
      { icon: "◷", title: "Best time", value: "May — October" },
      { icon: "⌖", title: "Getting there", value: "Drive from Gilgit" },
      { icon: "↗", title: "Recommended stay", value: "3 — 5 days" },
      { icon: "°", title: "Altitude", value: "2,438 metres" },
    ],
    mapPins: [
      { top: "35%", left: "42%", label: "Hunza", active: true },
      { top: "20%", left: "67%", label: "Passu" },
      { top: "62%", left: "25%", label: "Karimabad" },
    ],
    mapLabel: "Hunza Valley",
    nearby: [
      {
        name: "Skardu",
        distance: "285 km away",
        image: skarduHero,
      },
      {
        name: "Fairy Meadows",
        distance: "240 km away",
        image: fairyMeadows,
      },
      {
        name: "Naltar Valley",
        distance: "42 km away",
        image: lulusarLake,
      },
    ],
  },

  islamabad: {
    name: "Islamabad",
    suffix: "Capital.",
    region: "Capital Territory",
    heroImage: islamabadHero,
    heroText:
      "A green capital of wide avenues, modern landmarks and hillside viewpoints, all framed by the rugged Margalla Hills.",
    stats: [
      { number: "61", label: "places to discover" },
      { number: "12", label: "viewpoints" },
      { number: "4.7", label: "traveller rating" },
      { number: "Oct–Apr", label: "best time to visit" },
    ],
    overviewTop: "The feeling",
    overviewTitleLead: "A city that",
    overviewTitleAccent: "feels fresh.",
    overviewLead:
      "Islamabad is planned, calm and carefully green — a place where tree-lined boulevards meet the Margalla Hills on the horizon.",
    overviewBody:
      "Climb to hilltop restaurants for panoramic sunsets, explore civic monuments and drift between museums, parks and lakes.",
    tags: ["Hills", "Heritage", "Museums", "Parks", "Photography"],
    attractions: [
      {
        name: "Faisal Mosque",
        category: "Landmark",
        description:
          "A modern architectural icon set against the Margalla foothills.",
        image: faisalMosque,
      },
      {
        name: "Daman-e-Koh",
        category: "Viewpoint",
        description:
          "The classic terrace for a full city panorama at golden hour.",
        image: damanKoh,
      },
      {
        name: "Pakistan Monument",
        category: "Heritage",
        description:
          "A blooming petal-shaped monument honouring the nation's history.",
        image:
          "https://images.unsplash.com/photo-1600675732583-ba4f0c4fa94d?auto=format&fit=crop&w=1400&q=85",
      },
    ],
    activities: [
      { title: "Hilltop dining", icon: "↗" },
      { title: "Museum tours", icon: "⌁" },
      { title: "Park picnics", icon: "◇" },
      { title: "Hiking trails", icon: "✦" },
      { title: "City photography", icon: "◎" },
    ],
    viewpoints: [
      {
        name: "Daman-e-Koh",
        place: "Margalla Hills",
        image: damanKoh,
        time: "Best at sunset",
      },
      {
        name: "Monal Terrace",
        place: "Pir Sohawa",
        image:
          "https://images.unsplash.com/photo-1495954484750-af469f2f9be5?auto=format&fit=crop&w=1200&q=85",
        time: "Golden hour",
      },
      {
        name: "Trail 5 Summit",
        place: "Margalla Hills",
        image:
          "https://images.unsplash.com/photo-1441974231531-c6227db76b6e?auto=format&fit=crop&w=1200&q=85",
        time: "Early morning",
      },
    ],
    travelInfo: [
      { icon: "◷", title: "Best time", value: "October — April" },
      { icon: "⌖", title: "Getting there", value: "Fly into Islamabad" },
      { icon: "↗", title: "Recommended stay", value: "2 — 3 days" },
      { icon: "°", title: "Altitude", value: "540 metres" },
    ],
    mapPins: [
      { top: "35%", left: "42%", label: "Islamabad", active: true },
      { top: "20%", left: "67%", label: "Daman-e-Koh" },
      { top: "62%", left: "25%", label: "Monal" },
    ],
    mapLabel: "Islamabad City",
    nearby: [
      {
        name: "Murree",
        distance: "60 km away",
        image:
          "https://images.unsplash.com/photo-1505691938895-1758d7feb511?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Rawalpindi",
        distance: "15 km away",
        image:
          "https://images.unsplash.com/photo-1494526585095-c41746248156?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Khanpur Lake",
        distance: "75 km away",
        image: lulusarLake,
      },
    ],
  },

  lahore: {
    name: "Lahore",
    suffix: "Culture.",
    region: "Punjab",
    heroImage: lahoreHero,
    heroText:
      "The heart of Pakistan — walled-city lanes, Mughal forts and food streets that stay awake until dawn.",
    stats: [
      { number: "132", label: "places to discover" },
      { number: "09", label: "viewpoints" },
      { number: "4.8", label: "traveller rating" },
      { number: "Nov–Feb", label: "best time to visit" },
    ],
    overviewTop: "The feeling",
    overviewTitleLead: "A city that",
    overviewTitleAccent: "lives loudly.",
    overviewLead:
      "Lahore is a feast of centuries-old monuments, bustling bazaars and a culinary scene with an unapologetic soul.",
    overviewBody:
      "Wander the Walled City, stand before the Badshahi Mosque and lose track of time in the food streets of Anarkali.",
    tags: ["Mughal", "Food", "History", "Bazaars", "Culture"],
    attractions: [
      {
        name: "Badshahi Mosque",
        category: "Heritage",
        description:
          "A majestic Mughal-era mosque that has watched over the city for centuries.",
        image: lahoreHero,
      },
      {
        name: "Lahore Fort",
        category: "Fort",
        description:
          "Walled palaces, gardens and frescoes at the heart of the old city.",
        image: lahoreFort,
      },
      {
        name: "Anarkali Food Street",
        category: "Food",
        description:
          "Late-night grills, kulfi carts and rooftop chai with a view of the old city.",
        image: foodStreet,
      },
    ],
    activities: [
      { title: "Walled city tour", icon: "↗" },
      { title: "Food street crawl", icon: "⌁" },
      { title: "Fort exploration", icon: "◇" },
      { title: "Bazaar shopping", icon: "✦" },
      { title: "Photography", icon: "◎" },
    ],
    viewpoints: [
      {
        name: "Minar-e-Pakistan",
        place: "Circular Garden",
        image:
          "https://images.unsplash.com/photo-1548013146-72479768bada?auto=format&fit=crop&w=1200&q=85",
        time: "Best at sunrise",
      },
      {
        name: "Fort Rooftop",
        place: "Old City",
        image:
          "https://images.unsplash.com/photo-1520155707862-9e10f498dcc0?auto=format&fit=crop&w=1200&q=85",
        time: "Golden hour",
      },
      {
        name: "Rooftop Cafés",
        place: "Gulberg",
        image:
          "https://images.unsplash.com/photo-1514933651103-005eec06c04b?auto=format&fit=crop&w=1200&q=85",
        time: "Evening",
      },
    ],
    travelInfo: [
      { icon: "◷", title: "Best time", value: "November — February" },
      { icon: "⌖", title: "Getting there", value: "Fly into Lahore" },
      { icon: "↗", title: "Recommended stay", value: "3 — 4 days" },
      { icon: "°", title: "Altitude", value: "217 metres" },
    ],
    mapPins: [
      { top: "35%", left: "42%", label: "Lahore", active: true },
      { top: "20%", left: "67%", label: "Anarkali" },
      { top: "62%", left: "25%", label: "Fort & Mosque" },
    ],
    mapLabel: "Lahore City",
    nearby: [
      {
        name: "Amritsar",
        distance: "50 km away",
        image:
          "https://images.unsplash.com/photo-1503249023995-51b0f3778ccf?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Murree",
        distance: "170 km away",
        image: damanKoh,
      },
      {
        name: "Jhelum",
        distance: "120 km away",
        image: rohtasFort,
      },
    ],
  },

  skardu: {
    name: "Skardu",
    suffix: "Valley.",
    region: "Gilgit-Baltistan",
    heroImage: skarduHero,
    heroText:
      "A high-desert paradise beneath the Karakoram — indigo lakes, apricot orchards and the mighty Deosai plains.",
    stats: [
      { number: "57", label: "places to discover" },
      { number: "14", label: "viewpoints" },
      { number: "4.9", label: "traveller rating" },
      { number: "Jun–Oct", label: "best time to visit" },
    ],
    overviewTop: "The feeling",
    overviewTitleLead: "A valley that",
    overviewTitleAccent: "feels otherworldly.",
    overviewLead:
      "Skardu hides some of Asia's wildest landscapes — desert dunes, glacier-blue lakes and plateaus that stretch to the sky.",
    overviewBody:
      "Boat across Shangrila Lake, cross the cold desert, and go looking for brown bears on the Deosai plains.",
    tags: ["Karakoram", "Lakes", "Desert", "Trekking", "Wildlife"],
    attractions: [
      {
        name: "Shangrila Resort",
        category: "Nature",
        description:
          "A serene lakeside resort at the heart of the Skardu valley.",
        image: lulusarLake,
      },
      {
        name: "Katpana Cold Desert",
        category: "Desert",
        description:
          "One of the highest cold deserts on earth, right beside the town.",
        image: skarduHero,
      },
      {
        name: "Deosai Plains",
        category: "Wildlife",
        description:
          "Vast rolling plateaus where Himalayan brown bears roam free.",
        image:
          "https://images.unsplash.com/photo-1549264517-b4a61f0a5e4a?auto=format&fit=crop&w=1400&q=85",
      },
    ],
    activities: [
      { title: "Lake boating", icon: "↗" },
      { title: "Desert trekking", icon: "⌁" },
      { title: "Wild camping", icon: "◇" },
      { title: "Apricot tasting", icon: "✦" },
      { title: "Stargazing", icon: "◎" },
    ],
    viewpoints: [
      {
        name: "Katpana Dunes",
        place: "Skardu",
        image: skarduHero,
        time: "Best at sunrise",
      },
      {
        name: "Sadpara Lakeview",
        place: "Sadpara",
        image:
          "https://images.unsplash.com/photo-1544735716-392fe2489ffa?auto=format&fit=crop&w=1200&q=85",
        time: "Golden hour",
      },
      {
        name: "Deosai Top",
        place: "Astore",
        image: fairyMeadows,
        time: "Midday",
      },
    ],
    travelInfo: [
      { icon: "◷", title: "Best time", value: "June — October" },
      { icon: "⌖", title: "Getting there", value: "Fly into Skardu" },
      { icon: "↗", title: "Recommended stay", value: "4 — 6 days" },
      { icon: "°", title: "Altitude", value: "2,500 metres" },
    ],
    mapPins: [
      { top: "35%", left: "42%", label: "Skardu", active: true },
      { top: "20%", left: "67%", label: "Katpana" },
      { top: "62%", left: "25%", label: "Shangrila" },
    ],
    mapLabel: "Skardu Valley",
    nearby: [
      {
        name: "Deosai",
        distance: "35 km away",
        image: fairyMeadows,
      },
      {
        name: "Kharmang",
        distance: "95 km away",
        image:
          "https://images.unsplash.com/photo-1518005020951-eccb494ad742?auto=format&fit=crop&w=900&q=85",
      },
      {
        name: "Naltar Valley",
        distance: "210 km away",
        image: lulusarLake,
      },
    ],
  },

  karachi: {
    name: "Karachi",
    suffix: "Seaside.",
    region: "Sindh",
    heroImage: karachiHero,
    heroText:
      "Pakistan's coastal metropolis — endless shoreline, colonial-era landmarks and sunsets over the Arabian Sea.",
    stats: [
      { number: "96", label: "places to discover" },
      { number: "11", label: "viewpoints" },
      { number: "4.6", label: "traveller rating" },
      { number: "Nov–Mar", label: "best time to visit" },
    ],
    overviewTop: "The feeling",
    overviewTitleLead: "A city that",
    overviewTitleAccent: "never sleeps.",
    overviewLead:
      "Karachi is loud, layered and alive — a hundred-year-old harbour city where the sea meets a restless skyline.",
    overviewBody:
      "Walk the sea-view promenade, tour colonial buildings in the old city, and end the day with chai by the shore.",
    tags: ["Coastal", "Colonial", "Food", "Shopping", "Sunset"],
    attractions: [
      {
        name: "Clifton Beach",
        category: "Coastal",
        description:
          "A long stretch of sand perfect for evening strolls and pony rides.",
        image: karachiHero,
      },
      {
        name: "Mohatta Palace",
        category: "Heritage",
        description:
          "A yellow-stone museum of art framed by manicured gardens.",
        image:
          "https://images.unsplash.com/photo-1564507592333-c60657eea523?auto=format&fit=crop&w=1400&q=85",
      },
      {
        name: "Port Grand",
        category: "Food",
        description:
          "A happening waterfront food street beside the old harbour.",
        image: foodStreet,
      },
    ],
    activities: [
      { title: "Beach walks", icon: "↗" },
      { title: "Harbour cruises", icon: "⌁" },
      { title: "Heritage tours", icon: "◇" },
      { title: "Seafood feast", icon: "✦" },
      { title: "Sunset photography", icon: "◎" },
    ],
    viewpoints: [
      {
        name: "Sea View Promenade",
        place: "Clifton",
        image: karachiHero,
        time: "Best at sunset",
      },
      {
        name: "Defence Skyline",
        place: "DHA",
        image:
          "https://images.unsplash.com/photo-1514565131-fce0801e5785?auto=format&fit=crop&w=1200&q=85",
        time: "At night",
      },
      {
        name: "Hawksbay Sunset",
        place: "West Coast",
        image:
          "https://images.unsplash.com/photo-1507525428034-b723cf961d3e?auto=format&fit=crop&w=1200&q=85",
        time: "Best at sunset",
      },
    ],
    travelInfo: [
      { icon: "◷", title: "Best time", value: "November — March" },
      { icon: "⌖", title: "Getting there", value: "Fly into Karachi" },
      { icon: "↗", title: "Recommended stay", value: "3 — 4 days" },
      { icon: "°", title: "Altitude", value: "8 metres" },
    ],
    mapPins: [
      { top: "35%", left: "42%", label: "Karachi", active: true },
      { top: "20%", left: "67%", label: "Clifton" },
      { top: "62%", left: "25%", label: "Port Grand" },
    ],
    mapLabel: "Karachi City",
    nearby: [
      {
        name: "Hawksbay",
        distance: "35 km away",
        image: karachiHero,
      },
      {
        name: "Thatta",
        distance: "95 km away",
        image: rohtasFort,
      },
      {
        name: "Mohenjo-daro",
        distance: "320 km away",
        image:
          "https://images.unsplash.com/photo-1613490493576-7fde63acd811?auto=format&fit=crop&w=900&q=85",
      },
    ],
  },
};