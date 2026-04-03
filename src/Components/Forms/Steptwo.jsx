import { useState } from 'react';
import './QuoteForm.css';
import arw from "../../Assets/arrow_forward.svg";
import alert from "../../Assets/error.svg";
// ─── Constants ──────────────────────────────────────────────────────────────

const DEFAULT_SIZES = [
  { id: 'small', label: 'Small' },
  { id: 'medium', label: 'Medium' },
  { id: 'large', label: 'Large' },
];

const SIZE_RANGES = [
  'XS / S / M / L / XL',
  'S / M / L / XL / XXL',
  'EU 36-44',
  'US 4-16',
  'One Size',
  'Custom Range',
];

const CERTIFICATIONS = [
  { id: 'oekotex', label: 'OEKO-TEX Certified' },
  { id: 'gots', label: 'GOTS Organic' },
  { id: 'fairTrade', label: 'Fair Trade' },
  { id: 'iso', label: 'ISO Certified' },
];

const CUSTOMIZATION_OPTIONS = [
  { id: 'customLabels', label: 'Custom Labels' },
  { id: 'customPackaging', label: 'Custom Packaging' },
  { id: 'customTags', label: 'Custom Tags' },
  { id: 'embroidery', label: 'Embroidery/Printing' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null;
  return <p className="qf-field-error">⚠ {message}</p>;
}

function CheckboxRow({ checked, onChange, label, description, children }) {
  return (
    <div
      className={`qf-chk-row ${checked ? 'checked' : ''}`}
      onClick={onChange}
      role="checkbox"
      aria-checked={checked}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onChange()}
    >
      <div className={`qf-chk-box ${checked ? 'checked' : ''}`}>
        {checked && <span className="qf-chk-mark">✓</span>}
      </div>
      <div style={{ flex: 1 }}>
        <p className="qf-chk-lbl">{label}</p>
        {description && <p className="qf-chk-desc">{description}</p>}
        {children}
      </div>
    </div>
  );
}

function RadioOption({ value, selected, onChange, label, description }) {
  return (
    <div
      className={`qf-radio-opt ${selected ? 'selected' : ''}`}
      onClick={() => onChange(value)}
      role="radio"
      aria-checked={selected}
      tabIndex={0}
      onKeyDown={e => e.key === 'Enter' && onChange(value)}
    >
      <div className={`qf-radio-circle ${selected ? 'selected' : ''}`}>
        {selected && <div className="qf-radio-dot" />}
      </div>
      <div>
        <p className="qf-radio-label">{label}</p>
        {description && <p className="qf-radio-desc">{description}</p>}
      </div>
    </div>
  );
}

// ─── StepTwo ─────────────────────────────────────────────────────────────────

