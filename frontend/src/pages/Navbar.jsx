import { Link } from "react-router-dom"
import { useState } from "react"

const Navbar = () => {
  return (
    <nav className="fixed top-1 left-12 right-12 z-50 bg-gray-700 backdrop-blur-md rounded-3xl p-4 shadow-lg transition-all duration-300">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <div className="flex items-center space-x-2">
          <h1 className="text-2xl font-bold text-white">
            <Link to={"/"}>
              <span className="hidden sm:inline">Construction</span>
            </Link>
          </h1>
        </div>

        <div className="hidden md:flex items-center space-x-8">
          <Link to="/" className="text-white hover:text-white relative group font-medium">
            Home
            <span className="absolute inset-x-0 bottom-0 h-0.5 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 ease-out"></span>
          </Link>
        </div>

        <div className="md:hidden">
          <Link
            to="/"
            className="text-white border-2 border-white py-2 px-4 rounded-md hover:bg-white hover:text-gray-700 transition-all duration-300 font-medium"
          >
            Home
          </Link>
        </div>
      </div>
    </nav>
  )
}

export default Navbar
