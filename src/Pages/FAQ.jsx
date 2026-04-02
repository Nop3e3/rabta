import React, { useEffect, useState, useRef } from "react";
import "./Home.css";

import Ql from "../Components/QL/Ql.jsx";
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
import Adi from "../Components/Ad/Ad.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [faqs, setFaqs] = useState([]);
  const [qlData, setQlData] = useState([]);
  const [loading, setLoading] = useState(true);
  const scrollRef = useRef(null);

  // Scroll
  const handlePrev = () => {
    scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const handleNext = () => {
    scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  useEffect(() => {
    async function fetchData() {
      try {
        // ✅ Profile
        const { data: profileData, error: profileError } = await supabase
          .from("home screen eng")
          .select("greeting_text, name, pfp")
          .eq("id", 1)
          .single();

        if (profileError) throw profileError;
        setProfile(profileData);

        // ✅ FAQ
        const { data: faqData, error: faqError } = await supabase
          .from("faq")
          .select("id, question1, answer1")
          .order("id", { ascending: true });

        if (faqError) throw faqError;
        setFaqs(faqData || []);

        // ✅ QL (Quick Links)
        const { data: qlRes, error: qlError } = await supabase
          .from("QL")
          .select("id, icon, title, caption")
          .order("id", { ascending: true });

        if (qlError) throw qlError;
        setQlData(qlRes || []);
      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchData();
  }, []);

  // Loading
  if (loading) {
    return <DabtoLoadingScreen onComplete={() => setLoading(false)} />;
  }

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

        {/* Ships */}
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

        {/* ✅ FAQ */}
        <div className="accordion-list">
          {faqs.length > 0 ? (
            faqs.map((faq) => (
              <Accordion
                key={faq.id}
                question={faq.question1}
                answer={faq.answer1}
              />
            ))
          ) : (
            <p className="no-faqs">No FAQs available.</p>
          )}
        </div>

        {/* ✅ AD */}
        <Adi />
<div className="qll">
  <Secttl text="Quick Links" />
  <div className="ql-list">
    {qlData.length > 0 ? (
      qlData.map((item) => (
        <Ql
          key={item.id}
          icon={item.icon}
          title={item.title}
          caption={item.caption}
        />
      ))
    ) : (
      <p className="no-ql">No quick links available.</p>
    )}
  </div>
</div>
        <Footer />
      </div>
    </div>
  );
}