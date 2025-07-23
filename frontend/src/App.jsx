import { useState, useEffect } from 'react';
import Note from './components/Note';
import noteService from './services/notes'
import Notification from './components/Notification';
import Footer from './components/Footer';

const App = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState('');
  const [showAll, setShowAll] = useState(true);
  const [errorMessage, setErrorMessage] = useState('some error happened...')

  useEffect(() => {
    noteService
      .getAll()
      .then(initialNotes => {
        setNotes(initialNotes)
      })
  }, [])


  const addNote = (event) => {
    event.preventDefault();
    const noteObject = {
      content: newNote,
      important: Math.random() < 0.5,
      id: notes.length + 1,
    };

    noteService
      .create(noteObject)
      .then(returnedNote => {
        setNotes(notes.concat(returnedNote))
        setNewNote('')
        setErrorMessage(`Added note: ${returnedNote.content}`, false, true);
      })

  };

  const handleNoteChange = (event) => {
    setNewNote(event.target.value);
  };

  const toggleImportanceOf = id => {
    const note = notes.find(n => n.id === id)
    const changedNote = { ...note, important: !note.important }

    noteService
      .update(id, changedNote)
      .then(returnedNote => {
        setNotes(notes.map(note => note.id !== id ? note : returnedNote))
      }).catch(() => {
        setErrorMessage(
          `Note '${note.content}' was already removed from server`,
          true,
          true
        )
        setNotes(notes.filter(n => n.id !== id))
      })
  }
  const noteToShow = showAll ? notes : notes.filter((note) => note.important);

  return (
    <>
      <h1>Notes</h1>
      <Notification message={ errorMessage } />

      <button onClick={ () => setShowAll(!showAll) }>show { showAll ? 'important' : 'all' }</button>

      <ul>
        { noteToShow.map((note) => (
          <Note key={ note.id } note={ note.content } toggleImportance={ () => toggleImportanceOf(note.id) } />
        )) }
      </ul>

      <form onSubmit={ addNote }>
        <input value={ newNote } onChange={ handleNoteChange } />
        <button type="submit">save</button>
      </form>

      <Footer />
    </>
  );
};


export default App;
