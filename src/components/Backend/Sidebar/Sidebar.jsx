import React, {useState} from 'react'
import {Link, useLocation} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import { faBars, faCalendarDays, faClapperboard, faDashboard, faPanorama, faPowerOff, faTv, faUsers } from '@fortawesome/free-solid-svg-icons'
import "./sidebar.css"
import CXLogo from '../../../assets/logo/CXLogo.png'

function Sidebar() {
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  return (
    <div className={`sidebar ${isOpen ? "active" : null}`}>
        <header className="sidebar-header">
          <img src={CXLogo} className='sidebar-logo' alt="CineX" />
          <button className="sidebar-xtnd" type="button" onClick={()=>setIsOpen(!isOpen)}>
            <FontAwesomeIcon className='text-white' icon={faBars}/>
          </button>
        </header>
        <nav className="sidebar-elements text-white">
          <Link to="/admin" className={`sidebar-items ${location.pathname === "/admin" ? "active" : null}`}>
              <FontAwesomeIcon icon={faDashboard} className='text-lg'/>
              <p className='font-poppins'>Dashboard</p>
          </Link>
          <Link to="/admin/customers" className={`sidebar-items ${location.pathname === "/admin/customers" ? "active" : null}`}>
              <FontAwesomeIcon icon={faUsers} className='text-lg'/>
              <p className='font-poppins'>Customers</p>
          </Link>
          <Link to="/admin/movies"
            className={`sidebar-items ${location.pathname.includes("/admin/movies") ? "active" : ""}`}>
              <FontAwesomeIcon icon={faClapperboard} className='text-lg'/>
              <p className='font-poppins'>Movies</p>
          </Link>
          <Link to="/admin/screens" className={`sidebar-items ${location.pathname === "/admin/screens" ? "active" : null}`}>
              <FontAwesomeIcon icon={faTv} className='text-lg'/>
              <p className='font-poppins'>Screens</p>
          </Link>
          <Link to="/admin/banners" className={`sidebar-items ${location.pathname === "/admin/banners" ? "active" : null}`}>
              <FontAwesomeIcon icon={faPanorama} className='text-lg'/>
              <p className='font-poppins'>Banners</p>
          </Link>
          <Link to="/admin/shows" className={`sidebar-items ${location.pathname === "/admin/shows" ? "active" : null}`}>
              <FontAwesomeIcon icon={faCalendarDays} className='text-lg'/>
              <p className='font-poppins'>Showtimes</p>
          </Link>
          <Link className="sidebar-items">
              <FontAwesomeIcon icon={faPowerOff} className='text-lg text-red-600'/>
              <p className='font-poppins text-red-600'>Logout</p>
          </Link>
        </nav>
    </div>
  )
}

export default Sidebar
