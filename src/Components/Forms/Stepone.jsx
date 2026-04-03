import React, { useState, useRef } from 'react';
import { useNavigate } from "react-router-dom";
import './QuoteForm.css';
import arw from "../../Assets/arrow_forward.svg";
import form from "../../Assets/form.svg";

// ─── Constants ──────────────────────────────────────────────────────────────
const CATEGORIES = [
  { id: 'fabrics', label: 'Fabrics', bg: 'https://images.unsplash.com/photo-1601056639638-c53c50e13ead?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OHx8ZmFicmljfGVufDB8fDB8fHww', fallback: 'linear-gradient(135deg,#3d2b1f,#7a5540)' },
  { id: 'garments', label: 'Garments', bg: 'https://images.unsplash.com/photo-1489987707025-afc232f7ea0f?w=240&h=130&fit=crop&auto=format', fallback: 'linear-gradient(135deg,#1e1212,#7a2e2e)' },
  { id: 'packaging', label: 'Packaging', bg: 'https://images.unsplash.com/photo-1595246135406-803418233494?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', fallback: 'linear-gradient(135deg,#2e2412,#7a6030)' },
  { id: 'accessories', label: 'Accessories', bg: 'https://images.unsplash.com/photo-1548036328-c9fa89d128fa?w=240&h=130&fit=crop&auto=format', fallback: 'linear-gradient(135deg,#121e12,#3a5a20)' },
  { id: 'trims', label: 'Trims', bg: 'https://plus.unsplash.com/premium_photo-1683141087587-433907f9fdfd?q=80&w=1170&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D', fallback: 'linear-gradient(135deg,#12121e,#2a2a50)' },
];

const MATERIAL_TYPES = ['Cotton', 'Polyester', 'Linen', 'Silk', 'Wool','Denim', 'Leather', 'Synthetic Blend', 'Nylon', 'Viscose', 'Other'];
const COLOR_OPTIONS = ['White', 'Black', 'Navy Blue', 'Grey', 'Red', 'Green','Yellow', 'Pink', 'Brown', 'Beige', 'Multicolor', 'Custom / Pantone'];
const MAX_IMAGES = 5;
const MAX_FILE_SIZE_MB = 3;

// ─── Sub-components ──────────────────────────────────────────────────────────
function FieldError({ message }) {
  if (!message) return null;
  return <p className="qf-field-error qf-step-field-error">⚠ {message}</p>;
}

function RadioOption({ value, selected, onChange, label, description }) {
  return (
    <div className={`qf-radio-opt ${selected ? 'selected' : ''}`} onClick={() => onChange(value)} role="radio" aria-checked={selected} tabIndex={0} onKeyDown={e => e.key==='Enter' && onChange(value)}>
      <div className={`qf-radio-circle ${selected ? 'selected' : ''}`}>{selected && <div className="qf-radio-dot" />}</div>
      <div><p className="qf-radio-label">{label}</p>{description && <p className="qf-radio-desc">{description}</p>}</div>
    </div>
  );
}

function CategoryCard({ cat, selected, onSelect }) {
  const [imgError, setImgError] = useState(false);
  return (
    <div className={`qf-cat-card ${selected ? 'selected' : ''}`} onClick={() => onSelect(cat.id)} role="button" tabIndex={0} onKeyDown={e => e.key==='Enter' && onSelect(cat.id)} aria-pressed={selected}>
      <div className="qf-cat-bg" style={{ background: imgError ? cat.fallback : undefined }}>
        {!imgError && <img src={cat.bg} alt={cat.label} onError={() => setImgError(true)} style={{ width:'100%', height:'100%', objectFit:'cover', display:'block' }} />}
      </div>
      <div className="qf-cat-overlay">{cat.label}</div>
    </div>
  );
}

