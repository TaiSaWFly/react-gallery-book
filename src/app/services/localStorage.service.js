const KEY_BOOKS = "books";

const localStorageService = {
    fromStorage: () => {
        return JSON.parse(localStorage.getItem(KEY_BOOKS));
    },
    toStorage: (value) => {
        localStorage.setItem(KEY_BOOKS, JSON.stringify(value));
    }
};

export default localStorageService;
