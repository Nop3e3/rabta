import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";
import "./Suppliers.css";
import Secttl from "../Components/Sectionttl/Sectionttl.jsx";
import Viewallbttn from "../Components/Viewallbttn/Viewallbttn.jsx";
import Scta from "../Components/SecondaryCtabttn/SecondaryCtabttn.jsx";
import { supabase } from "../Supabase";
import Sidebar from "../Components/Sidebar-suppliers/Sidebarsuppliers.jsx";
import Footer from "../Components/Footer/Footer.jsx";
import DabtoLoadingScreen from "./Loading.jsx";
import Progressbar from "../Components/Forms/Progressbar.jsx";

// ─── Import StepThree ─────────────────────────────────────────────────────────
import StepThree from "../Components/Forms/Stepthree.jsx"; // <-- Import StepThree

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
  sizes: {},
  sizeQuantities: {},
  customSizes: [],
  certifications: {},
  customizationNeeds: {},
  customNeeds: [],
  additionalSpecs: '',
  requestSample: false,
  qualityStandard: '',
  sizeRange: '',
  governorate: '',
  city: '',
  districtArea: '',
  deliveryTimeline: '',
  requiredByDate: '',
  budgetMin: '',
  budgetMax: '',
  hideBudget: false,
  paymentTerms: '',
  additionalNotes: '',
};

export default function Suppliers() {
  const [profile, setProfile] = useState(null);
  const [suppliers, setSuppliers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [formData, setFormData] = useState(INITIAL_FORM_DATA);
  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

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

        <Progressbar fillPercent={100} text="Specifications" caption="step 3 of 3" />

        {/* StepThree Component */}
        <StepThree
          formData={formData}
          updateField={updateField}
          errors={errors}
        />

        <Footer />
      </div>
    </div>
  );
}