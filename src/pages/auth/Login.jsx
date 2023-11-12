import React, {useState, useContext} from 'react'
import { Link } from 'react-router-dom'
import AuthContext from '../../contexts/AuthContext'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import {faEye, faEyeSlash} from '@fortawesome/free-solid-svg-icons'

function Login() {
    const {UserLogin, error} = useContext(AuthContext);
    const [showPassword, setShowPassword] = useState(false);
    const [formData, setFormData] = useState({
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
    const handleFormSubmit = async (e) => {
        e.preventDefault();
        await UserLogin(formData.email, formData.password);
    }
    return (
    <div className='bg-gray-900 h-screen flex justify-center items-center text-white'>
      <div className="bg-slate-800 p-6">
        <Link to="/" className='float-right font-poppins text-red-500'>X</Link>
        <h1 className='text-5xl text-center mb-3'>Login</h1>
        <p className="bg-red-600 text-center my-2">{error}</p>
        <form onSubmit={handleFormSubmit}>
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
                <p className='mt-2 text-center'>Don't have account? <Link to="/register" className='text-teal-500'>Register Now</Link></p>
            </div>
        </form>
      </div>
    </div>
  )
}

export default Login
