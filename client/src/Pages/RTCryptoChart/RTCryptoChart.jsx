import { useEffect, useState } from "react";
import { Footer, Navbar } from "../../components";

export default function RTCryptoChart() {
    const [cryptoData, setCryptoData] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [itemsPerPage] = useState(10);
    const [searchTerm, setSearchTerm] = useState("");

    const fetchCryptoAPI = async () => {
        const options = {
            headers: {
                'x-access-token': 'coinranking3b54ba27f3f686f288bbc64a3e2f238398c7516f5e8bcf18',
            },
        };

        try {
            const response = await fetch('https://api.coinranking.com/v2/coins', options);
            const result = await response.json();
            setCryptoData(result.data.coins);
        } catch (error) {
            console.error('Error fetching crypto data:', error);
        }
    };

    useEffect(() => {
        fetchCryptoAPI();
    }, []);

    const indexOfLastItem = currentPage * itemsPerPage;
    const indexOfFirstItem = indexOfLastItem - itemsPerPage;

    // Filter cryptoData based on searchTerm
    const filteredItems = cryptoData.filter(coin =>
        coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

    const currentItems = filteredItems.slice(indexOfFirstItem, indexOfLastItem);
    const totalPages = Math.ceil(filteredItems.length / itemsPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <>
            <Navbar />
            <div className="p-10"></div>
            <div > {/* Added margin-top to create space below the Navbar */}
                <input
                    type="text"
                    placeholder="Search by name..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="border p-2 mb-4 w-full" // Added width to make it full width
                />
                <table className="min-w-full table-auto border-collapse border border-gray-300">
                    <thead>
                        <tr>
                            <th className="border border-gray-300 px-4 py-2">Rank</th>
                            <th className="border border-gray-300 px-4 py-2">Name</th>
                            <th className="border border-gray-300 px-4 py-2">Symbol</th>
                            <th className="border border-gray-300 px-4 py-2">Price</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentItems.map((coin) => {
                            const price = Number(coin.price).toFixed(3);
                            return (
                                <tr key={coin.rank}>
                                    <td className="border border-gray-300 px-4 py-2">{coin.rank}</td>
                                    <td className="border border-gray-300 px-4 py-2">{coin.name}</td>
                                    <td className="border border-gray-300 px-4 py-2">
                                        <img src={coin.iconUrl} alt={`${coin.name} logo`} className="w-6 h-6 inline-block" />
                                    </td>
                                    <td className="border border-gray-300 px-4 py-2">{price} $</td>
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
                <div className="flex justify-center mt-4">
                    {Array.from({ length: totalPages }, (_, index) => (
                        <button
                            key={index + 1}
                            onClick={() => paginate(index + 1)}
                            className={`mx-1 px-3 py-1 rounded ${currentPage === index + 1 ? 'bg-blue-500 text-white' : 'bg-gray-200'}`}
                        >
                            {index + 1}
                        </button>
                    ))}
                </div>
            </div>

            <Footer/>
        </>
    );
}
