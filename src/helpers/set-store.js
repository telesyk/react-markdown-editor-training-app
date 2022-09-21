import storageAvailable from "./storage-available";

const setStore = (storageItem, data) => {
    if (storageAvailable("localStorage")) {
        const stringifiedData = JSON.stringify(data);
        localStorage.setItem(storageItem, stringifiedData);
    } else {
        console.log("[Error]: Unavailable storage!");
    }
};

export default setStore;
