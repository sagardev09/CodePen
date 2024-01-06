import { useState } from "react"
import { motion } from "framer-motion"
import { signinwithgithub, signinwithgoogle } from "../../utils/helpers"
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../../utils/Firebase.config";

const Signup = () => {



    const [email, setemail] = useState("")
    const [password, setpassword] = useState("")
    const [ispass, setispass] = useState(true)
    const [isEmailValid, setisEmailValid] = useState(true)
    const [isPasswordValid, setisPasswordValid] = useState(true)
    const [isLogin, setisLogin] = useState(true)
    const [error, seterror] = useState(null)


    const createNewUser = async (e) => {
        e.preventDefault()
        await createUserWithEmailAndPassword(auth, email, password).then((userCred) => {
            if (userCred) {
                console.log(userCred, "usercred");
            }
        }).catch((error) => {
            console.log(error);
        })
    }


    const handleLogin = async (e) => {
        e.preventDefault()

        // Email validation regex
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

        // Password validation regex (at least 8 characters, one uppercase letter, one lowercase letter, and one digit)
        const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])[a-zA-Z\d@$.!%*#?&]{8,}$/;

        // Perform validation checks
        if (!emailRegex.test(email)) {
            setisEmailValid(false)
            console.log("Invalid email format");
            return;
        }

        if (!passwordRegex.test(password)) {
            setisPasswordValid(false)
            console.log("Invalid password format");
            return;
        }

        setisEmailValid(true)
        setisPasswordValid(true)

        try {
            await signInWithEmailAndPassword(auth, email, password).then((userCred) => {
                if (userCred) {
                    console.log("logged in");
                    seterror(null)
                    setisEmailValid(true)
                    setisPasswordValid(true)
                }
            })
        } catch (error) {
            console.log(error);
            seterror("user not found please sign up first")
        }





    };



    return (
        <div className='w-full py-6'>

            <div className='h-auto object-contain w-32 opacity-50'>
                <svg viewBox="0 0 138 26" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" title="CodePen"><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path></svg>
            </div>
            <div className="w-full flex flex-col items-center justify-center p-8">
                <p className="text-white text-xl capitalize py-4">join with us 😎</p>
                <div className="mx-auto min-w-[500px] px-4 py-8 sm:px-6 lg:px-8 bg-white rounded-xl">
                    <div className="mx-auto max-w-lg">
                        <form className="mb-0 mt-6 space-y-4 rounded-lg p-4 shadow-2xl sm:p-6 lg:p-8">
                            <p className="text-center text-lg font-medium">Sign in to your account</p>
                            <div>
                                <label htmlFor="email" className="sr-only">Email</label>
                                <div className="relative">
                                    <input
                                        type="email"
                                        className={`w-full border border-gray-300 rounded-lg p-4 text-sm shadow-sm focus:outline-none ${isEmailValid ? "border border-green-500" : "border border-red-500"
                                            }`}
                                        value={email}
                                        onChange={(e) => setemail(e.target.value)}
                                        placeholder="Enter email"
                                    />

                                    <span className="absolute inset-y-0 end-0 grid place-content-center px-4">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                                            />
                                        </svg>
                                    </span>
                                </div>
                                <div>
                                    <p

                                        className="text-red-500 text-xs pt-2">{!isEmailValid ? "Invalid email" : null}</p>
                                </div>
                            </div>
                            <div>
                                <label htmlFor="password" className="sr-only">Password</label>
                                <div className="relative">
                                    <input
                                        type={ispass ? "password" : "text"}
                                        className={`w-full border border-gray-300 rounded-lg p-4 text-sm shadow-sm focus:outline-none ${isPasswordValid ? "border border-green-500" : "border border-red-500"
                                            }`}
                                        value={password}
                                        onChange={(e) => setpassword(e.target.value)}
                                        placeholder="Enter password"
                                    />

                                    <motion.span whileTap={
                                        { scale: 0.9 }
                                    } className="absolute inset-y-0 end-0 grid place-content-center px-4 cursor-pointer" onClick={() => setispass(!ispass)}>
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4 text-gray-400"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                                            />
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth="2"
                                                d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                                            />
                                        </svg>
                                    </motion.span>
                                </div>
                                <div>
                                    <p className="text-red-500 text-xs pt-2">{!isPasswordValid ? "Invalid password" : null}</p>
                                </div>
                            </div>
                            {
                                isLogin ? (
                                    <motion.button whileTap={{
                                        scale: 0.875,
                                    }}

                                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                                        onClick={handleLogin}

                                    >
                                        Log in
                                    </motion.button>
                                ) : (
                                    <motion.button whileTap={{
                                        scale: 0.875,
                                    }}

                                        className="block w-full rounded-lg bg-indigo-600 px-5 py-3 text-sm font-medium text-white"
                                        onClick={createNewUser}
                                    >
                                        Sign in
                                    </motion.button>
                                )
                            }
                            <div className="text-center">
                                <p className="text-red-500 text-xs capitalize">{error}</p>
                            </div>
                            {
                                isLogin ? (
                                    <p className="text-center text-sm text-gray-500">
                                        No account?
                                        <span className="underline cursor-pointer" href="" onClick={() => setisLogin(!isLogin)}>Sign up</span>
                                    </p>
                                ) : (
                                    <p className="text-center text-sm text-gray-500">
                                        Already have an account?
                                        <span className="underlin cursor-pointer" href="" onClick={() => setisLogin(!isLogin)}>Login </span>
                                    </p>
                                )
                            }

                        </form>
                        <div className="my-6 flex flex-col gap-6">
                            <button onClick={() => signinwithgoogle()}
                                className=" justify-center gap-4 rounded bg-indigo-600 px-8 py-3 text-sm font-medium text-white transition hover:rotate-2 hover:scale-110 focus:outline-none focus:ring active:bg-indigo-500 w-full flex items-center"
                            >
                                <span className=" w-7 h-7 object-contain">
                                    <svg viewBox="-0.5 0 48 48" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>Google-color</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Icons" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Color-" transform="translate(-401.000000, -860.000000)"> <g id="Google" transform="translate(401.000000, 860.000000)"> <path d="M9.82727273,24 C9.82727273,22.4757333 10.0804318,21.0144 10.5322727,19.6437333 L2.62345455,13.6042667 C1.08206818,16.7338667 0.213636364,20.2602667 0.213636364,24 C0.213636364,27.7365333 1.081,31.2608 2.62025,34.3882667 L10.5247955,28.3370667 C10.0772273,26.9728 9.82727273,25.5168 9.82727273,24" id="Fill-1" fill="#FBBC05"> </path> <path d="M23.7136364,10.1333333 C27.025,10.1333333 30.0159091,11.3066667 32.3659091,13.2266667 L39.2022727,6.4 C35.0363636,2.77333333 29.6954545,0.533333333 23.7136364,0.533333333 C14.4268636,0.533333333 6.44540909,5.84426667 2.62345455,13.6042667 L10.5322727,19.6437333 C12.3545909,14.112 17.5491591,10.1333333 23.7136364,10.1333333" id="Fill-2" fill="#EB4335"> </path> <path d="M23.7136364,37.8666667 C17.5491591,37.8666667 12.3545909,33.888 10.5322727,28.3562667 L2.62345455,34.3946667 C6.44540909,42.1557333 14.4268636,47.4666667 23.7136364,47.4666667 C29.4455,47.4666667 34.9177955,45.4314667 39.0249545,41.6181333 L31.5177727,35.8144 C29.3995682,37.1488 26.7323182,37.8666667 23.7136364,37.8666667" id="Fill-3" fill="#34A853"> </path> <path d="M46.1454545,24 C46.1454545,22.6133333 45.9318182,21.12 45.6113636,19.7333333 L23.7136364,19.7333333 L23.7136364,28.8 L36.3181818,28.8 C35.6879545,31.8912 33.9724545,34.2677333 31.5177727,35.8144 L39.0249545,41.6181333 C43.3393409,37.6138667 46.1454545,31.6490667 46.1454545,24" id="Fill-4" fill="#4285F4"> </path> </g> </g> </g> </g></svg>
                                </span>  Sign in with google
                            </button>
                            <button onClick={() => signinwithgithub()}
                                className=" rounded border border-current px-8 py-3 text-sm font-medium text-indigo-600 transition hover:-rotate-2 hover:scale-110 focus:outline-none focus:ring active:text-indigo-500  flex items-center justify-center gap-4"

                            > <span className=" w-7 h-7 object-contain">
                                    <svg viewBox="0 0 20 20" version="1.1" xmlns="http://www.w3.org/2000/svg" fill="#000000"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <title>github [#142]</title> <desc>Created with Sketch.</desc> <defs> </defs> <g id="Page-1" stroke="none" strokeWidth="1" fill="none" fillRule="evenodd"> <g id="Dribbble-Light-Preview" transform="translate(-140.000000, -7559.000000)" fill="#000000"> <g id="icons" transform="translate(56.000000, 160.000000)"> <path d="M94,7399 C99.523,7399 104,7403.59 104,7409.253 C104,7413.782 101.138,7417.624 97.167,7418.981 C96.66,7419.082 96.48,7418.762 96.48,7418.489 C96.48,7418.151 96.492,7417.047 96.492,7415.675 C96.492,7414.719 96.172,7414.095 95.813,7413.777 C98.04,7413.523 100.38,7412.656 100.38,7408.718 C100.38,7407.598 99.992,7406.684 99.35,7405.966 C99.454,7405.707 99.797,7404.664 99.252,7403.252 C99.252,7403.252 98.414,7402.977 96.505,7404.303 C95.706,7404.076 94.85,7403.962 94,7403.958 C93.15,7403.962 92.295,7404.076 91.497,7404.303 C89.586,7402.977 88.746,7403.252 88.746,7403.252 C88.203,7404.664 88.546,7405.707 88.649,7405.966 C88.01,7406.684 87.619,7407.598 87.619,7408.718 C87.619,7412.646 89.954,7413.526 92.175,7413.785 C91.889,7414.041 91.63,7414.493 91.54,7415.156 C90.97,7415.418 89.522,7415.871 88.63,7414.304 C88.63,7414.304 88.101,7413.319 87.097,7413.247 C87.097,7413.247 86.122,7413.234 87.029,7413.87 C87.029,7413.87 87.684,7414.185 88.139,7415.37 C88.139,7415.37 88.726,7417.2 91.508,7416.58 C91.513,7417.437 91.522,7418.245 91.522,7418.489 C91.522,7418.76 91.338,7419.077 90.839,7418.982 C86.865,7417.627 84,7413.783 84,7409.253 C84,7403.59 88.478,7399 94,7399" id="github-[#142]"> </path> </g> </g> </g> </g></svg>
                                </span>
                                Sign in with github
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Signup