import React from 'react';
import "../App.css";
//so here we a basically using movie model a a temple to display movie data

const Movie = ({name,price}) => {

    return (
        <div className="tweet">
            <h3>{name}</h3>
            <p>{price}</p>
        </div>
    );
}


export default Movie;