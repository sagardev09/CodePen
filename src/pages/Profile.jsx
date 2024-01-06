import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { collection, query, where, getDocs } from "firebase/firestore";
import { db } from '../../utils/Firebase.config';


const Profile = () => {

    const user = useSelector(state => state.user?.user)
    const [data, setdata] = useState(null)

    const getusercodes = async () => {
        try {
            const q = query(collection(db, "projects"), where("user.email", "==", user.email));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                setdata(doc.data())
            });
        } catch (error) {
            console.log(error);
        }
    }

    useEffect(() => {
        getusercodes()
    }, [])


    return (
        <div>profile</div>
    )
}

export default Profile