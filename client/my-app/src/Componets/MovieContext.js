import React,{useState,createContext} from 'react';

export const MovieContext = createContext();
//any tag rapped around this tag will have access 
//to the data inside the movielist
export const MovieProvider = (props) => {

    const [movies,setMovies] = useState([
        {name:'Saw 1',
        price:'R50',
        id:1},
        {name:'Saw 2',
        price:'R70',
        id:2},
        {name:'Saw 3',
        price:'R34',
        id:3}
    ]);

    return (
           <MovieContext.Provider value={[movies,setMovies]}>
               {props.children}
           </MovieContext.Provider>
    );
}
//read up on context and upgrade to redux later on
//you can export more than one function,class etc


