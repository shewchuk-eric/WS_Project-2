module.exports.getToday = function() {
    const today = new Date();
    const day = String(today.getDate()).padStart(2, '0'); // Add leading zero for single-digit days
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Months are 0-indexed, so add 1
    const year = today.getFullYear();

    // Format the date as desired (e.g., MM/DD/YYYY)
    return formattedDate = `${year}-${month}-${day}`;
}