import axiosInstance from "./axios";

export const AddNewProduct = async ({ props }) => {
    try {

        const res = await axiosInstance.post("/product", props);
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};
export const UpdateProduct = async ({ props, _id }) => {
    try {

        const res = await axiosInstance.put(`/product/${_id}`, props);
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};

export const GET_PRODUCTS = async ({
    page,
    limit,
    category,
    price,
    minPrice,
    maxPrice,
    search,
    inStock,
    isFeatured,
    sortBy,
    isActive
}) => {
    try {

        const res = await axiosInstance.get("/product", {
            params: {
                page,
                limit,
                category,
                price,
                minPrice,
                maxPrice,
                search,
                inStock,
                isFeatured,
                sortBy,
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

export const DEACTIVATE_PROD = async ({ _id }) => {
    try {

        const res = await axiosInstance.get(`/product/deactivate/${_id}`);
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};
export const ACTIVATE_PROD = async ({ _id }) => {
    try {

        const res = await axiosInstance.get(`/product/activate/${_id}`);
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};

export const MASK_PROD_FEATURED = async ({ _id }) => {
    try {

        const res = await axiosInstance.get(`/product/toggleFeature/${_id}`);
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};



export const DELETE_POD = async ({ _id }) => {
    try {

        const res = await axiosInstance.delete(`/product/${_id}`);
        return res;

    } catch (err) {
        return {
            failed: true,
            message: err?.response?.data?.message || "Something went wrong"
        };
    }
};
