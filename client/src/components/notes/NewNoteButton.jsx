import { useState, useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import NewNote from './NewNote';

const NewNoteButton = () => {
    const [isOpen, setIsOpen] = useState(false);

    const handleOpen = () => {
        setIsOpen(true);
    };

    const handleClose = () => {
        setIsOpen(false);
    };

    useEffect(() => {
        const handleEsc = (event) => {
            if (event.keyCode === 27) handleClose();
        };
        window.addEventListener('keydown', handleEsc);

        return () => {
            window.removeEventListener('keydown', handleEsc);
        };
    }, []);

    return (
        <>
        <button onClick={handleOpen} className="btn btn-accent">
            <FontAwesomeIcon icon={faPlus} /> New Note
        </button>
    {isOpen && (
                <div className="modal modal-open" onClick={handleClose}>
                    <div className="modal-box" onClick={e => e.stopPropagation()}>
                        <NewNote cancel={handleClose} />
                    </div>
                </div>
            )}
        </>
    );
};

export default NewNoteButton;