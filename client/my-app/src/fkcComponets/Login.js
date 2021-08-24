import React,{useState,useEffect} from 'react';
import "../App.css";

//import axios which is a api library
//always install axios at the end of all the imports
import axios from 'axios';
const api = axios.create({
  baseURL: `https://fortnite-api.com/v1/playlists`
});

function Login(){

//use axios
//useEffect load data after component mounts
    // useEffect(() => {
        // axios.get(`http://localhost:3000/user/login`)
        // .then(res => {
            // const DATA = res.data;
            // this.setState({ persons });
            // console.log(DATA);

        // });
// },[]);

    return(

<div><h1>Hellow</h1></div>


        // <div className="../App.css">
        //     <h1>Login</h1>

        //     <form action="localhost:3001/user/login" method ="GET">
        //     <div className="mb-3">
        //         <label for="exampleInputEmail1" className="form-label">Email address</label>
        //         <input type="email" className="form-control" id="exampleInputEmail1" aria-describedby="emailHelp"/>
        //         <div id="emailHelp" className="form-text">We'll never share your email with anyone else.</div>
        //     </div>
        //     <div classnName="mb-3">
        //         <label for="exampleInputPassword1" className="form-label">Password</label>
        //         <input type="password" className="form-control" id="exampleInputPassword1"/>
        //     </div>
        //     <div className="mb-3 form-check">
        //         <input type="checkbox" className="form-check-input" id="exampleCheck1"/>
        //         <label className="form-check-label" for="exampleCheck1">Check me out</label>
        //     </div>
        //     <button type="submit" className="btn btn-primary">Submit</button>
        //     </form>

        // </div>
    );
}

export default Login;