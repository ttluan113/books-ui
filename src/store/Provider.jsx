import { requestAuth } from '../config/config';
import Context from './Context';
import CryptoJS from 'crypto-js';
import { io } from 'socket.io-client';

import { ThemeProvider as MuiThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';

import { useEffect, useState, useMemo, useContext, createContext } from 'react';

export function Provider({ children }) {
    const [dataUser, setDataUser] = useState({});
    const [socket, setSocket] = useState(null);
    const [newNotify, setNewNotify] = useState({});
    const [newMessage, setNewMessage] = useState({});
    const [newUserMessage, setNewUserMessage] = useState({});

    const getAuthUser = async () => {
        const res = await requestAuth();
        const bytes = CryptoJS.AES.decrypt(res, import.meta.env.VITE_SECRET_KEY);
        const originalText = bytes.toString(CryptoJS.enc.Utf8);
        const user = JSON.parse(originalText);
        setDataUser(user);
    };

    useEffect(() => {
        const token = document.cookie;
        const fetchData = async () => {
            try {
                await getAuthUser();
            } catch (error) {
                console.log(error);
            }
        };
        if (token === 'logged=1') {
            fetchData();
        }
        return;
    }, []);

    useEffect(() => {
        const socket = io('https://book.local2', { transports: ['websocket'] });
        socket.on('connection', () => {
            console.log('connected');
            setSocket(socket);
        });

        socket.on('notifyComment', (data) => {
            setNewNotify(data);
        });

        socket.on('newMessage', (data) => {
            setNewMessage(data || {});
        });

        socket.on('newUserMessage', (data) => {
            setNewUserMessage(data);
        });

        return () => {
            socket.disconnect();
        };
    }, [socket, newNotify, newMessage, newUserMessage]);

    return (
        <Context.Provider value={{ dataUser, socket, newNotify, newMessage, newUserMessage }}>
            {children}
        </Context.Provider>
    );
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
