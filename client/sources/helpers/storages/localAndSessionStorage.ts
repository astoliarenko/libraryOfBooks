import * as Cookies from 'js-cookie';

const setItem = (storage, key, val) => {
    storage.setItem(key, val);
};

const getItem = (storage, key) => storage.getItem(key);

const setCookieItem = (key, val, options?) => Cookies.set(key, val, {secure: ENVIRONMENT !== 'local', ...options});

const getCookieItem = key => Cookies.get(key);

const deleteCookieItem = key => Cookies.remove(key);

const removeItem = (storage, key) => {
    storage.removeItem(key);
};

export {
    setItem,
    getItem,
    getCookieItem,
    setCookieItem,
    deleteCookieItem,
    removeItem
};
