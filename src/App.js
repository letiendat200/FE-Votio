import './App.css';
import LoginPage from './components/authorizationComponents/LoginPage';
import SignupPage from './components/authorizationComponents/SignupPage';
import CreateSurvey from './components/surveyCreateComponents/CreateSurvey';
import MyCollection from './components/personalComponents/MyCollection';
import SurveyResult from './components/personalComponents/SurveyResult';
import Survey from './components/surveyComponents/Survey';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {  
  return (
    <Router>           
        <div className="content">      
        <Routes>
          <Route exact path="/" element = {<LoginPage/>}/>  
          <Route path="/signup" element = {<SignupPage/>}/> 
          <Route path="/create" element = {<CreateSurvey/>}/> 
          <Route exact path = "/mySurvey" element = {<MyCollection/>}/>
          <Route path = "/mySurvey/:id" element = {<SurveyResult/>}/>
          <Route path="/survey/:id" element={<Survey/>}/>
        </Routes>         
        </div>      
    </Router>      
  );
}

export default App;
