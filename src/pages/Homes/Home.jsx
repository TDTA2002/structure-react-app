import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { counterActions } from '@stores/slices/counter.slice'
export default function Home() {
    const counterStore = useSelector(store => store.counterStore);
    const dispatch = useDispatch();
    useEffect(() => {
        console.log("store", counterStore);
    }, []);
    return (
        <div>
            <p>Counter:{counterStore.counter}</p>
            <h1>Home</h1>
            <button onClick={() => { dispatch(counterActions.increment()) }}>Tăng</button><br />
            <button onClick={() => { dispatch(counterActions.decrement()) }}>Giảm</button><br />
            <button onClick={() => { dispatch(counterActions.resetCounter({ number: 100, temp: 2 })) }}>Reset</button><br />
        </div>
    )
}
