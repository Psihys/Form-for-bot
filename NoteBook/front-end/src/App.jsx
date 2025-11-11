import { Routes, Route } from 'react-router'

import HomePage from './pages/HomePage'
import CreatePage from './pages/CreatePage'
import ContentPage from './pages/ContentPage'

import './App.css'
import './reset.css'
import Header from './components/Header'

function App() {
  return (
    <div className='layout'>
      <Header />
      <div className='main'>
        <Routes>
          <Route path='/' element={<HomePage />}></Route>
          <Route path='/create' element={<CreatePage />}></Route>
          <Route path='/note/:id' element={<ContentPage />}></Route>
        </Routes>
      </div>
    </div>
  )
}

export default App
