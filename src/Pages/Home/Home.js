import React from "react";
import Navigation from "../Shared/Navigation";
import AboutUs from "./AboutUs";
import AboutUsBanner from "./AboutUsBanner";
import Footer from "./Footer";
import FooterBanner from "./FooterBanner";
import Gallery from "./Gallery";
import HomeBanner from "./HomeBanner";
import ReviewSlider from "./ReviewSlider";
import Services from "./Services";
import Testimonials from "./Testimonials";

const Home = () => {
  return (
    <>
      <Navigation />
      <HomeBanner />

      <Services />
      <AboutUs />
      <AboutUsBanner />
      <Gallery />
      <Testimonials />
      <ReviewSlider/>
      <FooterBanner />
      <Footer />
    </>
  );
};

export default Home;
