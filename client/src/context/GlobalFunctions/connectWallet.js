export const connectWallet = async () => { // {{ edit_2 }}
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
