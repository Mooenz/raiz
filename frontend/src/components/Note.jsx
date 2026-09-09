import PropTypes from 'prop-types';
import { useState } from 'react';

const Note = ({ note, toggleImportance, important }) => {
  const [isImportant, setIsImportant] = useState(important);

  const handleToggleImportance = () => {
    toggleImportance(note.id);
    setIsImportant(!isImportant);
  };

  return <li className='note'><span>{ note }</span> <button onClick={ handleToggleImportance }>{ isImportant ? 'make not important' : 'make important' }</button><button style={{ marginLeft: '8px' }}>Delete</button></li>;
};

Note.propTypes = {
  note: PropTypes.string.isRequired,
  toggleImportance: PropTypes.func.isRequired,
  important: PropTypes.bool.isRequired,
};

export default Note;
