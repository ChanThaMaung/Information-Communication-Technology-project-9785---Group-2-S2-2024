import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import Web3 from 'web3';
import { shortenAddress } from "../../scripts/shortenAddress";
import './css/dashboard-nav.css';
import './css/navbar.css';

export default function DashboardNavbar({ onConnect }) {

    const [account, setAccount] = useState(null);
    const [web3, setWeb3] = useState(null);
    const [connectionStatus, setConnectionStatus] = useState('Disconnected');
    const [loading, setLoading] = useState(false);
    const buttonRef = useRef(null);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const sidebarRef = useRef(null);

    useEffect(() => {
        // Listen for account changes
        if (window.ethereum) {
            window.ethereum.on("accountsChanged", handleAccountsChanged);
        }

        return () => {
            if (window.ethereum) {
                window.ethereum.removeListener(
                    "accountsChanged",
                    handleAccountsChanged
                );
            }
        };
    }, []);

    const handleAccountsChanged = async (accounts) => {
        if (accounts.length === 0) {
            // MetaMask is locked or the user has not connected any accounts
            console.log("Please connect to MetaMask.");
        } else if (accounts[0] !== account) {
            onConnect(accounts[0]);
        }
    };

    const handleWalletConnection = async () => {
        if (connectionStatus === 'Connected') {
            // Disconnect logic
            setWeb3(null);
            setAccount(null);
            setConnectionStatus('Disconnected');
            alert('Wallet disconnected!');
            // Refresh the page
            window.location.reload();
        } else {
            // Connect logic
            setLoading(true);
            setTimeout(async () => {
                if (window.ethereum) {
                    try {
                        const web3Instance = new Web3(window.ethereum);
                        await window.ethereum.request({ method: 'eth_requestAccounts' });
                        const accounts = await web3Instance.eth.getAccounts();
                        setWeb3(web3Instance);
                        setAccount(accounts[0]);
                        setConnectionStatus('Connected');
                        alert('Successfully connected to wallet!');
                        onConnect(accounts[0]);
                    } catch (error) {
                        console.error("Could not connect to wallet", error);
                        alert('Connection failed. Please try again.');
                        setConnectionStatus('Disconnected');
                    }
                } else {
                    alert('Please install MetaMask!');
                }
                setLoading(false);
            });
        }
    };

    useEffect(() => {
        if (web3) {
            console.log('Web3 is initialized');
            console.log('Account:', account);
            console.log('Connection Status:', connectionStatus);
        }
    }, [web3, account, connectionStatus]);

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    useEffect(() => {
        function handleClickOutside(event) {
            if (sidebarRef.current && !sidebarRef.current.contains(event.target)) {
                setIsSidebarOpen(false);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [sidebarRef]);

    return (
        <>
            <nav className="dashboard-navbar">
                <div className="sidebar-button">
                    <button className="hamburger-menu" onClick={toggleSidebar} aria-label="Toggle sidebar">
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                        <span className="hamburger-line"></span>
                    </button>
                </div>
                <div className="dashboard-navbar__spacer">
                    <div className="account-address">
                        {account && account.length > 0 ? <p style={{ fontSize: '1.25rem', fontWeight: 'bold' }}>{shortenAddress(account)}'s dashboard</p> : ''}
                    </div>
                </div>
                <div className="dashboard-navbar__container">
                    <ul className="dashboard-navbar__list">
                        <li className="dashboard-navbar__item">
                            <button
                                ref={buttonRef}
                                className="dashboard-navbar__connect-button"
                                onClick={handleWalletConnection}
                                disabled={loading}
                            >
                                {loading ? 'Processing...' : connectionStatus === 'Connected' ? 'Disconnect' : 'Connect'}
                            </button>
                        </li>
                    </ul>
                </div>
            </nav>

            <div ref={sidebarRef} className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
                <div className="navbar-header">
                    <div className="navbar-header-left">
                        <svg className="navbar-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 2L2 7L12 12L22 7L12 2Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 17L12 22L22 17" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                            <path d="M2 12L12 17L22 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                        <h1>Dashboard</h1>
                    </div>
                    <button className="close-button" onClick={() => setIsSidebarOpen(false)}>
                        &#x2715;
                    </button>
                </div>
                
                <ul className="nav-links">
                    <li><Link to="/" onClick={() => setIsSidebarOpen(false)}>Home</Link></li>
                    <li><Link to="/transaction_page" onClick={() => setIsSidebarOpen(false)}>View All Transactions</Link></li>
                </ul>
            </div>
        </>
    );
}