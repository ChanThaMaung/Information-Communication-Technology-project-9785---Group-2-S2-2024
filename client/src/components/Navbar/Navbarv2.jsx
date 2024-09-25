import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import Web3 from 'web3'; // {{ edit_1 }}

export default function Navbarv2() {
    const [isSticky, setSticky] = useState(false); // State to track sticky status
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null); // Changed initial state to null
    const [connectionStatus, setConnectionStatus] = useState('Disconnected'); // No change needed

    const connectWallet = async () => { // {{ edit_2 }}
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setWeb3(web3);
                setAccount(accounts[0]); // Ensure account is set correctly
                setConnectionStatus('Connected'); // Update connection status
            } catch (error) {
                console.error("Could not connect to wallet", error);
                alert('Connection failed. Please try again.'); // User feedback on error
                setConnectionStatus('Disconnected'); // Update connection status on error
            }
        } else {
            alert('Please install MetaMask!');
            setConnectionStatus('Disconnected'); // Update connection status
        }
    };

    useEffect(() => {
        if (web3) {
            console.log('Web3 is initialized');
            console.log('Account:', account);
            console.log('Connection Status:', connectionStatus);
        }
    }, [web3, account, connectionStatus]);

    useEffect(() => {
        const handleScroll = () => {
            setSticky(window.scrollY > 0); // Set sticky if scrolled down
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, [isSticky]); // Consider adding isSticky if needed

    return (
        <>
            <nav className={`flex p-4 ${isSticky ? 'fixed' : 'relative'} right-0 left-0 top-0 z-50 place-content-between bg--gradientCarousel `}>
                <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <li className="text-white font-light text-xl p-1">
                            <Link to={"/"}>Home</Link>
                        </li>
                        <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <Link to={"/dashboardforemitter"}>Dashboard</Link>
                        </li>
                        <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <Link to={"/homev2"}>About</Link>
                        </li>
                        <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <a href="#contact">Contact</a>
                        </li>
                    </ul>
                </div>
                <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                        <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <button
                                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded"
                                onClick={connectWallet}
                            >
                                Connect
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
