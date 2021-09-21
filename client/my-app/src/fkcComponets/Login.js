import React,{useState,useEffect} from 'react';
import "../App.css";
import fkcDataService from "../service/fkcDataService";

//Login stuff


function Login(){

//use axios
//useEffect load data after component mounts
    useEffect(() => {

      fkcDataService.login().then((res) => {
        console.log(res.data);
      }

      ).catch((err) => {
        console.log(err.data);
      });

},[]);


    return(

    <div>
      <h1>Hello</h1>
      </div>
      
    );
}

export default Login;