

import { XCircle } from 'lucide-react'
import React, { useState, useEffect } from 'react'

import { motion } from 'framer-motion';



const ProfileModal = ({ user, bio, updateProfile, setbio, profilepic, setprofilepic }) => {

    const [selectedFile, setSelectedFile] = useState(null);

    useEffect(() => {
        console.log(bio);

    }, [])



    const handleFileChange = (event) => {
        const file = event.target.files[0];
        if (file) {
            setSelectedFile(file);
            setprofilepic(file)
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
                                    <img src={profilepic} className='h-[100px] w-[100px] rounded-full overflow-hidden object-cover ' alt="" />
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
                    <input type="text" id="last_name" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        onChange={(e) => setbio(e.target.value)} placeholder="Bio" value={bio} />
                </div>
            </div>
            <div className='py-2 pt-3 w-full flex justify-end '>
                <motion.button whileTap={{ scale: 0.9 }} className='bg-blue-500 p-2 px-6 text-white rounded-md'
                    onClick={updateProfile}>Save</motion.button>
            </div>
        </div>
    )

}

export default ProfileModal;