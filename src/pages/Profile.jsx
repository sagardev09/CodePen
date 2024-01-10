import { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { collection, query, where, getDocs, doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { toast } from 'react-toastify';
import { db, storage } from '../../utils/Firebase.config';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Bookmark } from 'lucide-react';
import ProfileModal from '../components/ProfileModal';
import { SET_USER } from '../context/actions/Useractions';
import { getDownloadURL, ref, uploadBytesResumable } from "firebase/storage";



const Profile = () => {

    const user = useSelector(state => state.user?.user)
    const dispatch = useDispatch()
    const [ismodal, setismodal] = useState(false)
    const [data, setdata] = useState([])
    const [bio, setbio] = useState("");
    const [profilepic, setprofilepic] = useState(user?.photoURL)
    const navigate = useNavigate()

    const getusercodes = async () => {
        try {
            const q = query(collection(db, "projects"), where("user.email", "==", user.email));
            const querySnapshot = await getDocs(q);
            const projectsData = [];
            querySnapshot.forEach((doc) => {
                projectsData.push(doc.data());
            });
            setdata(projectsData);
        } catch (error) {
            console.log(error);
        }
    }

    const updateProfile = async () => {
        try {
            if (!user || !user.uid) {
                console.error("User or user UID is missing.");
                return;
            }

            const userDocRef = doc(db, 'users', user.uid);
            const userDocSnapshot = await getDoc(userDocRef);
            const storageRef = ref(storage, 'profilePictures/' + user?.uid)

            if (userDocSnapshot.exists()) {
                console.log("Document exists. Updating bio:", bio);
                const uploadTask = uploadBytesResumable(storageRef, profilepic);
                await uploadTask;

                const downloadURL = await getDownloadURL(storageRef);

                await updateDoc(userDocRef, {
                    bio: bio || "",
                    photoURL: downloadURL,

                });
                dispatch(SET_USER({ ...user, bio: bio, photoURL: downloadURL }))
                toast.success('Profile updated successfully!');
                setismodal(false)
            } else {
                console.log("Document doesn't exist. Cannot update.");
                toast.error('Error updating profile. User document not found.');
            }
        } catch (error) {
            console.error('Error updating profile:', error);
            toast.error('Error updating profile. Please try again.');
        }
    };

    useEffect(() => {
        getusercodes()
    }, [])


    return (
        <div className='w-full h-full overflow-hidden flex flex-col gap-4 items-start justify-start pt-6 relative'>
            {user && <div className='flex items-center justify-between w-full'>
                <div className='flex items-center justify-center gap-4'>
                    <div>
                        <img src={user.photoURL} alt="" className='h-16 w-16 rounded-full' />
                    </div>
                    <div className='flex flex-col gap-2'>
                        <h5 className='text-white'>{user?.displayName}</h5>
                        <h5 className='text-white'>Bio : {user?.bio}</h5>
                    </div>
                </div>
                <div>
                    <motion.button whileTap={{ scale: 0.9 }} onClick={() => setismodal(!ismodal)} className='bg-purple-500 p-2 text-white rounded-md text-sm px-3'>Edit Profile</motion.button>
                </div>
            </div>}
            <div className='h-full pt-2'>
                <h4 className='py-2 text-primaryText'>Personal Projects</h4>

                {data ?
                    <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">

                        {data.map((item, index) => (
                            <motion.div
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                exit={{ opacity: 0 }}
                                transition={{ duration: 0.5, delay: index * 0.2 }}
                                key={item.id} className="h-[400px] w-full cursor-pointer md:w-[550x] rounded-lg  flex flex-col items-center justify-center gap-2 bg-secondary"
                                onClick={() => navigate(`/project/${item.id}`)}>
                                <div className='w-full h-full p-2 '>
                                    <div onClick={() => navigate(`/project/${item.id}`)} className='bg-secondary w-full h-full overflow-hidden rounded-md' style={{ overflow: "hidden", height: "100%" }}>
                                        <iframe srcDoc={item.output} style={{ width: "100%", height: "100%", border: "none" }} title='result' />
                                    </div>
                                </div>
                                <div className='flex items-center justify-between gap-3 w-full bg-secondary px-2 pb-3'>
                                    <div className='flex items-center justify-start gap-3 w-full'>
                                        <div className='h-[30px] w-[30px] overflow-hidden rounded-full'>
                                            {
                                                item.user?.photoURL
                                                    ?
                                                    <motion.img whileHover={{ scale: 1.15 }} className='h-full w-full  object-cover cursor-pointer'
                                                        src={item.user?.photoURL} alt="" />
                                                    :
                                                    <p className="uppercase">{item.user?.email[0]}</p>}
                                        </div>
                                        <div className=''>
                                            <h5 className='text-primaryText text-xs'>
                                                {
                                                    item?.title && <h5>{item?.title}</h5>
                                                }
                                            </h5>
                                            <h5 className='text-primaryText text-sm'>
                                                {
                                                    item.user?.displayName && <h5>{item.user?.displayName}</h5>
                                                }
                                            </h5>

                                        </div>
                                    </div>
                                    <div>
                                        <Bookmark className='text-primaryText cursor-pointer' />
                                    </div>
                                </div>
                            </motion.div>
                        ))}

                    </div>
                    : <>
                        <p className="text-white text-xl font-bold">No Projects Found</p>
                    </>}

            </div>
            <div className='absolute h-screen w-screen top-[35%] left-[35%]  z-50 '>
                {ismodal && <ProfileModal user={user} updateProfile={updateProfile} bio={bio} setbio={setbio} profilepic={profilepic} setprofilepic={setprofilepic} />}
            </div>
        </div>
    )
}

export default Profile