function Footer() {
    return (
        <div className="pt-8 pb-10 mt-16 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center md:text-left">
                    <i className="fa-solid fa-coins text-indigo-600 text-2xl"></i>
                    <small className="block text-gray-500">© 2017-2018</small>
                </div>
                <div>
                    <h5 className="font-semibold p-5 pl-0 text-lg">Features</h5>
                    <ul className="space-y-2">
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Trading and Exchange Platform</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Cryptocurrency Wallet Integration</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Customer Support</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Educational Resources</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold p-5 pl-0 text-lg">Resources</h5>
                    <ul className="space-y-2">
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Educational Content</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">API Documentation</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Tax Resources</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Social Media Integration</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold p-5 pl-0 text-lg">About</h5>
                    <ul className="space-y-2">
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Team</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Locations</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Privacy</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Terms</a></li>
                    </ul>
                </div>
            </div>
        </div>

    )
}

export default Footer;