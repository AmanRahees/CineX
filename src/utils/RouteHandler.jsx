import { useContext } from 'react'
import { Navigate, Outlet} from 'react-router-dom'
import AuthContext from '../contexts/AuthContext'

export const PublicRoute = () => {
    let {user} = useContext(AuthContext)
    return !user ? <Outlet /> : <Navigate to="/" />
}

export const PrivateRoute = () => {
    let {user} = useContext(AuthContext)
    return user ? <Outlet /> : <Navigate to="/login" />
}