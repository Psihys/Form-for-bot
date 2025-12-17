import { useParams, useNavigate } from 'react-router'
import { useState, useEffect } from 'react'
import { deleteNote, updateNote, getNoteById } from '../api/notes'
import './styles/ContentPage.css'

const ContentPage = () => {
  const [note, setNote] = useState({ title: '', content: '' })
  const [loading, setLoading] = useState(false)
  const [saving, setSaving] = useState(false)

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    const fetchNote = async () => {
      setLoading(true)
      try {
        const data = await getNoteById(id)
        setNote(data)
      } catch (error) {
        if (error?.status === 429) {
          console.log('Rate limited')
        } else {
          console.error(error)
        }
      } finally {
        setLoading(false)
      }
    }
    fetchNote()
  }, [id])

  const handleDelete = async () => {
    try {
      await deleteNote(id)
      navigate('/')
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }

  const handleUpdate = async () => {
    setSaving(true)
    try {
      await updateNote(id, note)
    } catch (error) {
      console.error('Failed to update note:', error)
    } finally {
      setSaving(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setNote((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  return (
    <div className='content-page-container'>
      <div className='content-page-card'>
        <h1 className='content-page-title'>Content Page</h1>
        {loading ? (
          <p className='content-page-loading'>Loading...</p>
        ) : (
          <>
            <form className='content-page-form'>
              <input
                name='title'
                onChange={handleChange}
                type='text'
                value={note.title}
                placeholder='Title'
                className='content-page-input'
              />
              <textarea
                name='content'
                onChange={handleChange}
                value={note.content}
                placeholder='Content'
                rows='5'
                className='content-page-textarea'
              />
            </form>
            <button
              onClick={handleUpdate}
              disabled={saving}
              className='content-page-btn content-page-btn-primary'
            >
              {saving ? 'Saving...' : 'Save'}
            </button>
            <button
              onClick={handleDelete}
              className='content-page-btn content-page-btn-danger'
            >
              Delete
            </button>
          </>
        )}
      </div>
    </div>
  )
}

export default ContentPage
