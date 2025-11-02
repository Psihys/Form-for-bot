import { useState } from 'react'
import { getISSPosition } from './api/Api.jsx'

function App() {
  const [position, setPosition] = useState({})
  const [loading, setLoading] = useState(true)

  const handleClick = async () => {
    const data = await getISSPosition()
    setPosition(data)
    setLoading(false)
  }
  return (
    <>
      <button onClick={() => handleClick()}>Get ISS position</button>
      {loading ? (
        <p>Loading...</p>
      ) : (
        <p>
          {position.latitude}, {position.longitude}
        </p>
      )}
    </>
  )
}

export default App
