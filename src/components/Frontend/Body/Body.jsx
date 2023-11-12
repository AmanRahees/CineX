import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import Navbar from '../Navbar/Navbar'
import Footer from '../Footer/Footer';

function Body({children}) {
  const {user, UserLogout, setLoading} = useContext(AuthContext);
  return (
    <div className='main'>
        <Navbar user={user} UserLogout={UserLogout} />
        <div className='bdyComp'>
            {children}
        </div>
        <Footer/>
    </div>
  )
}

export default Body
