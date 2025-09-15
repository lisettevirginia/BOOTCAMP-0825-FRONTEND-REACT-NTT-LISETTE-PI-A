import React from 'react';
import './Pagination.css';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
  onNextPage: () => void;
  onPrevPage: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  onPageChange,
  onNextPage,
  onPrevPage
}) => {
  if (totalPages <= 1) return null;

  return (
    <div className="pagination">
      <button
        onClick={onPrevPage}
        disabled={currentPage === 1}
        className="pagination-button"
      >
        ← Anterior
      </button>

      <div className="page-numbers">
        {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
          <button
            key={page}
            onClick={() => onPageChange(page)}
            className={currentPage === page ? 'active' : ''}
          >
            {page}
          </button>
        ))}
      </div>

      <button
        onClick={onNextPage}
        disabled={currentPage === totalPages}
        className="pagination-button"
      >
        Siguiente →
      </button>
    </div>
  );
};

export default Pagination;