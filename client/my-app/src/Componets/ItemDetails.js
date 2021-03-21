import React,{useState,useEffect} from 'react';
import "../App.css";

function ItemDetail({match}){
//useEffect load data after component mounts
    useEffect(() => {
            fetchItems();
          //  console.log(match);
    },[]);

    const [item,setItem] = useState({
        //image:{} use this if you recieving images from API because they 
        //are objects
    });


//fetch from a database/API
    const fetchItems = async () => {
        const data = await fetch(`https://fortnite-api.com/v1/playlists/${match.params.id}`);
        //convert read data to json
        const item1 = await data.json();
       console.log(item1.data);
        setItem(item1.data);
    };

    return(
        <div className="../App.css">
           <h2>{item.name}</h2>
           <p>{item.description}</p>
        </div>
    );
}

export default ItemDetail;