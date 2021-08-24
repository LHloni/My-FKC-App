import React, { useState,useEffect } from 'react';
import "../App.css";
import axios from 'axios';

function Posts(){


    useEffect(() => {
            axios.get('/')
        .then(function (response) {
            console.log(response);
        })
        .catch(function (error) {
            console.log(error);
        })
        }
    );

    const [posts,setPosts] = useState([]); 

    return(
        <div className="../App.css">
            <h1>Posts Page/Home page</h1>
        </div>
    );
}

export default Posts;