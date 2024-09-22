export const fetchCryptoAPI = async (setCryptoData) => {
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

export const fetchTopCryptoAPI = async (setCryptoData) => {
    const options = {
        headers: {
            'x-access-token': 'coinranking3b54ba27f3f686f288bbc64a3e2f238398c7516f5e8bcf18',
        },
    };

    try {
        const response = await fetch('https://api.coinranking.com/v2/coins', options);
        const result = await response.json();
        setCryptoData(result.data.coins.slice(0, 4)); // Store first 4 coins in state
    } catch (error) {
        console.error('Error fetching crypto data:', error);
    }
};