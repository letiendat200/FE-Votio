import React,{useState} from 'react'
import { useNavigate  } from 'react-router-dom';
export default function SignupPage() {
    const [password,setPassword] = useState("");
    const [passwordAgain,setPasswordAgain] = useState("");
    const navigate = useNavigate();
    return (
        <div className="max-h-full min-h-screen bg-gradient-to-b from-purple-300 to-purple-800">
            <div className="flex flex-col items-center justify-center min-h-screen px-6 py-8 mx-auto ">
                <a className="flex items-center mb-6 text-2xl font-semibold text-indigo-950">
                    <img className="w-8 h-8 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Logo_vote.svg/1200px-Logo_vote.svg.png" alt="logo"/>
                    VOTIO    
                </a>
                <div className="w-full bg-white rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-loose text-purple-600 md:text-2xl">
                            SIGN UP
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label htmlFor="name" className="block mb-2 text-sm font-medium text-purple-600">Your Name</label>
                                <input type="name" name="name" id="name" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="John Doe" required=""/>
                            </div> 
                            <div>
                                <label htmlFor="email" className="block mb-2 text-sm font-medium text-purple-700">Username or Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <label htmlFor="password" className="block mb-2 text-sm font-medium text-purple-600">Password <span className="text-slate-400">(*5 or more characters)</span></label> 
                                <input type="password" name="password" id="password" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" onChange={e => setPassword(e.target.value)}  placeholder="••••••••" required=""/>
                            </div>  
                            <div>
                                <label htmlFor="passwordAgain" className="block mb-2 text-sm font-medium text-purple-600">Enter password again</label>
                                <input type="password" name="passwordAgain" id="passwordAgain" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5" onChange={e => setPasswordAgain(e.target.value)} placeholder="••••••••" required=""/>
                            </div>
                            
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="terms" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300" required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label htmlFor="terms" className="text-gray-500">I accept the 
                                            <button onClick={()=>{navigate('terms')}} className="mx-1 text-sm font-medium underline text-purple-600 hover:text-purple-700">Terms and Agreement</button>
                                        </label>
                                    </div>
                                </div>
                                
                            </div>                      
                            <button type="submit" 
                                    className="w-full px-5 py-2.5 font-base text-center text-white cursor-pointer bg-purple-600 hover:bg-purple-700 focus:ring-4 rounded-lg disabled:bg-slate-500 disabled:opacity-25 disabled:cursor-default"
                                    disabled={!password || password.length < 5 || password!=passwordAgain}>Create Account</button>
                            
                            <p className="text-center text-sm font-light text-gray-500">
                                Already have an account? <button onClick={()=>{navigate('/')}} className="font-medium ml-5 text-purple-600 hover:underline ">Log in now</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}
