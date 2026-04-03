import React, { useEffect, useState } from "react";
import "./Home.css";
import "./Suppliers.css";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Viewallbttn from "../Components/Viewallbttn/Viewallbttn.jsx";
import Scta from "../Components/SecondaryCtabttn/SecondaryCtabttn.jsx";
import { supabase } from "../Supabase";
import Sidebar from "../Components/Sidebar-suppliers/Sidebarsuppliers.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import { useNavigate } from "react-router-dom";
import ProductInformation from "../Components/Forms/Stepone.jsx";
import Progressbar from "../Components/Forms/Progressbar.jsx";

const INITIAL_FORM_DATA = {
  supplier: 'broadcast',
  productCategory: '',
  productName: '',
  description: '',
  referenceImages: [],
  materialType: '',
  weightThickness: '',
  quantity: '',
  quantityUnit: 'pieces',
  flexibleQuantity: false,
  colorRequirements: '',
};

export default function Suppliers() {
  const [profile, setProfile] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  // ─── Validation Logic ──────────────────────────────────────────────────────
  const handleContinue = () => {
    const newErrors = {};

    if (!formData.productCategory) newErrors.productCategory = "Please select a product category";
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.description.trim()) newErrors.description = "Please provide a product description";
    if (!formData.materialType) newErrors.materialType = "Please select a material type";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Please enter a valid quantity";
    
    // Optional: Only validate images if you want them to be mandatory
    if (formData.referenceImages.length === 0) {
      newErrors.referenceImages = "Please upload at least one reference image";
    }

    setErrors(newErrors);

    // If there are no keys in newErrors, we can proceed to step 2
    if (Object.keys(newErrors).length === 0) {
      console.log("Validation successful! Proceeding to Step 2...");
      // navigate("/next-step-route"); // Or update a 'step' state here
    } else {
      // Scroll to the top of the form or first error if needed
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for the field when user updates it so the red warning disappears
    if (errors[field]) {
      setErrors(prev => {
        const newErrs = { ...prev };
        delete newErrs[field];
        return newErrs;
      });
    }
  };

  const handleSupplierClick = (id) => {
    if (id === 2) {
      navigate("/elite-appareal");
    } else {
      navigate(`/supplier/${id}`);
    }
  };

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
        <div className="ttlr">
          <Secttl text="New Quote Request" />
          <div className="btnsr">
            {/* Note: I'm assuming "Request Quote" is your submission button here */}
            <Viewallbttn text="Cancel" />
            <Scta text="Requexst Quote" onClick={() => navigate(-1)} />
          </div>
        </div>

        <Progressbar fillPercent={33} text="Product Information" caption="step 1 of 3" />
        
        {/* Pass handleContinue to the onNext prop */}
        <ProductInformation
          formData={formData}
          updateField={updateField}
          errors={errors}
          onNext={handleContinue} 
        />
        
        <Footer />
      </div>
    </div>
  );
}