import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import Select from 'react-select'
import AuthContext from '../../../contexts/AuthContext'
import axiosInstance from '../../../services/axios'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faClose, faCloudArrowUp} from '@fortawesome/free-solid-svg-icons'
import Panel from '../../../components/Backend/Panel/Panel'
import "./banners.css"

function AddBanner() {
    const {authTokens, UserLogout, setLoading} = useContext(AuthContext);
    const navigate = useNavigate();
    const [movies, setMovies] = useState([]);
    const [formData, setFormData] = useState({
        movie : null,
        banner: null
    })
    const [releasedMovies, setReleasedMovies] = useState([]);
    const [error, setError] = useState("");
    useEffect(()=>{
      setLoading(true);
      axiosInstance.get("admin/movies", {
          headers: {
              'Authorization': `Bearer ${authTokens.access}`
          }
      }).then((response)=>{
          setMovies(response.data);
      }).catch((error)=>{
          if (error.response.status === 401){
              UserLogout();
          }
      })
      setLoading(false);
    }, [])
    useEffect(()=>{
        const filteredMovies = movies.filter(movie => movie.status === "Released");
        setReleasedMovies(filteredMovies);
    }, [movies])
    const options = releasedMovies.map(movie => ({
        label: movie.title,
        value: movie.id,
    }));
    const handleSelectChange = (value) => {
        const selectedValue = value.map(option => option.value);
        const id = selectedValue[0];
        console.log(id);
        setFormData({...formData, movie: id});
    }
    const handleBannerChange = (e) => {
        const file = e.target.files[0];
        setFormData((prevFromData) => ({...prevFromData, banner: file}));
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        console.log(formData);
        setLoading(true);
        axiosInstance.post("admin/banners", formData, {
            headers: {
                "Authorization" : `Bearer ${authTokens.access}`,
                'Content-Type': 'multipart/form-data',
            }
        }).then((response)=>{
            if (response.status === 201){
                navigate("/admin/banners")
            }else{
                setError("Something went Wrong. Try Again!");
            }
        }).catch((error)=>{
            setError("Something went Wrong. Try Again!");
            if (error.response.status === 401){
                UserLogout();
            }
        })
        setLoading(false);
    }
    return (
        <Panel>
            <h1 className='text-xl font-poppins'>Add Banners</h1>
            <span className='font-poppins text-xs'>Enter Banner Details<i className='text-green-400'>*</i></span>

            {error &&
                <div className='relative top-3 flex justify-center'>
                <p className="font-poppins mt-3 text-sm bg-red-600 text-white text-center w-full md:w-1/2 py-1 md:py-2 md:px-6">
                    {error}
                    <button className='float-right font-sans text-gray-200' onClick={()=>setError("")}>
                    X
                    </button>
                </p>
            </div>}

            <div className='my-10 md:mx-5 bAdd_wrapper'>
                <form onSubmit={handleFormSubmit} encType="multipart/form-data">
                    <div className='w-full md:w-1/3 mb-5'>
                        <label className="block pb-1">Movie<span className="text-red-600 text-sm">*</span></label>
                        <Select 
                            name='movie'
                            options={options} 
                            placeholder="Select Movie"
                            isSearchable={true}
                            isOptionDisabled={() => formData.movie != null}
                            onChange={handleSelectChange}
                            isMulti
                        />
                    </div>

                    {formData.banner != null ?
                        <div className="bannerPreview m-1">
                        <img src={URL.createObjectURL(formData.banner)} alt={formData.banner.name} />
                        <button type='button' title='Remove' onClick={() => setFormData((prevFormData) => ({ ...prevFormData, banner: null }))}>
                        X
                        </button>
                    </div>
                    :
                    <div className="uploadOuter">
                        <label className="block pb-1">Banner<span className="text-red-600 text-sm">*</span></label>
                        <div className="dragBox shadow rounded">
                        <input type="file" accept='image/*' id="uploadFile" name="banner" onChange={handleBannerChange} />
                        <div className='flex justify-center gap-3 flex-col items-center h-full'>
                            <FontAwesomeIcon className='text-4xl md:text-5xl' icon={faCloudArrowUp}/>
                            <span className='text-xs md:text-sm'>Choose a file or Drag it here</span>
                        </div>
                        </div>
                    </div>}
                    
                    <div className="relative">
                        <button type='submit' className='py-1 px-3 w-full md:w-auto absolute right-0 bg-green-600 text-white my-2'>
                            Save
                        </button>
                    </div>
                </form>
            </div>
        </Panel>
    )
}

export default AddBanner
