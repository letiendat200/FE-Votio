import React from 'react';

const Modal = ({ isOpen, onClose, onAddQuestion }) => {
  const handleAddQuestion = (kindOfQuestion) => {
    onAddQuestion(kindOfQuestion);
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay">
      <div className="modal">
        <div className="modal-header">
          <span onClick={onClose} className="close-button">
            &times;
          </span>
        </div>
        <div className="modal-content">
          <div onClick={() => handleAddQuestion(1)}>Text Question</div>
          <div onClick={() => handleAddQuestion(2)}>Multiple Choice Question</div>
          {/* Add more question types as needed */}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
