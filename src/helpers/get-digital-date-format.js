import getUserLocale from "./get-user-locale";

const getDigitalDateFormat = (isoStringDate) => {
    const newDate = new Date(isoStringDate);
    const userLocale = getUserLocale();

    return newDate.toLocaleString(userLocale, { timeZone: 'UTC' });
};

export default getDigitalDateFormat;
