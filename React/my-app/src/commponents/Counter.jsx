import React  from 'react'
import { useState } from 'react'

 const Counter = () => {
    const [count, setCount] = useState(0)

    function increment() {
        setCount(count + 1)
    }
    function decrement() {
        setCount(count - 1)
    }
  return (
    <div>
        <h2>Counter: {count}</h2>
        <button onClick={increment}>Increment</button>
        <button onClick={decrement}>Decrement</button>
    </div>
  )
}

export default Counter;