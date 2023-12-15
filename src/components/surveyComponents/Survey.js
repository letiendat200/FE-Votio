import React, { useState, useEffect } from 'react';
import {useLocation} from 'react-router-dom';
import LoadingScreen from '../../utilities/LoadingScreen';
import axios from 'axios';
import './Survey.css';

const SurveyQuestion = ({ electionID, questions, setElectionDone }) => {   
    const [loading, setLoading] = useState(false);
    const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
    const [selectedChoices, setSelectedChoices] = useState({});     
       
    const handleNext = async () => {
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
          setLoading(true);
          await axios({
            method: 'post',
            url: `https://votio.onrender.com/v1/api/elections/${electionID}/vote`,
            data: {                
                answers: updatedChoicesResponse,
            },            
          })
            .then(response => {
              setElectionDone(true);
            })
            .catch(error => {                
                alert(error);
            });
          setLoading(false);          
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
      <div>
        {loading && (    
            <LoadingScreen/>
        )}
        <div className="self-center text-2xl my-6 font-medium">
          {questions[currentQuestionIndex].content}
        </div>
        <div className="grid grid-cols-2 gap-4 mt-6">
          {questions[currentQuestionIndex].choices.map((choice, index) => (
            <div
              key={index}
              onClick={() => handleChoiceClick(index)}
              className={`${selectedChoices[currentQuestionIndex]?.includes(index) ? 'border-green-500 shadow-lg' : ''
                } min-w-fit border-2 py-2 px-4 border-2 rounded text-lg cursor-pointer hover:shadow-lg`}
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
    );
};

const Survey = () => {
  const [loading, setLoading] = useState(true);
  const [electionData,setElectionData] = useState(null);
  const [errorMessage, setErrorMessage] = useState("Sorry but the code you entered doesn't exist");
  const [electionDone,setElectionDone] = useState(false);
  const location = useLocation();

  useEffect(() => { 
    const searchParams = new URLSearchParams(location.search);
    const code = searchParams.get('code');

    async function fetchData() {
      await axios.get(`https://votio.onrender.com/v1/api/elections/code/${code}`)
        .then(response => {
          setElectionData(response.data.metadata);          
        })
        .catch(error => {
          setErrorMessage(`Error: ${error.response.data.message.message}`);
        });
        setLoading(false);
      }
    fetchData();
  }, []); 

  return(
    <div className="survey-page max-h-full min-h-screen py-16 flex flex-col">
      {loading ? (
        <LoadingScreen />
      ) : (
        <div>
          { (electionData === null) ? (
            <div className="flex flex-col max-w-screen-xl w-[75%] mx-auto pt-12 pb-12 px-16 bg-white rounded-lg">
              <div>{errorMessage}</div>
            </div>
          ) : (
            <div>
              {electionDone ? (
                <div className="flex flex-col max-w-screen-xl w-[75%] mx-auto pt-12 pb-12 px-16 bg-white rounded-b-lg">THE END! THANK YOU FOR PARTICIPATING</div>
              ):(
                <div className="flex flex-col items-center"> 
                  <div className="survey-title max-w-[70%] rounded-t-lg font-extrabold text-2xl p-2">{electionData.title}</div>
                  <div className="flex flex-col max-w-screen-xl w-[75%] mx-auto pt-12 pb-12 px-16 bg-white rounded-b-lg">
                    <SurveyQuestion
                    electionID={electionData.electionID}
                    questions={electionData.questions}
                    setElectionDone={setElectionDone}
                    />
                  </div>
                </div>
              )}
              
            </div>
          )}
        </div>
      )}
    </div>
  )  
};

export default Survey;