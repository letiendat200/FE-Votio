import React, { useState, useEffect, useRef } from 'react';
import {useNavigate, useParams} from 'react-router-dom'

const SurveyQuestion = ({ questions, choicesResponse, setChoicesResponse }) => {
    const { id } = useParams();

    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState({});    
    const isInitialMount = useRef(true);

    useEffect(() => {
      if (isInitialMount.current) {
        
        isInitialMount.current = false;
      } else {
        console.log(choicesResponse);       
      }
    }, [choicesResponse]);
    
    const handleNext = () => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1);
      } else {
          const updatedChoicesResponse = questions.map((question, index) => {
            const selectedChoiceIndices = selectedChoices[index];
    
            if (selectedChoiceIndices && selectedChoiceIndices.length > 0) {
              const selectedChoicesContent = selectedChoiceIndices.map(
                (choiceIndex) => question.choices[choiceIndex].choiceID
              );
    
              return {
                questionID: question.questionID,
                choices: selectedChoicesContent.map((choiceID) => ({ choiceID })),
              };
            }
    
            return null; 
          });
    
          updatedChoicesResponse.filter((response) => response !== null);
          const finalResponse = {
            answers: updatedChoicesResponse,
          }
          setChoicesResponse(finalResponse);
          
        }
      };
  
    const handlePrev = () => {
      if (currentQuestionIndex > 0) {
        setCurrentQuestionIndex(currentQuestionIndex - 1);
      }
    };

    const handleChoiceClick = (index) => {
      const newSelectedChoices = { ...selectedChoices };
  
      newSelectedChoices[currentQuestionIndex] = newSelectedChoices[currentQuestionIndex] || [];
      
      const isChoiceSelected = newSelectedChoices[currentQuestionIndex].includes(index);
  
      if (questions[currentQuestionIndex].kindQuestion === 1) {       
        newSelectedChoices[currentQuestionIndex] = [index];
      } else {        
        if (isChoiceSelected) {
          newSelectedChoices[currentQuestionIndex] = newSelectedChoices[currentQuestionIndex].filter((i) => i !== index);
        } else {          
          newSelectedChoices[currentQuestionIndex].push(index);
        }
      }
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
  const [choicesResponse, setChoicesResponse] = useState([]);  
  const elections = 
    {
      electionID: 6,
      electionTitle: "Testing thôi em",
      questionQuantity: 3,
      startTime: null,
      endTime: null,
      data: [
          {
            questionID: 6,
            content: "First letter of the alphabet",
            kindQuestion: 1,
            numberOfAnswer: 4,
            choices: [
                {
                    choiceID: 68,
                    content: "A",
                    numberOfVote: 3
                },
                {
                    choiceID: 69,
                    content: "B",
                    numberOfVote: 3
                },
                {
                    choiceID: 71,
                    content: "C",
                    numberOfVote: 0
                },
                {
                    choiceID: 72,
                    content: "D",
                    numberOfVote: 0
                }
            ]
          },
          {
            questionID: 7,
            content: "RGB consist of what color",
            kindQuestion: 2,
            numberOfAnswer: 3,
            choices: [
                {
                    choiceID: 73,
                    content: "Red",
                    numberOfVote: 3
                },
                {
                    choiceID: 74,
                    content: "Blue",
                    numberOfVote: 3
                },
                {
                    choiceID: 75,
                    content: "Green",
                    numberOfVote: 0
                },               
            ]
          },         
          {
            questionID: 8,
            content: "Which option",
            kindQuestion: 2,
            numberOfAnswer: 5,
            choices: [
                {
                    choiceID: 78,
                    content: "Option 1",
                    numberOfVote: 3
                },
                {
                    choiceID: 79,
                    content: "Option 2",
                    numberOfVote: 1
                },
                {
                    choiceID: 80,
                    content: "Option 3",
                    numberOfVote: 0
                },
                {
                    choiceID: 81,
                    content: "Option 4",
                    numberOfVote: 0
                },
                {
                    choiceID: 82,
                    content: "Option 5",
                    numberOfVote: 4
                }
            ]
          }
      ]
};


  return  <SurveyQuestion
            questions={elections.data}
            choicesResponse={choicesResponse}
            setChoicesResponse={setChoicesResponse}
          />  
};

export default Survey;
