// ******************* Demo for redux usecase *************************

import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { increment, decrement } from './redux/slices/countSlice';
import { setArr, addToArray } from './redux/slices/arraySlice';

function ReduxDemo() {
    const { count } = useSelector((state) => state.countReducer); // returns an object of states {count:0, arr:[]}
    const { arr } = useSelector((state) => state.arrayReducer); 
    //OR
    // const count = useSelector((state) => state.countReducer.count)
    const dispatch = useDispatch();
    return (
        <div>
            <h1>{arr}</h1>
            <h1>{count}</h1>
            <button onClick={() => { dispatch(increment()) }}>increment</button>
            <button onClick={() => { dispatch(decrement()) }}>decrement</button>
            <br/>
            <button onClick={() => { dispatch(addToArray(7)) }}>add 7 to arr</button>
            <button onClick={() => { dispatch(setArr([9,8,7])) }}>setArray to [9,8,7]</button>
        </div>
    )
}

export default ReduxDemo;
