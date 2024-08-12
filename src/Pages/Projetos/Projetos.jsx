import React from 'react'
import ProjetoCard from './ProjetoCard'
import Navbar from '../../Components/Navbar'



const Projetos = () => {
  return (
    <div className='flex flex-col items-center bg-gray-200 h-[100vh] '>
      <Navbar/>
        
        <div className=' justify-center'>
          <ProjetoCard/>
        </div>
    </div>
  ) 
}

export default Projetos