import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import Polll from "../Components/Pollpost/Poll.jsx";
import SocialPost from "../Components/Socialpost1/Socialpost1.jsx"; // Keep original SocialPost
import SocialCard from "../Components/Txtpost/Txtpost.jsx"; // For posts id=2 & 3
import Shipyllw from "../Components/ships yellow/Shipsyllw.jsx";
import Comcard from "../Components/comcard/Comcard.jsx";
import Shipwhite from "../Components/Shipwhite/Shipwhite.jsx";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Sidebar from "../Components/Sidbarcommunity.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import { supabase } from "../Supabase";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import Viewallbttn from "../Components/Viewallbttn/Viewallbttn.jsx";
import Vid from "../Components/videopost/Videopost.jsx";

export default function Home() {
  const navigate = useNavigate(); // For SPA navigation
  const [profile, setProfile] = useState(null);
  const [communities, setCommunities] = useState([]);
  const [communityPost, setCommunityPost] = useState(null); // post id=1
  const [communityPosts, setCommunityPosts] = useState([]); // posts id=2 & 3
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch profile
        const { data: profileData } = await supabase
          .from("home screen eng")
          .select("greeting_text, name, pfp")
          .eq("id", 1)
          .single();
        setProfile(profileData);

        // Fetch all communities
        const { data: communitiesData, error: communitiesError } = await supabase
          .from("community")
          .select("*");
        if (communitiesError) throw communitiesError;
        setCommunities(communitiesData || []);

        // Fetch only post with id=1
        const { data: postData } = await supabase
          .from("community")
          .select("*")
          .eq("id", 1)
          .single();
        setCommunityPost(postData || null);

        // Fetch posts with id=2 and id=3
        const { data: postsData, error: postsError } = await supabase
          .from("community")
          .select("*")
          .in("id", [2, 3]);
        if (postsError) throw postsError;
        setCommunityPosts(postsData || []);
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
          text="Community"
          caption="Meet your success partners. A community bringing together elite designers, suppliers, and industry experts in one place"
        />

        <div className="shipsS">
          <div className="shipcon">
            <Shipyllw text="Feed" />
            <Shipwhite text="Groups" />
            <Shipwhite text="Events" />
            <Shipwhite text="Saved" />
          </div>
        </div>

        <div className="secsh">
          <div className="ttlcon">
            <Secttl text="Featured Groups" />
            <Viewallbttn text="View All" />
          </div>
        </div>

        {/* Render all communities */}
        <div className="comcon">
          {communities.map((community) => (
            <Comcard
              key={community.id}
              bgImage={community.groups_pfp}
              icon={community.groups_pfp}
              title={community["Groups’s_name"]}
              postsToday={community.groupsactivitycount}
              members={community["Groups member count"]}
              buttonText="Join group"
              onClick={() => {
                if (community.id === 1) {
                  navigate("/NewEnterpenuers"); // Replace with your page path
                }
              }}
            />
          ))}
        </div>

        {/* Render post with id=1 using original SocialPost */}
        {communityPost && (
          <div className="community-posts">
            <SocialPost
              key={communityPost.id}
              avatarUrl={communityPost["posting_user's_pfp1"]}
              brandName={communityPost["User's _group_name"] || "Community"} 
              userName={communityPost["User's_name"]}
              postDate="10 Feb 2026"
              caption={communityPost.post_text1}
              images={[
                communityPost.post_img1,
                communityPost.post_img2,
                communityPost.post_img3,
              ].filter(Boolean)}
              likes={communityPost.Like_count || 0}
              shares={communityPost.Share_count || 0}
              comments={communityPost.Comment_count || 0}
            />
          </div>
        )}

        {/* Render posts with id=2 & 3 using SocialCard */}
        {communityPosts.map((post) => (
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

        <Vid />
        <Polll />
        <Footer />
      </div>
    </div>
  );
}