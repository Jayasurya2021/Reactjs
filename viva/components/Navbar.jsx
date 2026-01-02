import { Link } from "react-router-dom";

function Navbar(){
    return(
        <>
        <nav>
            <ul>
              <Link to='/'><li>Home</li></Link> 
              <Link to='/about'><li>Above</li></Link> 
              <Link to='/account'><li>Account</li></Link> 
            </ul>
        </nav>
        
        </>
    )
}

export default Navbar;