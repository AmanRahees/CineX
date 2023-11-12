import React, {useState, useEffect, useContext} from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import axiosInstance from '../../../services/axios'
import {apiUrl} from '../../../services/api'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCloudArrowUp } from '@fortawesome/free-solid-svg-icons'
import Panel from '../../../components/Backend/Panel/Panel'
import "./movies.css"
import axios from 'axios'

function EditMovie() {
  const {authTokens, UserLogout, setLoading} = useContext(AuthContext);
  const {id, movie} = useParams();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: "",
    overview: "",
    poster: null,
    genre: "",
    language: "English",
    runtime: "",
    ratings: 10,
    director: "",
    casts: "",
    status: "Upcoming",
    release_date: ""
  })
  const [apiPoster, setApiPoster] = useState(true);
  const [error, setError] = useState("");
  useEffect(()=>{
    setLoading(true);
    axiosInstance.get(`admin/movie/${id}`,{
      headers:{
        'Authorization': `Bearer ${authTokens.access}`,
      }
    }).then((response)=>{
      if (response.status === 200){
        const data = response.data;
        setFormData({
          title: data.title,
          overview: data.overview,
          poster: data.poster,
          genre: data.genre,
          language: data.language,
          runtime: data.runtime,
          ratings: data.ratings,
          director: data.director,
          casts: data.casts,
          status: data.status,
          release_date: data.release_date
        })
      }
    }).catch((error)=>{
      if (error.response.status === 401){
        UserLogout();
      }
    })
    setLoading(false);
  }, [])
  const handleInputChange = (e) => {
      const { name, value } = e.target;
      setFormData((prevFromData) => ({...prevFromData,[name]: value}));
  }
  const handleFormSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    axiosInstance.put(`admin/movie/${id}`, formData,{
      headers:{
        'Authorization': `Bearer ${authTokens.access}`,
        'Content-Type': 'multipart/form-data',
      }
    }).then((response)=>{
      if (response.status === 200){
        navigate("/admin/movies");
      }else{
        setError("Something went wrong. Try Again!");
      }
    }).catch((error)=>{
      console.log(error);
      setError("Something went wrong. Try Again!");
    })
    setLoading(false);
  }
  const handlePosterChange = (e) => {
    const name = e.target.name;
    const file = e.target.files[0];
    setFormData((prevFormData) => ({...prevFormData,[name]: file}));
  }
  const checkValue = (e) => {
      let { name, value } = e.target;
      if (value < 0) {
        value = 0;
      } else if (value > 10) {
        value = 10;
      }
      setFormData((prevFromData) => ({...prevFromData,[name]: value}));
  }
  const handlePosterRemove = () => {
    setFormData((prevFormData) => ({ ...prevFormData, poster: null }));
    setApiPoster(false);
  }
  return (
    <Panel>
        <h1 className='text-xl font-poppins'>Add Movies</h1>
        <span className='font-poppins text-xs'>Enter Movie Details<i className='text-green-400'>*</i></span>

        {error &&
        <div className='relative top-3 flex justify-center'>
          <p className="font-poppins mt-3 text-sm bg-red-600 text-white text-center w-full md:w-1/2 py-1 md:py-2 md:px-6">
            {error}
            <button className='float-right font-sans text-gray-200' onClick={()=>setError("")}>
              X
            </button>
          </p>
        </div>}

        <form onSubmit={handleFormSubmit} encType="multipart/form-data">
          <div className='mvAdd_wrap mt-5'>
            <div className="mvForm">

              <div className="p-1 w-full">
                <label className="block pb-1">Title<span className="text-red-600 text-sm">*</span></label>
                <input type="text" name='title' value={formData.title} onChange={handleInputChange}
                 className='w-full outline-none text-sm p-2 border border-gray-400 rounded shadow' />
              </div>

              <div className="p-1">
                <label className="block pb-1">Overview<span className="text-red-600 text-sm">*</span></label>
                 <textarea name="overview" rows="5" value={formData.overview} onChange={handleInputChange}
                 className='w-full outline-none text-sm p-2 border border-gray-400 rounded shadow'></textarea>
              </div>

              <div className="p-1 w-full">
                  <label className="block pb-1">Genres<span className="text-red-600 text-sm">*</span></label>
                  <input type="text" name='genre' value={formData.genre} onChange={handleInputChange}
                  className='w-full text-sm outline-none p-2 border border-gray-400 rounded shadow' />
              </div>

              <div className="p-1">
                <label className="block pb-1">Language<span className="text-red-600 text-sm">*</span></label>
                <select name="language" onChange={handleInputChange} value={formData.language} className='w-full md:w-1/2 outline-none text-sm p-2 border border-gray-400 rounded shadow'>
                  <option value="English">English</option>
                  <option value="Malayalam">Malayalam</option>
                  <option value="Tamil">Tamil</option>
                  <option value="Telungu">Telungu</option>
                  <option value="Hindi">Hindi</option>
                </select>
              </div>

              <div className="p-1 w-full">
                <label className="block pb-1">Duration<span className="text-red-600 text-sm">*</span></label>
                <input type="text" name='runtime' value={formData.runtime} onChange={handleInputChange}
                 className='w-full md:w-1/2 outline-none text-sm p-2 border border-gray-400 rounded shadow' />
              </div>

              <div className="p-1 w-full">
                <label className="block pb-1">Ratings<span className="text-red-600 text-sm">*</span></label>
                <input type="number" value={formData.ratings ?? 0} onChange={checkValue} name='ratings'
                className='w-full md:w-1/2 outline-none text-sm p-2 border border-gray-400 rounded shadow' />
              </div>

              <div className="p-1 w-full">
                <label className="block pb-1">Release Date<span className="text-red-600 text-sm">*</span></label>
                <input type="date" name='release_date' value={formData.release_date} onChange={handleInputChange}
                className='w-full md:w-1/2 outline-none text-sm p-2 border border-gray-400 rounded shadow' />
              </div>

            </div>
            <div className="mvForm2">

            {formData.poster != null &&
                <div className="posterPreview m-1">
                {apiPoster ?
                <img src={apiUrl+formData.poster} alt={formData.poster.name} />
                :<img src={URL.createObjectURL(formData.poster)} alt={formData.poster.name} />}
                <button type='button' title='Remove' onClick={() => handlePosterRemove()}>
                  X
                </button>
              </div>}

              {formData.poster == null &&
              <div className="uploadOuter p-1">
                <label className="block pb-1">Poster<span className="text-red-600 text-sm">*</span></label>
                <div className="dragBox shadow rounded">
                  <input type="file" accept='image/*' id="uploadFile" name="poster" onChange={handlePosterChange} />
                  <div className='flex justify-center gap-3 flex-col items-center h-full'>
                    <FontAwesomeIcon className='text-4xl md:text-5xl' icon={faCloudArrowUp}/>
                    <span className='text-xs md:text-sm'>Choose a file or Drag it here</span>
                  </div>
                </div>
              </div>}

                <div className="p-1 w-full">
                  <label className="block pb-1">Director<span className="text-red-600 text-sm">*</span></label>
                  <input type="text" name='director' value={formData.director} onChange={handleInputChange}
                  className='w-full outline-none text-sm p-2 border border-gray-400 rounded shadow' />
                </div>

                <div className="p-1">
                  <label className="block pb-1">Casts<span className="text-red-600 text-sm">*</span></label>
                  <textarea name="casts" value={formData.casts} onChange={handleInputChange} rows="3"
                  className='w-full outline-none text-sm p-2 border border-gray-400 rounded shadow'></textarea>
                </div>

                <div className="p-1">
                  <label className="block pb-1">Status<span className="text-red-600 text-sm">*</span></label>
                  <select name="status" value={formData.status} onChange={handleInputChange} className='w-full md:w-1/2 outline-none text-sm p-2 border border-gray-400 rounded shadow'>
                    <option value="Upcoming">Upcoming</option>
                    <option value="Released">Released</option>
                    <option value="Out of Theatres">Out of Theatres</option>
                  </select>
                </div>

            </div>
          </div>

          <button type='submit' className='bg-green-600 px-2 py-1 text-white float-right'>Submit</button>
        </form>
    </Panel>
  )
}

export default EditMovie;