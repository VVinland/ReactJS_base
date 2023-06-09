import {useState} from 'react';

const Counter = function (){
    let [count, setCount] = useState(0);

    const increment = ()=> setCount(count+1);
    
    function dicriment(){
        return setCount(count-1);
    }

    return(
        <>
            <h1>{count}</h1>
            <button onClick={increment}>
                Increment
            </button>

            <button onClick={dicriment}>
                Dicrement
            </button>
        </>
    )
}

export default Counter;