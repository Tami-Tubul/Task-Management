const handaleLongDate = (longDate) => { //המרה לתאריך לועזי בפורמט קריא

    const dateString = longDate;
    const date = new Date(dateString);
    const formattedDate = date.toLocaleDateString('en-GB');
    return formattedDate;

}

module.exports = { handaleLongDate };