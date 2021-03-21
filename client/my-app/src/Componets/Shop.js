import React,{useState,useEffect} from 'react';
import "../App.css";
import {Link} from 'react-router-dom';

function Shop(){
//useEffect load data after component mounts
    useEffect(() => {
            fetchItems();
    },[]);

    const [items,setItems] = useState([]);

//fetch from a database/API
    const fetchItems = async () => {
        const data = await fetch("https://fortnite-api.com/v1/playlists");
        //convert read data to json
        const items = await data.json();
        // console.log(items.data);
        setItems(items.data);
    };

    return(
        <div className="../App.css">
            <h1>Shop Page</h1>
            {items.map(item =>(
                <div key={item.id}>
                    <Link to={`/shop/${item.id}`}>
                    <h2>{item.name}</h2>
                    </Link>
                </div>
            ))}
        </div>
    );
}

export default Shop;