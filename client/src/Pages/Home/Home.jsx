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

            {/* About */}
            <div className="mt-20">
                <div className="w-full md:w-auto blue-card-parent relative">
                    <div className="w-3/5 ml-auto mr-auto">
                        <h1 className="m-auto text-center text-lg font-semibold item-title ">About</h1>
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


            {/* Footer */}
            <Footer />
        </>
    )
}
