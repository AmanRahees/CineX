import React from 'react'
import {Link} from 'react-router-dom'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import AuthContext from '../../../contexts/AuthContext'
import axiosInstance from '../../../services/axios'
import './dashboard.css'
import Panel from '../../../components/Backend/Panel/Panel'
import { faSackDollar, faUsers, faPanorama, faClapperboard } from '@fortawesome/free-solid-svg-icons';

function Dashboard() {
  const currentDate = new Date();
  const months = [
    'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun',
    'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'
  ];
  const formattedDate = `${currentDate.getDate()} ${months[currentDate.getMonth()]}, ${currentDate.getFullYear()}`;
  return (
    <Panel>
      <h1 className='text-xl font-poppins'>Dashboard</h1>
      <span className='font-poppins text-xs'>{formattedDate}</span>
      
      <div className="card-wrapper">
        <Link className="data-card shadow-md shadow-gray-500">
            <h1 className="text-xl">
              Income <FontAwesomeIcon className='dc-Icon text-white bg-emerald-800 text-2xl' icon={faSackDollar}/>
            </h1>
            <h1 className='font-poppins mt-10 float-right font-semibold'>$39847</h1>
        </Link>
        <Link className="data-card shadow-md shadow-gray-500">
            <h1 className="text-xl">
              Customers <FontAwesomeIcon className='dc-Icon text-white bg-blue-950 text-2xl' icon={faUsers}/>
            </h1>
            <h1 className='font-poppins mt-10 float-right font-semibold'>58+</h1>
        </Link>
        <Link className="data-card shadow-md shadow-gray-500">
            <h1 className="text-xl">
              Screens <FontAwesomeIcon className='dc-Icon text-white bg-cyan-900 text-2xl' icon={faPanorama}/>
            </h1>
            <h1 className='font-poppins mt-10 float-right font-semibold'>3 screens</h1>
        </Link>
        <Link className="data-card shadow-md shadow-gray-500">
            <h1 className="text-lg">
              Movies Running <FontAwesomeIcon className='dc-Icon text-white bg-purple-950 text-2xl' icon={faClapperboard}/>
            </h1>
            <h1 className='font-poppins mt-10 float-right font-semibold'>3 movies</h1>
        </Link>
      </div>
    </Panel>
  )
}

export default Dashboard;