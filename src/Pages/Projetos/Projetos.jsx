import React from 'react'
import ProjetoCard from './ProjetoCard'

const Projetos = () => {
  return (
    <div className='flex flex-col items-center bg-gray-200 h-[100vh] '>
      <div className='flex w-[100vw] h-[10vh] items-center justify-center bg-slate-600'>
        <h1 className=''>Conteudo</h1>
      </div>
        
        <div className=' justify-center'>
          <ProjetoCard/>
        </div>
    </div>
  ) 
}

export default Projetos