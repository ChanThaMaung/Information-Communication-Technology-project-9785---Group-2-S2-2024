export const formatDateForSQL = (dateString) => {
    if (!dateString) return null; // Handle empty input
    const [day, month, year] = dateString.split('/');
    return `${year}-${month}-${day}`; // Convert to YYYY-MM-DD
};

export const formatDateForSQLv2 = (dateString) => {
    if (!dateString) return null; // Handle empty input
    const [day, month, year] = dateString.split('/');
    return `${day}-${month}-${year}`; // Convert to dd-mm-yyyy
};

export const formatVerificationStatusSQL = (status) => {
    if (status === "verified") {
        return 1; // Verified
    } else if (status === "unverified") {
        return 0; // Unverified
    }
    return null; // Return null or any default value if the status is not recognized
};

export const formatActiveStatusSQL = (status) => {
    if (status === "retired") {
        return 1; // Retired
    } else if (status === "active") {
        return 0; // Active
    }
    return null; // Return null or any default value if the status is not recognized
};