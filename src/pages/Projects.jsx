import { useSelector } from 'react-redux'
import { motion } from 'framer-motion'
import { Bookmark } from 'lucide-react'
import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'

const Projects = () => {
    const projects = useSelector(state => state.projects?.projects)
    const [filtered, setfiltered] = useState(null)

    const navigate = useNavigate()

    useEffect(() => {

    }, [])


    return (
        <div className='py-10'>
            <div className="grid grid-cols-1 gap-4 lg:grid-cols-4 lg:gap-8">
                {projects && projects.map((item, index) => (
                    <motion.div key={item.id} className="h-[400px] w-full cursor-pointer md:w-[450x] rounded-lg  flex flex-col items-center justify-center gap-2 bg-secondary" 
                    onClick={() => navigate(`/project/${item.id}`)}>
                        <div  className='w-full h-full p-2'>
                            <div onClick={() => navigate(`/project/${item.id}`)} className='bg-secondary w-full h-full overflow-hidden rounded-md' style={{ overflow: "hidden", height: "100%" }}>
                                <iframe srcDoc={item.output} style={{ width: "100%", height: "100%", border: "none" }} title='result' />
                            </div>
                        </div>
                        <div  className='flex items-center justify-between gap-3 w-full bg-secondary px-2 pb-3'>
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
        </div>
    )
}

export default Projects