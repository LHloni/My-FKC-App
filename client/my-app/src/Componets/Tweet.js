import React from 'react';
import '../App.css';

//function Tweet(props){
function Tweet({name,message,numberOfLikes}){ //using ES6 javascript features
    // return(
    //     <div className="tweet">
    //         <h3>{props.name}</h3>
    //         <p>{props.message}</p>
    //         <h3>{props.numberOfLikes}</h3>
    //     </div>
    // );
    return(
        <div className="tweet">
            <h3>{name}</h3>
            <p>{message}</p>
            <h3>{numberOfLikes}</h3>
        </div>
    );
    //Look into JSX
}

export default Tweet;