import React from 'react'
import Navbar from '../../../Components/Navbar'
import Footer from '../../../Components/Footer'

const SaibaMais = () => {
  return (
    <div className='flex flex-col min-h-screen' >
        <Navbar/>
        <main className='flex flex-grow flex-col items-center px-4 sm:px-8 md:px-12 lg:px-16 py-12 mt-16 '> 
            <h1 className=' font-bold text-2xl text-center'>
                Projeto: EstroGênias

            </h1>
            <div className='flex justify-center items-center bg-slate-500 h-[40vh] w-[50vw] mt-6'>
                t
            </div>
            <p className='mt-6 text-xl'>
                Temos como objetivo introduzir a cada vez mais mulheres no mundo da Robótica
            </p>
        </main>
        <Footer/>

        
    </div>
  )
}

export default SaibaMais