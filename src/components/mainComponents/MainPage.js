import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './MainPage.css';
const MainPage = () => {
  const [surveyCode, setSurveyCode] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (event) => {
    setSurveyCode(event.target.value);
  };

  const handleNavigate = () => {
    if (surveyCode.trim() !== '') {
      navigate(`/survey?code=${surveyCode}`);
    }
  };

  const handleKeyPress = (event) => {
    if (event.key === 'Enter') {
      handleNavigate();
    }
  };

  return (
    <div className="main-page max-h-full min-h-screen py-16 flex flex-col">
      <div className="mx-auto mb-8 text-3xl"><span className="subtitle">Welcome to </span><span className="title">VOTIO</span></div>
      <div className="form-box flex flex-col max-w-[90%] min-w-fit mx-auto border border-4 rounded-lg">
        <input
          type="text"
          placeholder="Enter Code"
          value={surveyCode}
          onChange={handleInputChange}
          onKeyPress={handleKeyPress}
          className='input-field-main-page self-center max-w-[90%] min-w-fit border border-2 rounded-md text-center font-bold'
        />
        <button className='submit-button self-center max-w-[90%] min-w-fit rounded-lg font-bold' onClick={handleNavigate}>Go to Survey</button>
      </div>
    </div>
  );
};

export default MainPage;