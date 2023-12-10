import './App.css';
import React, {useState, useEffect} from 'react';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';
import Navbar from './utilities/Navbar';
import ErrorPage from './utilities/ErrorPage';
import MainPage from './components/mainComponents/MainPage';
import LoginPage from './components/authorizationComponents/LoginPage';
import SignupPage from './components/authorizationComponents/SignupPage';
import CreateSurvey from './components/surveyCreateComponents/CreateSurvey';
import MyCollection from './components/personalComponents/MyCollection';
import SurveyResult from './components/personalComponents/SurveyResult';
import Survey from './components/surveyComponents/Survey';


function App() {  
  const [isLoggedIn, setLoggedIn] = useState(false);  

  useEffect(() => {
    const token = getCookie('token');
    setLoggedIn(!!token);
  }, []);

  const handleLogin = () => {
    setCookie('token', '123', 10);
    setLoggedIn(true);
  };

  const handleLogout = () => {    
    deleteCookie('token');
    setLoggedIn(false);
  };

  const getCookie = (name) => {
    const value = `; ${document.cookie}`;
    const parts = value.split(`; ${name}=`);
    if (parts.length === 2) return parts.pop().split(';').shift();
  };

  const setCookie = (name, value, minutes) => {
    const expires = new Date(Date.now() + minutes * 60 * 1000).toUTCString();
    document.cookie = `${name}=${value}; expires=${expires}; path=/`;
  };

  const deleteCookie = (name) => {
    document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
  };

  return (
    <Router>           
      <div className="content">        
        <Navbar isLoggedIn={isLoggedIn} onLogout={handleLogout} />
        <Routes>
          <Route exact path="/" element={<MainPage />} />
          <Route path="/survey" element={<Survey />} />
          <Route path="/login" element={<LoginPage isLoggedIn={isLoggedIn} onLogin={handleLogin} />} />
          <Route path="/signup" element={<SignupPage />} />
          {isLoggedIn && (
            <>
              <Route path="/create" element={<CreateSurvey />} />
              <Route exact path="/mySurvey" element={<MyCollection />} />
              <Route path="/mySurvey/:id" element={<SurveyResult />} />
            </>
          )}
          <Route path="*" element = {<ErrorPage />}/>
        </Routes>
      </div>      
    </Router>      
  );
}

export default App;
