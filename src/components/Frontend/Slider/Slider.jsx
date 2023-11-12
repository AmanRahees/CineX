import React, {useState} from 'react'
import {apiUrl} from '../../../services/api'
import './slider.css'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleLeft, faAngleRight } from '@fortawesome/free-solid-svg-icons';

function Slider({banners}) {
  const [currentIndex, setCurrentIndex] = useState(0);
  if (!banners || banners.length == 0){
    return null;
  }
  const nextSlide = () => {
    const newIndex = (currentIndex + 1) % banners.length;
    setCurrentIndex(newIndex)
  }
  const prevSlide = () => {
    const newIndex = (currentIndex - 1 + banners.length) % banners.length;
    console.log(newIndex);
    setCurrentIndex(newIndex)
  }
  return (
    <div className='bnr_container'>
      <div className="bnr_carousal">
        {banners.map((banner, index)=>(
          <div key={index} className={`slide ${index === currentIndex ? "active" : ""}`}>
            <img className='w-full' src={apiUrl+ banner.banner} alt={banner.movie.title} />
            <div className="bnrInfo">
              <h1>{banner.movie.title}</h1>
              <div className="bnrOvrw">
                <p className='indent-10 md:indent-16'>{banner.movie.overview}</p>
              </div>
              <button>
                Book Now
              </button>
            </div>
          </div>
        ))}
      </div>
      <button onClick={prevSlide} id='bnrPrev'>
        <FontAwesomeIcon icon={faAngleLeft}/>
      </button>
      <button onClick={nextSlide} id="bnrNext">
        <FontAwesomeIcon icon={faAngleRight}/>
      </button>
    </div>
  )
}

export default Slider;