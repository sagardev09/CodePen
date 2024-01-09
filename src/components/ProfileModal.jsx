

import { XCircle } from 'lucide-react'
import React, { useState } from 'react'
import { doc, getDoc, setDoc, updateDoc } from "firebase/firestore";
import { db } from '../../utils/Firebase.config';
import { toast } from 'react-toastify';
import { useSelector } from 'react-redux';


const ProfileModal = () => {

    const user = useSelector(state => state.user?.user)

    const [selectedFile, setSelectedFile] = useState(null);
    const [bio, setbio] = useState("");


    const updateprofile = async () => {
        const userDocRef = doc(db, "users", user?.uid);

        // Retrieve the existing user document data
        const userDocSnapshot = await getDoc(userDocRef);

        if (userDocSnapshot.exists()) {
            // If the document exists, get the data
            const userData = userDocSnapshot.data();

            // Check if the bio field exists in the document
            if (userData && "bio" in userData) {
                // If the bio field exists, update it
                await updateDoc(userDocRef, {
                    bio: bio || userData.bio, // Use the new value if available, otherwise keep the existing value
                });
                toast.success("updated")
            } else {
                // If the bio field does not exist, create a new document with the bio field
                await setDoc(userDocRef, {
                    bio: bio || "", // Use the new value if available, otherwise set it to an empty string
                    // Add other fields as needed
                });
            }
        }
    };



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
        }
    };

    const handleRemoveFile = () => {
        setSelectedFile(null);
    };



    return (
        <div className='bg-secondary max-w-[400px] p-2 rounded-md'>
            <div className='w-full flex justify-end cursor-pointer'>
                <XCircle className='text-white' />
            </div>
            <div className=''>
                <div className='flex items-center justify-between'>
                    {selectedFile ? (
                        <>
                            <img className='h-[100px] w-[100px] rounded-full overflow-hidden object-cover' src={URL.createObjectURL(selectedFile)} alt='' />
                            <button onClick={handleRemoveFile} className=' bg-red-500 p-2 px-3 rounded-full text-white text-xs'>
                                Remove
                            </button>
                        </>
                    ) : (
                        <label htmlFor='fileInput' className='w-full'>
                            <div className='h-full w-full flex items-center justify-between '>
                                <div>
                                    <img className='h-[100px] w-[100px] rounded-full overflow-hidden object-cover bg-red-400' src="" alt="" />
                                </div>
                                <div>
                                    <span className='p-1 rounded-md px-3 bg-blue-500 text-white  cursor-pointer'>edit</span>
                                </div>
                            </div>
                        </label>
                    )}
                </div>
                <div className='w-fit'>
                    <input
                        type='file'
                        id='fileInput'
                        className='hidden'
                        onChange={handleFileChange}
                        accept='image/*'
                    />
                </div>
            </div>
            <div>
                <div>
                    <label htmlFor="first_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Name</label>
                    <input type="text" id="first_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Name" value={user.displayName} disabled />
                </div>
                <div>
                    <label htmlFor="last_name" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">Bio</label>
                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" onChange={(e) => setbio(e.target.value)} placeholder="Bio" value={user.bio} />
                </div>
            </div>
            <div className='py-2 pt-3 w-full flex justify-end '>
                <button className='bg-blue-500 p-2 px-6 text-white rounded-md' onClick={updateprofile}>Save</button>
            </div>
        </div>
    )

}

export default ProfileModal;