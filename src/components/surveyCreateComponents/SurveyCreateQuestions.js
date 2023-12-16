import React, {useState } from 'react';
import axios from "axios";
import Modal from './QuestionTypeModal';
import LoadingScreen from '../../utilities/LoadingScreen';

export default function SurveyCreateQuestions({getCookie}) {
  const apiUrl = process.env.REACT_APP_API_URL;
  const accessToken = getCookie("token");

  const [loading, setLoading] = useState(false);
  const [title,setTitle] = useState('');
  const [startTime, setStartTime] = useState(new Date().toISOString());
  const [endTime, setEndTime] = useState(new Date(new Date().getTime() + 1 * 24 * 60 * 60 * 1000).toISOString());
  const [electionCode, setElectionCode] = useState(null);
  
  
  const handleStartDateChange = (date) => {
    setStartTime(date.toISOString());
  };

  const handleEndDateChange = (date) => {
    setEndTime(date.toISOString());
  };
  const [isModalOpen, setModalOpen] = useState(false);
  const [questions, setQuestions] = useState([]);  

  //Updating the survey title
  const handleTitleChange = (value) => {
    setTitle(value);
  }

  //Updating the question content at the index number
  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].content = value;
    setQuestions(newQuestions);
  };

  //Updating choice content at the index number (needed both question index num and choice index num)
  const handleChoiceChange = (questionIndex, choiceIndex, value) => {
    const newQuestions = [...questions];
    const choiceQuantity = newQuestions[questionIndex].choices.length-1;
    newQuestions[questionIndex].choices[choiceIndex].content = value;
    
    //Update the number of choices
    newQuestions[questionIndex].choicesQuantity = choiceQuantity;

    //Updating the choice content at the index number
    if (choiceIndex === newQuestions[questionIndex].choices.length - 1 ) {      
      newQuestions[questionIndex].choices.push({content: ''});
    }

    setQuestions(newQuestions);
  };  

  //Pushing a new question into questions State
  const addQuestion = (kindOfQuestion) => {
    setQuestions([
      ...questions,
      {
        content: '',
        choicesQuantity: 0,
        isIdentity: false,
        kindQuestion: kindOfQuestion,
        choices: [{ content: '' }],
      },
    ]);
  };

  //Deleting the question at the question index number
  const deleteQuestion = (questionIndex) => {
    const currentQuestions = [...questions];
    currentQuestions.splice(questionIndex, 1);
    setQuestions(currentQuestions);
  };

  const deleteChoice = (questionIndex,choiceIndex) => {
    const currentQuestions = [...questions];
    currentQuestions[questionIndex].choices.splice(choiceIndex, 1);
    setQuestions(currentQuestions);
  };

  const isSurveyValid = () => {
    if (title.trim() === '') {
      alert('Please fill out the title');
      return false;
    }
    
    if(questions.length === 0){
      alert('Please make at least 1 question');
      return false;
    }

    if (!questions.every((q) => q.content.trim() !== '')) {
      alert('One or more question fields are empty. Please fill them out.');
      return false;
    }

    return true;
  };  

  const openModal = () => {
    setModalOpen(true);
  };

  const closeModal = () => {
    setModalOpen(false);
  };

  const sendQuestions = async () => {
    setLoading(true);
    if(isSurveyValid()){
      await axios({
        method: 'post',
        url: `${apiUrl}/v1/api/elections`,
        data: {                
          title: title,
          sharelink: "https://votio.com",
          startTime: startTime,
          endTime: endTime,
          questions: questions,  
        },
        headers: {
            'Authorization': `Bearer ${accessToken}`,
            'Content-Type': 'application/json',
            'Access-Control-Allow-Origin': '*',                
        },
    })
        .then(response => {
          alert("Election created!!");  
          setElectionCode(response.data.metadata.election.electionCode);
        })
        .catch(error => {
          alert(error);
        });
        setLoading(false);
    }  
  }; 


  return (
    <div className="flex flex-col m-5">
      {loading && (
        <LoadingScreen />
      )}
      {electionCode ? (
        <div> Election created! Here is your code to participate in voting: <span className="font-bold">{electionCode}</span> </div>
      ) : (
        <div>
          <div className="p-5 bg-gray-100 border border-zinc-300">
            <input
              type="text"
              value={title}
              onChange={(e) => handleTitleChange(e.target.value)}
              placeholder="Election title"
              className="w-full p-2 pl-4 border border-gray-300 text-lg rounded-sm block outline-none placeholder-blue-800/60" />
          </div>
          <div className="flex flex-row my-4 justify-around">
            <div className="flex flex-col bg-gray-100 border border-zinc-300">
              <div>Starting time:</div>
              <input
                type="datetime-local"
                value={startTime.slice(0, 16)}
                onChange={(e) => handleStartDateChange(new Date(e.target.value))}
                className="max-w-full h-[25px] p-2 border border-gray-300 text-lg rounded-sm block outline-none"
              />
            </div>
            <div className="flex flex-col bg-gray-100 border border-zinc-300">
              <div>Ending time:</div>
              <input
                type="datetime-local"
                value={endTime.slice(0, 16)}
                onChange={(e) => handleEndDateChange(new Date(e.target.value))}
                className="max-w-full h-[25px] p-2 border border-gray-300 text-lg rounded-sm block outline-none"
              />
            </div>
          </div>
          <div>
            {questions.map((q, questionIndex) => (
              <div key={questionIndex}>
                <div className="flex flex-col m-2 my-5 p-2 bg-gray-200">
                  <div className="pr-2 self-end">
                    <button className="cursor-pointer" onClick={() => deleteQuestion(questionIndex)} > X </button>
                  </div>
                  <div className="p-3 pr-10">
                    <input
                      type="text"
                      value={q.content}
                      onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                      placeholder={`Question ${questionIndex + 1}`}
                      className="w-full p-2 border border-gray-300 outline-none placeholder-blue-800/60" />
                    <div className="mt-3 ml-10">
                      {q.choices.map((choice, choiceIndex) => (
                        <div key={choiceIndex} className="flex">
                          <input
                            type="text"
                            value={choice.content}
                            onChange={(e) => handleChoiceChange(questionIndex, choiceIndex, e.target.value)}
                            placeholder={`Choice ${choiceIndex + 1}`}
                            className="w-full mt-2 p-2 border border-gray-300 outline-none placeholder-blue-800/60"
                          />
                          <div className="relative self-center left-4 cursor-pointer" onClick={() => deleteChoice(questionIndex, choiceIndex)}>X</div>
                        </div>
                      ))}
                    </div>
                  </div>

                </div>
              </div>
            ))
            }
          </div>
          <div className="flex justify-center mx-2 mt-2 mb-5">
            <button onClick={openModal} className=" p-5 w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white text-2xl font-medium tracking-wide rounded-md">
              +  ADD QUESTION
            </button>
          </div>
          <Modal isOpen={isModalOpen} onClose={closeModal} onAddQuestion={addQuestion} />
          <div className="flex justify-between px-2">
            <button className=" px-5 py-2 w-fit h-fit bg-gray-100 border border-gray-300 text-blue-500 text-md tracking-wide hover:bg-cyan-50 hover:border-blue-400">
              New Survey
            </button>
            <button onClick={sendQuestions} className=" px-10 py-2 w-fit h-fit bg-gradient-to-r from-sky-400 to-blue-600 text-white text-lg tracking-wide rounded-md">
              Save Survey
            </button>
          </div>
        </div>
      )}
    </div>
  );
}