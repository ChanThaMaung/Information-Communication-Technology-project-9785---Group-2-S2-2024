function Header() {
    return (
        <div>
            {/* <nav classNameName="nav">
                <a classNameName="nav-link active" href="#">Active</a>
                <a classNameName="nav-link" href="#">Link</a>
                <a classNameName="nav-link" href="#">Link</a>
                <a classNameName="nav-link disabled" href="#">Disabled</a>
            </nav> */}
            <nav className="bg-gray-100 p-4">

                <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <li className="text-gray-900">
                            <a className="font-semibold" href="#">Home</a>
                        </li>
                        <li className="text-gray-600">
                            <a href="#">Link</a>
                        </li>
                        <li className="relative">
                            <a className="text-gray-600" href="#" role="button" aria-expanded="false">Dropdown</a>
                            <div className="absolute hidden bg-white shadow-md rounded mt-2">
                                <a className="block px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">Action</a>
                                <a className="block px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">Another action</a>
                                <div className="border-t border-gray-300"></div>
                                <a className="block px-4 py-2 text-gray-700 hover:bg-gray-200" href="#">Something else here</a>
                            </div>
                        </li>
                        <li className="text-gray-400 cursor-not-allowed">
                            <a href="#">Disabled</a>
                        </li>
                    </ul>

                    <form className="flex items-center space-x-2 mt-4 md:mt-0">
                        <input className="px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-green-500" type="search" placeholder="Search" aria-label="Search" />
                        <button className="px-4 py-2 border border-green-500 text-green-500 rounded-md hover:bg-green-500 hover:text-white transition-colors duration-300" type="submit">Search</button>
                    </form>
                </div>
            </nav>

        </div>
    )
}

export default Header;
