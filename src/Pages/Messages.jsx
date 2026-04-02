import React, { useEffect, useState } from "react";
import "./Home.css";

import { supabase } from "../Supabase";
import Sidebar from "../Components/Sidebar-messages.jsx";
import Noti from "../Components/noti/noti.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import MessagesPage from "../Components/messagecard.jsx";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Createmsg from "../Components/creatmsg/createmsg.jsx";
export default function MessagesHome() {
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(true);

  const [stats, setStats] = useState({
    total: 0,
    unread: 0,
    read: 0,
  });

  useEffect(() => {
    async function fetchMessages() {
      try {
        const { data, error } = await supabase
          .from("messages")
          .select("*")
          .order("id", { ascending: true });

        if (error) throw error;

        // ✅ Format messages safely
        const formattedMessages = data.map((msg) => {
          const status =
            msg.status && msg.status.toLowerCase() === "unread"
              ? "unread"
              : "read";

          return {
            id: msg.id,
            name: msg["messager's_name1"] || "Unknown",
            subject: msg.message_title || "No Title",
            preview: msg.message_content || "",
            time: msg.time || "Unknown",
            status,
            avatarUrl:
              msg["messager's_pfp1"] ||
              "https://i.pinimg.com/1200x/f7/40/a9/f740a924dcb4fa8982a2b7d8deb1989f.jpg",
          };
        });

        // ✅ Calculate stats dynamically
        const unreadCount = formattedMessages.filter(
          (m) => m.status === "unread"
        ).length;

        const readCount = formattedMessages.filter(
          (m) => m.status === "read"
        ).length;

        setStats({
          total: formattedMessages.length,
          unread: unreadCount,
          read: readCount,
        });

        setMessages(formattedMessages);
      } catch (err) {
        console.error("Error fetching messages:", err);
      } finally {
        setLoading(false);
      }
    }

    fetchMessages();
  }, []);

  if (loading)
    return <DabtoLoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="homepage_bg">
      {/* Sidebar */}
      <div className="sidebarcon">
        <Sidebar />
      </div>

      {/* Main Content */}
      <div className="mainconnn">
        {/* ✅ TOPBAR */}
        <Profiletopbar />

        {/* ✅ Stats */}
        <div className="rowww">
          <Noti label="Total Messages" value={stats.total} />
          <Noti label="Unread" value={stats.unread} />
          <Noti label="Read" value={stats.read} />
        </div>

        {/* ✅ Messages */}
        <div className="mrow">
          <MessagesPage messages={messages} />
          <Createmsg/>
        </div>

        {/* Footer */}
        <Footer />
      </div>
    </div>
  );
}