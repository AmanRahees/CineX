import React, {useState, useEffect, useContext} from 'react'
import { useParams, useNavigate } from 'react-router-dom'
import Body from '../../../components/Frontend/Body/Body'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStar, faClose } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../../contexts/AuthContext'
import {apiUrl} from '../../../services/api'
import axiosInstance from '../../../services/axios'
import "./movie.css"
import Trailer from './Trailer'

function Movie() {
  const {setLoading} = useContext(AuthContext);
  const {id, movie} = useParams();
  const navigate = useNavigate();
  const [showTrailer, setShowTrailer] = useState(false);
  const [movieData, setMovieData] = useState({
    id: id,
    title: movie,
    overview: "",
    poster: null,
    genre: "",
    language: "",
    runtime: "",
    ratings: 0,
    director: "",
    casts: "",
    status: "",
    release_date: ""
  })
  useEffect(()=>{
    setLoading(true);
    axiosInstance.get(`movie/${id}`).then((response)=>{
      if (response.status === 200){
        const data = response.data;
        setMovieData({
          id: data.id,
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
      navigate('/');
    })
    setLoading(false);
  }, [])
  useEffect(()=>{
    const formattedReleaseDate = new Date(movieData.release_date).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    });
    setMovieData(prevState => ({...prevState, release_date: formattedReleaseDate}))
  }, [movieData.release_date])
  return (
    <Body>
      <div className='main-container'>
        <div className="sng_wrapper">
            <div className='sng_poster'>
                <img src={apiUrl+movieData.poster} alt={movie} />
                <div className="mt-3 flex justify-between">
                  <button>Book Ticket</button>
                  <button onClick={()=>setShowTrailer(true)}>
                    Trailer <FontAwesomeIcon icon={faPlay} />
                  </button>
                </div>
            </div>
            <div className="sng_info">
                <h1>{movieData.title}</h1>
                <p className='indent-10'>{movieData.overview}</p>
                <p className="my-2 text-zinc-500">{movieData.genre}</p>
                <p className='my-2'><strong>Language :</strong> {movieData.language}</p>
                <p className='my-2'><strong>Duration :</strong> {movieData.runtime}</p>
                <p className='my-2'><strong>Director :</strong> {movieData.director}</p>
                <p className='my-2'><strong>Ratings :</strong> {movieData.ratings}/10 <FontAwesomeIcon className='text-yellow-500' icon={faStar}/></p>
                <p className='my-2'><strong>Casts :</strong> {movieData.casts}</p>
                <p className='my-2'><strong>Release Date :</strong> {movieData.release_date}</p>
            </div>
        </div>
      </div>

      {showTrailer && 
      <Trailer>
            <button className='trailer-close' onClick={()=>setShowTrailer(false)}>
                <FontAwesomeIcon className='text-gray-500' icon={faClose}/>
            </button>
            <div className="bg-black">
            <iframe className='trailer-frame' src="https://www.youtube.com/embed/w8xrTMM7t-w?si=fWCt9rces4RODqAP" title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" allowfullscreen></iframe>
            </div>
      </Trailer>}

    </Body>
  )
}

export default Movie;