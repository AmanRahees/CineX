import React from 'react'
import {BrowserRouter as Router, Routes, Route} from 'react-router-dom'
import { AuthProvider } from './contexts/AuthContext'
import {PrivateRoute, PublicRoute} from './utils/RouteHandler'
import {AdminAuthRoute, AdminPrivateRoute} from './utils/AdminRoute'
// Client 
import Home from './pages/Frontend/Home/Home'
import Login from './pages/auth/Login';
import Register from './pages/auth/Register';
// Admin 
import Dashboard from './pages/Backend/Dashboard/Dashboard';
import AdminLogin from './pages/Backend/AdminLogin/AdminLogin';
import Customers from './pages/Backend/Customers/Customers'
import Movies from './pages/Backend/Movies/Movies'
import AddMovies from './pages/Backend/Movies/AddMovies'
import EditMovie from './pages/Backend/Movies/EditMovie'
import Screens from './pages/Backend/Screens/Screens'
import Banners from './pages/Backend/Banners/Banners'
import AddBanner from './pages/Backend/Banners/AddBanner'
import Movie from './pages/Frontend/Movie/Movie'

function App() {
  return (
    <Router>
      <AuthProvider>
        <Routes>
        
        <Route element={<PublicRoute/>}>
          <Route path='/login' element={<Login/>} />
          <Route path='/Register' element={<Register/>} />
        </Route>

        <Route path='/' element={<Home/>} />
        <Route path='/movie' element={<Movie/>} />

        <Route element={<AdminAuthRoute/>}>
          <Route path='/admin/login' element={<AdminLogin/>} />
        </Route>

        <Route element={<AdminPrivateRoute/>}>
          <Route path='/admin' element={<Dashboard/>} />
          <Route path='/admin/customers' element={<Customers/>} />
          <Route path='/admin/movies' element={<Movies/>} />
          <Route path='/admin/movies/add' element={<AddMovies/>} />
          <Route path='/admin/movies/:id/:movie' element={<EditMovie/>} />
          <Route path='/admin/banners' element={<Banners/>} />
          <Route path='/admin/banners/add' element={<AddBanner/>} />
          <Route path='/admin/screens' element={<Screens/>} />
        </Route>

        </Routes>
      </AuthProvider>
    </Router>
  );
}

export default App;