import getUserLocale from "./get-user-locale";

const getReadableDateFormat = (isoStringDate) => {
    const newDate = new Date(isoStringDate);
    const userLocale = getUserLocale();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };

    return newDate.toLocaleDateString(userLocale, options);
};

export default getReadableDateFormat;
