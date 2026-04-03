import React, { useEffect, useState } from "react";
import "./Home.css";
import HIW from "../Components/HIW/howitworks.jsx";
import Expertise from "../Components/ExpertiseGrid/ExpertiseGrid.jsx";
import Shipyllw from "../Components/ships yellow/Shipsyllw.jsx";
import Filterbttn from "../Components/FIilterbttn/Filterbttn.jsx";
import Shipwhite from "../Components/Shipwhite/Shipwhite.jsx";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Sidebar from "../Components/SidebarHome.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import { supabase } from "../Supabase";
import Appointment from "../Components/Appointment/Appointment.jsx";
import Viewallbttn from "../Components/Viewallbttn/Viewallbttn.jsx";
import ConsultantCard from "../Components/Consultantcard/Consultant.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import Sort from "../Assets/filter_list.svg";
import filtericon from "../Assets/filter_alt.svg";

export default function Home() {
  const [profile, setProfile] = useState(null);
  const [mentors, setMentors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const { data: profileData } = await supabase
          .from("home screen eng")
          .select("greeting_text, name, pfp")
          .eq("id", 1)
          .single();
        setProfile(profileData);

        const { data: mentorsData } = await supabase.from("find a mentor").select("*");
        setMentors(mentorsData);
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
          text={profile?.greeting_text}
          name={profile?.name}
          caption="Ready to scale your brand today? Here are your latest supplier updates"
        /> <div class="cons">
<div className="ships">
          <Shipyllw text="All" />
          <Shipwhite text="Fashion Production & Sourcing" />
          <Shipwhite text="Textile & Fabric Knowledge" />
          <Shipwhite text="Pricing & Costing" />
       
        </div>
        <div className="shipsy">
           <Filterbttn text="Filter" image={filtericon} />
          <Filterbttn text="Sort by" image={Sort} />
        </div>
        
        </div>
        <div className="secsh">
          <div className="ttlcon">
            <Secttl text="Upcoming Sessions" />
            <Viewallbttn text="View All" />
          </div>
<Appointment /></div>
        <div className="secsh">
          <div className="ttlcon">
            <Secttl text="Featured Mentors" />
            <Viewallbttn text="View All" />
          </div>
          <div className="mentors-grid">
            {mentors.map((mentor) => (
              <ConsultantCard
                key={mentor.id}
                avatarUrl={mentor["mentor's_pfp"]}
                name={mentor["Mentors_name"]}
                title={mentor["Mentor's_specialization"]}
                sessions={mentor["Number_ of_clients1"]}
                reviews={parseInt(mentor["featured_mentor's Rating number1"])}
                ratingText={mentor["mentor's_rate"] ?? undefined}
                tags={[mentor.Tag1, mentor.Tag2].filter(Boolean)}
                responseTime="2 hours"
                experience={`${mentor["Number_ of_clients1"]} clients`}
                verifiedLabel={mentor["featured_mentors_verification1"] ? "Verified" : undefined}
                onKnowMore={() => console.log(`Know more about ${mentor["Mentors_name"]}`)}
                onBookSession={() => console.log(`Book session with ${mentor["Mentors_name"]}`)}
              />
            ))}
          </div>
        </div>
     <Expertise/>
     <HIW/>
        <Footer />
   
      </div>
    </div>
  );
}