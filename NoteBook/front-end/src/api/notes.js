export const getAllNotes = async () => {
  const response = await fetch('http://localhost:3000/api/notes')
  if (!response.ok) {
    if (response.status === 429) {
      const error = new Error('Too many requests')
      error.status = 429
      throw error
    }
    throw new Error('Something went wrong')
  }
  return response.json()
}

export const getNoteById = async (id) => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`)
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return response.json()
}

export const createNote = async (note) => {
  const response = await fetch('http://localhost:3000/api/notes', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return response.json()
}

export const updateNote = async (id, note) => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(note),
  })
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return response.json()
}

export const deleteNote = async (id) => {
  const response = await fetch(`http://localhost:3000/api/notes/${id}`, {
    method: 'DELETE',
  })
  if (!response.ok) {
    throw new Error('Something went wrong')
  }
  return response.json()
}
