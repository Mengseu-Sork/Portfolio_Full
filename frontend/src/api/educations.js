import api from "./axios";

export const getEducations = async () => {
    const response = await api.get("/educations");

    return response.data;
};