import axios from 'axios';

const request = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    withCredentials: true,
});

/// user

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

export const requestSearchAddress = async (address) => {
    const res = await request.get('/api/search-address', { params: { address } });
    return res.data;
};

export const requestEditUser = async (data) => {
    const res = await request.post('/api/edit-user', data);
    return res.data;
};

export const requestRefeshToken = async () => {
    const res = await request.get('/api/refresh-token');
    return res.data;
};

/// product

export const requestAddProduct = async (data) => {
    const res = await request.post('/api/add-product', data);
    return res.data;
};

export const requestGetProducts = async ({ sortType, category, limit, page }) => {
    const params = Object.fromEntries(Object.entries({ sortType, category, limit, page }).filter(([_, v]) => v));

    const res = await request.get('/api/get-products', { params });
    return res.data;
};

export const requestGetProduct = async (id) => {
    const res = await request.get('/api/get-product', { params: { id } });
    return res.data;
};

export const requestDeleteProduct = async (id) => {
    const res = await request.delete('/api/delete-product', { params: { id } });
    return res.data;
};

export const requestEditProduct = async (data) => {
    const res = await request.post('/api/edit-product', { data });
    return res.data;
};

export const requestGetProductsTopBuy = async () => {
    const res = await request.get('/api/product-top-buy');
    return res.data;
};

//// category

export const requestAddCategory = async (data) => {
    const res = await request.post('/api/add-category', data);
    return res.data;
};

export const requestGetCategory = async (nameCategory) => {
    const params = Object.fromEntries(Object.entries({ nameCategory }).filter(([_, v]) => v));
    const res = await request.get('/api/category', { params });
    return res.data;
};

export const requestDeleteCategory = async (id) => {
    const res = await request.delete('/api/delete-category', { params: { id } });
    return res.data;
};

export const requestEditCategory = async (data) => {
    const res = await request.post('/api/edit-category', { data });
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

/// discount
export const requestAddDiscount = async (data) => {
    const res = await request.post('/api/add-discount', data);
    return res.data;
};

export const requestAddUserDiscount = async (idDiscount) => {
    const res = await request.post('/api/add-user-discount', { idDiscount });
    return res.data;
};

export const requestGetDiscount = async () => {
    const res = await request.get('/api/discount');
    return res.data;
};

export const requestDeleteDiscount = async (id) => {
    const res = await request.delete('/api/delete-discount', { params: { idDiscount: id } });
    return res.data;
};

/// payments

export const requestPayment = async (data) => {
    const res = await request.post('/api/payment', data);
    return res.data;
};

export const requestCheckout = async (id) => {
    const res = await request.get('/api/checkout', { params: { idOrder: id } });
    return res.data;
};

export const requestGetHistoryOrder = async (params) => {
    const res = await request.get('/api/history-order', { params: params });
    return res.data;
};

export const requestEditOrder = async (data) => {
    const res = await request.post('/api/edit-order', data);
    return res.data;
};

/// comments

export const requestAddComment = async (data) => {
    const res = await request.post('/api/add-comment', data);
    return res.data;
};

export const requestGetComments = async (productId) => {
    const res = await request.get('/api/comments', { params: { productId } });
    return res.data;
};

//// notify
export const requestPostNotify = async (data) => {
    const res = await request.post('/api/add-notify', data);
    return res.data;
};

export const requestGetNotify = async () => {
    const res = await request.get('/api/notify');
    return res.data;
};

export const requestReadAllNotify = async () => {
    const res = await request.post('/api/read-notify');
    return res.data;
};

/// feedback

export const requestAddFeedback = async (data) => {
    const res = await request.post('/api/add-feedback', data);
    return res.data;
};

/// messager

export const requestCreateMessage = async (valueMessage) => {
    const res = await request.post('/api/create-message', { data: valueMessage });
    return res.data;
};

export const requestGetMessages = async () => {
    const res = await request.get('/api/messages');
    return res.data;
};

export const requestGetMessage = async (receiverId) => {
    const res = await request.get('/api/message', { params: { receiverId } });
    return res.data;
};

/// discount product
export const requestCreateDiscountProduct = async (data) => {
    const res = await request.post('/api/create-discount-product', data);
    return res.data;
};

export const requestGetDiscountProduct = async () => {
    const res = await request.get('/api/get-discount-product');
    return res.data;
};

let isRefreshing = false;
let failedRequestsQueue = [];

request.interceptors.response.use(
    (response) => response, // Trả về nếu không có lỗi
    async (error) => {
        const originalRequest = error.config;

        // Nếu lỗi 401 (Unauthorized) và request chưa từng thử refresh
        if (error.response.status === 401 && !originalRequest._retry) {
            originalRequest._retry = true;

            if (!isRefreshing) {
                isRefreshing = true;

                try {
                    // Gửi yêu cầu refresh token
                    const { data } = await request.get('/api/refresh-token');

                    // Lưu token mới

                    // Xử lý lại tất cả các request bị lỗi 401 trước đó
                    failedRequestsQueue.forEach((req) => req.resolve(data.accessToken));
                    failedRequestsQueue = [];
                } catch (refreshError) {
                    // Nếu refresh thất bại, đăng xuất
                    failedRequestsQueue.forEach((req) => req.reject(refreshError));
                    failedRequestsQueue = [];
                    localStorage.clear();
                    window.location.href = '/login'; // Chuyển về trang đăng nhập
                } finally {
                    isRefreshing = false;
                }
            }

            // Trả về một Promise để retry request sau khi token mới được cập nhật
            return new Promise((resolve, reject) => {
                failedRequestsQueue.push({
                    resolve: (token) => {
                        originalRequest.headers['Authorization'] = `Bearer ${token}`;
                        resolve(API(originalRequest));
                    },
                    reject: (err) => reject(err),
                });
            });
        }

        return Promise.reject(error);
    },
);
