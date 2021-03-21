import React,{useContext} from 'react';
import "../App.css";
import {MovieContext} from './MovieContext';

const Nav = () => {

    const [movies,setMovies] = useContext(MovieContext);

    return (
        <div className="tweet">
            <h3>Hloni</h3>
            <p>I have {movies.length} movies</p>
        </div>
    );
}



export default Nav;