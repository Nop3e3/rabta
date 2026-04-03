import React, { useEffect, useState } from "react";
import "./Home.css";
import Wul from "../Components/WUL/Wul.jsx";
import Progressbar from "../Components/Forms/Progressbar.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Sidebar from "../Components/Sidebarlearning.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import { supabase } from "../Supabase";
import TaskCardd from "../Components/TaskCard/TaskCard.jsx";
import { useNavigate } from "react-router-dom";
import Modulecard from "../Components/Modulecard/Modulecard.jsx";
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
     
        

        <div className="secsh">
          <Secttl text="Your Progress Lately" />
          <div class="tageggg"> ↖ Your progress has increasedthe past week by 20%</div>
        
        </div>
<Progressbar fillPercent={40} text="Product Information" caption="Modules 4 out of 10" />
        <div className="ttlcon">
          <Secttl text="Today's Goals" />
        </div>

        <TaskCardd />

        <Wul/>

        <Modulecard/>
              <button type="button" className="nxt" >Continue to course </button>
        <Footer />
      </div>
    </div>
  );
}