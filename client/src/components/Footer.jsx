console.log("Footer Rendering")
function Footer() {
    return (
        <div className="pt-16 mt-16 border-t border-gray-200">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                <div className="text-center md:text-left">
                    <img className="mb-4 mx-auto md:mx-0" src="https://getbootstrap.com/docs/4.0/assets/brand/bootstrap-solid.svg" alt="" width="24" height="24" />
                    <small className="block text-gray-500">© 2017-2018</small>
                </div>
                <div>
                    <h5 className="font-semibold">Features</h5>
                    <ul className="space-y-2">
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Cool stuff</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Random feature</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Team feature</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Stuff for developers</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Another one</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Last time</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold">Resources</h5>
                    <ul className="space-y-2">
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Resource</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Resource name</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Another resource</a></li>
                        <li><a className="text-gray-500 hover:text-gray-700" href="#">Final resource</a></li>
                    </ul>
                </div>
                <div>
                    <h5 className="font-semibold">About</h5>
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