import React, {useState, useEffect} from 'react';
import axios from 'axios';
import { useParams } from 'react-router';
import VoteChart from './VoteChart';
import LoadingScreen from '../../utilities/LoadingScreen';
import './SurveyResult.css';

const SurveyResult = ({getCookie}) => {
  const accessToken = getCookie("token");
  const [electionVoteData,setElectionVoteData] =useState(null);   
  const [loading, setLoading] = useState(true);
  const { id } = useParams();

  const errorMessage = "Oops, something went wrong and we can't get the election result";
  useEffect(() =>{     
    async function fetchData(){            
        await axios.get(`https://votio.onrender.com/v1/api/elections/${id}/vote`,{                   
        headers: {
            Authorization: `Bearer ${accessToken}`,                          
        },
    })
        .then(response => {
            const data = response.data.metadata.election.data;   
            setElectionVoteData(data);            
            setLoading(false);
        })
        .catch(error => {
          alert(error);          
        });
    }
    fetchData();
},[]);    
  return (
    <div className="p-8 bg-gray-200">
      {loading ? (
        <LoadingScreen />
      ) : (        
        <div>
          {(electionVoteData === null) ? (            
              <div>{errorMessage}</div>
          ) : (
              <div>
                <div className=" w-fit p-2 text-lg font-bold bg-black text-white border border-2 border-black">
                  Kết quả bỏ phiếu:
                </div>
                <div>
                  {electionVoteData.map((question, questionIndex) => (
                    <div key={questionIndex} className="flex flex-col my-10 bg-white border-2 border-amber-100 rounded-lg">
                      <div className="self-center m-4 uppercase text-2xl font-bold ">
                        <span className="m-4">Q{questionIndex + 1}: </span>{question.content}
                      </div>
                      <div className="max-h-fit min-h-min my-10">
                        <VoteChart choices={question.choices} id={questionIndex} />
                      </div>
                      <div className="relative m-2 left-1/3 font-bold text-xl">Kết quả thống kê: </div>
                      <div className="self-center m-2 font-semibold text-lg">
                        {question.choices.map((choice, choiceIndex) => (
                          <div key={choiceIndex} className="flex justify-between">
                            <div className="relative -left-4">{choice.content} : </div>
                            <div className="relative -right-4">{choice.numberOfVote} phiếu</div>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          
        </div>
      )}

    </div>
  );
};

export default SurveyResult;