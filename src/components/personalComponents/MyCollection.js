import React from 'react';
import { useNavigate  } from 'react-router-dom';
import './MyCollection.css';
const MyCollection = () =>{
    const navigate = useNavigate();
    const surveys = [
        {   
            id: 1,
            title: 'Bầu cử Quốc Hội',       
            numberOfQuestions:  4,
        },
        {
            id: 2,
            title: 'Bầu cử Quốc Hội lần 2',        
            numberOfQuestions:  6,
        },
    ];
        
    return (        
        <div className="max-h-full min-h-screen bg-white">
            <div>Navbar</div>
            <div className = "mx-20 my-20">
                <div className = "mb-4 text-2xl font-bold text-black">SURVEY LIST</div>
                <div className = "flex flex-col">
                {surveys.map((survey,surveyIndex)=>(
                    <div className = "grid grid-cols-6 gap-4">
                        <div className = "col-span-1 border-r-2">
                            Circle
                        </div>
                        <div className = "col-span-5 survey-section ">
                            <div  onClick={()=>{navigate(`./${survey.id}`)}}
                            className = "survey-box-div flex flex-col w-full my-4 px-8 py-4 border border-black font-semibold hover:cursor-pointer hover:shadow-lg">
                                <div className = "grid grid-cols-12 gap-2">
                                    <div className = "col-span-11">
                                        <div>Tựa đề khảo sát: <span className="ml-5 uppercase font-bold text-lg text-sky-900">{survey.title}</span></div>
                                        <div>Tổng số câu hỏi: <span className="ml-5">{survey.numberOfQuestions}</span> </div>
                                        <div>Thời gian bắt đầu: </div>
                                        <div>Thời gian kết thúc:</div>
                                    </div>
                                    <div className = "col-span-1 justify-self-end self-center">
                                        <span className="arrow">&#9658;</span>
                                    </div>   
                                </div>                                
                            </div>
                        </div>                                       
                    </div>                    
                ))}
                </div>
            </div>
        </div>
    );
}

export default MyCollection;