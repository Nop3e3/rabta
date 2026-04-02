import React from 'react';
import './Pagination.css';

const Pagination = () => {
  const pages = [1, 2, 3, '...', 7, 8, 9];
  const currentPage = 1;

  return (
    <div className="pagination-wrapper">
      {/* Previous Button */}
      <button className="nav-btn">
        <span className="chevron left"></span>
      </button>

      {/* Page Numbers Container */}
      <div className="numbers-container">
        {pages.map((page, index) => (
          <button 
            key={index} 
            className={`page-item ${page === currentPage ? 'active' : ''} ${page === '...' ? 'dots' : ''}`}
          >
            {page}
          </button>
        ))}
      </div>

      {/* Next Button */}
      <button className="nav-btn">
        <span className="chevron right"></span>
      </button>
    </div>
  );
};

export default Pagination;