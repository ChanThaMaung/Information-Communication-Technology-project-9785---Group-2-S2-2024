export const shortenName = (name) => {
    if (name.length > 40) {
        return name.slice(0, 30) + '...';
    }
    return name;
};
