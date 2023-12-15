import React,{useState} from 'react'
import { useNavigate  } from 'react-router-dom';
import axios from 'axios';
import './SignupPage.css';
export default function SignupPage() {
    const [fullname,setFullname] = useState("");
    const [email,setEmail] = useState("");
    const [password,setPassword] = useState("");
    const [passwordAgain,setPasswordAgain] = useState("");    

    const postData = async () => {
        console.log("here");
        await axios({
            method: 'post',
            url: 'https://votio.onrender.com/v1/api/auth/register',
            data: {
                fullname: fullname,
                email: email,
                password: password,
            },
            headers: {
                'Content-Type': 'application/json',
                'Access-Control-Allow-Origin': '*',
                'Access-Control-Allow-Origin': 'GET, POST, PATCH, PUT, DELETE, OPTIONS',
                'Access-Control-Allow-Origin': 'Origin, Content-Type, X-Auth-Token',                
            },
        })
            .then(response => {
                console.log(response);
            })
            .catch(error => {
                console.log(error);
            });
    }

    const navigate = useNavigate();

    return (
        <div className="signup-page max-h-full min-h-screen">
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto ">
                <div className="flex items-center mb-6 text-2xl font-semibold text-white">
                    <img className="w-8 h-8 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Logo_vote.svg/1200px-Logo_vote.svg.png" alt="logo"/>
                    VOTIO    
                </div>
                <div className="signup-form w-full rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-loose md:text-2xl">
                            SIGN UP
                        </h1>
                        <div className="space-y-4 md:space-y-6" >
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm ">Your Name</label>
                                <input 
                                    type="name" 
                                    name="name" 
                                    id="name" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    onChange={e => setFullname(e.target.value)} 
                                    placeholder="John Doe" 
                                    required=""
                                />
                            </div> 
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm ">Email</label>
                                <input 
                                    type="email" 
                                    name="email" 
                                    id="email" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    onChange={e => setEmail(e.target.value)} 
                                    placeholder="name@company.com" 
                                    required="@"
                                />
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm  ">Password <span className="text-slate-400"> (*5 or more characters)</span></label> 
                                <input 
                                    type="password" 
                                    name="password" 
                                    id="password" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    onChange={e => setPassword(e.target.value)}  
                                    placeholder="••••••••"
                                    required=""
                            
                                />
                            </div>  
                            <div>
                                <label htmlFor="passwordAgain" className="block mb-2 text-sm  ">Enter password again</label>
                                <input 
                                    type="password" 
                                    name="passwordAgain" 
                                    id="passwordAgain" 
                                    className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" 
                                    onChange={e => setPasswordAgain(e.target.value)} 
                                    placeholder="••••••••" 
                                    required=""
                                />
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" >I accept the 
                                            <button onClick={()=>{navigate('terms')}} className="mx-1 text-sm font-medium underline hover:text-indigo-800">Terms and Agreement</button>
                                        </label>
                                    </div>
                                </div>
                                
                            </div>                      
                            <button 
                                className="w-full px-5 py-2.5 font-base text-center text-white cursor-pointer bg-indigo-700 hover:bg-indigo-800 focus:ring-4 rounded-lg disabled:bg-slate-500 disabled:opacity-25 disabled:cursor-default"
                                disabled={!fullname|| !email || !password || password.length < 5 || password!==passwordAgain}
                                onClick = {postData}
                            >
                                Create Account
                            </button>
                            <p className="text-center text-base font-bold">
                                Already have an account? <button onClick={()=>{navigate('/login')}} className="font-bold ml-5 text-indigo-800 hover:underline ">Log in now</button>
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}
