import React,{useState, useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from "axios";
import './MyCollection.css';
import LoadingScreen from '../../utilities/LoadingScreen';
const MyCollection = ({getCookie}) =>{   
    const apiUrl = process.env.REACT_APP_API_URL;
    const accessToken = getCookie("token");
    const navigate = useNavigate();
    const [elections,setElections] =useState(); 
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{     
        async function fetchData(){            
            await axios.get(`${apiUrl}/v1/api/elections`,{                   
            headers: {
                Authorization: `Bearer ${accessToken}`,                          
            },
        })
            .then(response => {
                const electionData = response.data.metadata;  
                setElections(electionData);
                setLoading(false);
            })
            .catch(error => {
              alert(error);
            });
        }
        fetchData();
    },[]);     

    const electionEnded = (endTime) =>{
        const currentDate = new Date();
        const dateFromTimestamp = new Date(endTime);        
        return dateFromTimestamp >= currentDate;
    }
        
    return (        
        <div className="max-h-full min-h-screen bg-white">
            <div className="mx-20 my-20">
                <div className="mb-4 text-2xl font-bold text-black">SURVEY LIST</div>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <div className="flex flex-col">
                        {elections.map((election) => (
                            <div key={election.electionID} className="grid grid-cols-6 gap-4 m-2">
                                <div className="grid justify-center col-span-1 border-r-2 border-t-2 border-b-2 rounded-lg">
                                    <div className="self-center jutify-self-center">
                                        {electionEnded(election.endTime) ? (
                                            <div className="flex flex-col">
                                                <span className="outline-draw self-center">
                                                    <div className="checkmark_circle"></div>
                                                    <div className="checkmark_stem"></div>
                                                    <div className="checkmark_kick"></div>
                                                </span>
                                                <div className="ended-text">The election is still going</div>
                                            </div> 
                                        ) : (
                                            <div className="flex flex-col justify-between">
                                                <span className="outline-draw self-center">
                                                    <div className="crossmark_circle"></div>
                                                    <div className="crossmark_line"></div>
                                                </span>
                                                <div className="ended-text">The election has expired</div>
                                            </div>                                            
                                        )}
                                    </div>
                                </div>
                                <div className="col-span-5 survey-section ">
                                    <div onClick={() => { navigate(`./${election.electionID}`) }}
                                        className="survey-box-div flex flex-col w-full px-8 py-4 border border-black font-semibold hover:cursor-pointer hover:shadow-lg">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-11">
                                                <div>Tựa đề khảo sát: <span className="ml-5 uppercase font-bold text-lg text-sky-900">{election.title}</span></div>
                                                <div>Code tham gia: <span className="ml-5 font-extrabold">{election.electionCode}</span> </div>
                                                <div>Tổng số câu hỏi: <span className="ml-5">{election.questionQuantity}</span> </div>
                                                <div>Thời gian bắt đầu: <span className="ml-5">{election.startTime}</span> </div>
                                                <div>Thời gian kết thúc:<span className="ml-5">{election.endTime}</span> </div>
                                                
                                            </div>
                                            <div className="col-span-1 justify-self-end self-center">
                                                <span className="arrow">&#9658;</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
}

export default MyCollection;