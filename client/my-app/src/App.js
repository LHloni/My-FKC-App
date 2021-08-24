//a component holding all the logic html,javasccript,css
import React,{useState,useEffect} from 'react';//creating a component
// import Hello from './Componets/Example';
// import Tweet from './Componets/Tweet';
// import MovieList from './Componets/MovieList';
// import Nav from './Componets/Nav';
// import {MovieProvider} from './Componets/MovieContext';
// import AddMovie from './Componets/AddMovie';
import Posts from './fkcComponets/Posts';

import Login from './fkcComponets/Login';

//npm install react-router-dom // to use it for routing
// import ShopNavigation from './Componets/ShopNavigation';
// import About from './Componets/About';
// import Shop from './Componets/Shop';
// import ItemDetail from './Componets/ItemDetails';
//keyword "as" is used to rename keywords
//these imports will help with routing

import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';
import './App.css';

///////////////////////////////////////////////////FKC-APP

function App(){
  //useEffect load data after component mounts
      //   useEffect(() => {
      //     api.get('/').then(res => {
      //       console.log(res.data);
      //       //get,post,put,delete,patch etc
      //       //let,res,await,async
      //     })
      // },[])
   
  
    //the exact key word means only display a certain route if the path is
    //exactly the one provide in the url and route path
    return(
      <Router>
          <div className="App">
            <fkcNavigation/>
              <Switch>
              <Route path="/fkcNavigation/Posts" exact="true" component={Posts} />
                {/* <Route path="/fkcNavigation/Login" exact="true" component={Login} /> */}
                {/* <Route path="/shop" exact="true" component={Shop} /> */}
                {/* <Route path="/shop/:id" exact="true" component={ItemDetail} /> */}
              </Switch>
        </div>
      </Router>
    );
    }
////////////////////////////////////////////////////////////

//switch will allow only one route to be displayed at a time
//by stopping after finding the first match for the URL string 


//3 - third React routing
// function App(){
// //useEffect load data after component mounts
//       useEffect(() => {
//         api.get('/').then(res => {
//           console.log(res.data);
//           //get,post,put,delete,patch etc
//           //let,res,await,async
//         })
//     },[])
 

//   //the exact key word means only display a certain route if the path is
//   //exactly the one provide in the url and route path
//   return(
//     <Router>
//         <div className="App">
//           <ShopNavigation/>
//             <Switch>
//               <Route path="/" exact="true" component={Home} />
//               <Route path="/about" exact="true" component={About} />
//               <Route path="/shop" exact="true" component={Shop} />
//               <Route path="/shop/:id" exact="true" component={ItemDetail} />
//             </Switch>
//       </div>
//     </Router>
//   );
//   }
  // /shop/:id call a route with a specific id

  // const Home = () => {
 
  //   return(
  //       <div className="App">
  //         <h1>Home</h1>
  //     </div>
  //   );
  //   }



//2 - second context API
// function App(){
 
//   return(
//    <MovieProvider>
//       <div className="App">
//         <Nav />
//         <AddMovie/>
//         <MovieList />
//     </div>
//    </MovieProvider>
//   );
//   }

//1 - first Basic react
//creating a component
// function App(){
// //state is like our data(string,img,text,boolean,int etc) we can even get 
// //it from the database
//  const [isRed,setRed] = useState(false);//isRed is the variable holding the value
//  // false is the default value of the state and setRed is the function that will \
//  //manipulate the state
//  const [count,setCount] = useState(0);

//  const [users,setUsers] = useState([
//   {
//     name:"Hloni",
//     age:24,
//     posts: ["my first post","my second post yes"]
//   },{
//     name:"Mpho",
//     age:26,
//     posts: ["my first whatever","my second whatever post yes"]
//   }
//  ]);//this is how it would look when you model a state after recieving
//  //data from a database

//  const increment = () => {
//    setCount(count +1);
//  };

//   return(
//     <div className="app">
//       <h1 className={count < 5 ? "blue":"red"} >Wow this is great User({count })</h1>
//       <button onClick={increment}>INCREMENT</button>
//       <Hello />

//       {users.map(user => (
//           <Tweet name={user.name} message={user.posts} />
//       ))}

//       <Tweet name="Dev ED" message="This is a random tweet." numberOfLikes="2"/>
//       <Tweet name="Wow ED" message="This is a not a random one." numberOfLikes="20"/>
//       <Tweet name="Junior ED" message="Wow what a nice thing to do." numberOfLikes="200"/>    
//     </div>
//   );//it is JSX not HTML
//   //JSX help us place html in javascript (instead of javascript in html)
//   //inside the curly baraces {} you can add javascript-code and functions etc
// }

export default App;//exporting this file/app