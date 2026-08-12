import lahore from "@/assets/lahore1.jpg";
import islamabad from "@/assets/ixb2.jpg";
import hunza from "@/assets/hunza3.webp";
import skardu from "@/assets/skardu2.jpg";
import karachi from "@/assets/karachi1.jpg";
import vpFairy from "@/assets/vp-fairy.jpg";
import vpEagle from "@/assets/vp-eagle.jpg";
import vpDaman from "@/assets/vp-daman.jpg";
import trFood from "@/assets/tr-food.jpg";
import trFort from "@/assets/tr-fort.jpg";
import trLake from "@/assets/tr-lake.jpg";

export const destinations = [
  { name: "Hunza", region: "Gilgit-Baltistan", places: 84, image: hunza, tag: "Golden autumn" },
  { name: "Islamabad", region: "Capital Territory", places: 61, image: islamabad, tag: "Hills & heritage" },
  { name: "Lahore", region: "Punjab", places: 132, image: lahore, tag: "Old city nights" },
  { name: "Skardu", region: "Gilgit-Baltistan", places: 57, image: skardu, tag: "Lakes & dunes" },
  { name: "Karachi", region: "Sindh", places: 96, image: karachi, tag: "Coastal sunsets" },
];

export const categories = [
  { name: "Mountains", count: 240, emoji: "🏔️" },
  { name: "Historical", count: 186, emoji: "🏛️" },
  { name: "Nature", count: 312, emoji: "🌿" },
  { name: "Beaches", count: 74, emoji: "🏖️" },
  { name: "Viewpoints", count: 158, emoji: "🌄" },
  { name: "Adventure", count: 121, emoji: "🧭" },
  { name: "Food", count: 402, emoji: "🍽️" },
];

export const viewpoints = [
  {
    name: "Fairy Meadows",
    location: "Diamer, Gilgit-Baltistan",
    rating: 4.9,
    reviews: 1284,
    image: vpFairy,
    note: "Sunrise on Nanga Parbat's north face",
    span: true,
  },
  {
    name: "Eagle's Nest",
    location: "Duikar, Hunza",
    rating: 4.8,
    reviews: 942,
    image: vpEagle,
    note: "Valley lights after dusk",
  },
  {
    name: "Daman-e-Koh",
    location: "Margalla Hills, Islamabad",
    rating: 4.6,
    reviews: 2103,
    image: vpDaman,
    note: "City panorama at golden hour",
  },
];

export const trending = [
  {
    name: "Anarkali Food Street",
    city: "Lahore",
    category: "Food",
    rating: 4.7,
    image: trFood,
    blurb: "Late-night grills, kulfi carts and rooftop chai with a view of the old city.",
  },
  {
    name: "Rohtas Fort",
    city: "Jhelum",
    category: "Historical",
    rating: 4.8,
    image: trFort,
    blurb: "A 16th-century garrison fort with twelve gates and half a kilometre of walls.",
  },
  {
    name: "Lulusar Lake",
    city: "Kaghan Valley",
    category: "Nature",
    rating: 4.9,
    image: trLake,
    blurb: "Glacial water framed by pine ridges — best light between 7 and 9 in the morning.",
  },
];

export const reasons = [
  {
    title: "Discover hidden places",
    text: "Local finds that never make the usual lists, surfaced by travellers who went there.",
  },
  {
    title: "Explore destinations",
    text: "Every city opens into its places — landmarks, trails, markets and quiet corners.",
  },
  {
    title: "Find scenic viewpoints",
    text: "Know exactly where to stand, and at what hour the light is worth the climb.",
  },
  {
    title: "Plan your journey",
    text: "Save places, group them into a trip and carry the whole route in your pocket.",
  },
];