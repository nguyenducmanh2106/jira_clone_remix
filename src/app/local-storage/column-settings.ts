const columnKey = "column-settings";

const LocalStorageStore = {
    setItem: <T>(key: string, value: T) => {
        localStorage.setItem(key, JSON.stringify(value));
    },
    removeItem: (key: string) => {
        localStorage.removeItem(key);
    },
    getItem: <T>(key: string) => {
        const value = localStorage.getItem(key);
        return value ? JSON.parse(value) : value
    },
    clear: () => {
        localStorage.clear();
    }
}

export default LocalStorageStore