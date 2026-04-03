import React, { useEffect, useState } from "react";
import "./Home.css";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Sidebar from "../Components/Sidebarlearning.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import { supabase } from "../Supabase";
import TaskCardd from "../Components/TaskCard/TaskCard.jsx";
import { useNavigate } from "react-router-dom";
import Courseheader from "../Components/courseheader/courseheader.jsx";
import Instructorc from "../Components/Instructorcar.jsx";
export default function Suppliers() {
  const [profile, setProfile] = useState(null);
  const [courses, setCourses] = useState([]);
  const [allCourses, setAllCourses] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const handleSupplierClick = (id) => {
    if (id === 2) {
      navigate("/elite-appareal");
    } else {
      navigate(`/supplier/${id}`);
    }
  };

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

  useEffect(() => {
    async function fetchAllCourses() {
      const { data, error } = await supabase.from("learning_hub").select("*");
      if (!error) setAllCourses(data);
    }
    fetchAllCourses();
  }, []);

  if (loading || !profile)
    return <DabtoLoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="homepage_bg">
      <div className="sidebarcon">
        <Sidebar />
      </div>

      <div className="mainconnn"><Courseheader />
<Instructorc/>
     
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

        <div className="ttlcon">
          <Secttl text="Today's Goals" />
        </div>

        <TaskCardd />

        
        <Footer />
      </div>
    </div>
  );
}