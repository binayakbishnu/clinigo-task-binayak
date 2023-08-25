import React from 'react'
import Navbar from './Components/Navbar'
import { Outlet } from 'react-router-dom'

function Wrapper() {
    return (
        <div className='flex flex-col justify-start items-stretch h-[100vh]'>
            <Navbar />

            <Outlet />
        </div>
    )
}

export default Wrapper