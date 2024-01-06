import { Navigate, Route, Routes, useNavigate } from "react-router-dom"
import { useEffect, useState } from "react"
import './App.css'
import Home from "./pages/Home"
import { auth, db } from "../utils/Firebase.config"
import { collection, doc, onSnapshot, orderBy, query, setDoc } from "firebase/firestore"
import { InfinitySpin } from "react-loader-spinner"
import { useDispatch } from "react-redux"
import { SET_USER } from "./context/actions/Useractions"
import { SET_PROJECTS } from "./context/actions/ProjectAction"
import NewProject from "./pages/NewProject"
import ProjectShow from "./pages/ProjectShow"
import { ToastContainer, } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function App() {

  const navigate = useNavigate()

  const [isloding, setisloding] = useState(true)
  const disptach = useDispatch()



  useEffect(() => {

    const unsubscribe = auth.onAuthStateChanged((userCred) => {
      if (userCred) {
        setDoc(doc(db, "users", userCred?.uid), userCred?.providerData[0]).then(() => {
          // todo
          disptach(SET_USER(userCred?.providerData[0]))
          navigate("/home/projects", { replace: true })
        })
      } else {
        navigate("/home/auth", { replace: true })
      }
      setInterval(() => {
        setisloding(false)
      }, 2000);
    })
    return () => unsubscribe()

  }, [])

  useEffect(() => {

    const projectsQuery = query(
      collection(db, "projects"),
      orderBy("id", "desc")
    )

    const unsubscribe = onSnapshot(projectsQuery, (querySnaps => {
      const projectList = querySnaps.docs.map((doc) => doc.data())
      disptach(SET_PROJECTS(projectList))
    }))

    return unsubscribe
  }, [])




  return (
    <>
      <ToastContainer />
      {
        isloding ?
          <div className="w-screen h-screen flex items-center justify-center overflow-hidden">
            <InfinitySpin
              visible={true}
              width="200"
              color="#864AF9"
              ariaLabel="infinity-spin-loading"
            />
          </div> :
          <div className='w-screen h-screen flex items-start justify-start overflow-hidden'>
            <Routes>
              <Route path="*" element={<Navigate to={"/home"} />} />
              <Route path="/home/*" element={<Home />} />
              <Route path="/newProject" element={<NewProject />} />
              <Route path="/project/:id" element={<ProjectShow />} />
            </Routes>
          </div>
      }
    </>

  )
}

export default App
