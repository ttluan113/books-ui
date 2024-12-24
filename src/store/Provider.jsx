import { requestAuth } from '../config/config';
import Context from './Context';
import CryptoJS from 'crypto-js';

import { useEffect, useState } from 'react';

function Provider({ children }) {
    const [dataUser, setDataUser] = useState({});

    const token = document.cookie;

    useEffect(() => {
        const fetchData = async () => {
            const res = await requestAuth();
            const bytes = CryptoJS.AES.decrypt(res.auth, import.meta.env.VITE_SECRET_KEY);
            const originalText = bytes.toString(CryptoJS.enc.Utf8);
            const user = JSON.parse(originalText);
            setDataUser(user);
        };
        if (token === '') {
            return;
        }
        fetchData();
    }, []);

    return <Context.Provider value={dataUser}>{children}</Context.Provider>;
}

export default Provider;
