import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";

export default function Navbarv2() {
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
    return (
        <>
            <nav className={`flex p-4 relative right-0 left-0 z-50 place-content-between bg--gradientCarousel `}>
                <div className="flex items-center justify-between w-full">
                    <div className="md:flex hidden">
                        <ul className="flex space-x-4">
                            <li className="text-white font-light text-xl p-1">
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                                <Link to={"/dashboard"}>Dashboard</Link>
                            </li>
                            <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                                <Link to={"/transaction_page"}>Transaction</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="md:hidden flex items-center relative"> {/* Added relative positioning */}
                        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <i className="fa-solid fa-bars text-white text-2xl"></i>
                        </button>
                        <div className={`absolute left-0 top-5 mt-2 bg-black shadow-md rounded-md transition-all duration-300 ease-in-out ${dropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}> {/* Transition effect */}
                            <ul className="flex flex-col space-y-2 p-4">
                                <li>
                                    <Link to={"/"} className="text-white hover:text-gray-600">Home</Link>
                                </li>
                                <li>
                                    <Link to={"/dashboardforemitter"} className="text-white hover:text-gray-600">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to={"/transactionpage"} className="text-white hover:text-gray-600">Transaction</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    )
}