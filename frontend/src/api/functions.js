import API from "./api";

//register
export const registerUser = async (userData) => {
    return API.post('/auth/register', userData);
};

//login
export const loginUser = async (credentials) => {
    return API.post('/auth/login', credentials);
};

//logout
export const logoutUser = async () => {
    return API.post('/auth/auth/logout');
};

//verifyEmail
export const verifyAccount = async (data) => {
    return API.post('/auth/verify-account', data);
};

export const sendVerificationOtp = async(data) => {
    return API.post('/auth/send-verification-otp', data);
};

export const getUserData = async(data)=>{
    return API.post('/auth/get-user-data', (data));
}

export const checkAuth = async () => {
    return API.post('/auth/is-authenticated');
};

//password reset
export const sendResetOtp = async (email) => {
    return API.post('/auth/send-reset-otp', { email });
};

//reset password
export const resetPassword = async (data) => {
    return API.post('/auth/reset-password', data);
};

export const getMarketData = async(data) => {
    return API.post('/market/market-data', data);
}

export const getCoins = async (data) => {
    return API.post('/market/coins', data);
}