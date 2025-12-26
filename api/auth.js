import axiosInstance from "./axios.js";

export const Login = async ({ email, password }) => {
    try {

        const res = await axiosInstance.post("/login", { email, password });
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};

export const Register = async ({ data }) => {
    try {

        const res = await axiosInstance.post("/register", data);
        console.log({ res });
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"

        };
    }
};

export const AuthMe = async () => {
    try {

        const res = await axiosInstance.get("/auth-me");
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};
export const RefreshToken = async () => {
    try {

        const res = await axiosInstance.get("/refreshToken");
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};