import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

export const requestRegister = async (data) => {
    const res = await request.post('/api/register', data);
    return res.data;
};

export const requestAuth = async () => {
    const res = await request.get('/api/auth');
    return res.data;
};

export const requestLogout = async () => {
    const res = await request.get('/api/logout');
    return res.data;
};

export const requestLogin = async (data) => {
    const res = await request.post('/api/login', data);
    return res.data;
};

/// product

export const requestAddProduct = async (data) => {
    const res = await request.post('/api/add-product', data);
    return res.data;
};

export const requestGetProducts = async () => {
    const res = await request.get('/api/get-products');
    return res.data;
};

export const requestGetProduct = async (id) => {
    const res = await request.get('/api/get-product', { params: { id } });
    return res.data;
};

/// carts

export const requestAddCart = async (data) => {
    const res = await request.post('/api/add-cart', data);
    return res.data;
};

export const requestGetCarts = async () => {
    const res = await request.get('/api/cart');
    return res.data;
};

export const requestDeleteProductCart = async (id) => {
    const res = await request.delete('/api/delete-product', { params: { idProduct: id } });
    return res.data;
};

export const requestDeleteCart = async () => {
    const res = await request.delete('/api/delete-cart');
    return res.data;
};
