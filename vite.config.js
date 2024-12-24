import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
import fs from 'fs';
import path from 'path';

// https://vite.dev/config/
export default defineConfig({
    plugins: [react()],
    server: {
        https: {
            key: fs.readFileSync(path.resolve(__dirname, 'H:/dự án của tôi/books/nginx/ssl/books.local2-key.pem')),
            cert: fs.readFileSync(path.resolve(__dirname, 'H:/dự án của tôi/books/nginx/ssl/books.local2.pem')),
        },
        host: '127.0.0.1', // Thay thế bằng domain bạn muốn
        port: 3000, // Hoặc cổng bạn cần
    },
});
