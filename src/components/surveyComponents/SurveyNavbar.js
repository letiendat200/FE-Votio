import React from 'react';

export default function  NavbarComponent(props) {
  const activeContent = props.activeContent;
  const setActiveContent = props.setActiveContent;
  return (    
    <nav class="w-full bg-slate-300 border-gray-200">      
        <div class="hidden w-full md:block md:w-auto " id="navbar-default">
          <ul class="flex flex-row font-medium justify-between p-0 bg-slate-300 bg-gray-50">
            <li className="block bg-white">
              <button onClick={() => setActiveContent('survey')} className="block py-2 pl-3 pr-4 text-gray-900 rounded bg-white" aria-current="page">Survey</button>
            </li>
            <li className="block bg-white">
              <button onClick={() => setActiveContent('share')} className="block py-2 pl-3 pr-4 text-gray-900 rounded bg-white hover:bg-gray-100 hover:text-blue-700 ">Share</button>
            </li >
            <li className="block bg-white">
              <button onClick={() => setActiveContent('template')} class="block py-2 pl-3 pr-4 text-gray-900 rounded hover:bg-gray-100 md:hover:bg-transparent md:border-0 md:hover:text-blue-700 md:p-0 dark:text-white md:dark:hover:text-blue-500 dark:hover:bg-gray-700 dark:hover:text-white md:dark:hover:bg-transparent">Template</button>
            </li>          
          </ul>
        </div>      
  </nav>
  );
};