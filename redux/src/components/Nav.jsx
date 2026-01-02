
import { Link } from "react-router-dom";
function Nav(){
    return(
        <>

        <div>
            <ul>
                <Link to='/'><li >Register</li></Link>
                <Link to='/login'><li >Login</li></Link>
                <Link to='/profile'><li >Profile</li></Link>
            </ul>   
        </div>
        
        </>
    )
}

export default Nav;