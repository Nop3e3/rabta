import React, { useEffect, useState, useRef } from "react";
import './Coursecards_comp.css';
import Coursecard from "../coursecardhor/coursecard";
import { supabase } from "../../Supabase";
import Secttl from "../Sectionttl/Sectionttl.jsx";
import Viewallbttn from "../Viewallbttn/Viewallbttn.jsx";
import ArrowSlider from "../Scroll-arrows/Scroll-arrows.jsx";

const Coursessec = () => {
  const [courses, setCourses] = useState([]);
  const scrollRef = useRef(null);

  useEffect(() => {
    async function fetchCourses() {
      const { data, error } = await supabase.from("learning_hub").select("*");
      if (error) console.error("Courses error:", error);
      else setCourses(data);
    }
    fetchCourses();
  }, []);

  const handlePrev = () => {
    scrollRef.current?.scrollBy({ left: -380, behavior: "smooth" });
  };

  const handleNext = () => {
    scrollRef.current?.scrollBy({ left: 380, behavior: "smooth" });
  };

  return (
    <div className="coursessec">
 

      <div className="courses-grid" ref={scrollRef}>
        {courses.map((course) => (
          <Coursecard
            key={course["Course Name"]}
            title={course["Course Name"]}
            provider={course["Provider"]}
            lessons={course["Path"]}
            duration={course["Duration"]}
            rating={course["Rating"] ? (course["Rating"].match(/★/g) || []).length : 0}
            difficulty={course["Level"]}
            bookedPercent={course["Success %"]}
            image={course.image || ""}
            providerLogo={course.provider_logo || ""}
            buttonText="Enroll"
          />
        ))}
      </div>
         <ArrowSlider onPrev={handlePrev} onNext={handleNext} />
    </div>
  );
};

export default Coursessec;