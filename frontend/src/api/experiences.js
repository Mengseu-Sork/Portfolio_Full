import api from "./axios";

export const getExperiences = async () => {
    const response = await api.get("/experiences");

    return response.data;
};