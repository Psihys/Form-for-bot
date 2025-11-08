import {  useState } from 'react'

function App() {
  const [randomSecret, setRandomSecret] = useState(null)
  const [allSecrets, setAllSecrets] = useState([])

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const handleRegister = async (e) => {
    e.preventDefault()

    try {
      const response = await fetch('http://localhost:3000/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password }),
      })
      const data = await response.json()
      setMessage(data.message || 'Регистрация успешна')
    } catch (err) {
      console.error(err)
      setMessage('Ошибка при регистрации')
    }
  }

  const handleFetch = async (text) => {
    if (text === 'noAuth') {
      try {
        const response = await fetch('http://localhost:3000/noAuth')
        const data = await response.json()
        setRandomSecret(data)
      } catch (err) {
        console.error(err)
      }
    } else if (text === 'basicAuth') {
      try {
        const response = await fetch('http://localhost:3000/basicAuth', {
          headers: {
            Authorization: 'Basic ' + btoa('user:pass'),
          },
        })
        const data = await response.json()
        setAllSecrets(data)
      } catch (err) {
        console.error(err)
      }
    }
  }

  return (
    <div>
      <div>
        <h1>Регистрация</h1>
        <form onSubmit={handleRegister}>
          <input
            type='text'
            placeholder='Username'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <input
            type='password'
            placeholder='Password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type='submit'>Зарегистрироваться</button>
        </form>
        <p>{message}</p>
      </div>
      <h1>Секрет из Express API</h1>
      <button onClick={() => handleFetch('noAuth')}>noAuth</button>
      <pre>
        {randomSecret ? JSON.stringify(randomSecret, null, 2) : 'Загрузка...'}
      </pre>
      <h1>Все секреты из Express API</h1>
      <button onClick={() => handleFetch('basicAuth')}>basicAuth</button>
      <pre>
        {allSecrets.length > 0
          ? JSON.stringify(allSecrets, null, 2)
          : 'Загрузка...'}
      </pre>
    </div>
  )
}

export default App
