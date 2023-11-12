import React, {useState, useEffect, useContext} from 'react'
import {useNavigate, Link} from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import axiosInstance from '../../../services/axios'
import {apiUrl} from '../../../services/api'
import "./home.css"
import Body from '../../../components/Frontend/Body/Body'
import Slider from '../../../components/Frontend/Slider/Slider'

function Home() {
  const navigate = useNavigate();
  const {setLoading} = useContext(AuthContext);
  const [movies, setMovies] = useState([]);
  const [banners, setBanner] =  useState([]);
  useEffect(()=>{
    setLoading(true);
    axiosInstance.get("home").then((response)=>{
      setMovies(response.data.movies);
      setBanner(response.data.banners);
    }).catch((error)=>{
      console.log(error);
    })
    setLoading(false)
  }, [])
  return (
    <Body>
      <Slider banners={banners} />

      <div className='p-6 md:px-20'>
          
          <div className="mb-5">
            <h1 className='text-lg md:text-4xl md:pb-2'>In Cinemas</h1>
            <div className="mvGrid">
              {movies.map((movie, index)=>(
                <Link to={`/${movie.id}/${movie.title}`} key={index} className="mvCard" >
                  <img src={apiUrl+movie.poster} alt={movie.title} />
                </Link>
              ))}
            </div>
          </div>

          <div className="mt-5">
            <h1 className='text-lg md:text-4xl md:pb-2'>Upcoming Movies</h1>
            <div className="mvGrid">
              {movies.map((movie, index)=>(
                <div key={index} className="mvCard" >
                  <img src={apiUrl+movie.poster} alt={movie.title} />
                </div>
              ))}
            </div>
          </div>

      </div>
    </Body>
  )
}

export default Home;