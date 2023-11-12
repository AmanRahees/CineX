import { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export const AdminPrivateRoute = () => {
    let {user} = useContext(AuthContext)
    if (user && user.role === "admin"){
        return <Outlet/>
    }else{
        return <Navigate to="/admin/login"/>
    }
}

export const AdminAuthRoute = () => {
    let {user} = useContext(AuthContext)
    if (!user || user.role != "admin"){
        return <Outlet />
    }else if (user && user.role === "admin"){
        return <Navigate to="/admin" />
    }
}