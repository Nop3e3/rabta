import React, { useState, useEffect } from "react";
import "./Home.css";
import "./EliteAppareal.css";
import Sidebar from "../Components/Sidbarcommunity.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import Header from "../Components/Header/Headerr.jsx";
import { supabase } from "../Supabase";
import Aboutt from "../Components/About/About.jsx";
import SocialPost from "../Components/Socialpost1/Socialpost1.jsx";
import SocialCard from "../Components/Txtpost/Txtpost.jsx";
import Polll from "../Components/Pollpost/Poll.jsx";

export default function Home({ sidebarData, footerData }) {
  const [loading, setLoading] = useState(true);
  const [headerData, setHeaderData] = useState(null);
  const [txtPosts, setTxtPosts] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const { data, error } = await supabase
          .from("community")
          .select("*")
          .eq("id", 1)
          .single();

        if (error) console.error("Error fetching header:", error);
        else setHeaderData(data);

        const { data: postsData, error: postsError } = await supabase
          .from("community")
          .select("*")
          .in("id", [4, 5]);

        if (postsError) console.error("Error fetching txt posts:", postsError);
        else setTxtPosts(postsData || []);

      } catch (err) {
        console.error("Unexpected error:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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
          image={headerData.groups_pfp || "/default.jpg"}
          name={headerData["Groups's_name"] || "Unknown Group"}
          groupType="Public group"
          memberSince={headerData.date}
          postsToday={headerData.groupsactivitycount || 0}
          location={`${headerData["Groups member count"] || 0} Members`}
          tags={["Business Strategy", "Supply Chain"]}
        />
        <Aboutt
          text="About"
          caption="Breaking the barriers between creative vision and factory reality. We are a collective of emerging fashion founders dedicated to transparent sourcing, sustainable scaling, and shared industry intelligence"
        />

        <SocialPost
          avatarUrl={headerData["posting_user's_pfp1"]}
          brandName={headerData["User's _group_name"] || "Community"}
          userName={headerData["User's_name"]}
          postDate="10 Feb 2026"
          caption={headerData.post_text1}
          images={[
            headerData.post_img1,
            headerData.post_img2,
            headerData.post_img3,
          ].filter(Boolean)}
          likes={headerData.Like_count || 0}
          shares={headerData.Share_count || 0}
          comments={headerData.Comment_count || 0}
        />

        {txtPosts.map((post) => (
          <SocialCard
            key={post.id}
            profileImg={post["posting_user's_pfp1"]}
            brandName={post["User's _group_name"] || "Community"}
            metaData={post["User's_name"] + " • 10 Feb 2026"}
            content={post.post_text1 || post.post_text3}
            tags={["#Growth", "#SupplyChain"]}
            likes={post.Like_count || 0}
            shares={post.Share_count || 0}
            comments={post.Comment_count || 0}
          />
        ))}

        <Polll />

        <Footer data={footerData} />
      </div>
    </div>
  );
}