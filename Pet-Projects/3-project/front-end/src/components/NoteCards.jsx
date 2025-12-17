import React from 'react'
import './styles/NoteCards.css'

import { MdEdit } from 'react-icons/md'
import { MdDeleteForever } from 'react-icons/md'
import { Link } from 'react-router'
import { deleteNote } from '../api/notes'

const NoteCards = ({ notes }) => {
  const handleDelete = async (id) => {
    console.log(id)
    try {
      await deleteNote(id)
      window.location.reload()
    } catch (error) {
      console.error('Failed to delete note:', error)
    }
  }
  return (
    <div className='note-cards-container'>
      {notes.map((note) => (
        <div key={note._id} className='note-card'>
          <Link to={`/note/${note._id}`} className='note-card-content-link'>
            <div className='note-card-content'>
              <h3 className='note-card-title'>{note.title}</h3>
              <p className='note-card-text'>{note.content}</p>
            </div>
          </Link>

          <div className='note-card-footer'>
            <div className='note-card-date'>
              <p>{new Date(note.date).toLocaleString()}</p>
            </div>
            <div className='note-card-actions'>
              <Link
                to={`/note/${note._id}`}
                className='note-card-link'
              >
                <MdEdit />
              </Link>
              <button
                onClick={() => handleDelete(note._id)}
                className='note-card-button'
              >
                <MdDeleteForever />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  )
}

export default NoteCards
