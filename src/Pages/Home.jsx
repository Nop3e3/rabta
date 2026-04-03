import React, { useEffect, useState } from "react";
import "./Home.css";

import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Sidebar from "../Components/SidebarHome.jsx";
import Coursessec from "../Components/Coursecards_comp/Coursecards_comp.jsx";
import SocialPost from "../Components/Socialpost1/Socialpost1.jsx";
import Quickaction from "../Components/Quickactions/Quickaction.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import { supabase } from "../Supabase";
import Operations from "../Components/Operations/Operations.jsx";
import Statscomp from "../Components/Statscomp/Statscomp.jsx";
import Viewallbttn from "../Components/Viewallbttn/Viewallbttn.jsx";
import ConsultantCard from "../Components/Consultantcard/Consultant.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import Portfolio from "../Components/Portfolio/Portfolio.jsx";
export default function Home() {
  const [profile, setProfile] = useState(null);
  const [quickActions, setQuickActions] = useState([]);
  const [courses, setCourses] = useState([]);
  const [communityPosts, setCommunityPosts] = useState([]);
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

        const { data: qaData } = await supabase
          .from("home screen eng")
          .select("*")
          .in("id", [1, 2, 3, 4])
          .order("id", { ascending: true });
        setQuickActions(qaData);

        const { data: coursesData } = await supabase.from("learning_hub").select("*");
        setCourses(coursesData);

        const { data: communityData } = await supabase
          .from("community")
          .select("*")
          .eq("id", 1)
          .single();
        setCommunityPosts([communityData]);

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

        {/* Other sections ... */}
        <div className="secsh">
          <Secttl text="How's your Business Lately" />
          <Statscomp />
        </div>

        <div className="secsh">
          <div className="ttlcon">
            <Secttl text="Active Operations" />
            <Viewallbttn text="View All" />
          </div>
          <Operations />
        </div>

        <div className="secsh">
          <div className="ttlcon">
            <Secttl text="Courses you might like" />
            <Viewallbttn text="View All" />
          </div>
          <Coursessec courses={courses} />
        </div>

        <div className="secsh">
          <div className="ttlcon">
            <Secttl text="Latest from your community" />
            <Viewallbttn text="View All" />
          </div>
          <div className="community-posts">
            {communityPosts.map((post) => (
              <SocialPost
                key={post.id}
                avatarUrl={post["posting_user's_pfp1"]}
                brandName={post["Groups's Name1"]}
                userName={post["User's_name"]}
                postDate="10 Feb 2026"
                caption={post.post_text1}
                images={[post.post_img1, post.post_img2, post.post_img3].filter(Boolean)}
                likes={post.Like_count || 0}
                shares={post.Share_count || 0}
                comments={post.Comment_count || 0}
              />
            ))}
          </div>
        </div>

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
  
        <Footer />
      </div>
    </div>
  );
}