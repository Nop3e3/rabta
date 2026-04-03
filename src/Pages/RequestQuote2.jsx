import { useState, useEffect } from "react";
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
import Progressbar from "../Components/Forms/Progressbar.jsx";

// Import StepTwo

import Specifications from "../Components/Forms/Steptwo.jsx"; // <-- adjust path if needed

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
  sizes: {},              // initialize sizes for StepTwo
  sizeQuantities: {},     // initialize size quantities
  customSizes: [],        // custom sizes
  certifications: {},     // certifications
  customizationNeeds: {}, // customization needs
  customNeeds: [],        // additional custom needs
  additionalSpecs: '',    // additional specifications
  requestSample: false,   // request sample checkbox
  qualityStandard: '',    // quality standard
  sizeRange: '',          // size range selection
};

export default function Suppliers() {
  const [profile, setProfile] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleContinue = () => {
    const newErrors = {};

    if (!formData.productCategory) newErrors.productCategory = "Please select a product category";
    if (!formData.productName.trim()) newErrors.productName = "Product name is required";
    if (!formData.description.trim()) newErrors.description = "Please provide a product description";
    if (!formData.materialType) newErrors.materialType = "Please select a material type";
    if (!formData.quantity || formData.quantity <= 0) newErrors.quantity = "Please enter a valid quantity";
    
    if (formData.referenceImages.length === 0) {
      newErrors.referenceImages = "Please upload at least one reference image";
    }

    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      console.log("Validation successful! Proceeding to Step 2...");
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const updateField = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
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
            <Viewallbttn text="Cancel" />
            <Scta text="Save Draft" onClick={() => navigate(-1)} />
          </div>
        </div>

        <Progressbar fillPercent={60} text="Specifications" caption="step 2 of 3" />

        {/* StepTwo Component */}
        <Specifications formData={formData} updateField={updateField} errors={errors} />

        <Footer />
      </div>
    </div>
  );
}