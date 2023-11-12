import react, {useState, useEffect, createContext} from 'react'
import { useNavigate } from 'react-router-dom'
import axiosInstance from '../services/axios'
import jwt_decode from 'jwt-decode'
import Loader from '../components/Frontend/Loader/Loader'

const AuthContext = createContext()

export const AuthProvider = ({children}) => {
    const navigate = useNavigate();
    let [authTokens, setAuthTokens] = useState(()=> localStorage.getItem("authTokens") ? JSON.parse(localStorage.getItem("authTokens")): null);
    let [user, setUser] = useState(()=> localStorage.getItem("authTokens") ? jwt_decode(localStorage.getItem("authTokens")): null);
    let [error, setError] = useState('');
    let [loading, setLoading] = useState(false);
    
    let UserLogin = async (email, password) => {
        await axiosInstance.post("accounts/login", {
            email: email,
            password: password
        }).then((response)=>{
            if (response.status === 200){
                let data = response.data;
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/');
            }
        }).catch((error)=>{
            console.log(error);
            setError("Invalid Email or Password!");
        })
    }

    let AdminLogin = async (email, password) => {
        await axiosInstance.post("admin/login", {
            email: email,
            password: password
        }).then((response)=>{
            if (response.status === 200){
                let data = response.data;
                setAuthTokens(data);
                setUser(jwt_decode(data.access));
                localStorage.setItem('authTokens', JSON.stringify(data));
                navigate('/admin');
            }
        }).catch((error)=>{
            console.log(error);
            setError(error.response.data.Error);
            console.log(error.response.data);
        })
    }

    let UserLogout = () => {
        setAuthTokens(null);
        setUser(null);
        localStorage.removeItem("authTokens");
        window.location.reload();
    }

    let refreshToken = async () =>{
        await axiosInstance.post("accounts/token/refresh", {
            refresh: authTokens?.refresh
        }).then((response)=>{
            let data = response.data;
            console.log(data);
            if (response.status === 200){
                setAuthTokens(data)
                setUser(jwt_decode(data.access))
                localStorage.setItem('authTokens', JSON.stringify(data))
            } else{
                UserLogout();
            }
        }).catch((error)=>{
            UserLogout();
        })
        if (loading){
            setLoading(false)
        }
    }

    useEffect(()=>{
        let lifeTime = 1000 * 60 * 9;
        let interval = setInterval(()=>{
            if (authTokens){
                refreshToken()
                console.log("Refreshing...");
            }
        }, lifeTime)
        return () => clearInterval(interval)
    }, [authTokens,])

    let ContextData = {
        authTokens: authTokens,
        setAuthTokens: setAuthTokens,
        user: user,
        setUser: setUser,
        UserLogin: UserLogin,
        AdminLogin: AdminLogin,
        UserLogout: UserLogout,
        loading: loading,
        setLoading: setLoading,
        error: error,
    }

    return (
        <AuthContext.Provider value={ContextData}>
            {loading ? <Loader /> : children}
        </AuthContext.Provider>
    )
}

export default AuthContext;