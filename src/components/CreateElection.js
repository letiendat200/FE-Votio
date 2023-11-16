import React,{useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import Survey  from './surveyComponents/Survey';
import SurveyNavbar from './surveyComponents/SurveyNavbar';
const CreateElection = () => {
    const [activeContent, setActiveContent] = useState('survey');
    const navigate = useNavigate();
    return (
        <div className="max-h-full min-h-screen bg-gradient-to-r from-indigo-600 to-blue-800">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <a className="flex items-center mb-6 text-4xl font-light text-white">                    
                    Create Your Survey   
                </a>
                <div className="w-3/5 bg-white rounded-lg shadow border border-gray-700">
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <SurveyNavbar activeContent = {activeContent} setActiveContent={setActiveContent} />               
                            {activeContent === 'survey' && <Survey />}                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateElection;
