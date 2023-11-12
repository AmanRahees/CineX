import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import axiosInstance from '../../../services/axios'
import {apiUrl} from '../../../services/api'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight, faClose} from '@fortawesome/free-solid-svg-icons'
import "./banners.css"
import Panel from '../../../components/Backend/Panel/Panel'
import Modal from '../../../components/Backend/Modal/Modal'

function Banners() {
  const {authTokens, UserLogout, setLoading} = useContext(AuthContext);
  const navigate = useNavigate();
  const [banners, setBanners] = useState([]);
  const [bannerId, setBannerId] = useState();
  const [deleteDv, setDeleteDv] = useState(false);
  useEffect(()=>{
    setLoading(true);
    axiosInstance.get("admin/banners", {
        headers: {
            'Authorization': `Bearer ${authTokens.access}`
        }
    }).then((response)=>{
        setBanners(response.data);
    }).catch((error)=>{
        if (error.response.status === 401){
            UserLogout();
        }
    })
    setLoading(false);
  }, [])
  const bannerDeleteHandler = () => {
    setLoading(true)
    axiosInstance.delete(`admin/banner/${bannerId}`, {
        headers:{
            'Authorization': `Bearer ${authTokens.access}`
        }
    }).then((response)=>{
        setBanners(prevBanners => prevBanners.filter(banner => banner.id != bannerId));
        console.log(response);
    }).catch((error)=>{
        console.log(error);
        if (error.response.status === 401){
            UserLogout();
        }
    })
    setLoading(false);
    setDeleteDv(false);
  }
  const deleteDvHandler = (id) => {
        setDeleteDv(!deleteDv);
        setBannerId(id);
    }
  return (
    <Panel>
        <button className='font-poppins create-btns' onClick={()=>navigate("/admin/banners/add")}>
            Add Banners <FontAwesomeIcon icon={faArrowRight}/>
        </button>
        <h1 className='text-xl font-poppins'>Banners</h1>
        <span className='font-poppins text-xs'>3 Banners<i className='text-green-400'>*</i></span>
        
        {banners.length >= 1 ?
        (<div className="bnr_wrapper">
            {banners.map((banner, index)=>(
            <div key={index} className="bnr_Dv" style={{backgroundImage:`url(${apiUrl + banner.banner})`}}>
                <button type='button' onClick={()=>deleteDvHandler(banner.id)} title='Remove'>
                  <FontAwesomeIcon icon={faClose} />
                </button>
                <div className="bnr_shade">
                    <h1>{banner.movie.title}</h1>
                    <div className="ovrVw">
                        <p>{banner.movie.overview}</p>
                    </div>
                </div>
            </div>))}
        </div>):
        <p className='text-center text-3xl text-red-600'>No Banners Found!</p>
        }

        {deleteDv &&
        <Modal>
            <h3 className='text-lg font-poppins md:text-lg py-2 ps-2'>Change Status</h3>
            <hr />
            <p className='p-2 md:pe-20 md:text-base text-sm'>Are you sure change customer status?</p>
            <hr />
            <button onClick={()=>bannerDeleteHandler()} className='px-3 py-1 bg-red-600 mt-2 float-right ms-3 text-sm md:text-base rounded-lg'>Yes</button>
            <button onClick={()=>setDeleteDv(!deleteDv)} className='px-3 py-1 bg-gray-600 mt-2 float-right text-sm md:text-base rounded-lg'>No</button>
        </Modal>}
    </Panel>
  )
}

export default Banners
