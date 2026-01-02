import Navbar from "../components/Navbar"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Home from '../Pages/Home'
import About from '../Pages/About'
import Account from '../Pages/Account'
function App() {


  return (
    <>

    <BrowserRouter>
    <Navbar/>
    <Routes>
      <Route path="/" element={<Home/>}/>
      <Route path="/about" element={<About/>}/>
      <Route path="/Account" element={<Account/>}/>
    </Routes>
    
    </BrowserRouter>

      
    </>
  )
}

export default App
