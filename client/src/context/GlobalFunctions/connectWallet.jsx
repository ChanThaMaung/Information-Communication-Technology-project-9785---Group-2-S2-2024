export const connectWallet = async () => {
    try {
      const { ethereum } = window;
      if (!ethereum) return alert("Please install metamask");
  
      const accounts = await ethereum.request({
        method: "eth_requestAccounts",
      });
  
      return accounts[0];
    } catch (error) {
      console.log(error);
      throw new Error("No ethereum object");
    }
  };