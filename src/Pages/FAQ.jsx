import React, { useEffect, useState, useRef } from "react";
import "./Home.css";

import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import Sidebar from "../Components/SidebarHome.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import { supabase } from "../Supabase";
import DabtoLoadingScreen from "./Loading.jsx";
import Shipyllw from "../Components/ships yellow/Shipsyllw.jsx";
import ArrowSlider from "../Components/Scroll-arrows/Scroll-arrows.jsx";
import Shipwhite from "../Components/Shipwhite/Shipwhite.jsx";
import Accordion from "../Components/Accordion/Accordion.jsx";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);
  const [faqs, setFaqs] = useState([]);
  const scrollRef = useRef(null);

  // Scroll functions for ArrowSlider
  const handlePrev = () => {
    scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const handleNext = () => {
    scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("home screen eng")
          .select("greeting_text, name, pfp")
          .eq("id", 1)
          .single();
        setProfile(profileData);

        // Fetch FAQ
        const { data: faqData, error } = await supabase
          .from("faq")
          .select("id, question1, answer1")
          .order("id", { ascending: true });

        if (error) throw error;
        setFaqs(faqData);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  if (loading) return <DabtoLoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="homepage_bg">
      <div className="sidebarcon">
        <Sidebar />
      </div>

      <div className="mainconnn">
        <Profiletopbar image={profile?.pfp} />
        <Welcomesec
          text="Frequently Asked Questions"
          caption="Find answers to common questions about using our platform, connecting with suppliers, and growing your fashion business."
        />

        <div className="shipsS">
          <div className="shipcon" ref={scrollRef}>
            <Shipyllw text="All Topics" />
            <Shipwhite text="Getting Started" />
            <Shipwhite text="Finding Suppliers" />
            <Shipwhite text="Quote Requests" />
            <Shipwhite text="Mentorship" />
            <Shipwhite text="Learning" />
            <Shipwhite text="Analytics" />
          </div>

          <div className="arrw-wrapper">
            <ArrowSlider onPrev={handlePrev} onNext={handleNext} />
          </div>
        </div>

        {/* Render Accordion dynamically from FAQ data */}
        <div className="accordion-list">
          {faqs.map((faq) => (
            <Accordion
          
            />
          ))}
        </div>

        <Footer />
      </div>
    </div>
  );
}