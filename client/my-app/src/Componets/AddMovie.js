import React,{useState,useContext} from 'react';
import {MovieContext} from './MovieContext';

//this is called a arrow function
const AddMovie = () => {

    const [name,setName] = useState('');
    const [price,setPrice] = useState('');

    const [movies,setMovies] = useContext(MovieContext);

    //e is a event(event listiner) as parameter
    const updateName = (e) => {
        setName(e.target.value);
    }

    const updatePrice = (e) => {
        setPrice(e.target.value);
    }

    const addMovie = (e) => {
        //prevent page from refreashing
        e.preventDefault();
        //the 3 dots means we will get a copy of the 
        //previous data in the movielist state/data
        //therefore we get all the movies/data and append our own user data
        setMovies(prevMovies => [...prevMovies,{id:movies.length+1,name:name,price:price}]);
        
    }

    return (
        <form onSubmit={addMovie}>
            <input type="text" placeholder="name" name="name" value={name} onChange={updateName}/>
            <input type="text" placeholder="price" name="price" value={price} onChange={updatePrice}/>
            <button>Submit</button>
        </form>
    );
}



export default AddMovie;