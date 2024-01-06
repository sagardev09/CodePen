import { ChevronDown, ChevronsLeft, HomeIcon } from 'lucide-react'
import { useState } from 'react'
import { motion } from 'framer-motion'
import { Link, Route, Routes } from 'react-router-dom'
import StartButton from '../components/StartButton'
import Projects from './Projects'
import Signup from './Signup'
import { useSelector } from 'react-redux'
import UserProfile from "../components/UserProfile"
import { signOut } from "firebase/auth";
import { useDispatch } from "react-redux";
import { SET_USER_NULL } from "../context/actions/Useractions";
import { auth } from '../../utils/Firebase.config'


const Home = () => {
    const [isSidemenu, setisSidemenu] = useState(false)
    const [isProfile, setisProfile] = useState(false)
    const user = useSelector(state => state.user?.user)

    const dispatch = useDispatch()


    const Signout = async () => {
        await signOut(auth).then(() => {
            dispatch(SET_USER_NULL())
            window.location.reload()
        })
        setisProfile(false)
        console.log("logged out");

    }

    return (
        <>
            <div className={`w-2 relative ${isSidemenu ? "w-2" : "flex-[.2] xl:flex-[.15]"} min-h-screen max-h-screen relative bg-secondary flex flex-col items-center justify-start gap-4 px-3 py-6 transition-all duration-200 ease-in-out`}>
                <motion.div whileTap={
                    { scale: 0.9 }
                }
                    className='w-8 h-8 bg-secondary rounded-tr-lg rounded-br-lg absolute -right-6 flex items-center top-4 justify-center cursor-pointer' onClick={() => setisSidemenu(!isSidemenu)}>
                    <ChevronsLeft className='text-white' />
                </motion.div>
                <div className='overflow-hidden w-full flex flex-col gap-4 items-center'>
                    <div className='w-[80%]'>
                        <Link to={"/home"}>
                            <svg viewBox="0 0 138 26" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" title="CodePen"><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path></svg>
                        </Link>
                    </div>
                    <div className='text-white'>
                        <h5>TRY OUR ONLINE EDITOR</h5>
                    </div>
                    <div>
                        <Link to={"/newProject"}>
                            <StartButton />
                        </Link>
                    </div>
                    <div>
                        {
                            user && (
                                <Link to={"/home/projects"} className='flex items-center justify-center gap-4 border w-full px-12 py-2 rounded-3xl'>
                                    <HomeIcon className='text-white' />
                                    <h5 className='text-white'>Home</h5>
                                </Link>
                            )
                        }
                    </div>
                </div>
            </div>

            <div className=' flex-1 min-h-screen max-h-screen overflow-y-scroll h-full flex flex-col items-start justify-start px-4 md:px-12 py-4  md:py-12'>
                <div className='w-full flex items-center gap-3 justify-between'>
                    <div className="relative w-full bg-secondary rounded-lg">
                        <input
                            type="text"
                            id="Search"
                            placeholder="Search for..."
                            className="w-full rounded-md outline-none border-none bg-transparent border-gray-200 text-primaryText py-2.5 pe-10 px-3 shadow-sm sm:text-sm"
                        />
                        <span className="absolute inset-y-0 end-0 grid w-10 place-content-center">
                            <button type="button" className="text-primaryText hover:text-gray-700">
                                <span className="sr-only">Search</span>
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    strokeWidth="1.5"
                                    stroke="currentColor"
                                    className="h-4 w-4"
                                >
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        d="M21 21l-5.197-5.197m0 0A7.5 7.5 0 105.196 5.196a7.5 7.5 0 0010.607 10.607z"
                                    />
                                </svg>
                            </button>
                        </span>
                    </div>
                    <div>
                        {
                            !user && (
                                <div className='flex items-center justify-between gap-4 w-full'>
                                    <Link to={"/home/auth"} className='bg-emerald-500 text-white px-6 py-2 rounded-md text-sm cursor-pointer'>Signup</Link>
                                </div>
                            )
                        }
                        {
                            user && (
                                <div className='flex items-center gap-3'>
                                    <div className='bg-white rounded-full h-[40px] w-[40px] flex items-center justify-center overflow-hidden'>
                                        {
                                            user?.photoURL
                                                ?
                                                <motion.img whileHover={{ scale: 1.15 }} className='h-full w-full  object-cover cursor-pointer'
                                                    src={user?.photoURL} alt="" />
                                                :
                                                <p className="uppercase">{user?.email[0]}</p>}
                                    </div>
                                    <div className='flex items-center justify-center bg-black cursor-pointer p-2 rounded-md' onClick={() => setisProfile(!isProfile)}>
                                        <ChevronDown className='text-white' />
                                    </div>
                                </div>
                            )
                        }
                    </div>
                </div>
                <div className='w-full'>
                    <Routes>
                        <Route path='/*' element={<Projects />} />
                        <Route path='/auth' element={<Signup />} />
                    </Routes>
                </div>
                <div className='absolute right-[45px] top-[90px]'

                >
                    {isProfile && <UserProfile Signout={Signout} />}
                </div>
            </div>
        </>
    )
}

export default Home