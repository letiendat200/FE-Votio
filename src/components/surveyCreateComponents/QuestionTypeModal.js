import React from 'react';

const Modal = ({ isOpen, onClose, onAddQuestion }) => {
  const handleAddQuestion = (kindOfQuestion) => {
    onAddQuestion(kindOfQuestion);
    onClose();
  };

  return isOpen ? (
    <div className="modal-overlay mb-4 p-2 border border-2">
      <div className="modal">
        <div className="flex flex-col modal-header">
          <span onClick={onClose} className="close-button font-black self-end hover:cursor-pointer">
            &times;
          </span>
        </div>
        <div className="modal-content">
          <div className="p-2 border-r-2 border-b-2 hover:bg-slate-700 hover:text-white hover:cursor-pointer" onClick={() => handleAddQuestion(1)}>Single Choice Question</div>
          <div className="p-2 border-r-2 border-b-2 hover:bg-slate-700 hover:text-white hover:cursor-pointer" onClick={() => handleAddQuestion(2)}>Multiple Choice Question</div>
          {/* Add more question types as needed */}
        </div>
      </div>
    </div>
  ) : null;
};

export default Modal;
