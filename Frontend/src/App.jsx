import Navbar from "@/components/landingPage/Navbar";
import Hero from "@/components/landingPage/Hero";
import Destinations from "@/components/landingPage/Destinations";
import Categories from "@/components/landingPage/Categories";
import Viewpoints from "@/components/landingPage/Viewpoints";
import Trending from "@/components/landingPage/Trending";
import Why from "@/components/landingPage/Why";
import CallToAction from "@/components/landingPage/CallToAction";
import Footer from "@/components/landingPage/Footer";

export default function App() {
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
