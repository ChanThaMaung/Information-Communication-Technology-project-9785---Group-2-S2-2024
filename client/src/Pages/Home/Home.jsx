import { useState } from 'react';// Import the new modal component
import { Link } from "react-router-dom";
import { HomeNavbar, Footer, PieChartWithCenterLabel, LearnMoreModal } from "../../components";
import '../../App.css'
import "./home.css"
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
        WhatWeDo: `We are developing a blockchain-based platform that redefines how carbon offset taxes are managed. 

Our platform provides a fully transparent, verifiable system for tracking carbon emissions and offsets, ensuring accurate allocation of carbon credits and streamlined compliance with environmental regulations.

Additionally, the platform leverages smart contracts to automate the issuance and trading of carbon credits, reducing the need for intermediaries and minimizing transaction costs. By integrating real-time data from IoT sensors and other tracking technologies, it enables precise monitoring of carbon footprints across various industries. Our goal is to empower businesses and governments to meet sustainability targets more efficiently, fostering greater accountability and collaboration in the fight against climate change.`,
        WhyBlockchain: `Blockchain technology offers an unparalleled level of security and transparency, making it the ideal solution for carbon offset management. 

Each transaction, whether initiated by carbon emitters, Verified Carbon Standard (VCS) regulators, or offset project developers, is securely logged in an immutable ledger. This not only eliminates the potential for double-selling carbon credits but also guarantees that every ton of offset is accounted for. 

With our platform, businesses can confidently meet their carbon tax obligations while maintaining full visibility and trust in the process.`,
        HowItWorks: `Our platform integrates three key participants in the carbon offset ecosystem:

1. Carbon Emitters: Companies seeking to offset their carbon footprint through certified projects.

2. Verifiers: Regulatory bodies responsible for validating emissions reductions and offsets.

3. Offset Developers: Organizations/Individuals developing carbon offset projects such as reforestation or renewable energy initiatives.

The public can view these activities on our platform, where they can search for specific transactions or projects.`
    };

    const socialMedia = [
        {
            name: 'Facebook',
            icon: 'facebook',
            link: 'https://www.facebook.com/your-page',
            text: 'Stay updated with our latest news and updates.'
        },
        {
            name: 'Twitter',
            icon: 'twitter',
            link: 'https://www.twitter.com/your-page',
            text: 'Follow us for the latest news and updates.'
        },
        {
            name: 'LinkedIn',
            icon: 'linkedin',
            link: 'https://www.linkedin.com/your-page',
            text: 'Connect with us on LinkedIn for more information.'
        },
        {
            name: 'Discord',
            icon: 'discord',
            link: 'https://www.discord.com/your-page',
            text: 'Join our Discord community for the latest news and updates.'
        }
    ];

    return (
        <>
            <HomeNavbar />

            {/* Carousel */}
            <div className="relative w-full h-auto bg--gradientCarousel place-content-center p-4 md:p-10"> {/* Added padding for responsiveness */}
                <div className="text-center p-10">
                    <h1 className="text-3xl md:text-4xl font-semibold font-mono text-white">
                        Transforming Carbon Offset Tax Compliance with Blockchain Technology
                    </h1>
                </div>
                <div className=" text-center md:block mb-12 header-item">
                    <h5 className="text-white font-mono text-base md:text-lg">
                        Revolutionize carbon offset tax compliance with our blockchain-powered platform. Ensure transparency, security, and accountability for your business or governing body, driving sustainability with innovative technology.
                    </h5>
                </div>
            </div>

            {/* Dashboard */}
            <div className="relative w-full h-auto bg-white place-content-center mt-8 md:mt-16">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 container mx-auto">
                    <div className="col-span-1 flex-col p-8">
                        <div className="items-center px-6 py-2">
                            <p className="text-sm inline-block btn btn-ghost bg-orange-200 rounded-full px-4 py-2">
                                Revolutional Carbon
                            </p>
                            <div className="mt-4">
                                <h1 className="text-3xl md:text-3xl font-semibold font-mono">
                                    Solving Climate Change with Blockchain
                                </h1>
                            </div>
                        </div>
                    </div>
                    <div className="col-span-1 md:col-span-2 flex-col border bg--gradientDBv2 shadow-md rounded-xl grid grid-cols-1 md:grid-cols-2">
                        <div className="flex items-center justify-center">
                            <PieChartWithCenterLabel />
                        </div>
                        <div className="justify-items-center p-4">
                            <p className="text-black font-mono text-lg">
                                A study by the World Resources Institute (WRI) in 2020 showed that double counting could occur in up to 40% of global transactions under certain scenarios. <span className="font-bold">Our platform solves that.</span>
                            </p>
                            <div className="flex justify-start">
                                <Link to={"/dashboard"} className="btn btn-primary mt-5 bg-orange-200 hover:bg-orange-300 px-4 py-2 rounded-full">
                                    Go to Dashboard
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* About */}
            <div className="mt-8 md:mt-16 mr-10 ml-10">
                <div className="container mx-auto">
                    <div className="flex justify-center">
                        <h1 className="text-4xl md:text-5xl font-thin font-mono">
                            About
                        </h1>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 justify-items-center mt-8">
                        {Object.entries(documents).map(([key, value]) => (
                            <div key={key} className="col-span-1 border-2 border-orange-200 rounded-xl flex flex-col">
                                <div className="bg-orange-200 rounded-t-lg items-center justify-center">
                                    <h1 className="text-2xl font-mono p-4 text-center capitalize">
                                        {key.replace(/([A-Z])/g, ' $1').trim()}
                                    </h1>
                                </div>
                                <div className="p-4 flex-grow flex flex-col justify-between">
                                    <div className="flex justify-center p-4">
                                        <p className="text-sm font-mono">
                                            {value.slice(0, 200)}...
                                        </p>
                                    </div>
                                    <div className="flex justify-center mt-auto">
                                        <button 
                                            onClick={() => handleShow(key.replace(/([A-Z])/g, ' $1').trim(), value)} 
                                            className="text-blue-500 font-mono bg-orange-200 hover:bg-orange-300 px-4 py-2 rounded-full"
                                        >
                                            Learn More
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="mt-8 md:mt-16">
                <div className="container mx-auto">
                    <div className="flex justify-center bg-slate-100 shadow-md rounded-xl">
                        <div className="py-12">
                            <div className="rounded-t-lg items-center justify-center pt-1">
                                <h1 className="text-4xl font-mono text-center">
                                    Contact Us
                                </h1>
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-mono">
                                    Feel free to reach out through any of our social media platforms. We’re always here to connect with you!
                                </p>
                            </div>
                            <div className="grid grid-cols-2 gap-4 mx-auto">
                                {socialMedia.map((platform) => (
                                    <div key={platform} className="col-span-2 md:col-span-1 p-4 flex items-center">
                                        <div className="border-2 border-slate-300 bg-white rounded-md w-14 h-14 flex items-center justify-center">
                                            <i className={`fab fa-${platform.icon} text-2xl m-2`}></i>
                                        </div>
                                        <div className="p-2">
                                            <p className="text-sm font-mono text-black capitalize">{platform.name}</p>
                                            <p className="text-sm font-mono text-black">{platform.text}</p>
                                        </div>
                                    </div>
                                ))}
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
