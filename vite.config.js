import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    // server: {
    //     https: {
    //         key: fs.readFileSync(path.resolve(__dirname, './ssl/l2book.site.key')),
    //         cert: fs.readFileSync(path.resolve(__dirname, './ssl/l2book.site.pem')),
    //     },
    //     host: 'l2book.site', // Thay thế bằng domain bạn muốn
    //     port: 3001, // Hoặc cổng bạn cần
    // },

    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, '/Users/l2team/Desktop/ssl/book.local2-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, '/Users/l2team/Desktop/ssl/book.local2.pem')),
        },
        host: 'book.local2', // Thay thế bằng domain bạn muốn
        port: 3001, // Hoặc cổng bạn cần
    },
});
