import React from 'react';
import './Cap.css';

const ProductionCapacity = () => {
  const data = [
    {
      label: 'Lead Time',
      value: '3-4 weeks',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"/><polyline points="12 6 12 12 16 14"/>
        </svg>
      ),
    },
    {
      label: 'MOQ',
      value: '200 pieces',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M20.38 3.46L16 2a4 4 0 0 1-8 0L3.62 3.46a2 2 0 0 0-1.34 2.23l.58 3.47a1 1 0 0 0 .99.84H6v10c0 1.1.9 2 2 2h8a2 2 0 0 0 2-2V10h2.15a1 1 0 0 0 .99-.84l.58-3.47a2 2 0 0 0-1.34-2.23z"/>
        </svg>
      ),
    },
    {
      label: 'Team size',
      value: '97 employees',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M17 21v-2a4 4 0 0 0-4-4H5a4 4 0 0 0-4 4v2"/><circle cx="9" cy="7" r="4"/><path d="M23 21v-2a4 4 0 0 0-3-3.87"/><path d="M16 3.13a4 4 0 0 1 0 7.75"/>
        </svg>
      ),
    },
    {
      label: 'Capacity',
      value: '50,000 pcs/mo',
      icon: (
        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <rect x="3" y="3" width="18" height="18" rx="2" ry="2"/><line x1="3" y1="12" x2="21" y2="12"/>
        </svg>
      ),
    },
  ];

  return (
    <div className="production-container">
      <h2 className="production-header">Production Capacity</h2>
      
      <div className="production-grid">
        {data.map((item, index) => (
          <div key={index} className="stat-card">
            <div className="label-row">
              <span className="icon-wrapper">{item.icon}</span>
              <span>{item.label}</span>
            </div>
            <div className="value-text">
              {item.value}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ProductionCapacity;