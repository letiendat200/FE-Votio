import React from 'react';

export default function  SurveyCreateNavbarComponent(props) {
  //const activeContent = props.activeContent;
  const setActiveContent = props.setActiveContent;
  return (    
    <nav className="w-full bg-slate-300 border-gray-200">      
        <div className="block w-auto" id="navbar-default">
          <div className="grid grid-cols-3 font-medium justify-items-stretch p-0 bg-slate-300">
              <div onClick={() => setActiveContent('survey')} className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded bg-white hover:cursor-pointer" aria-current="page">Survey</div>
              <div onClick={() => setActiveContent('share')} className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded bg-gray-100 hover:bg-slate-200 hover:text-blue-500 hover:cursor-pointer">Share</div>
              <div onClick={() => setActiveContent('template')} className="flex items-center justify-center py-2 pl-3 pr-4 text-gray-900 rounded bg-gray-100 hover:bg-slate-200 hover:text-blue-500 hover:cursor-pointer">Template</div>
          </div>
        </div>      
  </nav>
  );
};