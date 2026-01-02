// import useForm from "./hooks/useForm"
import { BrowserRouter, Routes, Route } from "react-router-dom"
import Register from "./pages/Register"
import Login from "./pages/Login"
import Profile from "./pages/profile"
import Nav from "./components/Nav"
function App() {

  // const {handlechange,datas} = useForm("")
  
  

  return (
    <>
    <Nav/>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Register/>}/>
        <Route path="/login" element={<Login/>}/>
        <Route path="/profile" element={<Profile/>}/>
      </Routes>
      </BrowserRouter>
      {/* <input type="text" onChange={handlechange}  />

      <h1>{datas}</h1> */}
    </>
  )
}

export default App
