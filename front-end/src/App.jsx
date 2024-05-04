import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import HowItWorks from './pages/HowItWorks'
import Register from './pages/Register'
import Login from './pages/Login'

import Nav from './components/Nav'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Nav />
    <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/howitworks' element={<HowItWorks/>}/>
      <Route path='/aboutus' element={<AboutUs/>}/>
      <Route path='/register' element={<Register/>} />
      <Route path='/login' element={<Login/>} />
    </Routes>
    </>
  )
}

export default App