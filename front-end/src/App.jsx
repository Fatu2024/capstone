import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import HowItWorks from './pages/HowItWorks'
import Register from './pages/Register'
import Login from './pages/Login'
import Nav from './components/Nav'
import { Routes, Route } from 'react-router-dom';
import Dashboard from './pages/Dashboard'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Calendar from './pages/Calendar'

function App() {

  return (
    <>
      <Nav />
      <div>
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/howitworks' element={<HowItWorks />} />
          <Route path='/aboutus' element={<AboutUs />} />
          <Route path='/register' element={<Register />} />
          <Route path='/login' element={<Login />} />
          <Route path='/dashboard'element={<Dashboard/>} />
          <Route path='/calendar'element={<Calendar/>} />
        </Routes>
      </div>
      <ToastContainer />
    </>
  )
}

export default App