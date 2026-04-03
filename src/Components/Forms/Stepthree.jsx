import './QuoteForm.css';

// ─── Constants ──────────────────────────────────────────────────────────────

const EGYPT_GOVERNORATES = [
  '', 'Cairo', 'Giza', 'Alexandria', 'Aswan', 'Asyut', 'Beheira',
  'Beni Suef', 'Dakahlia', 'Damietta', 'Faiyum', 'Gharbia', 'Ismailia',
  'Kafr el-Sheikh', 'Luxor', 'Matruh', 'Minya', 'Monufia', 'New Valley',
  'North Sinai', 'Port Said', 'Qalyubia', 'Qena', 'Red Sea',
  'Sharqia', 'Sohag', 'South Sinai', 'Suez',
];

const CITIES_BY_GOV = {
  Cairo: ['Maadi', 'Zamalek', 'Heliopolis', 'Nasr City', 'New Cairo', 'Mokattam', 'Downtown', 'Shubra'],
  Giza: ['6th of October', 'Sheikh Zayed', 'Dokki', 'Mohandessin', 'Haram', 'Imbaba'],
  Alexandria: ['Smouha', 'Gleem', 'Sidi Gaber', 'Miami', 'Agami', 'Mandara'],
};

function getCities(gov) {
  return CITIES_BY_GOV[gov] || ['City Center', 'Industrial Zone', 'New District', 'Port Area'];
}

const PAYMENT_OPTIONS = [
  { value: '50_50', label: '50% Advance, 50% on Delivery' },
  { value: '30_70', label: '30% Advance, 70% on Delivery' },
  { value: '100_delivery', label: '100% on Delivery' },
  { value: 'installments', label: 'Installments (3 payments)' },
  { value: 'negotiable', label: 'Negotiable' },
];

// ─── Sub-components ──────────────────────────────────────────────────────────

function FieldError({ message }) {
  if (!message) return null;
  return <p className="qf-field-error">⚠ {message}</p>;
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

// ─── StepThree ───────────────────────────────────────────────────────────────

export default function StepThree({ formData, updateField, errors }) {
  const cities = formData.governorate ? getCities(formData.governorate) : [];

  const handleGovChange = gov => {
    updateField('governorate', gov);
    updateField('city', '');
  };

  return (
    <div className="qf-step-content">

      {/* ── Delivery Location ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">Delivery Location</h2>
        </div>

        {/* Governorate */}
        <div className="qf-field">
          <label className="qf-field-label">
            Governorate <span className="qf-req">*</span>
          </label>
          <select
            className={`qf-select ${errors.governorate ? 'has-error' : ''}`}
            value={formData.governorate || ''}
            onChange={e => handleGovChange(e.target.value)}
          >
            <option value="" disabled>Select governorate</option>
            {EGYPT_GOVERNORATES.filter(Boolean).map(g => (
              <option key={g} value={g}>{g}</option>
            ))}
          </select>
          <FieldError message={errors.governorate} />
        </div>

        {/* City */}
        <div className="qf-field">
          <label className="qf-field-label">
            City <span className="qf-req">*</span>
          </label>
          <select
            className={`qf-select ${errors.city ? 'has-error' : ''}`}
            value={formData.city || ''}
            onChange={e => updateField('city', e.target.value)}
            disabled={!formData.governorate}
          >
            <option value="" disabled>Select city</option>
            {cities.map(c => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
          <FieldError message={errors.city} />
        </div>

        {/* District / Area */}
        <div className="qf-field">
          <label className="qf-field-label">District/Area (Optional)</label>
          <input
            className="qf-input"
            type="text"
            placeholder="e.g., Zamalek District"
            value={formData.districtArea || ''}
            onChange={e => updateField('districtArea', e.target.value)}
          />
        </div>
      </div>

      {/* ── Delivery Timeline ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">
            Delivery Timeline <span className="qf-req">*</span>
          </h2>
        </div>

        <div className="qf-radio-stack">
          <RadioOption
            value="standard"
            selected={formData.deliveryTimeline === 'standard'}
            onChange={v => updateField('deliveryTimeline', v)}
            label="Standard (30-45 days)"
            description="Faster delivery, may cost more"
          />
          <RadioOption
            value="express"
            selected={formData.deliveryTimeline === 'express'}
            onChange={v => updateField('deliveryTimeline', v)}
            label="Express (15-25 days)"
            description="Faster delivery, may cost more"
          />
          <RadioOption
            value="flexible"
            selected={formData.deliveryTimeline === 'flexible'}
            onChange={v => updateField('deliveryTimeline', v)}
            label="Flexible"
            description="I can work with supplier's timeline"
          />
        </div>
        <FieldError message={errors.deliveryTimeline} />

        {/* Required By Date */}
        <div className="qf-field" style={{ marginTop: '4px' }}>
          <label className="qf-field-label">Required By Date (Optional)</label>
          <div style={{ position: 'relative' }}>
            <input
              className="qf-date-inp"
              type="date"
              value={formData.requiredByDate || ''}
              onChange={e => updateField('requiredByDate', e.target.value)}
              min={new Date().toISOString().split('T')[0]}
            />
          </div>
          <p className="qf-helper-note">Helps suppliers prioritize your order</p>
        </div>
      </div>

      {/* ── Budget Range ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">
            Budget Range <span className="qf-req">*</span>
          </h2>
          <p className="qf-section-subtitle">Optional, but helps suppliers tailor their quotes</p>
        </div>

        <div className="qf-budget-row">
          <input
            className="qf-input"
            type="number"
            min="0"
            placeholder="Min e.g. 10000 EGP"
            value={formData.budgetMin || ''}
            onChange={e => updateField('budgetMin', e.target.value)}
          />
          <input
            className="qf-input"
            type="number"
            min="0"
            placeholder="Max e.g. 50000 EGP"
            value={formData.budgetMax || ''}
            onChange={e => updateField('budgetMax', e.target.value)}
          />
        </div>

        {/* Hide budget toggle */}
        <div
          className="qf-toggle-row"
          onClick={() => updateField('hideBudget', !formData.hideBudget)}
          role="switch"
          aria-checked={!!formData.hideBudget}
          tabIndex={0}
          onKeyDown={e => e.key === 'Enter' && updateField('hideBudget', !formData.hideBudget)}
        >
          <div className={`qf-toggle-sw ${formData.hideBudget ? 'on' : ''}`}>
            <div className="qf-toggle-knob" />
          </div>
          <span className="qf-toggle-txt">Hide budget from Suppliers/Manufacturers</span>
        </div>

        <p className="qf-helper-note">Helps suppliers prioritize your order</p>
      </div>

      {/* ── Preferred Payment Terms ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">
            Preferred Payment Terms <span className="qf-req">*</span>
          </h2>
        </div>

        <div className="qf-radio-stack">
          {PAYMENT_OPTIONS.map(opt => (
            <RadioOption
              key={opt.value}
              value={opt.value}
              selected={formData.paymentTerms === opt.value}
              onChange={v => updateField('paymentTerms', v)}
              label={opt.label}
            />
          ))}
        </div>
        <FieldError message={errors.paymentTerms} />
      </div>

      {/* ── Additional Notes ── */}
      <div className="qf-section">
        <div className="qf-section-header">
          <h2 className="qf-section-title">Additional Notes</h2>
        </div>

        <textarea
          className="qf-textarea"
          placeholder="Any other requirements or special instructions..."
          value={formData.additionalNotes || ''}
          onChange={e => updateField('additionalNotes', e.target.value)}
          rows={4}
        />
      </div>

    </div>
  );
}