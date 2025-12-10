import './Nav.css'
import { NavLink } from 'react-router-dom';


function Nav() {


    return (
        <>
            <div className='parent'>
                <div>
                    <h3 className='logo'>Logo</h3>
                </div>
                <ul className='childeren'>
                    <NavLink to={"/"}><li>Home</li></NavLink>
                    <NavLink to={"/About"}> <li>Doctors</li></NavLink>
                    <NavLink to={"/Contect"}><li>Oppointment Page</li></NavLink>
                </ul>
                <ul className='childeren'>
                    <NavLink to={"/MyOppoinments"}><li>My Oppointments</li></NavLink>
                </ul>

            </div>

        </>

    )
}

export default Nav;