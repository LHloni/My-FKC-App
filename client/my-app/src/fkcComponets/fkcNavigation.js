import React from 'react';
import "../App.css";
import {Link} from 'react-router-dom';

function fkcNavigation(){

    const navStyle = {
        color:'white'
    };

    return(
        <nav >
            <h3>FKC</h3>
            <ul className="nav-links" >
                {/* <Link style={navStyle} to="/localhost:3000/user/register/">
                <li>Register</li>
                </Link> */}
                <Link style={navStyle} to="/fkcNavigation/Login">
                <li>Login</li>
                </Link>
                {/* <Link style={navStyle} to="/localhost:3000/posts/">
                <li>Posts</li>
                </Link>
                <Link style={navStyle} to="/localhost:3000/posts/uploadpost/">
                <li>Upload Post</li>
                </Link> */}
               
            </ul>
        </nav>
    );
}

export default fkcNavigation;