// ─── StepOne Component ───────────────────────────────────────────────────────
export default function StepOne({ formData, updateField }) {
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files || []);
    const current = formData.referenceImages || [];
    const remaining = MAX_IMAGES - current.length;
    if (remaining <= 0) return;

    const valid = files.slice(0, remaining).filter(f => f.size <= MAX_FILE_SIZE_MB * 1024 * 1024 && f.type.startsWith('image/'));
    const readers = valid.map(file => new Promise(resolve => {
      const r = new FileReader();
      r.onload = ev => resolve({ name: file.name, url: ev.target.result });
      r.readAsDataURL(file);
    }));
    Promise.all(readers).then(newImgs => updateField('referenceImages', [...current, ...newImgs]));
    e.target.value = '';
  };

  const removeImage = idx => {
    const updated = [...(formData.referenceImages || [])];
    updated.splice(idx,1);
    updateField('referenceImages', updated);
  };

  // ── VALIDATION ──
  const validate = () => {
    const newErrors = {};
    if (!formData.productCategory) newErrors.productCategory = "Please select a product category";
    if (!formData.productName) newErrors.productName = "Please enter a product name";
    if (!formData.description) newErrors.description = "Please enter a product description";
    if (!formData.referenceImages || formData.referenceImages.length === 0) newErrors.referenceImages = "Please upload at least one reference image";
    if (!formData.materialType) newErrors.materialType = "Please select a material type";
    if (!formData.quantity) newErrors.quantity = "Please enter quantity";
    if (!formData.colorRequirements) newErrors.colorRequirements = "Please select color requirements";
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => { if(validate()) navigate("/RequestQuote2"); };

  const images = formData.referenceImages || [];
  const descLen = (formData.description || '').length;

  return (
    <div className="qf-step-content">
      {/* Info Banner */}
      <div className="qf-info-banner">
        <span className="qf-info-icon"><img src={form} alt="" /></span>
        <div className="qf-info-text">
          <strong>About Quote Requests</strong>
          <p>Send your requirements to multiple verified suppliers. Compare quotes and choose the best offer for your business.</p>
        </div>
      </div>

      {/* Select Supplier */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">Select Supplier (Optional)</h2>
          <p className="qf-section-subtitle">Send to a specific supplier or broadcast to all matching suppliers</p>
        </div>
        <div className="qf-radio-stack">
          <RadioOption value="broadcast" selected={formData.supplier==='broadcast'} onChange={v=>updateField('supplier',v)} label="Broadcast to All Suppliers" description="Get quotes from multiple verified suppliers (Recommended)" />
          <RadioOption value="specific" selected={formData.supplier==='specific'} onChange={v=>updateField('supplier',v)} label="Specific Supplier" description="Send request to a supplier you've worked with" />
          <RadioOption value="favorites" selected={formData.supplier==='favorites'} onChange={v=>updateField('supplier',v)} label="Select from Favorites" description="Choose from your saved suppliers" />
        </div>
      </div>

      {/* Product Category */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">Product Category <span className="qf-req">*</span></h2>
          <p className="qf-section-subtitle">Choose the category that best fits your product</p>
        </div>
        <div className={errors.productCategory ? 'has-error-border' : ''}>
          <div className="qf-cat-top">
            {CATEGORIES.slice(0,3).map(cat=> <CategoryCard key={cat.id} cat={cat} selected={formData.productCategory===cat.id} onSelect={id=>updateField('productCategory',id)} />)}
          </div>
          <div className="qf-cat-bot">
            {CATEGORIES.slice(3).map(cat=> <CategoryCard key={cat.id} cat={cat} selected={formData.productCategory===cat.id} onSelect={id=>updateField('productCategory',id)} />)}
          </div>
          <FieldError message={errors.productCategory} />
        </div>
      </div>

      {/* Basic Info */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">Basic Information <span className="qf-req">*</span></h2>
        </div>
        <div className="qf-field">
          <label className="qf-field-label">Product Name <span className="qf-req">*</span></label>
          <input className={`qf-input ${errors.productName?'has-error':''}`} type="text" placeholder="e.g., Cotton T-Shirts" value={formData.productName} onChange={e=>updateField('productName',e.target.value)} maxLength={120}/>
          <FieldError message={errors.productName} />
        </div>
        <div className="qf-field">
          <label className="qf-field-label">Description <span className="qf-req">*</span></label>
          <textarea className={`qf-textarea ${errors.description?'has-error':''}`} placeholder="Describe your product requirements in detail..." value={formData.description} onChange={e=>{if(e.target.value.length<=500) updateField('description',e.target.value)}} rows={4} />
          <p className="qf-char-count">{descLen}/500 character</p>
          <FieldError message={errors.description} />
        </div>
      </div>

      {/* Reference Images */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">Reference Images <span className="qf-req">*</span></h2>
          <p className="qf-section-subtitle">Add photos or sketches to help suppliers understand your needs</p>
        </div>
        {images.length>0 && <div className="qf-img-previews">{images.map((img,i)=>(
          <div key={i} className="qf-img-prev">
            <img src={img.url} alt={img.name} />
            <button type="button" className="qf-img-del" onClick={()=>removeImage(i)} aria-label="Remove">✕</button>
          </div>
        ))}</div>}
        {images.length<MAX_IMAGES && <div className={`qf-img-upload ${errors.referenceImages?'has-error':''}`} style={{marginTop:images.length>0?'10px':'0'}} onClick={()=>fileInputRef.current?.click()} role="button" tabIndex={0} onKeyDown={e=>e.key==='Enter'&&fileInputRef.current?.click()} >
          <span className="qf-img-plus">+</span><span className="qf-img-lbl">Add Image</span>
        </div>}
        <input ref={fileInputRef} type="file" accept="image/*" multiple style={{display:'none'}} onChange={handleImageUpload} />
        <p className="qf-img-hint" style={{marginTop:'6px'}}>Max {MAX_IMAGES} images, up to {MAX_FILE_SIZE_MB}MB each</p>
        <FieldError message={errors.referenceImages} />
      </div>

      {/* Material Details */}
      <div className="qf-section">
        <div className="qf-section-header"><h2 className="qf-section-title">Material Details <span className="qf-req">*</span></h2></div>
        <div className="qf-field">
          <label className="qf-field-label">Material Type <span className="qf-req">*</span></label>
          <select className={`qf-select ${errors.materialType?'has-error':''}`} value={formData.materialType} onChange={e=>updateField('materialType',e.target.value)}>
            <option value="" disabled>e.g., Cotton</option>
            {MATERIAL_TYPES.map(m=> <option key={m} value={m}>{m}</option>)}
          </select>
          <FieldError message={errors.materialType} />
        </div>
        <div className="qf-field">
          <label className="qf-field-label">Weight and Thickness (optional)</label>
          <textarea className="qf-textarea" placeholder="e.g., 180 GSM, Medium weight" value={formData.weightThickness||''} onChange={e=>updateField('weightThickness',e.target.value)} rows={2} />
        </div>
      </div>

      {/* Quantity & Color */}
      <div className="qf-section">
        <div className="qf-section-header"><h2 className="qf-section-title">Quantity &amp; Color <span className="qf-req">*</span></h2></div>
        <div className="qf-field">
          <label className="qf-field-label">Quantity <span className="qf-req">*</span></label>
          <div className="qf-qty-row">
            <input className={`qf-qty-inp ${errors.quantity?'has-error':''}`} type="number" min="1" placeholder="MOQ ~30" value={formData.quantity} onChange={e=>updateField('quantity',e.target.value)} />
            <select className="qf-qty-unit" value={formData.quantityUnit} onChange={e=>updateField('quantityUnit',e.target.value)}>
              <option value="pieces">pieces</option>
              <option value="meters">meters</option>
              <option value="yards">yards</option>
              <option value="kg">kg</option>
              <option value="sets">sets</option>
            </select>
          </div>
          <FieldError message={errors.quantity} />
        </div>
        <div className={`qf-chk-row ${formData.flexibleQuantity?'checked':''}`} onClick={()=>updateField('flexibleQuantity',!formData.flexibleQuantity)} role="checkbox" aria-checked={formData.flexibleQuantity} tabIndex={0} onKeyDown={e=>e.key==='Enter' && updateField('flexibleQuantity',!formData.flexibleQuantity)}>
          <div className={`qf-chk-box ${formData.flexibleQuantity?'checked':''}`}>{formData.flexibleQuantity && <span className="qf-chk-mark">✓</span>}</div>
          <span className="qf-chk-lbl">I'm flexible with quantity (±10%)</span>
        </div>
        <div className="qf-field">
          <label className="qf-field-label">Color Requirements</label>
          <select className={`qf-select ${errors.colorRequirements?'has-error':''}`} value={formData.colorRequirements} onChange={e=>updateField('colorRequirements',e.target.value)}>
            <option value="" disabled>e.g., Navy Blue, White, Grey</option>
            {COLOR_OPTIONS.map(c=> <option key={c} value={c}>{c}</option>)}
          </select>
          <FieldError message={errors.colorRequirements} />
        </div>
      </div>

      {/* Continue Button */}
      <button type="button" className="nxt" onClick={handleNext}>Continue <img src={arw} alt="" /></button>
    </div>
  );
}