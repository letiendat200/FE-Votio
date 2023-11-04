import React,{useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import Survey  from './surveyComponents/Survey';
import SurveyNavbar from './surveyComponents/SurveyNavbar';
const CreateElection = () => {
    const [activeContent, setActiveContent] = useState('survey');
    const navigate = useNavigate();
    return (
        <div className="bg-gradient-to-b from-blue-700 to-blue-800">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
                <a className="flex items-center mb-6 text-4xl font-semibold text-white">                    
                    Create Your Survey   
                </a>
                <div className="w-full bg-white rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
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
