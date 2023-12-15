import React from 'react';
import Button from './Button';

const ViewAllButton = () => {
    const handleClick = () => {
        console.log('View all button clicked!');
    };

    return (
        <div className="view-all-button">
        <Button text="View all notes" onClick={handleClick} />
        </div>
    );
};

export default ViewAllButton;