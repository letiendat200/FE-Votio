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
      <div className="p-8 bg-gray-200">
        <div className=" w-fit p-2 text-lg font-bold bg-black text-white border border-2 border-black">
          Kết quả bỏ phiếu: 
        </div>
        <div>
          { questions.map((question,questionIndex)=>(
              <div key={questionIndex} className = "flex flex-col my-10 bg-white border-2 border-amber-100 rounded-lg">
                <div className = "self-center m-4 uppercase text-2xl font-bold "> 
                <span className = "m-4">Q{questionIndex+1}: </span>{question.content} 
                </div>
                <div className = "max-h-fit min-h-min my-10">
                  <VoteChart choices={question.choices} id={questionIndex}/>
                </div>
                <div className = "relative m-2 left-1/3 font-bold text-xl">Kết quả thống kê: </div>
                <div className = "self-center m-2 font-semibold text-lg">                  
                  {question.choices.map((choice,choiceIndex)=>(
                    <div className="flex justify-between">
                      <div className = "relative -left-4">{choice.content} : </div>
                      <div className = "relative -right-4">{choice.number} phiếu</div>
                    </div>
                  ))}
                </div>
              </div>
          ))}   
        </div>
          
      </div>
      );
};

export default SurveyResult;