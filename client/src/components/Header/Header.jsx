function Header() {
    return (
        <>
            {/* <nav classNameName="nav">
                <a classNameName="nav-link active" href="#">Active</a>
                <a classNameName="nav-link" href="#">Link</a>
                <a classNameName="nav-link" href="#">Link</a>
                <a classNameName="nav-link disabled" href="#">Disabled</a>
            </nav> */}
            <nav className="flex p-4 fixed right-0 left-0 top-0 z-50 place-content-between bg-black">

                <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <li className="text-cyan-600 text-xl p-1">
                            <a className="font-semibold" href="#">Home</a>
                        </li>
                        <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <a href="#">Dashboard</a>
                        </li>
                        <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <a href="#">About</a>
                        </li>
                        <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <a href="#">Sign In</a>
                        </li>
                        <li className="text-gray-500 rounded hover:text-white hover:text-gray-300 hover:cursor-pointer hover:bg-cyan-600 text-lg p-1 bg-cyan-200 ">
                            <a href="#">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </nav>

        </>
    )
}

export default Header;
