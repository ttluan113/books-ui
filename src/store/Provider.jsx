import { requestAuth } from '../config/config';
import Context from './Context';
import CryptoJS from 'crypto-js';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useEffect, useState, useMemo, useContext, createContext } from 'react';

export function Provider({ children }) {
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

const ThemeContext = createContext();

export const useTheme = () => useContext(ThemeContext);

export function ThemeProvider({ children }) {
    const [mode, setMode] = useState(localStorage.getItem('theme') || 'light');

    const toggleTheme = () => {
        const newMode = mode === 'light' ? 'dark' : 'light';
        setMode(newMode);
        localStorage.setItem('theme', newMode); // Lưu lại trạng thái theme
    };

    const theme = useMemo(
        () =>
            createTheme({
                palette: {
                    mode,
                    background: {
                        default: mode === 'dark' ? '#001e3c' : '#fff',
                    },
                },
            }),
        [mode],
    );

    return (
        <ThemeContext.Provider value={{ mode, toggleTheme }}>
            <MuiThemeProvider theme={theme}>
                <CssBaseline />
                {children}
            </MuiThemeProvider>
        </ThemeContext.Provider>
    );
}
