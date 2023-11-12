import React, {useState, useContext} from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleInfo, faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons'
import AuthContext from '../../../contexts/AuthContext'
import './login.css'

function AdminLogin() {
  const {AdminLogin, error} = useContext(AuthContext);
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
        await AdminLogin(formData.email, formData.password);
    }
  return (
    <div className='amd-lgIn'>
      <div className="amdlgDv">
      <div className="shadow-2xl shadow-black p-8 amdlgDv2">
        <form onSubmit={handleFormSubmit}>
            <h1 className='text-3xl text-black text-center font-belleza stroke-lime-400 relative'>
              Cine<span className='text-4xl absolute'>X</span>
            </h1>
            <p className="bg-red-600 text-center my-2">{error}</p>
            <div className='relative mb-3'>
                <label className="block f24 text-md pb-1">Email</label>
                <input className='bg-transparent border-b border-black p-1 px-3 w-56 md:w-72 outline-none'
                type="email" name='email' value={formData.email} required onChange={handleInputChange} />
            </div>
            <div className='relative mb-3'>
                <label className="block f24 text-md pb-1">Password</label>
                <input className='bg-transparent border-b border-black p-1 px-3 w-56 md:w-72 outline-none'
                type={showPassword ? 'text' : 'password'} name='password' required value={formData.password} onChange={handleInputChange} />
                <FontAwesomeIcon className='absolute f24 mt-2 right-2 cursor-pointer' icon={showPassword ? faEyeSlash : faEye} onClick={togglePasswordVisibility}/>
            </div>
            <div className='my-1'>
                <button type='submit' className='bg-black text-white w-full py-1'>Login</button>
                <div className="mt-3 text-center text-sm text-red-600 cursor-default">
                  <FontAwesomeIcon icon={faCircleInfo} /> Authorized Administrators Only!
                </div>
            </div>
        </form>
      </div>
      </div>
    </div>
  )
}

export default AdminLogin
