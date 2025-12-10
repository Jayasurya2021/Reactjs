
import Home from './pages/Home';
import About from './pages/Above';
import ErrorPage from './pages/ErrorPage';
import MyOppoinments from './pages/MyOppoinments';
import Contect from './pages/Contect';
import Nav from './components/Nav';


import { Routes, Route, BrowserRouter } from "react-router-dom"


function App() {
  return (
  <>
  <BrowserRouter>
  <Nav/>
  <div className='container'>
      <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/About" element={<About/>}/>
    <Route path="*" element={<ErrorPage/>}/>
    <Route path="/MyOppoinments" element={<MyOppoinments/>}/>
    <Route path="Contect" element={<Contect/>}/>
  </Routes>
  </div>


  </BrowserRouter>

  </>
  )
}

export default App
