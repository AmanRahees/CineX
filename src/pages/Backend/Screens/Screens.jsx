import React from 'react'
import Panel from '../../../components/Backend/Panel/Panel'
import "./screen.css"

function Screens() {
  return (
    <Panel>
      <h1 className='text-xl font-poppins'>Screens</h1>
      <span className='font-poppins text-xs'>3 Screens<i className='text-green-400'>*</i></span>
    </Panel>
  )
}

export default Screens
