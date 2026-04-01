import React, { useEffect, useState } from "react";
import "./Sidebar.css";
import SidebarComp from "./SidebarComp";
import SidebarCompActive from "./SidebarCompActive";
import logo from "../Assets/logo.svg";
import { supabase } from "../Supabase";
import award from "../Assets/rewarded_ads.svg";
import Logoutbutton from "./logoutbutton";

export default function Sidebar() {
  const [menuItems, setMenuItems] = useState([]);
  const [profile, setProfile] = useState({
    name: "",
    username: "",
    pfp: "",
    review_number: 0,
  });

  useEffect(() => {
    // Fetch sidebar menu from Supabase
    async function fetchSidebar() {
      const { data, error } = await supabase.from("sidebar").select("*");
      if (error) console.error("Error fetching sidebar:", error);
      else setMenuItems(data);
    }

    // Fetch profile info from Supabase
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("home screen eng")
        .select("*")
        .eq("id", 1)
        .single();
      if (error) console.error("Error fetching profile:", error);
      else
        setProfile({
          name: data.name || "",
          username: data.username || "",
          pfp: data.pfp || "https://i.pravatar.cc/150",
          review_number: data.review_number || 0,
        });
    }

    fetchSidebar();
    fetchProfile();
  }, []);

  // Split menu items
  const generalItems = menuItems.filter((item) => item.id >= 2 && item.id <= 6);
  const toolsItems = menuItems.filter((item) => item.id >= 7 && item.id <= 10);
  const activeItem = menuItems.filter((item) => item.id === 1);
  const logoutItems = menuItems.filter((item) => item.id === 11);

  return (
    <div className="sidebar">
      {/* Logo */}
      <img className="logo" src={logo} alt="Logo" />

      {/* Profile */}
      <div className="profile">
        <div className="imgcon">
          <img className="pfp" src={profile.pfp} alt="pfp" />
        </div>
        <div className="Name">{profile.name}</div>
        <p className="username">{profile.username}</p>
        <div className="badge">
          <img src={award} alt="" />
          Exceptional contributor
        </div>
        <div className="stars">★★★★★</div>
        <p className="reviews">({profile.review_number})</p>
      </div>

      {/* Menu */}
      <div className="menu">
        <div className="sectioncon">
          <p className="section">General</p>
          {activeItem.map((item) => (
            <SidebarCompActive
              key={item.id}
              text={item.button_text}
              icon={item.ICON}
              path={item.path}  // dynamic path from Supabase
            />
          ))}
          {generalItems.map((item) => (
            <SidebarComp
              key={item.id}
              text={item.button_text}
              icon={item.ICON}
              path={item.path}  // dynamic path from Supabase
            />
          ))}
        </div>

        <div className="sectioncon">
          <p className="section">Tools</p>
          {toolsItems.map((item) => (
            <SidebarComp
              key={item.id}
              text={item.button_text}
              icon={item.ICON}
              path={item.path}  // dynamic path from Supabase
            />
          ))}
        </div>
      </div>

      {/* Logout */}
      {logoutItems.map((item) => (
        <Logoutbutton key={item.id} text={item.button_text} icon={item.ICON} />
      ))}
    </div>
  );
}