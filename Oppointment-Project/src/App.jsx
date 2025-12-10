
import Home from './pages/Home';
import Doctors from './pages/Doctors';
import ErrorPage from './pages/ErrorPage';
import MyOppoinments from './pages/MyOppoinments';
import Oppinmentpage from './pages/OppoinmentPage';
import Nav from './Nav/Nav';


import { Routes, Route, BrowserRouter } from "react-router-dom"


function App() {
  return (
  <>
  <BrowserRouter>
  <Nav/>
  <div className='container'>
      <Routes>
    <Route path="/" element={<Home/>}/>
    <Route path="/Doctors" element={<Doctors/>}/>
    <Route path="*" element={<ErrorPage/>}/>
    <Route path="/MyOppoinments" element={<MyOppoinments/>}/>
    <Route path="/Oppinmentpage" element={<Oppinmentpage/>}/>
  </Routes>
  </div>


  </BrowserRouter>

  </>
  )
}

export default App
