import React from 'react'
import "./modal.css"

function Modal({children}) {
  return (
    <div className='modal-container'>
        <div className="modal-overlay"></div>
        <div className="modalDv p-2 rounded-lg">
            {children}
        </div>
    </div>
  )
}

export default Modal
