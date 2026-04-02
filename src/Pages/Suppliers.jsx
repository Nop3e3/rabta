import React, { useEffect, useState } from "react";
import "./Home.css";
import "./Suppliers.css";
import Pagination from "../Components/pagination/Pagination.jsx";
import SuppliersCard from "../Components/Supplierscard/Supplierscard.jsx";
import Profiletopbar from "../Components/Searchbar/Topbar.jsx";
import Sidebar from "../Components/Sidebar-suppliers/Sidebarsuppliers.jsx";
import Welcomesec from "../Components/Welcomesec/Welcomsec.jsx";
import { supabase } from "../Supabase";
import Sort from "../Assets/filter_list.svg";
import filtericon from "../Assets/filter_alt.svg";
import Footer from "../Components/Footer/Footer.jsx";
import Shipyllw from "../Components/ships yellow/Shipsyllw.jsx";
import Filterbttn from "../Components/FIilterbttn/Filterbttn.jsx";
import Shipwhite from "../Components/Shipwhite/Shipwhite.jsx";
import DabtoLoadingScreen from "./Loading.jsx";

export default function Suppliers() {
  const [profile, setProfile] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);

  // Fetch profile
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

  // Fetch suppliers
  useEffect(() => {
    async function fetchSuppliers() {
      const { data, error } = await supabase.from("Supplier Detail Page eng").select("*");
      if (!error) setSuppliers(data);
      setLoading(false);
    }
    fetchSuppliers();
  }, []);

  if (loading || !profile) return <DabtoLoadingScreen onComplete={() => setLoading(false)} />;

  return (
    <div className="homepage_bg">
      <div className="sidebarcon">
        <Sidebar />
      </div>

      <div className="mainconnn">
        <Profiletopbar image={profile?.pfp} />
        <Welcomesec
          text="Discover Suppliers"
          caption="Discover elite, verified suppliers in the region to build your next collection."
        />

        <div className="ships">
          <Shipyllw text="All" />
          <Shipwhite text="Fabrics" />
          <Shipwhite text="Manufacturing" />
          <Shipwhite text="Available" />
          <Filterbttn text="Filter" image={filtericon} />
          <Filterbttn text="Sort by" image={Sort} />
        </div>

        {suppliers.map((supplier) => (
          <SuppliersCard
            key={supplier.id}
            name={supplier["supplier's_name"]}
            rating={supplier.rating1}
            reviews={supplier["supplier's_review_count"] || "0"}
            badge="Trusted Supplier"
            location="Cairo, Egypt"
            memberSince="2021"
            specialization={supplier["Capabilities1"]}
            priceRange="5000-10000 EGP"
            projects={supplier.production_capcity}
            tags={[supplier["Capabilities1"], supplier["Capabilities2"], supplier["Capabilities3"]]}
            minOrder={supplier["MOQ"]}
            leadTime={supplier["Lead Time"]}
            available={true}
            image={supplier.suppliers_pfp}
          />
        ))}

        <div className="pagination-section">
          <Pagination />
        </div>

        <Footer />
      </div>
    </div>
  );
}