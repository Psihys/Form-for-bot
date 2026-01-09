import { useEffect, useState } from 'react'
import RateLimitedUI from '../components/RateLimitedUI'
import { getAllNotes } from '../api/notes'
import NoteCards from '../components/NoteCards'

const HomePage = () => {
  const [isRateLimited, setIsRateLimited] = useState(false)
  const [notes, setNotes] = useState([])
  const [isLoading, setIsLoading] = useState(false)

  useEffect(() => {
    const fetchNotes = async () => {
      setIsLoading(true)
      try {
        const data = await getAllNotes()
        setNotes(data)
      } catch (error) {
        if (error.status === 429) {
          setIsRateLimited(true)
        }
      } finally {
        setIsLoading(false)
      }
    }
    fetchNotes()
  }, [])
  console.log(notes)
  return (
    <div className='homepage-container'>
      {isRateLimited && <RateLimitedUI />}
      {isLoading && <p>Loading...</p>}
      {!isLoading && <NoteCards notes={notes} />}
    </div>
  )
}

export default HomePage
