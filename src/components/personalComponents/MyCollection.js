import React,{useState, useEffect} from 'react';
import { useNavigate  } from 'react-router-dom';
import axios from "axios";
import './MyCollection.css';
import LoadingScreen from '../../utilities/LoadingScreen';
const MyCollection = ({getCookie}) =>{   
    const accessToken = getCookie("token");
    const navigate = useNavigate();
    const [elections,setElections] =useState(); 
    const [loading, setLoading] = useState(true);
    
    useEffect(() =>{     
        async function fetchData(){            
            await axios.get("https://votio.onrender.com/v1/api/elections",{                   
            headers: {
                Authorization: `Bearer ${accessToken}`,                          
            },
        })
            .then(response => {
                const electionData = response.data.metadata;   
                console.log(electionData); 
                setElections(electionData);
                setLoading(false);
            })
            .catch(error => {
              alert(error);
            });
        }
        fetchData();
    },[]);     
        
    return (        
        <div className="max-h-full min-h-screen bg-white">
            <div className="mx-20 my-20">
                <div className="mb-4 text-2xl font-bold text-black">SURVEY LIST</div>
                {loading ? (
                    <LoadingScreen />
                ) : (
                    <div className="flex flex-col">
                        {elections.map((election) => (
                            <div key={election.electionID} className="grid grid-cols-6 gap-4">
                                <div className="col-span-1 border-r-2">
                                    Circle
                                </div>
                                <div className="col-span-5 survey-section ">
                                    <div onClick={() => { navigate(`./${election.electionCode}`) }}
                                        className="survey-box-div flex flex-col w-full my-4 px-8 py-4 border border-black font-semibold hover:cursor-pointer hover:shadow-lg">
                                        <div className="grid grid-cols-12 gap-2">
                                            <div className="col-span-11">
                                                <div>Tựa đề khảo sát: <span className="ml-5 uppercase font-bold text-lg text-sky-900">{election.title}</span></div>
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