export default function StepTwo({ formData, updateField, onNext }) {
  const [newCustomSize, setNewCustomSize] = useState('');
  const [newCustomNeed, setNewCustomNeed] = useState('');
  const [showCustomNeedInput, setShowCustomNeedInput] = useState(false);
  const [errors, setErrors] = useState({});

  const sizes = formData.sizes || { small: false, medium: false, large: false };
  const sizeQuantities = formData.sizeQuantities || { small: '100', medium: '100', large: '100' };
  const customSizes = formData.customSizes || [];
  const certifications = formData.certifications || {};
  const customizationNeeds = formData.customizationNeeds || {};
  const customNeeds = formData.customNeeds || [];
  const additionalSpecsLen = (formData.additionalSpecs || '').length;

  /* ── helpers ── */
  const toggleSize = id => updateField('sizes', { ...sizes, [id]: !sizes[id] });
  const updateSizeQty = (id, val) => updateField('sizeQuantities', { ...sizeQuantities, [id]: val });
  const addCustomSize = () => {
    if (!newCustomSize.trim()) return;
    updateField('customSizes', [...customSizes, { label: newCustomSize.trim(), qty: '100', unit: 'pieces' }]);
    setNewCustomSize('');
  };
  const removeCustomSize = idx => {
    const updated = [...customSizes];
    updated.splice(idx, 1);
    updateField('customSizes', updated);
  };
  const updateCustomSizeQty = (idx, qty) => {
    const updated = [...customSizes];
    updated[idx] = { ...updated[idx], qty };
    updateField('customSizes', updated);
  };
  const toggleCert = id => updateField('certifications', { ...certifications, [id]: !certifications[id] });
  const toggleCustomization = id => updateField('customizationNeeds', { ...customizationNeeds, [id]: !customizationNeeds[id] });
  const addCustomNeed = () => {
    if (!newCustomNeed.trim()) return;
    updateField('customNeeds', [...customNeeds, newCustomNeed.trim()]);
    setNewCustomNeed('');
    setShowCustomNeedInput(false);
  };
  const removeCustomNeed = idx => {
    const updated = [...customNeeds];
    updated.splice(idx, 1);
    updateField('customNeeds', updated);
  };

  /* ── VALIDATION ── */
  const validateStep = () => {
    const newErrors = {};
    if (!formData.sizeRange) newErrors.sizes = "Please select a size range";
    if (!formData.qualityStandard) newErrors.qualityStandard = "Please select a quality standard";
    if (!Object.values(sizes).some(v => v) && customSizes.length === 0)
      newErrors.sizes = "Select at least one default or custom size";
    if (!formData.additionalSpecs) newErrors.additionalSpecs = "Please provide additional specifications";
    if (!Object.values(customizationNeeds).some(v => v) && customNeeds.length === 0)
      newErrors.customizationNeeds = "Select at least one customization need";

    return newErrors;
  };

  const handleNext = () => {
    const validationErrors = validateStep();
    setErrors(validationErrors);
    if (Object.keys(validationErrors).length === 0) {
      onNext?.();
    }
  };

  return (
    <div className="qf-step-content">

      {/* ── Info Banner ── */}
      <div className="qf-info-banner">
        <span className="qf-info-icon"><img src={alert}alt="" /></span>
        <p className="qf-info-text">
          More details help suppliers provide accurate quotes. Skip any section if not applicable.
        </p>
      </div>

      {/* ── Size / Dimensions ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">
            Size / Dimensions <span className="qf-req">*</span>
          </h2>
        </div>

        <div className="qf-field">
          <select
            className="qf-select"
            value={formData.sizeRange || ''}
            onChange={e => updateField('sizeRange', e.target.value)}
          >
            <option value="" disabled>Select a size range</option>
            {SIZE_RANGES.map(r => (
              <option key={r} value={r}>{r}</option>
            ))}
          </select>
        </div>

        <div className="qf-size-rows">
          {DEFAULT_SIZES.map(sz => (
            <div key={sz.id} className={`qf-size-row ${sizes[sz.id] ? 'active' : ''}`}>
              <div
                className={`qf-chk-box ${sizes[sz.id] ? 'checked' : ''}`}
                style={{ cursor: 'pointer', flexShrink: 0 }}
                onClick={() => toggleSize(sz.id)}
                role="checkbox"
                aria-checked={sizes[sz.id]}
                tabIndex={0}
                onKeyDown={e => e.key === 'Enter' && toggleSize(sz.id)}
              >
                {sizes[sz.id] && <span className="qf-chk-mark">✓</span>}
              </div>
              <span className="qf-size-lbl" onClick={() => toggleSize(sz.id)}>{sz.label}</span>
              <span className="qf-size-pieces">pieces</span>
              <input
                className="qf-size-count"
                type="number"
                min="1"
                value={sizeQuantities[sz.id]}
                onChange={e => updateSizeQty(sz.id, e.target.value)}
                disabled={!sizes[sz.id]}
                style={{ opacity: sizes[sz.id] ? 1 : 0.4 }}
              />
              <select
                className="qf-size-unit"
                value={sizeQuantities[`${sz.id}_unit`] || 'pieces'}
                onChange={e => updateField('sizeQuantities', {
                  ...sizeQuantities,
                  [`${sz.id}_unit`]: e.target.value,
                })}
                disabled={!sizes[sz.id]}
                style={{ opacity: sizes[sz.id] ? 1 : 0.4 }}
              >
                <option value="pieces">pieces</option>
                <option value="meters">meters</option>
                <option value="yards">yards</option>
              </select>
            </div>
          ))}

          {customSizes.map((cs, i) => (
            <div key={i} className="qf-size-row active">
              <div className="qf-chk-box checked" style={{ flexShrink: 0 }}>
                <span className="qf-chk-mark">✓</span>
              </div>
              <span className="qf-size-lbl">{cs.label}</span>
              <span className="qf-size-pieces">pieces</span>
              <input
                className="qf-size-count"
                type="number"
                min="1"
                value={cs.qty}
                onChange={e => updateCustomSizeQty(i, e.target.value)}
              />
              <button
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--t2)', fontSize: '14px', padding: '2px 4px',
                  fontFamily: 'var(--f)',
                }}
                onClick={() => removeCustomSize(i)}
                aria-label="Remove size"
              >
                ✕
              </button>
            </div>
          ))}
        </div>

        <div className="qf-custom-size-row">
          <input
            className="qf-custom-size-inp"
            type="text"
            placeholder="e.g., XL, EU 42, Custom 30×40cm"
            value={newCustomSize}
            onChange={e => setNewCustomSize(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && addCustomSize()}
          />
          <button className="qf-custom-size-del" onClick={addCustomSize} aria-label="Add size"
            style={{ color: 'var(--ac)', borderColor: 'rgba(237,254,142,0.3)' }}>
            +
          </button>
        </div>
        <button className="qf-add-btn" style={{ marginTop: '6px' }} onClick={addCustomSize}>
          + Add a custom Size
        </button>

        <FieldError message={errors.sizes} />
      </div>

      {/* ── Quality Standards ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">
            Select your Quality Standards <span className="qf-req">*</span>
          </h2>
        </div>

        <div className="qf-radio-stack">
          <RadioOption
            value="standard"
            selected={formData.qualityStandard === 'standard'}
            onChange={v => updateField('qualityStandard', v)}
            label="Standard Quality"
            description="Good for everyday use"
          />
          <RadioOption
            value="premium"
            selected={formData.qualityStandard === 'premium'}
            onChange={v => updateField('qualityStandard', v)}
            label="Premium Quality"
            description="High-end materials and finishing"
          />
          <RadioOption
            value="luxury"
            selected={formData.qualityStandard === 'luxury'}
            onChange={v => updateField('qualityStandard', v)}
            label="Luxury Quality"
            description="Top-tier materials, certified"
          />
        </div>
        <FieldError message={errors.qualityStandard} />
      </div>

      {/* ── Certifications ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">Select Required Certifications (Optional)</h2>
        </div>

        <div className="qf-chk-stack">
          {CERTIFICATIONS.map(cert => (
            <div
              key={cert.id}
              className={`qf-radio-opt ${certifications[cert.id] ? 'selected' : ''}`}
              onClick={() => toggleCert(cert.id)}
              role="checkbox"
              aria-checked={!!certifications[cert.id]}
              tabIndex={0}
              onKeyDown={e => e.key === 'Enter' && toggleCert(cert.id)}
            >
              <div className={`qf-radio-circle ${certifications[cert.id] ? 'selected' : ''}`}>
                {certifications[cert.id] && <div className="qf-radio-dot" />}
              </div>
              <p className="qf-radio-label">{cert.label}</p>
            </div>
          ))}
        </div>
      </div>

      {/* ── Additional Specifications ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">
            Additional Specifications <span className="qf-req">*</span>
          </h2>
          <p className="qf-section-subtitle">Any other technical requirements</p>
        </div>

        <div className="qf-field">
          <textarea
            className="qf-textarea"
            placeholder="e.g., specific GSM, thread count, finishing details..."
            value={formData.additionalSpecs || ''}
            onChange={e => {
              if (e.target.value.length <= 900) updateField('additionalSpecs', e.target.value);
            }}
            rows={4}
          />
          <p className="qf-char-count">{additionalSpecsLen}/900 character</p>
          <FieldError message={errors.additionalSpecs} />
        </div>

        <CheckboxRow
          checked={!!formData.requestSample}
          onChange={() => updateField('requestSample', !formData.requestSample)}
          label="Request Sample First"
          description="Ask suppliers to send samples before bulk order"
        />
      </div>

      {/* ── Customization Needs ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">
            Customization Needs <span className="qf-req">*</span>
          </h2>
        </div>

        <div className="qf-chk-stack">
          {CUSTOMIZATION_OPTIONS.map(opt => (
            <CheckboxRow
              key={opt.id}
              checked={!!customizationNeeds[opt.id]}
              onChange={() => toggleCustomization(opt.id)}
              label={opt.label}
            />
          ))}

          {customNeeds.map((need, i) => (
            <div key={i} className="qf-chk-row checked"
              style={{ justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <div className="qf-chk-box checked">
                  <span className="qf-chk-mark">✓</span>
                </div>
                <span className="qf-chk-lbl">{need}</span>
              </div>
              <button
                style={{
                  background: 'none', border: 'none', cursor: 'pointer',
                  color: 'var(--t2)', fontSize: '13px', padding: '2px 4px',
                  fontFamily: 'var(--f)',
                }}
                onClick={() => removeCustomNeed(i)}
                aria-label="Remove"
              >✕</button>
            </div>
          ))}
        </div>

        {showCustomNeedInput ? (
          <div className="qf-custom-need-row">
            <input
              className="qf-custom-need-inp"
              type="text"
              placeholder="e.g., Eco-friendly dyes"
              value={newCustomNeed}
              onChange={e => setNewCustomNeed(e.target.value)}
              onKeyDown={e => {
                if (e.key === 'Enter') addCustomNeed();
                if (e.key === 'Escape') setShowCustomNeedInput(false);
              }}
              autoFocus
            />
            <button
              style={{
                background: 'var(--ac)', border: 'none', borderRadius: '7px',
                padding: '9px 12px', cursor: 'pointer', color: '#000',
                fontFamily: 'var(--f)', fontSize: '11px', fontWeight: '700',
                flexShrink: 0,
              }}
              onClick={addCustomNeed}
            >Add</button>
          </div>
        ) : (
          <button className="qf-add-btn" onClick={() => setShowCustomNeedInput(true)}>
            + Add a custom need
          </button>
        )}

        <FieldError message={errors.customizationNeeds} />
      </div>

      {/* ── Continue Button ── */}
      <button
        type="button"
        className="nxt"
        onClick={handleNext}
      >
        Continue <img src={arw} alt="" />
      </button>
    </div>
  );
}