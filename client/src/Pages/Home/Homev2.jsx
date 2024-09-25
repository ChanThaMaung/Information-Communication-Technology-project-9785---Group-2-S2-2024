import { Link } from "react-router-dom";
import { Navbarv2, Footer } from "../../components";


export default function Homev2() {
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
                        <div className="col-span-1">
                            <img
                                className="w-full h-full object-cover rounded-s-xl"
                                src={"https://science.nasa.gov/wp-content/uploads/2023/12/co2-graph-083122_scaled_scrunched.jpg?w=2560&format=webp"} alt="Dashboard"
                            />
                        </div>
                        <div className="col-span-1">
                            <p className="text-black font-mono text-lg p-4 ">
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
                                <p className="text-sm font-mono">
                                    At the forefront of innovation, we are developing a blockchain-based platform that redefines how carbon offset taxes are managed. Our platform provides a fully transparent, verifiable system for tracking carbon emissions and offsets, ensuring accurate allocation of carbon credits and streamlined compliance with environmental regulations.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1 border-2 border-orange-200 rounded-xl">
                            <div className="bg-orange-200 rounded-t-lg items-center justify-center">
                                <h1 className="text-2xl font-mono p-4 text-center">
                                    Why Blockchain?
                                </h1>
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-mono">
                                    Blockchain technology offers an unparalleled level of security and transparency, making it the ideal solution for carbon offset management. Each transaction, whether initiated by carbon emitters, Verified Carbon Standard (VCS) regulators, or offset project developers, is securely logged in an immutable ledger. This not only eliminates the potential for double-selling carbon credits but also guarantees that every ton of offset is accounted for. With our platform, businesses can confidently meet their carbon tax obligations while maintaining full visibility and trust in the process.
                                </p>
                            </div>
                        </div>
                        <div className="col-span-1 border-2 border-orange-200 rounded-xl">
                            <div className="bg-orange-200 rounded-t-lg items-center justify-center">
                                <h1 className="text-2xl font-mono p-4 text-center">
                                    How It Works:
                                </h1>
                            </div>
                            <div className="p-4">
                                <p className="text-sm font-mono">
                                    Our platform integrates three key participants in the carbon offset ecosystem:
                                    Carbon Emitters: Companies seeking to offset their carbon footprint through certified projects.
                                    Verified Carbon Standard (VCS): Regulatory bodies responsible for validating emissions reductions and offsets.
                                    Offset Developers: Organizations developing carbon offset projects such as reforestation or renewable energy initiatives.
                                    Through the use of smart contracts, each carbon offset transaction is automated and securely verified, offering an efficient, reliable solution for managing compliance and tracking environmental impact.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <Footer />
        </>

    )
}
