import React from 'react'
import './panel.css'
import Sidebar from '../../../components/Backend/Sidebar/Sidebar'

function Panel({children}) {
  return (
    <div className='admin-panel'>
      <div className="mainDv">
          <Sidebar/>
          <div className="content-wrapper">
            <div className="contentDv">
              {children}
            </div>
          </div>
      </div>
    </div>
  )
}

export default Panel
