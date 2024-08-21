function Header() {
    return (
        <div>
            <nav className="bg-black p-4 flex place-content-between fixed top-0 left-0 right-0 z-50">
                <div className="place-content-around  md:flex-row md:items-center md:space-x-4  md:mt-0">
                    <ul className="flex md:flex-row  md:space-y-0 md:space-x-4">
                        <li className="text-zinc-50 text-3xl p-1">
                            <a href="#">
                                <i className="fa-solid fa-house"></i>
                            </a>
                        </li>
                        <li className="text-zinc-50 text-xl p-1 text-center">
                            <a href="#">Dashboard</a>
                        </li>
                        <li className="text-zinc-50 text-xl p-1">
                            <a href="#">About</a>
                        </li>
                        <li className="text-zinc-50 text-xl p-1">
                            <a href="#">Contact</a>
                        </li>
                    </ul>
                </div>

                <div className=" md:flex md:flex-row md:items-center md:space-x-4 md:mt-0">
                    <ul className="flex md:flex-row md:space-y-0 md:space-x-4">
                        <li className="text-zinc-50 text-xl p-1">
                            <a href="#">Log In</a>
                        </li>
                        <li className="text-zinc-50 text-xl p-1 bg-cyan-600 rounded-lg">
                            <a href="#">Sign Up</a>
                        </li>
                    </ul>
                </div>
            </nav>

        </div>
    )
}

export default Header;
