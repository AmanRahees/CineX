import React, {useState, useEffect} from 'react'
import {Link} from 'react-router-dom'
import './navbar.css'
import CX from '../../../assets/logo/CXLogo.png'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faBars, faClose, faGear, faPowerOff} from '@fortawesome/free-solid-svg-icons'

function Navbar({user, UserLogout}) {
  const [showNavbar, setShowNavbar] = useState(false);
  const [optDv, setOptDv] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [logoutDv, setLogoutDv] = useState(false);
  const toggleoptDv = () =>{
    setOptDv((prevOptDv)=>!prevOptDv);
  }
  const toggleLogoutDv = () =>{
    setLogoutDv((prevLogoutDv)=>!prevLogoutDv);
  }

  const handleShowNavbar = () => {
    setShowNavbar(!showNavbar);
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 0) {
        setHasScrolled(true);
      } else {
        setHasScrolled(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  return (
    <div>
    <div className={`Navbar ${hasScrolled ? 'scrolled' : ''}`}>
       <div className="nav-container">
        <div className="nav-logo">
          <img src={CX} alt="CineX" />
        </div>
        <div className="menu-icon"  onClick={handleShowNavbar}>
            <FontAwesomeIcon icon={faBars}/>
        </div>
        <div className={`nav-elements text-sm ${showNavbar && 'active'}`}>
          <p onClick={handleShowNavbar} className='nav-close float-right p-3'>
            <FontAwesomeIcon icon={faClose}/>
          </p>
          <ul>
            <Link>
              <li className={`font-poppins ${window.location.pathname === "/" ? "active" : null}`}>
                Home
              </li>
            </Link>
            <Link>
              <li className={`font-poppins ${window.location.pathname === "/movie" ? "active" : null}`}>
                Movies
              </li>
            </Link>
            <Link>
              <li className={`font-poppins ${window.location.pathname === "/blogs" ? "active" : null}`}>
                Blogs
              </li>
            </Link>
            <Link>
            <li className={`font-poppins ${window.location.pathname === "/services" ? "active" : null}`}>
              Services
            </li>
            </Link>
            <li>
              {user ? 
              <div onMouseEnter={toggleoptDv} onMouseLeave={toggleoptDv} className="user-component my-auto">
                <img src="https://upload.wikimedia.org/wikipedia/commons/0/0b/Netflix-avatar.png" alt="" />
                {optDv &&
                <div onMouseEnter={()=>{setOptDv(true)}} className="comp-opts">
                  <ul>
                    <li className='font-poppins text-sm'><FontAwesomeIcon className='my-auto' icon={faGear}/> Settings</li>
                    <li className='text-red-600 font-poppins text-sm' onClick={toggleLogoutDv}>
                      <FontAwesomeIcon className='my-auto' icon={faPowerOff}/>  Logout
                    </li>
                  </ul>
                </div>}
              </div>
              :<Link to="/login" className='nav-login'>Login</Link>
              }
            </li>
          </ul>
        </div>
       </div>
    </div>
    {logoutDv &&
      <div>
        <div className="modal-overlay"></div>
      <div className="LogoutDv p-2 rounded-lg">
        <h3 className='text-2xl py-2 ps-2'>Logout</h3>
        <hr />
        <p className='p-2 md:pe-20'>Are you sure you want to Logout?</p>
        <hr />
        <button onClick={UserLogout} className='px-3 py-1 bg-red-600 mt-2 float-right ms-3 rounded-lg'>Yes</button>
        <button onClick={toggleLogoutDv} className='px-3 py-1 bg-gray-600 mt-2 float-right rounded-lg'>No</button>
        </div>
    </div>}
    </div>
  )
}

export default Navbar
