import React from 'react';
import styles from './Pagination.module.scss';

const Pagination = ({ currentPage, totalPages, onChange }) => {
  const pageNumbers = [];

  for (let i = 1; i <= totalPages; i++) {
    pageNumbers.push(i);
  }

  const changePage = (page) => onChange(page);

  return (
    <div className={styles.pagination}>
      {pageNumbers.map((page) => (
        <p
          key={page}
          className={`${styles.pageNumber} ${
            page === currentPage ? styles.active : ''
          }`}
          onClick={() => changePage(page)}
        >
          {page}
        </p>
      ))}
    </div>
  );
};

export default Pagination;
