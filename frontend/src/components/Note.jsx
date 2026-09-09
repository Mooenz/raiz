import PropTypes from 'prop-types';
import { useState } from 'react';

const Note = ({ id, content, important, toggleImportance, deleteNote }) => {
  const [isImportant, setIsImportant] = useState(important);

  const handleToggleImportance = () => {
    toggleImportance(id);
    setIsImportant(!isImportant);
  };

  const handleDeleteNote = () => {
    deleteNote(id);
  }

  return <li className='note'><span>{ content }</span> <button onClick={ handleToggleImportance }>{ isImportant ? 'make not important' : 'make important' }</button><button onClick={ () => handleDeleteNote(id) } style={ { marginLeft: '8px' } }>Delete</button></li>;
};

Note.propTypes = {
  id: PropTypes.number.isRequired,
  content: PropTypes.string.isRequired,
  important: PropTypes.bool.isRequired,
  toggleImportance: PropTypes.func.isRequired,
  deleteNote: PropTypes.func.isRequired,
};

export default Note;
