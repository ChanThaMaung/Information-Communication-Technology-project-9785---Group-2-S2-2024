import { Link } from "react-router-dom";
import './css/home-navbar.css';

export default function HomeNavbar() {
    return (
        <nav className="flex p-4 right-0 left-0 top-0 z-50 place-content-between bg--gradientCarousel nav">
            <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <li className="text-white font-light text-xl p-1">
                        <Link to={"/"}>Home</Link>
                    </li>
                    <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                        <a href="">About</a>
                    </li>
                    <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                        <a href="">Contact</a>
                    </li>
                </ul>
            </div>
            <div className="md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                    <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                        <Link 
                            to="/transaction_page"
                            className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded bg-opacity-30"
                        >
                            View Transactions
                        </Link>
                    </li>
                </ul>
            </div>
        </nav>
    )
}