import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import UserData from './userlist';
const Nav=() =>{
    const auth = localStorage.getItem("user")
    const navigate = useNavigate()
    const logout = () =>{
        localStorage.clear()
        navigate('/signin')
    }
    return(
        <header className="App-header">
            <div className="nav-bar">
                <Link className="App-link" to="/"><h4>React App</h4></Link>
                <input type="text" className='search-box' hidden></input>
                <ul className='nav-ul'>
                    <li><Link to="/">Home</Link></li>
                    <li><Link to="/about">About</Link></li>
                    <li><Link to="/contact">Contact</Link></li>
                    {auth ? 
                        <>
                        <li><Link to="/profile">Profile</Link></li>
                        <li><Link onClick={logout} to="/signin">Logout</Link></li>
                        </>
                        :<li><Link to="/signin">Signin</Link></li>
                    }
                </ul>
            </div>
        </header>    
    );
}

export default Nav;