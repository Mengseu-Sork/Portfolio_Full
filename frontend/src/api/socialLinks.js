import api from "./axios";

export const getSocialLinks = async () => {
    const response = await api.get("/social-links");

    return response.data;
};