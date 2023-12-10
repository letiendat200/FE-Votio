import React, {useState } from 'react';
import axios from "axios";

export default function SurveyCreateQuestions() {

  const [title,setTitle] = useState('');
  const [postResponse,setPostResponse] = useState('');  
  const [questions, setQuestions] = useState([
    {
      content: '',
      choicesQuantity: 0,
      isIdentity: false,
      kindQuestion: 1,
      choices: [{ content: '' }],
    },
  ]);  

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
  const addQuestion = () => {
    setQuestions([
      ...questions,
      {
        content: '',
        choicesQuantity: 0,
        isIdentity: false,
        kindQuestion: 1,
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

  //Checking the criteria of the survey (Must update further if needed)
  const isSurveyValid = () => {
    //Check if there is a title
    if (title.trim() === '') {
      alert('Please fill out the title');
      return false;
    }
    
    //Check if there is atleast one question
    if(questions.length === 0){
      alert('Please make at least 1 question');
      return false;
    }

    // Check if all question input fields are filled out
    if (!questions.every((q) => q.content.trim() !== '')) {
      alert('One or more question fields are empty. Please fill them out.');
      return false;
    }

    return true;
  };
  
  //Testing sending data to API sever using axios
  const sendQuestions = async () => {
    if(isSurveyValid()){
          try {
          const response = await axios.post('https://jsonplaceholder.typicode.com/letiendat200/API-testing-/posts', {
            title: title,
            questions: questions,             
          });    
          setPostResponse(response);                 
          } catch (error) {
            console.error('Error posting data:', error);
          }
      alert("Survey created!!");  
      console.log(postResponse);    
    }  
  }; 


  return (
    <div className = "flex flex-col m-5">
      <div className = "p-5 bg-gray-100 border border-zinc-300">        
        <input 
          type="text"           
          value={title}
          onChange={(e) => handleTitleChange(e.target.value)} 
          placeholder="Survey title"
          className="w-full p-2 pl-4 border border-gray-300 text-lg rounded-sm block outline-none placeholder-blue-800/60"/>
      </div>      
      <div>      
        {questions.map((q, questionIndex) => (
            <div key={questionIndex}>
                <div className = "flex flex-col m-2 my-5 p-2 bg-gray-200">
                  <div className = "pr-2 self-end">
                    <button className="cursor-pointer" onClick = {()=>deleteQuestion(questionIndex)} > X </button>
                  </div>
                  <div className = "p-3 pr-10">
                    <input
                      type="text"
                      value={q.content}
                      onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                      placeholder={`Question ${questionIndex + 1}`}
                      className="w-full p-2 border border-gray-300 outline-none placeholder-blue-800/60"/>
                    <div className = "mt-3 ml-10">                    
                      {q.choices.map((choice, choiceIndex) => (
                        <div key={choiceIndex} className= "flex">
                          <input                            
                            type="text"
                            value={choice.content}
                            onChange={(e) => handleChoiceChange(questionIndex, choiceIndex, e.target.value)}
                            placeholder={`Choice ${choiceIndex + 1}`}
                            className="w-full mt-2 p-2 border border-gray-300 outline-none placeholder-blue-800/60"                        
                          />
                          <div className="relative self-center left-4 cursor-pointer" onClick = {()=>deleteChoice(questionIndex,choiceIndex)}>X</div>
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
        <button onClick={addQuestion} className=" p-5 w-full bg-gradient-to-r from-orange-500 to-pink-600 text-white text-2xl font-medium tracking-wide rounded-md">
            +  ADD QUESTION
        </button>
      </div>
      <div className="flex justify-between px-2">        
        <button className=" px-5 py-2 w-fit h-fit bg-gray-100 border border-gray-300 text-blue-500 text-md tracking-wide hover:bg-cyan-50 hover:border-blue-400">
            New Survey
        </button>
        <button onClick={sendQuestions} className=" px-10 py-2 w-fit h-fit bg-gradient-to-r from-sky-400 to-blue-600 text-white text-lg tracking-wide rounded-md">
            Save Survey
        </button>        
      </div>      
      {postResponse !==''&& (
        <div>THis is what you want</div>
      )}
    </div>        
  );
}