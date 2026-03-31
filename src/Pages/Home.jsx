import React, { useEffect, useState } from "react";
import "./Home.css";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Sidebar from "../Components/Sidebar";
import Quickaction from "../Components/Quickactions/Quickaction.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import { supabase } from "../Supabase";
import Statscomp from "../Components/Statscomp/Statscomp.jsx";
export default function App() {
  const [profile, setProfile] = useState(null);
  const [quickActions, setQuickActions] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // ✅ Fetch profile (id = 1 only)
      const { data: profileData, error: profileError } = await supabase
        .from("home screen eng")
        .select("greeting_text, name, pfp")
        .eq("id", 1)
        .single();

      if (profileError) {
        console.error(profileError);
      } else {
        setProfile(profileData);
      }

      // ✅ Fetch quick actions (id 1 → 4)
      const { data: qaData, error: qaError } = await supabase
        .from("home screen eng")
        .select("*")
        .in("id", [1, 2, 3, 4]); // 🔥 THIS IS THE KEY

      if (qaError) {
        console.error(qaError);
      } else {
        setQuickActions(qaData);
      }
    }

    fetchData();
  }, []);

  if (!profile) return null;

  return (
    <div className="homepage_bg">
      <div className="sidebarcon">
        <Sidebar />
      </div>

      <div className="mainconnn">
        {/* Topbar */}
        <Profiletopbar image={profile.pfp} />

        {/* Welcome */}
        <Welcomesec
          text={profile.greeting_text}
          name={profile.name}
        />

        {/* Quick Actions */}
        <div className="secsh">
          <Secttl text="Quick Actions" />

          <div className="qa-grid">
            {quickActions.map((item) => (
              <Quickaction
                key={item.id}
                title={item.quick_actions_title}
                caption={item.quick_actions_captionn}
                image={item.quick_actions_image}
                button={item.quick_actions_button}
              />
            ))}
          
          </div>  
        </div><Statscomp />
      </div>
    </div>
  );
}