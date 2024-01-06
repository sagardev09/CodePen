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
                                        <InfoIcon className='text-red-500' />
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
                                            <InfoIcon className='text-blue-500' />
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
                                            <InfoIcon className='text-yellow-500' />
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