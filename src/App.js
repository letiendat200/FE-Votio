import './App.css';
import LoginPage from './components/LoginPage';
import SignupPage from './components/SignupPage';
import CreateElection from './components/CreateElection';
import {BrowserRouter as Router,Route,Routes} from 'react-router-dom';

function App() {  
  return (
    <Router>           
        <div className="content">      
        <Routes>
          <Route exact path="/" element = {<LoginPage/>}/>       
        </Routes> 
        <Routes>
          <Route path="/signup" element = {<SignupPage/>}/>       
        </Routes>
        <Routes>
          <Route path="/create" element = {<CreateElection/>}/> 
        </Routes>
        </div>      
    </Router>      
  );
}

export default App;
