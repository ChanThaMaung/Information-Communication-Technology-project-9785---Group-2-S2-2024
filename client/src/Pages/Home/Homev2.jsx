import { useState } from 'react';// Import the new modal component
import { Link } from "react-router-dom";
import { Navbarv2, Footer, PieChartWithCenterLabel, LearnMoreModal } from "../../components";


export default function Homev2() {
    const [showModal, setShowModal] = useState(false);
    const [modalContent, setModalContent] = useState('');
    const [modalTitle, setModalTitle] = useState(''); // New state for title

    const handleShow = (title, content) => {
        setModalTitle(title); // Set the title
        setModalContent(content);
        setShowModal(true);
    };
    const handleClose = () => setShowModal(false);

    const documents = {
        whatWeDo: "At the forefront of innovation, we are developing a blockchain-based platform that redefines how carbon offset taxes are managed. Our platform provides a fully transparent, verifiable system for tracking carbon emissions and offsets, ensuring accurate allocation of carbon credits and streamlined compliance with environmental regulations.",
        whyBlockchain: "Blockchain technology offers an unparalleled level of security and transparency, making it the ideal solution for carbon offset management. Each transaction, whether initiated by carbon emitters, Verified Carbon Standard (VCS) regulators, or offset project developers, is securely logged in an immutable ledger. This not only eliminates the potential for double-selling carbon credits but also guarantees that every ton of offset is accounted for. With our platform, businesses can confidently meet their carbon tax obligations while maintaining full visibility and trust in the process.",
        howItWorks: 'Our platform integrates three key participants in the carbon offset ecosystem: \
                    Carbon Emitters: Companies seeking to offset their carbon footprint through certified projects. \
                    Verified Carbon Standard (VCS): Regulatory bodies responsible for validating emissions reductions and offsets. \
                    Offset Developers: Organizations developing carbon offset projects such as reforestation or renewable energy initiatives.'
    };

    return (
        <>
            <Navbarv2 />

            {/* Carousel */}
            <div className="relative w-full h-auto bg--gradientCarousel place-content-center "> {/* Added margin-top */}
                <div className=" text-center p-10">
                    <h1 className="text-4xl font-semibold font-mono text-white">
                        Transforming Carbon Offset Tax Compliance with Blockchain Technology
                    </h1>
                </div>
                <div className=" text-center p-4 md:block ml-8">
                    <h5 className="text-white font-mono text-lg ">
                        Revolutionize carbon offset tax compliance with our blockchain-powered platform. Ensure transparency, security, and accountability for your business or governing body, driving sustainability with innovative technology.
                    </h5>
                </div>
            </div>

            {/* Dashboard */}
            <div className="relative w-full h-auto bg-white place-content-center mt-16">
                <div className="grid grid-cols-3 gap-4 container mx-auto">
                    <div className="col-span-1 flex-col p-4">
                        <div className="items-center px-6 py-2">
                            <p className="text-sm inline-block btn btn-ghost bg-orange-200 rounded-full px-4 py-2">
                                Dashboard
                            </p>
                            <div className="mt-4">
                                <h1 className="text-5xl font-semibold font-mono">
                                    Lorem ipsum dolor sit amet consectetur.
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-2 flex-col border bg--gradientDBv2 shadow-md rounded-xl grid grid-cols-2">
                        <div className="col-span-1 flex items-center justify-center">
                            <PieChartWithCenterLabel />
                        </div>
                        <div className="col-span-1 justify-items-center">
                            <p className="text-black font-mono text-lg p-4 mt-6">
                                Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aliquam, voluptas vitae eaque earum voluptatum mollitia culpa cumque. Incidunt, minus?
                            </p>
                            <Link to={"/dashboard"} className="btn btn-primary mt-4 ml-4 bg-orange-200 hover:bg-orange-300 px-4 py-2 rounded-full">
                                Go to Dashboard
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="mt-16">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <h1 className="text-5xl font-thin font-mono ">
                            About
                        </h1>
                    </div>
                    <div className="grid grid-cols-3 gap-8 justify-items-center mt-8">
                        <div className="col-span-1 border-2 border-orange-200 rounded-xl">
                            <div className="bg-orange-200 rounded-t-lg items-center justify-center">
                                <h1 className="text-2xl font-mono p-4 text-center">
                                    What We Do
                                </h1>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-center p-4">
                                    <p className="text-sm font-mono ">
                                        At the forefront of innovation...
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={() => handleShow("What We Do", documents.whatWeDo)} className="text-blue-500 font-mono bg-orange-200 hover:bg-orange-300 px-4 py-2 rounded-full">Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 border-2 border-orange-200 rounded-xl">
                            <div className="bg-orange-200 rounded-t-lg items-center justify-center">
                                <h1 className="text-2xl font-mono p-4 text-center">
                                    Why Blockchain?
                                </h1>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-center p-4">
                                    <p className="text-sm font-mono">
                                        Blockchain technology offers an unparalleled level of security...
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={() => handleShow("Why Blockchain?", documents.whyBlockchain)} className="text-blue-500 font-mono bg-orange-200 hover:bg-orange-300 px-4 py-2 rounded-full">Learn More</button>
                                </div>
                            </div>
                        </div>
                        <div className="col-span-1 border-2 border-orange-200 rounded-xl">
                            <div className="bg-orange-200 rounded-t-lg items-center justify-center">
                                <h1 className="text-2xl font-mono p-4 text-center">
                                    How It Works:
                                </h1>
                            </div>
                            <div className="p-4">
                                <div className="flex justify-center p-4">
                                    <p className="text-sm font-mono">
                                        Our platform integrates three key participants...
                                    </p>
                                </div>
                                <div className="flex justify-center">
                                    <button onClick={() => handleShow("How It Works", documents.howItWorks)} className="text-blue-500 font-mono bg-orange-200 hover:bg-orange-300 px-4 py-2 rounded-full">Learn More</button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="mt-16 ">
                <div className="container mx-auto">
                    <div className="flex justify-center bg-slate-100 shadow-md rounded-xl">
                        <div className="py-12">
                            <div className=" rounded-t-lg items-center justify-center pt-1">
                                <h1 className="text-4xl font-mono text-center">
                                    Contact Us
                                </h1>
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-mono">
                                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Autem aliquam, voluptas vitae eaque earum voluptatum mollitia culpa cumque. Incidunt, minus?
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mx-auto">
                                <div className="col-span-1 p-4 flex items-center">
                                    <div className="border-2 border-slate-300 bg-white rounded-md w-14 h-14 flex items-center justify-center">
                                        <i className="fab fa-facebook-f text-2xl m-2"></i>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-sm font-mono text-black">Facebook</p>
                                        <p className="text-sm font-mono text-black">lorem ipsum dolor sit amet consectetur adipisicing ?</p>
                                    </div>

                                </div>
                                <div className="col-span-1 p-4 flex items-center">
                                    <div className="flex items-center border-2 border-slate-300 bg-white rounded-md w-14 h-14 justify-center">
                                        <i className="fab fa-x-twitter text-2xl m-2"></i>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-sm font-mono text-black">X</p>
                                        <p className="text-sm font-mono text-black">lorem ipsum dolor sit amet consectetur adipisicing ?</p>
                                    </div>
                                </div>
                                <div className="col-span-1 p-4 flex items-center">

                                    <div className="flex items-center border-2 border-slate-300 bg-white rounded-md w-14 h-14 justify-center">
                                        <i className="fab fa-linkedin-in text-2xl m-2"></i>
                                    </div>
                                    <div className="p-2">
                                        <p className="text-sm font-mono text-black">LinkedIn</p>
                                        <p className="text-sm font-mono text-black">lorem ipsum dolor sit amet consectetur adipisicing ?</p>
                                    </div>
                                </div>
                                <div className="col-span-1 p-4 flex items-center">
                                    <div className="flex items-center border-2 border-slate-300 bg-white rounded-md w-14 h-14 justify-center">
                                        <i className="fab fa-discord text-2xl m-2"></i> {/* Added Yahoo icon */}
                                    </div>
                                    <div className="p-2">
                                        <p className="text-sm font-mono text-black">Discord</p>
                                        <p className="text-sm font-mono text-black">lorem ipsum dolor sit amet consectetur adipisicing ?</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>

            <Footer />



            {/* Modal for Learn More */}
            <LearnMoreModal show={showModal} handleClose={handleClose} content={modalContent} title={modalTitle} />

        </>
    );
}
