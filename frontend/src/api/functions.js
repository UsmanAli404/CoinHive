import API from "./api";

export const registerUser = async (userData) => {
    return API.post('/auth/register', userData);
};

export const loginUser = async (credentials) => {
    return API.post('/auth/login', credentials);
};

export const logoutUser = async () => {
    return API.post('/auth/logout');
};

export const sendVerifyOtp = async () => {
    return API.post('/auth/send-verify-otp');
};

export const verifyAccount = async (otp) => {
    return API.post('/auth/verify-account', { otp });
};
  
export const checkAuth = async () => {
    return API.post('/auth/is-authenticated');
};

export const sendResetOtp = async (email) => {
    return API.post('/auth/send-reset-otp', { email });
};
  
export const resetPassword = async (data) => {
    return API.post('/auth/reset-password', data);
};