import { ethers } from "ethers";


export const getEthereumContract = async (contractAddress, contractABI, {ethereum}) => {
    
    const provider = new ethers.BrowserProvider(ethereum);
    const signer = await provider.getSigner();
    const contract = new ethers.Contract(
      contractAddress,
      contractABI,
      signer
    );
    return contract;
  };
