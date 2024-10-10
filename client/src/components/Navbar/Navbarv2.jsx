import { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import Web3 from 'web3'; // {{ edit_1 }}

export default function Navbarv2() {
    const [isSticky, setSticky] = useState(false); // State to track sticky status
    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState(null); // Changed initial state to null
    const [connectionStatus, setConnectionStatus] = useState('Disconnected'); // No change needed
    const [loading, setLoading] = useState(false); // {{ edit_1 }}
    const [dropdownOpen, setDropdownOpen] = useState(false); // State for dropdown visibility
    const buttonRef = useRef(null);

    const connectWallet = async () => { // {{ edit_2 }}
        setLoading(true); // Start loading
        // Simulate loading for 2 seconds
        setTimeout(async () => {
            if (window.ethereum) {
                try {
                    const web3 = new Web3(window.ethereum);
                    await window.ethereum.request({ method: 'eth_requestAccounts' });
                    const accounts = await web3.eth.getAccounts();
                    setWeb3(web3);
                    setAccount(accounts[0]); // Ensure account is set correctly
                    setConnectionStatus('Connected'); // Update connection status
                    alert('Successfully connected to wallet!'); // Alert on successful connection

                } catch (error) {
                    console.error("Could not connect to wallet", error);
                    alert('Connection failed. Please try again.'); // Alert on connection failure
                    setConnectionStatus('Disconnected'); // Update connection status on error
                }
            } else {
                alert('Please install MetaMask!');
                setConnectionStatus('Disconnected'); // Update connection status
            }
            setLoading(false); // End loading
        }, 2000); // {{ edit_2 }}
    };

    useEffect(() => {
        if (web3) {
            console.log('Web3 is initialized');
            console.log('Account:', account);
            console.log('Connection Status:', connectionStatus);
        }

        const handleScroll = () => {
            setSticky(window.scrollY > 0); // Set sticky if scrolled down
        };

        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("scroll", handleScroll);
        };
    }, [web3, account, connectionStatus]); // Dependencies for both effects


    return (
        <>
            <nav className={`flex p-4  ${isSticky ? 'fixed top-0' : 'relative'} right-0 left-0 z-50 place-content-between bg--gradientCarousel `}>
                <div className="flex items-center justify-between w-full">
                    <div className="md:flex hidden">
                        <ul className="flex space-x-4">
                            <li className="text-white font-light text-xl p-1">
                                <Link to={"/"}>Home</Link>
                            </li>
                            <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                                <Link to={"/dashboardforemitter"}>Dashboard</Link>
                            </li>
                            <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                                <Link to={"/transactionpage"}>Transaction</Link>
                            </li>
                        </ul>
                    </div>
                    <div className="md:hidden flex items-center relative"> {/* Added relative positioning */}
                        <button onClick={() => setDropdownOpen(!dropdownOpen)}>
                            <i className="fa-solid fa-bars text-white text-2xl"></i>
                        </button>
                        <div className={`absolute left-0 top-5 mt-2 bg-black shadow-md rounded-md transition-all duration-300 ease-in-out ${dropdownOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}> {/* Transition effect */}
                            <ul className="flex flex-col space-y-2 p-4">
                                <li>
                                    <Link to={"/"} className="text-white hover:text-gray-600">Home</Link>
                                </li>
                                <li>
                                    <Link to={"/dashboardforemitter"} className="text-white hover:text-gray-600">Dashboard</Link>
                                </li>
                                <li>
                                    <Link to={"/transactionpage"} className="text-white hover:text-gray-600">Transaction</Link>
                                </li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0"> 
                    <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4"> 
                        <li className="text-white font-light hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                            <button
                                ref={buttonRef}
                                className="bg-gradient-to-r from-purple-500 to-blue-500 text-white p-2 rounded bg-opacity-30"
                                onClick={connectWallet}
                                disabled={loading} // Disable button while loading
                            >
                                {loading ? 'Connecting...' : 'Connect'} {/* {{ edit_5 }} */}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>
        </>
    )
}
