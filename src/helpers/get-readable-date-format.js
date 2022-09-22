import getUserLocale from "./get-user-locale";

const getReadableDateFormat = (isoStringDate) => {
    const newDate = new Date(isoStringDate);
    const currentTime = new Date();
    const parseNewDate = Date.parse(newDate);
    const parseCurrentTime = Date.parse(currentTime);
    const moment = 3000;
    const minute = 1000 * 60;
    const minutes = 1000 * 120;
    const hour = 1000 * 60 * 60;
    const hours = 1000 * 60 * 120;
    const day = 1000 * 60 * 60 * 24;
    const days = 1000 * 60 * 60 * 48;
    const timeDiff = parseCurrentTime - parseNewDate;
    
    const userLocale = getUserLocale();
    const options = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    
    switch(true) {
        case timeDiff < moment:
            return "a moment ago";
        case timeDiff >= moment && timeDiff < minute:
            return "few seconds ago";
        case timeDiff >= minute && timeDiff < minutes:
            return "a minute ago";
        case timeDiff >= minutes && timeDiff < hour:
            return `${Math.round(timeDiff / minute)} minutes ago`;
        case timeDiff >= hour && timeDiff < hours:
            return `an hour ago`;
        case timeDiff >= hours && timeDiff < day:
            return `${Math.round(timeDiff / hour)} hours ago`;
        case timeDiff >= day && timeDiff < days:
            return `a day ago`;
        default:
            return newDate.toLocaleDateString(userLocale, options);

    }
};

export default getReadableDateFormat;
