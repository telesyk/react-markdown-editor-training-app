import storageAvailable from "./storage-available";

const getStore = (storageItem) => {
    if (storageAvailable("localStorage")) {
        const data = localStorage.getItem(storageItem);
        return JSON.parse(data);
    } else {
        console.log("[Error]: Unavailable storage!");
    }
};

export default getStore;
