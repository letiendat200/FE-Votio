import React,{useState} from 'react'
import SurveyCreate  from './SurveyCreateQuestions';
import SurveyCreateNavbarComponent from './SurveyCreateNavbar';
const CreateSurvey = () => {
    const [activeContent, setActiveContent] = useState('survey');    
    return (
        <div className="max-h-full min-h-screen bg-gradient-to-r from-indigo-600 to-blue-800">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto">
                <a className="flex items-center mb-6 text-4xl font-light text-white">                    
                    Create Your Survey   
                </a>
                <div className="w-3/5 bg-white rounded-lg shadow-xl border-2 border-gray-700">
                    <div className="space-y-4 md:space-y-6">
                        <div>
                            <SurveyCreateNavbarComponent activeContent = {activeContent} setActiveContent={setActiveContent} />               
                            {activeContent === 'survey' && <SurveyCreate />}                    
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CreateSurvey;
