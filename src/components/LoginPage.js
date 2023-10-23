import React from 'react'
import { useNavigate  } from 'react-router-dom';
export default function LoginPage() {
    const navigate = useNavigate();
    return (
        <section className="bg-gradient-to-b from-cyan-900 to-gray-900 h-screen">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-full lg:py-0">
                <a className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white">
                    <img className="w-8 h-8 mr-2" src="https://upload.wikimedia.org/wikipedia/commons/thumb/5/53/Logo_vote.svg/1200px-Logo_vote.svg.png" alt="logo"/>
                    VOTIO    
                </a>
                <div className="w-full bg-slate-800 rounded-lg shadow border border-gray-700 md:mt-0 sm:max-w-md xl:p-0">
                    <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
                        <h1 className="text-xl text-center font-bold leading-tight tracking-loose text-black md:text-2xl dark:text-white">
                            LOG IN 
                        </h1>
                        <form className="space-y-4 md:space-y-6" action="#">
                            <div>
                                <label for="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Username or Email</label>
                                <input type="email" name="email" id="email" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@company.com" required=""/>
                            </div>
                            <div>
                                <label for="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Password</label>
                                <input type="password" name="password" id="password" placeholder="••••••••" className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" required=""/>
                            </div>
                            <div className="flex items-center justify-between">
                                <div className="flex items-start">
                                    <div className="flex items-center h-5">
                                        <input id="remember" aria-describedby="remember" type="checkbox" className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-primary-600 dark:ring-offset-gray-800" required=""/>
                                    </div>
                                    <div className="ml-3 text-sm">
                                        <label for="remember" className="text-gray-500 dark:text-gray-300">Remember me</label>
                                    </div>
                                </div>
                                <button onClick={()=>{navigate('forgotPassword')}} className="text-sm font-medium text-blue-600 hover:underline dark:text-blue-500">Forgot password?</button>
                            </div>
                            <button type="submit" className="w-full text-white bg-blue-600 hover:bg-blue-700 focus:ring-4 focus:outline-none focus:ring-white-300 font-base rounded-lg px-5 py-2.5 text-center">Log in</button>
                            <div className="flex items-center">
                                <span class="line bg-gray-400 h-0.5 flex-grow"></span>
                                <span className="text-md text-center mx-4 font-bold leading-tight tracking-tight text-black md:text-sm dark:text-white">or</span>
                                <span class="line bg-gray-400 h-0.5 flex-grow"></span>
                            </div>    
                                
                            <div className="space-y-2 md:space-y-3">   
                                <button className="grid grid-cols-7 gap-4 w-full text-white bg-slate-600 border border-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <img className="md:col-span-1 w-8 h-8" src="https://cdn1.iconfinder.com/data/icons/google-s-logo/150/Google_Icons-09-512.png" alt = 'Google icon'></img>
                                        <a className="col-span-5 self-center ">Continue with Google</a>
                                </button>
                                <button className="grid grid-cols-7 py-3 gap-2 w-full text-white bg-slate-600 border border-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <img className="md:col-span-1 w-6 h-6" src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/25/Microsoft_icon.svg/2048px-Microsoft_icon.svg.png" alt = 'Microsoft icon'></img>
                                        <a className="col-span-5 self-center ">Continue with Microsoft</a>
                                </button>
                                <button className=" grid grid-cols-7 gap-4 w-full text-white bg-slate-600 border border-black hover:bg-slate-700 focus:ring-4 focus:outline-none focus:ring-white-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
                                    <img className="md:col-span-1 w-8 h-8" src="https://www.svgrepo.com/show/69341/apple-logo.svg" alt = 'Apple icon'></img>
                                        <a className="col-span-5 self-center ">Continue with Apple</a>
                                </button>
                                
                            </div>
                            <p className="text-center text-sm font-light text-gray-500 dark:text-gray-400">
                                Don’t have an account yet? <button onClick={()=>{navigate('/signup')}} className="font-medium ml-5 text-blue-600 hover:underline ">Sign up now</button>
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
