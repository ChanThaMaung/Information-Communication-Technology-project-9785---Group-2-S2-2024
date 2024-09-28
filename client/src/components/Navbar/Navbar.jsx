
import { Link } from "react-router-dom";

export default function Navbar() {
    return (
        <>
            <nav className="flex p-4 fixed right-0 left-0 top-0 z-50 place-content-between bg-black">

                <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <li className="text-cyan-600 text-xl p-1">
                            <Link className="font-semibold" to={"/"}>Home</Link>
                        </li>
                        <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <Link to={"/dashboardforemitter"}>Dashboard</Link>
                        </li>
                        <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            {/* <a href="#about">About</a> */}
                            <Link to={"/homev2"}>About</Link>
                        </li>
                        <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            {/* <a href="#contact">Contact</a> */}
                            <Link to={"/transactionpage"}>Contact</Link>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <Link to={"/signIn"}>Sign In</Link>
                        </li>
                        <li className="rounded text-white text-lg p-1 bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
                            <Link to={"/signUp"}>Sign Up</Link>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}

