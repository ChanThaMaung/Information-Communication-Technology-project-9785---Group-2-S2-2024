function Footer() {
    return (
        <div className="pt-8 pb-3 mt-16 border-t border-gray-200 bg--gradientCarousel">

            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 container mx-auto text-left  px-4 md:px-0 justify-center">
                <div>
                    <h5 className="font-semibold text-white p-5 pl-0 text-lg">Features</h5>
                    <ul className="space-y-2">
                        <li><a className="text-white hover:text-gray-700" href="#">Trading and Exchange Platform</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Cryptocurrency Wallet Integration</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Customer Support</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Educational Resources</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold text-white p-5 pl-0 text-lg">Links</h5>
                    <ul className="space-y-2">
                        <li><a className="text-white hover:text-gray-700" href="#">Blog</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">How It Works</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">About Us</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Terms of Service</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold text-white p-5 pl-0 text-lg">About</h5>
                    <ul className="space-y-2">
                        <li><a className="text-white hover:text-gray-700" href="#">Team</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Locations</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Privacy</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Terms</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold text-white p-5 pl-0 text-lg">Resources</h5>
                    <ul className="space-y-2">
                        <li><a className="text-white hover:text-gray-700" href="#">Educational Content</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">API Documentation</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Tax Resources</a></li>
                        <li><a className="text-white hover:text-gray-700" href="#">Social Media Integration</a></li>
                    </ul>
                </div>
            </div>
            <div className="text-center md:text-left mt-10">
                <small className="block text-white">
                    © 2024 Enabling Transparent Carbon Offset Tax Compliance with Blockchain. All rights reserved. | Privacy Policy | Terms of Service
                </small>
            </div>
        </div>

    )
}

export default Footer;