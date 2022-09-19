const getUserLocale = () => {
    return navigator.languages && navigator.languages.length
        ? navigator.languages[0]
        : navigator.language;
};

export default getUserLocale;
