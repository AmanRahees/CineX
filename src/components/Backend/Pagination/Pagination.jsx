import React from 'react'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faAngleLeft, faAngleRight} from '@fortawesome/free-solid-svg-icons'

function Pagination({ data, itemsPerPage, currentPage, onPageChange }) {
  const startIndex = (currentPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const totalPages = Math.ceil((data.length)/itemsPerPage);
  if (data.length <= 0){
    return null
  }
  return (
    <div className="db-paginator">
        <p className='my-auto text-sm md:text-base'>Page {currentPage} of {totalPages}</p>
        <button onClick={() => onPageChange(currentPage - 1)} disabled={currentPage === 1}>
            <FontAwesomeIcon icon={faAngleLeft}/>
        </button>
        <button onClick={() => onPageChange(currentPage + 1)} disabled={endIndex >= data.length}>
            <FontAwesomeIcon icon={faAngleRight}/>
        </button>
    </div>
  )
}

export default Pagination;