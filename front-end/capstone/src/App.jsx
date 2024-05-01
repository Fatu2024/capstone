import './App.css'
import Calendar from './pages/Calendar'
import Home from './pages/Home'
import Journal from './pages/Journal'
import SignIn from './pages/SignIn'
import Nav from './components/Nav'
import { Routes, Route } from 'react-router-dom';

function App() {

  return (
    <>
    <Nav />
    <Routes>
    <Route path='/' element={<Home/>}/>
      <Route path='/signin' element={<SignIn/>}/>
      <Route path='/calendar' element={<Calendar/>}/>
      <Route path='/journal' element={<Journal/>} />
    </Routes>
    </>
  )
}

export default App
