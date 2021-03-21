import React from 'react';

function Hello(){

    const sayHello = () => {
        console.log("hello");
      };

    return(
        <div>
            <h2>we are in example</h2>
            <button onClick={sayHello}>Hello_BTN</button>
        </div>
    );
}

export default Hello;