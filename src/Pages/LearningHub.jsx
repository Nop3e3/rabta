import React, { useEffect, useState } from "react";
import "./Home.css";
import Course2 from "../Components/Course2/Course2.jsx";
import Viewallbttn from "../Components/Viewallbttn/Viewallbttn.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Sidebar from "../Components/Sidebarlearning.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import { supabase } from "../Supabase";
import Vid from "../Components/Videolearning.jsx";
import TaskCardd from "../Components/TaskCard/TaskCard.jsx";
import { useNavigate } from "react-router-dom";
import Pd from "../Components/Progressdashboard.jsx";
import Coursessec from "../Components/Coursecards_comp/Coursecards_comp.jsx"; // ✅ imported from Home
import Grid from "../Components/Grid/Grid.jsx";
export default function Suppliers() {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]); // ✅ for Recommended Courses section
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSupplierClick = (id) => {
    if (id === 2) {
      navigate("/elite-appareal");
    } else {
      navigate(`/supplier/${id}`);
    }
  };

  // Fetch profile
  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("home screen eng")
        .select("greeting_text, name, pfp")
        .eq("id", 1)
        .single();
      if (!error) setProfile(data);
    }
    fetchProfile();
  }, []);

  // Fetch only the two specific courses (for Course2 cards)
  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase
        .from("learning_hub")
        .select("*")
        .in("Course Name", ["Negotiation Basics", "Sourcing 101"]);
      if (!error) setCourses(data);
      setLoading(false);
    }
    fetchCourses();
  }, []);

  // ✅ Fetch all courses (for Recommended Courses section, same as Home.jsx)
  useEffect(() => {
    async function fetchAllCourses() {
      const { data, error } = await supabase.from("learning_hub").select("*");
      if (!error) setAllCourses(data);
    }
    fetchAllCourses();
  }, []);

  if (loading || !profile) return <DabtoLoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="homepage_bg">
      <div className="sidebarcon">
        <Sidebar />
      </div>

      <div className="mainconnn">
        <Profiletopbar image={profile?.pfp} />
        <Welcomesec
          text="Learning Hub"
          caption="Upgrade your skills to maximize your business goals"
        />

        <div className="secsh">
          <Secttl text={`Welcome Back, ${profile?.name}`} />
          <div className="lvl">
            Your goal is to grow in your role with
            <div className="course"> Fashion Supply Chain Management </div>
          </div>
        </div>

        <Pd />

        <div className="ttlcon">
          <Secttl text="Today's Goals" />
        </div>

        <TaskCardd />

        <div className="centering">
          <div className="ttlcon">
            <Secttl text="Featured Mentors" />
            <Viewallbttn text="View All" />
          </div>
          <Vid />
        </div>

        {/* Two specific Course2 cards */}
        <div className="course-list">
              <div className="ttlcon">
            <Secttl text="Recommended" />
            <Viewallbttn text="View All" />
          </div>
          {courses.map((course) => (
            <Course2
              key={course["Course Name"]}
              courseName={course["Course Name"]}
              level={course.Level}
              rating={course.Rating}
              path={course.Path}
              lessons={course.Module}
              duration={course.Duration}
              successPct={course["Success %"]}
              providerName={course.Provider}
              bannerImage={course.image}
              providerLogo={course.provider_logo}
              onEnrollClick={() => navigate(course.Path || "#")}
            />
          ))}
        </div>

        {/* ✅ Recommended Courses section — imported from Home.jsx */}
        <div className="secsh">
          <div className="ttlcon">
            <Secttl text="Courses you might like" />
            <Viewallbttn text="View All" />
          </div>
          <Coursessec courses={allCourses} />
        </div>
<Grid/>
        <Footer />
      </div>
    </div>
  );
}