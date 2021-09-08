import axiosInstance from "../../config/axios-instance"

// Register new user //
function registerUser(body) {
    return axiosInstance({
        method: "post",
        url: "/auth/signup",
        data: body,
    });
}

// Login user //
function loginUser(body) {
    return axiosInstance({
        method: "post",
        url: "/auth/login",
        data: body,
    });
}

// Get Authenticated user  //
function getAuthUserRequest(user_id) {
    return axiosInstance({
        method: "post",
        url: `/auth/:${user_id}`,
        params: {
            user_id: user_id
        },
    });
}

// Logout user //
function logoutUser() {
    return axiosInstance({
        method: "get",
        url: "/auth/logout",
        data: null,
    });
}

// Update user profile  //
function updateUserProfileRequest(user_id, body) {
    return axiosInstance({
        method: "post",
        url: `/auth/editProfile/${user_id}`,
        params: {
            user_id : user_id
        },
        data: body,
    });
}

// Forgot password  //
function forgotPassword(body) {
    return axiosInstance({
        method: "post",
        url: "/auth/forgot/password",
        data: body,
    });
}

// Reset password  //
function resetPassword(body, resetPasswordToken) {
    return axiosInstance({
        method: "post",
        url: `/auth/reset/:${resetPasswordToken}`,
        data: body,
        params: {
            resetPasswordToken: resetPasswordToken
        },
    });
}


const AuthServices = {
    registerUser,
    loginUser,
    getAuthUserRequest,
    logoutUser,
    updateUserProfileRequest,
    forgotPassword,
    resetPassword
};

export default AuthServices;
