import React, { useEffect, useState } from "react";
import "./Home.css";
import Coursecard from "../Components/coursecardhor/coursecard";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Sidebar from "../Components/SidebarHome.jsx";
import Quickaction from "../Components/Quickactions/Quickaction.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import { supabase } from "../Supabase";
import Operations from "../Components/Operations/Operations.jsx";
import Statscomp from "../Components/Statscomp/Statscomp.jsx";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [quickActions, setQuickActions] = useState([]);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    async function fetchData() {
      // Profile
      const { data: profileData, error: profileError } = await supabase
        .from("home screen eng")
        .select("greeting_text, name, pfp")
        .eq("id", 1)
        .single();
      if (profileError) console.error("Profile error:", profileError);
      else setProfile(profileData);

      // Quick Actions (id 1 → 4)
      const { data: qaData, error: qaError } = await supabase
        .from("home screen eng")
        .select("*")
        .in("id", [1, 2, 3, 4])
        .order("id", { ascending: true });
      if (qaError) console.error("Quick Actions error:", qaError);
      else setQuickActions(qaData);

      // Courses from learning hub
      const { data: coursesData, error: coursesError } = await supabase
        .from("learning hub")
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
        </div>

        {/* Stats */}
        <div className="secsh">
          <Secttl text="How’s your Business Lately" />
          <Statscomp />
        </div>

        {/* Operations */}
        <Operations />

        {/* Courses dynamically from Supabase */}
        <div className="secsh">
          <Secttl text="Recommended Courses" />
          <div className="courses-grid">
            {courses.map((course) => (
              <Coursecard
                key={course.id}
                title={course.Recommended_course_name1}
                provider={course.provider_name}
                lessons={course.modules}
                duration={course.time}
                rating={course.course_rate_number1 || 0}
                difficulty={course.course_level1}
                bookedPercent={course.booking_percent || 0}
                image={course.module_cover_image}
                providerLogo={""} // You can add a provider logo column if needed
                buttonText="Enroll"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}