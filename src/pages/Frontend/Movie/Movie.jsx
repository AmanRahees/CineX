import React from 'react'
import "./movie.css"
import Body from '../../../components/Frontend/Body/Body'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlay, faStar } from '@fortawesome/free-solid-svg-icons'

function Movie() {
  return (
    <Body>
      <div className='main-container'>
        <div className="sng_wrapper">
            <div className='sng_poster'>
                <img src="http://127.0.0.1:8000/media/posters/RDX.jpg"  alt="" />
                <div className="mt-3 flex justify-between">
                  <button>Book Ticket</button>
                  <button>Trailer <FontAwesomeIcon icon={faPlay} /></button>
                </div>
            </div>
            <div className="sng_info">
                <h1>Movie Title</h1>
                <p className='indent-10'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nemo repellat illo exercitationem ducimus deserunt necessitatibus fugit vitae reprehenderit nihil possimus? Sint consequuntur soluta, optio ad aliquid amet itaque quas labore!</p>
                <p className="my-2 text-zinc-500">Action/Thriller</p>
                <p className='my-2'><strong>Language :</strong> Malayalam</p>
                <p className='my-2'><strong>Duration :</strong> 2hr 30min</p>
                <p className='my-2'><strong>Director :</strong> Malayalam</p>
                <p className='my-2'><strong>Ratings :</strong> 7.4/10 <FontAwesomeIcon className='text-yellow-500' icon={faStar}/></p>
                <p className='my-2'><strong>Casts :</strong> Malayalam</p>
                <p className='my-2'><strong>Release Date :</strong> Malayalam</p>
            </div>
        </div>
      </div>
    </Body>
  )
}

export default Movie
