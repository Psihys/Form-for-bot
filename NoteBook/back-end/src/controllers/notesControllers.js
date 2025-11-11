import Note from '../models/Note.js'


export const getAllNotes = async (req, res) => {
  try {
    const notes = await Note.find().sort({ date: -1 })

    if (!notes || notes.length === 0) {
      return res.status(404).json({ message: 'No notes found' })
    }

    res.status(200).json(notes)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error, cannot fetch notes' })
  }
}

export const getNoteById = async (req, res) => {
  try {
    const noteById = await Note.findById(req.params.id)

    if (!noteById) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json(noteById)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error, cannot fetch note' })
  }
}

export const createNote = async (req, res) => {
  try {
    const { title, content } = req.body
    const note = new Note({ title, content })

    const savedNote = await note.save()
    res.status(201).json(savedNote)
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error, cannot create note' })
  }
}

export const updateNote = async (req, res) => {
  try {
    const { title, content } = req.body
    const updatedNote = await Note.findByIdAndUpdate(
      req.params.id,
      { title, content, date: new Date() },
      { new: true }
    )

    if (!updatedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json({ message: 'Note updated' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error, cannot update note' })
  }
}

export const deleteNote = async (req, res) => {
  try {
    const deletedNote = await Note.findByIdAndDelete(req.params.id)

    if (!deletedNote) {
      return res.status(404).json({ message: 'Note not found' })
    }

    res.status(200).json({ message: 'Note deleted' })
  } catch (error) {
    console.error(error)
    res.status(500).json({ message: 'Server error, cannot delete note' })
  }
}
