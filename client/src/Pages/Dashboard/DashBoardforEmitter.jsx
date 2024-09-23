import { LineChart } from '@mui/x-charts/LineChart';
import { Link } from "react-router-dom";
import Web3 from 'web3';
import { useState, useEffect } from 'react';

export default function DashBoardforEmitter() {
    const BasicLineChart = () => {
        return (
            <LineChart
                xAxis={[{ data: [1, 2, 3, 5, 8, 10] }]}
                series={[
                    {
                        data: [2, 5.5, 2, 8.5, 1.5, 5],
                    },
                ]}
                width={800}
                height={300}
            />
        );
    }

    const [web3, setWeb3] = useState(null);
    const [account, setAccount] = useState('');
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');

    const connectWallet = async () => {
        if (window.ethereum) {
            try {
                const web3 = new Web3(window.ethereum);
                await window.ethereum.request({ method: 'eth_requestAccounts' });
                const accounts = await web3.eth.getAccounts();
                setWeb3(web3);
                setAccount(accounts[0]);
                setConnectionStatus('Connected');
            } catch (error) {
                console.error("Could not connect to wallet", error);
                setConnectionStatus('Disconnected');
            }
        } else {
            alert('Please install MetaMask!');
            setConnectionStatus('Disconnected');
        }
    };

    useEffect(() => {
        if (web3) {
            console.log('Web3 is initialized');
        }
    }, [web3]);

    // Determine text color based on connection status
    const statusColor = connectionStatus === 'Connected' ? 'text-green-500' : 'text-red-500';
    const dotColor = connectionStatus === 'Connected' ? 'bg-green-500' : 'bg-red-500';

    return (
        <>
            <div className="relative right-0 left-0 top-0 z-50 w-full h-fit bg--gradientDB place-content-center shadow-lg"> {/* Added shadow-lg */}
                <div className="text-center p-10">
                    <h1 className="text-6xl font-semibold font-mono text-white">Blockchain Payment</h1>
                </div>
                <div className="w-4/5 p-4 md:block ml-8">
                    <h5 className="text-white font-mono text-lg">Explore the Future of Finance: Buy, Sell, and Manage Your Cryptocurrency Portfolio with Confidence and Security</h5>
                </div>
                <div className="md:block">
                    <nav className="flex p-4 w-full place-content-between bg-blue-700 rounded">
                        <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <li className="text-white text-xl p-1">
                                    <Link className="font-semibold" to={"/"}>Home</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                                    <Link to={"/signIn"}>Public Data Dashboard</Link>
                                </li>
                            </ul>
                        </div>
                        <div className="hidden md:flex flex-col md:flex-row md:items-center md:space-x-4 mt-4 md:mt-0">
                            <ul className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4">
                                <li className="text-white hover:text-gray-300 hover:cursor-pointer text-lg p-1">
                                    <button
                                        className="bg-black text-white p-2 rounded"
                                        onClick={connectWallet}
                                    >
                                        Connect
                                    </button>
                                </li>
                            </ul>
                        </div>
                    </nav>
                </div>
            </div>
            <div className="grid grid-cols-5 gap-4">
                <div className="col-span-1 flex-col border h-screen shadow-md"> {/* Added shadow-md */}
                    <ul className="flex flex-col gap-5 mt-2">
                        <li className="nav-item flex items-center gap-2 px-4 py-2">
                            <h1 className="text-2xl">Dashboard</h1>
                        </li>
                        <li className="nav-item items-center gap-2 px-4 py-2">
                            <div className=" p-4  rounded">
                                <div className="">
                                    <p className="overflow-hidden">Connected Account: {account}</p>
                                </div>
                                <div className="flex items-center">
                                    <span className={`w-3 h-3 rounded-full ${dotColor} mr-2`}></span> {/* Dot for status */}
                                    <p className={`${statusColor}`}>Status: {connectionStatus}</p> {/* Display connection status with color */}
                                </div>
                            </div>
                        </li>
                        <li className="nav-item flex items-center gap-2 px-4 py-2">
                            View all transactions
                        </li>
                        <li className="nav-item flex items-center gap-2 px-4 py-2">
                            Create transactions
                        </li>
                    </ul>
                </div>
                <div className="col-span-4 w-full border p-3 rounded shadow-md"> {/* Added shadow-md */}
                    <div>
                        <h2 className="text-3xl mx-2">Carbon Credits Dashboard</h2>
                    </div>
                    <div className="grid grid-cols-4 gap-9 mt-6 justify-around">
                        <div className="col-span-1 w-full border rounded">
                            <div>
                                <h3 className="text-xl py-3">Total Carbon Credits</h3>
                                <hr />
                            </div>
                            <div>
                                <p className="text-3xl">1500</p>
                            </div>
                        </div>
                        <div className="col-span-3 border rounded">
                            <div>
                                <h3 className="text-2xl">Carbon Credits Over Time</h3>
                            </div>
                            <div>
                                <BasicLineChart />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
