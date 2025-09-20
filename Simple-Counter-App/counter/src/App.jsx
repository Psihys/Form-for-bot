import { useState } from 'react'
import './App.css'

function App() {
  const [value, setValue] = useState(0)

  const handleInc = () => {
    setValue(value + 1)
  }

  const handleDec = () => {
    setValue(value - 1)
  }
  return (
    <>
    <h1 className='title'>Click the buttons</h1>
    <div className='container'>
      <button className='inc_button' onClick={handleInc}>
        Click to increase
      </button>
      <div className='value'>{value}</div>
      <button className='dec_button' onClick={handleDec}>
        Click to decrease
      </button>
    </div>
    </>
    
  )
}

export default App
