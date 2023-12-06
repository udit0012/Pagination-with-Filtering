import React from 'react'
import { useLocation } from 'react-router'
import { Link } from 'react-router-dom'

const Navbar = () => {
    const location = useLocation()
    const [openMenu, setOpenMenu] = React.useState(false)
    return (
        <nav className="bg-gray-800">
            <div className="mx-auto max-w-7xl px-1 md:px-3 lg:px-8">
                <div className="relative flex py-2  items-center justify-between">
                    <div className="inset-y-0 left-0 flex items-center sm:hidden">
                        {/* <!-- Mobile menu button--> */}
                        <button type="button" onClick={() => setOpenMenu(!openMenu)} className="relative inline-flex items-center justify-center rounded-md p-2 mr-1 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-none" aria-controls="mobile-menu" aria-expanded="false">
                            <span className="absolute -inset-0.5"></span>
                            {!openMenu ? <span className="material-symbols-outlined">menu</span>
                                : <span className="material-symbols-outlined">close</span>}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-start sm:items-stretch sm:justify-start">
                        <div className="flex flex-shrink-0 items-center">
                            <span className='text-lg lg:text-xl text-white'>teamManaGer</span>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className="flex space-x-4">
                                {/* // Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                                <Link to={"/"} className={`${location.pathname === "/" ? "bg-gray-900 text-white" : "hover:bg-gray-700 text-gray-300 hover:text-white"} block rounded-md px-3 py-2 text-base font-medium`} aria-current="page">Dashboard</Link>
                                <Link to={"/teams"} className={`${location.pathname === "/teams" ? "bg-gray-900 text-white" : "hover:bg-gray-700 text-gray-300 hover:text-white"}  block rounded-md px-3 py-2 text-base font-medium`}>Teams</Link>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0">
                        <div className="relative ml-3">
                            <div>
                                <button className="flex justify-center items-center text-xs md:text-sm bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-2 rounded">
                                    <span className="material-symbols-outlined text-sm lg:text-2xl font-bold mr-2">
                                        add
                                    </span>
                                    <span className="">Create User</span>
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* // Mobile menu, show/hide based on menu state */}
            <div className={`absolute ${openMenu?"z-10 block":"hidden"} w-full sm:hidden bg-gray-800`} id="mobile-menu">
                <div className="space-y-1 px-2 pb-3 pt-2">
                    {/* //Current: "bg-gray-900 text-white", Default: "text-gray-300 hover:bg-gray-700 hover:text-white" */}
                    <Link to={"/"} className={`${location.pathname === "/" ? "bg-gray-900 text-white" : "hover:bg-gray-700 text-gray-300 hover:text-white"} block rounded-md px-3 py-2 text-base font-medium`} aria-current="page">Dashboard</Link>
                    <Link to={"/teams"} className={`${location.pathname === "/teams" ? "bg-gray-900 text-white" : "hover:bg-gray-700 text-gray-300 hover:text-white"}  block rounded-md px-3 py-2 text-base font-medium`}>Teams</Link>
                </div>
            </div>
        </nav>

    )
}

export default Navbar