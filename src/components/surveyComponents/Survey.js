import React, { useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom'

const SurveyQuestion = ({ questions }) => {
    const { id } = useParams();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState({});
  
    const handleNext = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);       
      }
    };
  
    const handlePrev = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };

    const handleChoiceClick = (index) => {
      // Create a copy of the selected choices object
      const newSelectedChoices = { ...selectedChoices };
  
      // Toggle the selection status of the clicked choice
      newSelectedChoices[currentQuestionIndex] =
        newSelectedChoices[currentQuestionIndex] || [];
      const isChoiceSelected = newSelectedChoices[currentQuestionIndex].includes(
        index
      );
  
      if (questions[currentQuestionIndex].type === '1') {
        // For type 1, only allow one choice to be selected
        newSelectedChoices[currentQuestionIndex] = [index];
      } else {
        // For type 2, allow multiple choices to be selected
        if (isChoiceSelected) {
          // If already selected, remove it
          newSelectedChoices[currentQuestionIndex] = newSelectedChoices[
            currentQuestionIndex
          ].filter((i) => i !== index);
        } else {
          // If not selected, add it
          newSelectedChoices[currentQuestionIndex].push(index);
        }
      }
  
      // Update the state with the new selected choices
      setSelectedChoices(newSelectedChoices);
    };
  
    const isLastQuestion = currentQuestionIndex === questions.length - 1;
    const isFirstQuestion = currentQuestionIndex === 0;
  
    return (
      <div className = "max-h-full min-h-screen py-16 flex flex-col bg-gradient-to-b from-purple-300 to-red-300 ">
          <div className = "flex flex-col max-w-screen-xl w-10/12 mx-auto pt-12 pb-12 px-16 bg-white rounded-lg">
            <div className = "self-center text-2xl my-6 font-medium"> 
                {questions[currentQuestionIndex].content} 
            </div>
            <div className="grid grid-cols-2 gap-4 mt-6">                
                {questions[currentQuestionIndex].choices.map((choice, index) => (
                    <div 
                        key={index}                        
                        onClick={() => handleChoiceClick(index)}
                        className={`${
                          selectedChoices[currentQuestionIndex]?.includes(index) ? 'border-green-500 shadow-lg' : ''
                        } border-2 py-2 px-4 border-2 rounded text-lg cursor-pointer hover:shadow-lg`}                      
                    >
                        {choice.content}
                    </div>
                ))}
            </div>
            <div className="grid grid-cols-2 mt-10">
                {isFirstQuestion ? null : (
                    <button
                        onClick={handlePrev}
                        className="col-start-1 justify-self-start bg-black text-white text-xl font-bold py-4 px-10 rounded mr-2"
                    >
                        Prev
                    </button>
                )}
                    <button
                        onClick={handleNext}
                        className="col-start-2 justify-self-end bg-black text-white text-xl font-bold py-4 px-10 rounded "
                    >
                        {isLastQuestion ? 'Finish' : 'Next'}
                    </button>
            </div>
          </div>         
      </div>
    );
};

const Survey = () => {
  const questions = [
    {
      content: 'Question 1',
      type: '1',
      choices: [
        { content: 'A' },
        { content: 'B' },
        { content: 'C' },
        { content: 'D' },
      ],
    },
    {
      content: 'Question 2',
      type: '2',
      choices: [
        { content: 'Red' },
        { content: 'Green' },
        { content: 'Blue' },
        { content: 'Yellow' },
      ],
    },
  ];

  return <SurveyQuestion questions={questions} />;
};

export default Survey;
