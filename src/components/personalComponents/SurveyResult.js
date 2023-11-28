import React from 'react';
import VoteChart from './VoteChart';

const SurveyResult = () => {
    const questions = [
      {
        content : "Tên nào đẹp nhất?",
        choices : 
        [
          { 
            content: 'Nguyễn Công Trứ', 
            number: 88,
          },
          { content: 'Hồ Xuân Thanh', 
            number: 27 
          },
          { content: 'Hồ Hoàng Mã Thanh Tự ', 
            number: 50 
          },
        ],        
      },
      {
        content : "Số nào xấu nhất?",
        choices : 
        [
          { 
            content: '13', 
            number: 22,
          },
          { content: '666', 
            number: 101 
          },
          { content: '4', 
            number: 14 
          },
        ],
      },  
      {
        content : "Howwwwwwwwww?",
        choices : 
        [
          { 
            content: 'Help', 
            number: 22,
          },
          { content: 'me', 
            number: 101 
          },
          { content: 'pleasnse', 
            number: 14 
          },
          {
            content: 'why are you laike thius bveo',
            number: 30,
          },
        ],
      },            
    ];
    
    return (
      <div>
          { questions.map((question,questionIndex)=>(
              <div key={questionIndex}>
                <div> {question.content} </div>
                  <VoteChart choices={question.choices} id={questionIndex}/>
              </div>
          ))}   
      </div>
      );
};

export default SurveyResult;