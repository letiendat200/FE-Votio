import React, {useState } from 'react';

let nextId = 0;  

export default function Survey() {

  const [questions,setQuestions] = useState([]);

  const addSection = () => {
    setQuestions([
      ...questions,
      nextId++
    ])
  }

  return (
    <div>
      <ul>
        { questions.map(question => (
          <li key={question}>
             <input/>
          </li>
        ))
        }
        </ul>
        <button onClick={addSection}>Load Section</button>      
    </div>
    
  );
}
