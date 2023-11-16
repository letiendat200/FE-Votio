import React, {useState } from 'react';
import axios from "axios";

export default function Survey() {

  const [title,setTitle] = useState(null);
  const [questions, setQuestions] = useState([{ question: '', answers: [''] }]);
  const [postResult, setPostResult] = useState(null);
  const [showResult, setShowResult] = useState(false);

  const handleTitleChange = (value) => {
    setTitle(value);
  }

  const handleQuestionChange = (index, value) => {
    const newQuestions = [...questions];
    newQuestions[index].question = value;

    setQuestions(newQuestions);
  };

  const handleAnswerChange = (questionIndex, answerIndex, value) => {
    const newQuestions = [...questions];
    newQuestions[questionIndex].answers[answerIndex] = value;
    
    if (answerIndex === newQuestions[questionIndex].answers.length - 1) {      
      newQuestions[questionIndex].answers.push('');
    }

    setQuestions(newQuestions);
  };  

  const addQuestion = () => {
    setQuestions([...questions, { question: '', answers: [''] }]);
  };

  const deleteQuestion = (questionIndex) => {
    const currentQuestions = [...questions];
    currentQuestions.splice(questionIndex, 1);
    setQuestions(currentQuestions);
  };
  
  const sendQuestions = async () => {
          if(title==null){
            alert("Please fill out the title");
          }
          else{
            if(questions=='' || questions[0].question == ''){
              alert("Please create at least 1 quention");
            }
            else{
              alert("Survey created!!");
              //       try {
              //         const response = await axios.post('https://jsonplaceholder.typicode.com/posts', {
              //         title: title,
              //         body: questions,
              //         userId: 10, 
              //       });    
              //         setPostResult(response.data);          
              //       } catch (error) {
              //         console.error('Error posting data:', error);
              //       }
            }
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
                <div className = "flex flex-col m-2 my-5 p-2 bg-gray-300">
                  <div className = "pr-2 self-end">
                    <button className="cursor-pointer" onClick = {()=>deleteQuestion(questionIndex)} > X </button>
                  </div>
                  <div className = "p-3 pr-10">
                    <input
                      type="text"
                      value={q.question}
                      onChange={(e) => handleQuestionChange(questionIndex, e.target.value)}
                      placeholder={`Question ${questionIndex + 1}`}
                      className="w-full p-2 border border-gray-300 outline-none placeholder-blue-800/60"/>
                    <div className = "mt-3 ml-10">                    
                      {q.answers.map((answer, answerIndex) => (
                        <input
                          key={answerIndex}
                          type="text"
                          value={answer}
                          onChange={(e) => handleAnswerChange(questionIndex, answerIndex, e.target.value)}
                          placeholder={`Answer ${answerIndex + 1}`}
                          className="w-full mt-2 p-2 border border-gray-300 outline-none placeholder-blue-800/60"                        
                        />
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
      <div className="flex justify-end">
        <button onClick={sendQuestions} className=" p-3 w-48 bg-gradient-to-r from-sky-400 to-blue-600 text-white text-lg tracking-wide rounded-md">
            Save Survey
        </button>        
      </div>     
    </div>        
  );
}



