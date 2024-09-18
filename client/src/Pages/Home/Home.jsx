import { useEffect, useState } from "react";
import { Footer, Navbar } from "../../components";
// import CryptoCard from "../../components/CryptoCard/CryptoCard";
// import axios from "axios";


export default function Home() {
    const [cryptoData, setCryptoData] = useState([]);
    const fetchCryptoAPI = async () => {
        const options = {
            headers: {
                'x-access-token': 'coinranking3b54ba27f3f686f288bbc64a3e2f238398c7516f5e8bcf18',
            },
        };

        try { // Added try-catch for error handling
            const response = await fetch('https://api.coinranking.com/v2/coins', options); // Used await
            const result = await response.json(); // Used await\
            setCryptoData(result.data.coins.slice(0, 4)); // Store first 4 coins in state
        } catch (error) {
            console.error('Error fetching crypto data:', error); // Error handling
        }
    }

    useEffect(() => {
        fetchCryptoAPI();
    }, [])

    return (
        <>
            <Navbar />

            {/* Carousel */}
            <div className="relative w-full h-screen bg--gradientCarousel place-content-center">
                <div className=" text-center p-10">
                    <h1 className="text-6xl font-semibold font-mono text-white">Blockchain Payment</h1>
                </div>
                <div className=" w-4/5  p-4 md:block ml-8">
                    <h5 className="text-white font-mono text-lg ">Lorem ipsum dolor sit amet consectetur adipisicing elit.</h5>
                    <p className="text-white font-mono">Lorem ipsum dolor sit amet consectetur, adipisicing elit. Harum ipsum expedita soluta, nesciunt assumenda aliquam consequuntur necessitatibus at vel dolor!</p>
                </div>
                <div className=" w-4/5  p-4 md:block ml-8">
                    <h5 className="text-white font-mono text-lg ">Sign up by your email</h5>

                    <div className="form-group pt-5">
                        <input type="email" className="form-control p-1" id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" />
                        <a className="p-2 ml-1 text-white text-lg bg-indigo-600 hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" href="#">
                            Sign Up
                        </a>
                    </div>
                </div>
            </div>


            {/* Dashboard */}
            <div className="container mx-auto px-4 mt-8 mb-4">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-center mb-8">
                    {cryptoData.map((coin) => {
                        const price = Number(coin.price).toFixed(3); // Ensure price is a number
                        return (
                            <div className="bg-white rounded-lg shadow-md" key={coin.rank}>
                                <div className="bg-gray-100 p-4 rounded-t-lg">
                                    <img src={coin.iconUrl} alt={`${coin.name} icon`} className="w-14 h-14 block mx-auto"/> {/* Centered image */}
                                    <h4 className="text-lg font-normal">{coin.name} {coin.symbol}</h4>
                                </div>
                                <div className="p-4">
                                    <h1 className="text-xl font-bold">
                                        {price} $
                                    </h1> {/* Used price variable */}
                                </div>
                            </div>
                        );
                    })}
                </div>
                <div className="bg-cyan-500 p-4 rounded-t-lg">
                    <a className="text-lg font-normal">
                        Explore on Realtime Price Chart
                        <i className="fa-solid fa-arrow-right pl-2"></i>
                    </a>
                </div>
            </div>

            {/* About */}
            <div id="about" className="mt-20">
                <div className="w-full md:w-auto blue-card-parent relative">
                    <div className="w-3/5 ml-auto mr-auto">
                        <h1 className=" text-center text-2xl font-semibold item-title ">About</h1>
                    </div>
                    <div className="flex flex-wrap justify-center items-center mt-8 space-y-4 md:space-y-0 md:space-x-4">
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 item-box">
                            <article className="item">
                                <div className="item-content">
                                    <h3 className="item-title font-semibold text-lg">Portfolio Management</h3>
                                    <div className="item-desc text-sm">
                                        Easily track your crypto investments in real-time with our comprehensive portfolio manager. Monitor performance, view historical data, and make informed decisions.
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 item-box">
                            <article className="item">
                                <div className="item-content">
                                    <h3 className="item-title font-semibold text-lg">Real-Time Price Tracking</h3>
                                    <div className="item-desc text-sm">
                                        Stay updated with real-time price tracking for your favorite cryptocurrencies. Explore detailed price charts, trends, and market statistics.
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 item-box">
                            <article className="item">
                                <div className="item-content">
                                    <h3 className="item-title font-semibold text-lg">Wallet Integration</h3>
                                    <div className="item-desc text-sm">
                                        Securely connect and manage your wallets. Our platform supports popular hardware and software wallets, keeping your assets safe.
                                    </div>
                                </div>
                            </article>
                        </div>
                        <div className="w-full md:w-1/2 lg:w-1/3 p-4 item-box">
                            <article className="item">
                                <div className="item-content">
                                    <h3 className="item-title font-semibold text-lg">Customer Support Chat</h3>
                                    <div className="item-desc text-sm">
                                        Need help? Our customer support team is available 24/7 via live chat to assist you with any queries or issues.
                                    </div>
                                </div>
                            </article>
                        </div>
                    </div>
                </div>
            </div>

            {/* Contact */}
            <div id="contact" className="w-full mt-6 mb-6">
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

            <Footer />
        </>
    )
}
