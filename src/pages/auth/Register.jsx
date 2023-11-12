import React, {useState, useContext} from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosInstance from '../../services/axios'
import AuthContext from '../../contexts/AuthContext'
import jwt_decode from 'jwt-decode'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'

function Register() {
    let {setAuthTokens, setUser} = useContext(AuthContext)
    const navigate = useNavigate();
    const [showPassword, setShowPassword] = useState(false);
    const [error, setError] = useState("");
    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: ""
    })
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevFromData) => ({...prevFromData,[name]: value}));
    }
    const togglePasswordVisibility = () => {
        setShowPassword(!showPassword)
    }
    const handleFormSubmit = (e) => {
        e.preventDefault();
        axiosInstance.post("accounts/register", {
            username: formData.username,
            email: formData.email,
            password: formData.password
        }).then((response)=>{
            if (response.status === 201){
                let data = response.data;
                setAuthTokens(data);
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/')
            }else{
                setError(response.data)
            }
        }).catch((error)=>{
            setError(error.response.data)
        })
    }
    return (
    <div className='bg-gray-900 h-screen flex justify-center items-center text-white'>
      <div className="bg-slate-800 p-6">
        <Link to="/" className='float-right font-poppins text-red-500'>X</Link>
        <h1 className='text-5xl text-center mb-3'>Register</h1>
        <p className="bg-red-600 text-center my-2">{error}</p>
        <form onSubmit={handleFormSubmit}>
            <div className='relative mb-3'>
                <label className="block text-md pb-1">Name</label>
                <input className='bg-transparent border p-1 px-3 w-56 md:w-72 outline-none rounded-lg shadow shadow-slate-900'
                type="text" name='username' value={formData.username} onChange={handleInputChange} />
            </div>
            <div className='relative mb-3'>
                <label className="block text-md pb-1">Email</label>
                <input className='bg-transparent border p-1 px-3 w-56 md:w-72 outline-none rounded-lg shadow shadow-slate-900'
                type="email" name='email' value={formData.email} onChange={handleInputChange} />
            </div>
            <div className='relative mb-3'>
                <label className="block text-md pb-1">Password</label>
                <input className='bg-transparent border p-1 px-3 pe-8 w-56 md:w-72 outline-none rounded-lg shadow shadow-slate-900'
                type={showPassword ? 'text' : 'password'} name='password' value={formData.passowrd} onChange={handleInputChange} />
                <FontAwesomeIcon className='absolute mt-2 right-2 cursor-pointer' icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility}/>
            </div>
            <div className='my-1'>
                <button className='bg-green-700 w-full py-1'>Submit</button>
                <p className='mt-2 text-center'>Already have account? <Link to="/login" className='text-teal-500'>Login</Link></p>
            </div>
        </form>
      </div>
    </div>
    )
}

export default Register
