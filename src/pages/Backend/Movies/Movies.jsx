import React, {useState, useEffect, useContext} from 'react'
import {useNavigate} from 'react-router-dom'
import AuthContext from '../../../contexts/AuthContext'
import axiosInstance from '../../../services/axios'
import {apiUrl} from '../../../services/api'
import {FontAwesomeIcon} from '@fortawesome/react-fontawesome'
import {faArrowRight, faSearch} from '@fortawesome/free-solid-svg-icons'
import Panel from '../../../components/Backend/Panel/Panel'
import "./movies.css"

function Movies() {
  const {authTokens, UserLogout, setLoading} = useContext(AuthContext);
  const navigate = useNavigate();
  const [filter, setFilter] = useState("All");
  const [movies, setMovies] = useState([]);
  const [filteredMovies, setFilteredMovies] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  useEffect(()=>{
    setLoading(true);
    axiosInstance.get("admin/movies",{
      headers: {
          'Authorization': `Bearer ${authTokens.access}`
      }
    }).then((response)=>{
      setMovies(response.data);
      setFilteredMovies(response.data);
    }).catch((error)=>{
      console.log(error);
    })
    setLoading(false);
  }, [])
  useEffect(() => {
    if (filter === "All") {
      setFilteredMovies(movies);
    } else {
      const filtered = movies.filter(movie => movie.status === filter);
      setFilteredMovies(filtered);
    }
  }, [filter, movies]);
  useEffect(() => {
    const filtered = movies.filter((movie) =>
      movie.title.toLowerCase().includes(searchQuery.toLowerCase())
    );
    setFilteredMovies(filtered);
  }, [searchQuery, movies]);
  const filterHandler = (value) => {
      setFilter(value);
  }
  return (
  <Panel>
    <button className='font-poppins create-btns' onClick={()=>navigate("/admin/movies/add")}>
      Add Movies <FontAwesomeIcon icon={faArrowRight}/>
    </button>
    <h1 className='text-xl font-poppins'>Movies</h1>
    <span className='font-poppins text-xs'>3 Movies<i className='text-green-400'>*</i></span>

    <div className="search-wrapper">
        <button disabled>
            <FontAwesomeIcon icon={faSearch}/>
        </button>
        <input type="text" placeholder='Search...' name="search" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
    </div>

    <div className="mv_filter my-4">
      <button onClick={()=>filterHandler("All")} className={`${filter === "All" ? "active" : null}`}>
        All
      </button>
      <button onClick={()=>filterHandler("Released")} className={`${filter === "Released" ? "active" : null}`}>
        Released
      </button>
      <button onClick={()=>filterHandler("Upcoming")} className={`${filter === "Upcoming" ? "active" : null}`}>
        Upcoming
      </button>
      <button onClick={()=>filterHandler("Out of Theatres")} className={`${filter === "Out of Theatres" ? "active" : null}`}>
        Out of Theatres
      </button>
    </div>
    
    <div className="mvList-container">
      {filteredMovies.map((movie, index)=>(
        <div key={index} className="mv_card" onClick={()=>navigate(`/admin/movies/${movie.id}/${movie.title}`)}>
          <img src={apiUrl+movie.poster} alt="" />
          <button onClick={()=>navigate(`/admin/movies/${movie.id}/${movie.title}`)}>
            View <FontAwesomeIcon icon={faArrowRight}/>
          </button>
        </div>
      ))}
    </div>
    
    {/* <div className='mt-5 flex justify-end'>
    <button className='bg-black text-white text-sm font-poppins py-1 md:py-2 md:px-3 w-full md:w-auto rounded-lg'>
      Load More
    </button>
    </div> */}

  </Panel>
  )
}

export default Movies;