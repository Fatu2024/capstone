import './App.css'
import Home from './pages/Home'
import AboutUs from './pages/AboutUs'
import HowItWorks from './pages/HowItWorks'

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
    </Routes>
    </>
  )
}

export default App
