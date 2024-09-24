export const shortenAddress = (address, startLength = 4, endLength = 4) => {
    if (address.length <= startLength + endLength) {
      return address; // No need to shorten if the address is already short
    }
    const start = address.slice(0, startLength);
    const end = address.slice(-endLength);
    return `${start}...${end}`;
  };
  