import React from 'react'
import "./table.css"

function Table({children}) {
  return (
    <div className='Tbl-container'>
      <table className='DataTbl'>
        {children}
      </table>
    </div>
  )
}

export default Table
