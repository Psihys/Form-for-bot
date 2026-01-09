import { useState } from 'react'
import React from 'react'
import './styles/CreatePage.css'
import { createNote } from '../api/notes'

const CreatePage = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e) => {
    e.preventDefault()
    setLoading(true)

    const note = {
      title: title,
      content: description,
    }

    if (!note.title || !note.content) {
      alert('Please fill in all fields')
      setLoading(false)
      return
    }

    try {
      await createNote(note)
      setTitle('')
      setDescription('')
    } catch (error) {
      console.error('Failed to create note:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className='createpage-container'>
      <form className='create-form' onSubmit={handleSubmit}>
        <h1>Create Note</h1>
        <input
          type='text'
          placeholder='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder='Description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <button type='submit' disabled={loading}>
          {loading ? 'Creating...' : 'Create'}
        </button>
      </form>
    </div>
  )
}

export default CreatePage
