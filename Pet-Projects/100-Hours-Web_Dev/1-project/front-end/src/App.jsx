import './App.css'
import { Routes, Route } from 'react-router'
import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import Header from './components/Header'
import { useState } from 'react'
import ContentPage from './pages/ContentPage'

function App() {
  const [theme, setTheme] = useState(
    () => localStorage.getItem('theme') || 'light'
  )

  const toggleTheme = () => {
    setTheme((prev) => {
      const nextTheme = prev === 'light' ? 'dark' : 'light'
      localStorage.setItem('theme', nextTheme)
      return nextTheme
    })
  }

  return (
    <div className='layout' data-theme={theme}>
      <Header theme={theme} toggleTheme={toggleTheme} />
      <Routes>
        <Route path='/' element={<HomePage />} />
        <Route path='/create' element={<CreatePage />} />
        <Route path='/edit/:id' element={<ContentPage />} />
      </Routes>
    </div>
  )
}

export default App
