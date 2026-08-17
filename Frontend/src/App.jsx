import { BrowserRouter, Routes, Route } from "react-router-dom";
import Navbar from "@/components/landingPage/Navbar";
import Hero from "@/components/landingPage/Hero";
import Destinations from "@/components/landingPage/Destinations";
import Categories from "@/components/landingPage/Categories";
import Viewpoints from "@/components/landingPage/Viewpoints";
import Trending from "@/components/landingPage/Trending";
import Why from "@/components/landingPage/Why";
import CallToAction from "@/components/landingPage/CallToAction";
import Footer from "@/components/landingPage/Footer";
import Login from "@/components/login";
import Register from "@/components/register";
import Profile from "@/components/profilePage";
import Explore from "@/components/Explore";
import DestinationDetails from "@/components/DestinationDetails";
import ViewpointsPage from "@/components/viewpoints";
import PlaceDetails from "@/components/placedetails";
import TripPlanner from "@/components/TripPlanner";
import { AuthProvider } from "@/context/AuthContext";

function Home() {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      <main>
        <Hero />
        <Destinations />
        <Categories />
        <Viewpoints />
        <Trending />
        <Why />
        <CallToAction />
      </main>
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/destination/:name" element={<DestinationDetails />} />
          <Route path="/viewpoints" element={<ViewpointsPage />} />
          <Route path="/place/:name" element={<PlaceDetails />} />
          <Route path="/trips" element={<TripPlanner />} />
        </Routes>
      </BrowserRouter>
    </AuthProvider>
  );
}
