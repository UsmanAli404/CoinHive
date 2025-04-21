import API from "./api";

//register
export const registerUser = async (userData) => {
    return API.post('/register', userData);
};

//login
export const loginUser = async (credentials) => {
    return API.post('/login', credentials);
};

//logout
export const logoutUser = async () => {
    return API.post('/logout');
};

//verifyEmail
export const verifyAccount = async (data) => {
    return API.post('/verify-account', data);
};

export const sendVerificationOtp = async(data) => {
    return API.post('/send-verification-otp', data);
};

export const getUserData = async(data)=>{
    return API.post('/get-user-data', (data));
}

export const checkAuth = async (token) => {
    return API.post('/is-authenticated', { token });
};

//password reset
export const sendResetOtp = async (email) => {
    return API.post('/send-reset-otp', { email });
};

//reset password
export const resetPassword = async (data) => {
    return API.post('/reset-password', data);
};