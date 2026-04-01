import React, { useEffect, useState } from "react";
import "./Home.css";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Sidebar from "../Components/Sidebar-suppliers/Sidebarsuppliers.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import { supabase } from "../Supabase";
import Footer from "../Components/Footer/Footer.jsx";

export default function Home() {
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("home screen eng")
        .select("greeting_text, name, pfp")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Profile error:", error);
      } else {
        setProfile(data);
      }
    }

    fetchProfile();
  }, []);

  if (!profile) return null;

  return (
    <div className="homepage_bg">
      <div className="sidebarcon">
        <Sidebar />
      </div>

      <div className="mainconnn">
        <Profiletopbar image={profile.pfp} />
        <Welcomesec 
          text={profile.greeting_text} 
          name={profile.name} 
        />
        <Footer />
      </div>
    </div>
  );
}