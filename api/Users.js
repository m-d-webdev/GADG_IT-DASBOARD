import axiosInstance from "./axios";
export const GET_USERS = async ({
    page,
    limit,
    search,
    sortBy,
    role,
    isActive
}) => {
    try {

        const res = await axiosInstance.get("/user", {
            params: {
                page,
                limit,
                search,
                sortBy,
                role,
                isActive
            }
        });

        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};
