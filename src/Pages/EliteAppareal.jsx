import React, { useState, useEffect } from "react";
import "./Home.css";
import "./EliteAppareal.css";
import armor from "../Assets/verified_user.svg";
import TrustVerification from "../Components/Verifications/Verifications.jsx";
import Aboutt from "../Components/About/About.jsx";
import Sidebar from "../Components/Sidebar-suppliers/Sidebarsuppliers.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import Cap from "../Components/cap/Cap.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import Header from "../Components/Header/Header.jsx";
import { supabase } from "../Supabase";
import Portfolio from "../Components/Portfolio/Portfolio.jsx";
import Specifications from "../Components/Specifications/Specifications.jsx";
import Reviews from "../Components/Reviews/Reviews.jsx";
export default function Home({ sidebarData, footerData }) {
  const [loading, setLoading] = useState(true);
  const [headerData, setHeaderData] = useState(null);
  const [portfolioImages, setPortfolioImages] = useState([]);

  useEffect(() => {
    const fetchHeaderData = async () => {
      try {
        const { data, error } = await supabase
          .from("Supplier Detail Page eng")
          .select("*")
          .eq("id", 2)
          .single();

        if (error) {
          console.error("Error fetching header:", error);
        } else {
          setHeaderData(data);

          // Map the portfolio images from Supabase into the format Portfolio component expects
         const images = [
  { src: data.portfolio_img1, alt: "Portfolio image 1" },
  { src: data.portfolio_img2, alt: "Portfolio image 2" },
  { src: data.portfolio_img3, alt: "Portfolio image 3" },
  { src: data.portfolio_img4, alt: "Portfolio image 4" }, // ✅ new column
].filter(img => img.src);
          setPortfolioImages(images);
        }
      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchHeaderData();
  }, []);

  if (loading || !headerData) {
    return <DabtoLoadingScreen onComplete={() => setLoading(false)} />;
  }

  return (
    <div className="homepage_bg">
      <div className="sidebarcon">
        <Sidebar data={sidebarData} />
      </div>

      <div className="mainconnnn">
        <Header
          image={headerData.suppliers_pfp || "/default.jpg"}
          name={headerData["supplier's_name"] || "Unknown Supplier"}
          rating={headerData.rating1 || 4.5}
          reviewCount={headerData["supplier's_review_count"] || "0"}
          badgeText="Top Rated Supplier"
          location="Cairo, Egypt"
          memberSince="2020"
          specialization={headerData.Capabilities1 || "Manufacturing"}
        />

        <Aboutt
          text="About"
          caption={headerData["supplier's_about"]}
        />

        <div className="specs">
          Specializations & Capabilities
          <Specifications />
        </div>

        <div className="specs">
          <div className="iconnttl">
            <img src={armor} alt="" />
            Trust & Verification
          </div>
          <TrustVerification />
        </div>

        <Cap />

        {/* Pass fetched portfolio images as props */}
        <Portfolio images={portfolioImages} />
      <Reviews/>
        <Footer data={footerData} />
      </div>
    </div>
  );
}