import React, { useEffect, useState } from "react";
import "./profile_mail_notifications.css";
import mail from "../../Assets/Frame 1000006268.svg";
import notification from "../../Assets/Frame 1000006414.svg";
import { supabase } from "../../Supabase";

const Pfptopbar = () => {
  const [pfp, setPfp] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const { data, error } = await supabase
        .from("home screen eng")
        .select("pfp")
        .eq("id", 1)
        .single();

      if (error) {
        console.error("Error fetching pfp:", error);
      } else {
        setPfp(data.pfp);
      }
    }

    fetchProfile();
  }, []);

  return (
    <div className="profiletopbar">
      {pfp && (
        <img
          className="pfpp"
          src={pfp}
          alt="profile"
        />
      )}

      <img src={mail} alt="mail" />
      <img src={notification} alt="notifications" />
    </div>
  );
};

export default Pfptopbar;