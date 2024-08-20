import Header from "../../components/Header/Header";
import Footer from "../../components/Footer/Footer";



export default function Home() {
    return (
        <>
            {/* Header */}
            <Header />

            {/* Carousel */}
            <div id="carouselExampleIndicators" className="relative overflow-hidden">
                <ol className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex space-x-2">
                    <li data-target="#carouselExampleIndicators" data-slide-to="0" className="w-3 h-3 bg-gray-400 rounded-full"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="1" className="w-3 h-3 bg-gray-400 rounded-full"></li>
                    <li data-target="#carouselExampleIndicators" data-slide-to="2" className="w-3 h-3 bg-gray-600 rounded-full"></li>
                </ol>

                <div className="carousel-inner relative w-full h-fit overflow-hidden flex transition-transform duration-700">
                    <div className="carousel-item active w-full flex-none">
                        <img className="w-full h-full object-cover" src="https://tse2.mm.bing.net/th?id=OIP.yEinwMqB6YvkbDnqTciTDQHaEK&pid=Api&P=0&h=180" alt="First slide" />
                    </div>
                    <div className="carousel-item w-full flex-none">
                        <img className="w-full h-full object-cover" src="..." alt="Second slide" />
                    </div>
                    <div className="carousel-item w-full flex-none">
                        <img className="w-full h-full object-cover" src="..." alt="Third slide" />
                    </div>
                </div>


            </div>

            {/* Dashboard */}
            <div className="container mx-auto px-4 mt-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="bg-gray-100 p-4 rounded-t-lg">
                            <i className="fa-solid fa-fire"></i>
                            <h4 className="text-lg font-normal">Bitcoin BTC</h4>
                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl font-bold">$60,573.39 <small className="text-green-500 text-base">+1%</small></h1>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="bg-gray-100 p-4 rounded-t-lg">
                            <i className="fa-solid fa-fire"></i>
                            <h4 className="text-lg font-normal">Ethereum ETH</h4>
                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl font-bold">$2,659.77<small className="text-green-500 text-base">+1%</small></h1>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="bg-gray-100 p-4 rounded-t-lg">
                            <i className="fa-solid fa-fire"></i>
                            <h4 className="text-lg font-normal">Stellar XLM</h4>
                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl font-bold">$0.10 <small className="text-red-500 text-base">-1%</small></h1>
                        </div>
                    </div>
                    <div className="bg-white rounded-lg shadow-md">
                        <div className="bg-gray-100 p-4 rounded-t-lg">
                            <i className="fa-solid fa-fire"></i>
                            <h4 className="text-lg font-normal">Solana SOL</h4>
                        </div>
                        <div className="p-4">
                            <h1 className="text-4xl font-bold">$146.47 <small className="text-red-500 text-base">-1%</small></h1>
                        </div>
                    </div>
                </div>
                <div className="bg-cyan-500 p-4 rounded-t-lg">
                    <a className="text-lg font-normal">
                        Explore more on Dashboard
                        <i className="fa-solid fa-arrow-right pl-2"></i>
                    </a>
                </div>
            </div>

            {/* About */}
            <div className="mt-20">
                <div className="w-full md:w-auto blue-card-parent relative">
                    <div className="w-3/5 ml-auto mr-auto">
                        <h1 className=" text-center text-2xl font-semibold item-title ">About</h1>
                    </div>
                    <div className="flex flex-wrap justify-center items-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 item-box">
                            <article className="item">
                                <div className="item-content">
                                    <h3 className="item-title font-semibold text-lg">Protected &amp; secure</h3>
                                    <div className="item-desc text-sm">
                                        Lorem, ipsum dolor sit amet consectetur adipisicing elit. Culpa iure, animi molestiae minus quas quam ad unde qui impedit atque.
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 item-box">
                            <article className="item">
                                <div className="item-content">
                                    <h3 className="item-title font-semibold text-lg">Professional support</h3>
                                    <div className="item-desc text-sm">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Labore, veniam!
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 item-box">
                            <article className="item">
                                <div className="item-content">
                                    <h3 className="item-title font-semibold text-lg">Regulated</h3>
                                    <div className="item-desc text-sm">
                                        Lorem ipsum dolor sit amet consectetur, adipisicing elit. Nesciunt rem earum veniam obcaecati ea, corporis ducimus delectus tenetur autem dolores! <a href="/en-au/tradingacademy/faq/regulators/throughwhichsubsdoyouoperate" className="text-blue-500 underline">Learn more</a>.
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 item-box">
                            <article className="item">
                                <div className="item-content">
                                    <h3 className="item-title font-semibold text-lg">Reliable</h3>
                                    <div className="item-desc text-sm">
                                        Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, doloribus pariatur architecto sint officiis expedita culpa nisi saepe eos mollitia.
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div className="w-full mt-6 mb-6">
                <div className="w-3/5 ml-auto mr-auto p-10">
                    <h1 className=" text-center text-2xl font-semibold item-title ">Contact</h1>
                </div>
                <div className="flex flex-wrap -mx-4 w-3/4 ml-auto mr-auto">
                    <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                        <img className="rounded-full mx-auto" src="https://tse2.mm.bing.net/th?id=OIP.loCwsn7u3iAGhlFClCumdgHaHa&pid=Api&P=0&h=180" alt="Generic placeholder image" width="140" height="140" />
                        <h2 className="text-center text-xl font-semibold mt-4">Gmail</h2>
                        <p className="text-center mt-4"><a className="text-indigo-600 hover:text-indigo-800 font-semibold" href="#" role="button">Join in »</a></p>
                    </div>
                    <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                        <img className="rounded-full mx-auto" src="https://tse2.mm.bing.net/th?id=OIP.HmkQj-92MxoQ2vtSToEk6QHaHa&pid=Api&P=0&h=180" alt="Generic placeholder image" width="140" height="140" />
                        <h2 className="text-center text-xl font-semibold mt-4">X</h2>
                        <p className="text-center mt-4"><a className="text-indigo-600 hover:text-indigo-800 font-semibold" href="#" role="button">Join in »</a></p>
                    </div>
                    <div className="w-full lg:w-1/3 px-4 mb-8 lg:mb-0">
                        <img className="rounded-full mx-auto" src="https://tse2.mm.bing.net/th?id=OIP.2sdDiTIXNLSBVUup0dUpCgHaHa&pid=Api&P=0&h=180" alt="Generic placeholder image" width="140" height="140" />
                        <h2 className="text-center text-xl font-semibold mt-4">Discoin</h2>
                        <p className="text-center mt-4"><a className="text-indigo-600 hover:text-indigo-800 font-semibold" href="#" role="button">Join in »</a></p>
                    </div>
                </div>
            </div>

            {/* Footer */}
            <Footer />
        </>
    )
}
