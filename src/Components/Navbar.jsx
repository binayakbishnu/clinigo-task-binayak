import React from 'react'
import { Link } from 'react-router-dom'

function Navbar() {
    return (
        <div className = {`py-5 flex flex-row items-center justify-center gap-10 text-white mb-4`}>
                <Link to="/" className={`hover:underline`}>Home</Link>
                <Link to="/about" className={`hover:underline`}>About</Link>
        </div >
    )
}

export default Navbar