import { useParams } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { signOut } from 'firebase/auth';
import { auth, db } from '../../utils/Firebase.config';
import { SET_USER_NULL } from '../context/actions/Useractions';
import { doc, getDoc } from "firebase/firestore";
import { ChevronDown, InfoIcon, Plus, Settings } from 'lucide-react';
import { motion } from 'framer-motion';
import SplitPane from 'react-split-pane';
import { githubDark } from '@uiw/codemirror-theme-github';
import { javascript } from '@codemirror/lang-javascript';
import CodeMirror from '@uiw/react-codemirror';
import UserProfile from '../components/UserProfile';

const ProjectShow = () => {
    const user = useSelector(state => state.user?.user)

    const dispatch = useDispatch()
    const [isProfile, setisProfile] = useState(false)
    const [code, setcode] = useState(null)

    const Signout = async () => {
        await signOut(auth).then(() => {
            dispatch(SET_USER_NULL())
            window.location.reload()
        })
        setisProfile(false)
        console.log("logged out");

    }
    const { id } = useParams();

    const getcode = async () => {
        const docRef = doc(db, "projects", id);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
            console.log("Document data:", docSnap.data());
            setcode(docSnap.data())
        } else {
            // docSnap.data() will be undefined in this case
            console.log("No such document!");
        }
    }
    useEffect(() => {
        getcode()
    }, [])


    return (
        <>
            {code && <div className='w-screen h-screen flex flex-col items-start justify-start overflow-hidden relative'>

                <header className="bg-transparent w-full">
                    <div className="mx-auto flex h-16 max-w-screen items-center gap-8 px-4 sm:px-6 lg:px-6">
                        <a className="text-teal-600" href="/home/projects">
                            <span className="sr-only">Home</span>
                            <svg className='h-[20px]' viewBox="0 0 138 26" fill="none" stroke="#fff" strokeWidth="2.3" strokeLinecap="round" strokeLinejoin="round" title="CodePen"><path d="M15 8a7 7 0 1 0 0 10m7-8.7L33 2l11 7.3v7.4L33 24l-11-7.3zm0 0 11 7.4 11-7.4m0 7.4L33 9.3l-11 7.4M33 2v7.3m0 7.4V24M52 6h5a7 7 0 0 1 0 14h-5zm28 0h-9v14h9m-9-7h6m11 1h6a4 4 0 0 0 0-8h-6v14m26-14h-9v14h9m-9-7h6m11 7V6l11 14V6"></path></svg>
                        </a>

                        <div className="flex w-full  items-center justify-between">
                            <div>
                                <div className='flex items-center gap-3'>

                                    <input type="text" className='bg-transparent text-white w-fit focus:border-none' disabled value={code.title} />
                                </div>
                                <div className='flex items-center gap-2'>
                                    {code?.user?.displayName ? <h5 className='text-xs text-primaryText'>{code.user?.displayName}</h5> : <h5 className='text-xs text-primaryText'>User</h5>}
                                    <button className='bg-purple-500 text-white text-xs p-1 px-3 flex items-center justify-center gap-1 rounded-lg'> <Plus className="h-3 w-3" /> follow</button>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
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
                                            <div className='flex items-center justify-center bg-black cursor-pointer p-2 rounded-md'
                                                onClick={() => setisProfile(!isProfile)}>
                                                <ChevronDown className='text-white' />
                                            </div>
                                        </div>
                                    )
                                }

                                <button
                                    className="block rounded bg-gray-100 p-2.5 text-gray-600 transition hover:text-gray-600/75 md:hidden"
                                >
                                    <span className="sr-only">Toggle menu</span>
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        className="h-5 w-5"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke="currentColor"
                                        strokeWidth="2"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
                                    </svg>
                                </button>
                            </div>
                        </div>
                    </div>
                </header>

                <div className='h-screen w-screen overflow-hidden'>
                    <SplitPane split='horizontal' minSize={100} maxSize={-100} defaultSize={"50%"}>
                        <SplitPane split='vertical' minSize={500}>
                            {/* html */}
                            <div className='w-full h-full flex flex-col items-start justify-start'>
                                <div className='w-full flex items-center justify-between'>
                                    <div className='flex items-center bg-secondary px-4 py-2 justify-center gap-3 border-t-red-500 border-t-2'>
                                        <span>
                                            <svg className='h-6' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#E44D26"></path> <path d="M26 5H16V29.5L24 27L26 5Z" fill="#F16529"></path> <path d="M9.5 17.5L8.5 8H24L23.5 11H11.5L12 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5H9.5Z" fill="white"></path> </g></svg>
                                        </span>
                                        <p className='text-primaryText'>HTML</p>
                                    </div>
                                    <div className='flex items-center px-4 py-2 cursor-pointer gap-5'>
                                        <Settings className='text-primaryText' />
                                        <ChevronDown className='text-primaryText' />
                                    </div>

                                </div>
                                <div className='w-full min-h-[600px]  overflow-y-scroll'>
                                    <CodeMirror height="600px" value={code?.html} theme={githubDark} extensions={[javascript({ jsx: true })]}
                                    />

                                </div>
                            </div>
                            <SplitPane split='vertical' minSize={500}>
                                {/* css */}
                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='w-full flex items-center justify-between'>
                                        <div className='flex items-center bg-secondary px-4 py-2 justify-center gap-3 border-t-blue-500 border-t-2'>
                                            <span>
                                                <svg className='h-6' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <path d="M6 28L4 3H28L26 28L16 31L6 28Z" fill="#1172B8"></path> <path d="M26 5H16V29.5L24 27L26 5Z" fill="#33AADD"></path> <path d="M19.5 17.5H9.5L9 14L17 11.5H9L8.5 8.5H24L23.5 12L17 14.5H23L22 24L16 26L10 24L9.5 19H12.5L13 21.5L16 22.5L19 21.5L19.5 17.5Z" fill="white"></path> </g></svg>
                                            </span>
                                            <p className='text-primaryText'>CSS</p>
                                        </div>
                                        <div className='flex items-center px-4 py-2 cursor-pointer gap-5'>
                                            <Settings className='text-primaryText' />
                                            <ChevronDown className='text-primaryText' />
                                        </div>

                                    </div>

                                    <div className='w-full min-h-[600px]  overflow-y-scroll'>
                                        <CodeMirror height="600px" value={code?.css} theme={githubDark} extensions={[javascript({ jsx: true })]}
                                        />

                                    </div>

                                </div>
                                <div className='w-full h-full flex flex-col items-start justify-start'>
                                    <div className='w-full flex items-center justify-between'>
                                        <div className='flex items-center bg-secondary px-4 py-2 justify-center gap-3 border-t-yellow-500 border-t-2'>
                                            <span>
                                                <svg className='h-6' viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"><g id="SVGRepo_bgCarrier" strokeWidth="0"></g><g id="SVGRepo_tracerCarrier" strokeLinecap="round" strokeLinejoin="round"></g><g id="SVGRepo_iconCarrier"> <rect x="2" y="2" width="28" height="28" fill="#FFCA28"></rect> <path d="M19 25.2879L21.0615 23.9237C21.2231 24.4313 22.2462 25.6368 23.5385 25.6368C24.8308 25.6368 25.4308 24.931 25.4308 24.463C25.4308 23.1878 24.1112 22.7382 23.4774 22.5223C23.374 22.4871 23.289 22.4581 23.2308 22.4328C23.2009 22.4198 23.1558 22.4025 23.0979 22.3804C22.393 22.1111 19.7923 21.1175 19.7923 18.2373C19.7923 15.065 22.8538 14.7002 23.5462 14.7002C23.9991 14.7002 26.1769 14.7557 27.2615 16.7939L25.2615 18.1898C24.8231 17.3015 24.0946 17.0081 23.6462 17.0081C22.5385 17.0081 22.3077 17.8201 22.3077 18.1898C22.3077 19.227 23.5112 19.6919 24.5273 20.0844C24.7932 20.1871 25.0462 20.2848 25.2615 20.3866C26.3692 20.91 28 21.7666 28 24.463C28 25.8136 26.8672 28.0002 24.0154 28.0002C20.1846 28.0002 19.1692 25.7003 19 25.2879Z" fill="#3E3E3E"></path> <path d="M9 25.5587L11.1487 24.1953C11.317 24.7026 11.9713 25.638 12.9205 25.638C13.8698 25.638 14.3557 24.663 14.3557 24.1953V15.0002H16.9982V24.1953C17.041 25.4636 16.3376 28.0002 13.2332 28.0002C10.379 28.0002 9.19242 26.3039 9 25.5587Z" fill="#3E3E3E"></path> </g></svg>
                                            </span>
                                            <p className='text-primaryText'>JS</p>
                                        </div>
                                        <div className='flex items-center px-4 py-2 cursor-pointer gap-5'>
                                            <Settings className='text-primaryText' />
                                            <ChevronDown className='text-primaryText' />
                                        </div>

                                    </div>

                                    <div className='w-full min-h-[600px]  overflow-y-scroll'>
                                        <CodeMirror height="600px" value={code.js} theme={githubDark} extensions={[javascript({ jsx: true })]}
                                        />

                                    </div>

                                </div>
                            </SplitPane>
                        </SplitPane>
                        <div className='bg-white' style={{ overflow: "hidden", height: "100%" }}>
                            <iframe srcDoc={code.output} style={{ width: "100%", height: "100%", border: "none" }} title='result' />
                        </div>
                    </SplitPane>
                </div>
                <div className='absolute right-[30px] top-[50px]'

                >
                    {isProfile && <UserProfile Signout={Signout} />}
                </div>
            </div>}
        </>

    )
}

export default ProjectShow