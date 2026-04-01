import React, { useEffect, useState } from "react";
import "./Home.css";
import Coursecard from "../Components/coursecardhor/coursecard";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Sidebar from "../Components/SidebarHome.jsx";
import Coursessec from "../Components/Coursecards_comp/Coursecards_comp.jsx";

import Quickaction from "../Components/Quickactions/Quickaction.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import { supabase } from "../Supabase";
import Operations from "../Components/Operations/Operations.jsx";
import Statscomp from "../Components/Statscomp/Statscomp.jsx";
import Viewallbttn from "../Components/Viewallbttn/Viewallbttn.jsx";
export default function Home() {
  const [profile, setProfile] = useState(null);
  const [quickActions, setQuickActions] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Fetch Profile
      const { data: profileData, error: profileError } = await supabase
        .from("home screen eng")
        .select("greeting_text, name, pfp")
        .eq("id", 1)
        .single();
      if (profileError) console.error("Profile error:", profileError);
      else setProfile(profileData);

      // Fetch Quick Actions (IDs 1 → 4)
      const { data: qaData, error: qaError } = await supabase
        .from("home screen eng")
        .select("*")
        .in("id", [1, 2, 3, 4])
        .order("id", { ascending: true });
      if (qaError) console.error("Quick Actions error:", qaError);
      else setQuickActions(qaData);

      // Fetch Courses
      const { data: coursesData, error: coursesError } = await supabase
        .from("learning_hub")
        .select("*");
      if (coursesError) console.error("Courses error:", coursesError);
      else setCourses(coursesData);
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
        <Welcomesec text={profile.greeting_text} name={profile.name} />

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
        </div>

        {/* Stats */}
        <div className="secsh">
          <Secttl text="How's your Business Lately" />
          <Statscomp />
        </div>
<div className="secsh">
      <div className="ttlcon"><Secttl text="Active Operations" />
              <Viewallbttn text="View All"  /></div>
        <Operations /></div>

        {/* Courses */}
        <div className="secsh">
         <div className="ttlcon"><Secttl text="Recommended Courses" />
              <Viewallbttn text="View All"  /></div> 
          <Coursessec />
        </div>
      </div>
    </div>
  );
}





















{/* path="/quickactions" */}