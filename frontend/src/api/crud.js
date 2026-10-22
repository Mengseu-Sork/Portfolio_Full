import api from "./api";

/**
 * Convert a normal object containing files into FormData.
 */
const toFormData = (data = {}, method = null) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
        // Skip undefined/null
        if (value === undefined || value === null) {
            return;
        }

        // File upload
        if (value instanceof File) {
            formData.append(key, value);
            return;
        }

        // Multiple files
        if (value instanceof FileList) {
            Array.from(value).forEach((file) => {
                formData.append(key, file);
            });

            return;
        }

        // Boolean
        if (typeof value === "boolean") {
            formData.append(key, value ? "1" : "0");
            return;
        }

        // Array
        if (Array.isArray(value)) {
            value.forEach((item) => {
                formData.append(`${key}[]`, item);
            });

            return;
        }

        // Normal value
        formData.append(key, String(value));
    });

    // Laravel method spoofing
    if (method) {
        formData.append("_method", method);
    }

    return formData;
};

/**
 * Check whether an object contains a File.
 */
const containsFile = (data = {}) => {
    return Object.values(data).some((value) => {
        if (value instanceof File) {
            return true;
        }

        if (value instanceof FileList) {
            return value.length > 0;
        }

        return false;
    });
};

export const createCrudApi = (endpoint) => {
    return {
        /**
         * GET list
         */
        list: () => {
            return api.get(endpoint);
        },

        /**
         * GET single
         */
        get: (id) => {
            return api.get(`${endpoint}/${id}`);
        },

        /**
         * CREATE
         */
        create: async (data) => {
            const hasFile = containsFile(data);

            if (hasFile) {
                const formData = toFormData(data);

                return api.post(endpoint, formData, {
                    headers: {
                        "Content-Type":
                            "multipart/form-data",
                    },
                });
            }

            return api.post(endpoint, data);
        },

        /**
         * UPDATE
         *
         * Laravel/PHP multipart PUT can be problematic.
         * Therefore:
         *
         * POST /endpoint/id
         * _method=PUT
         */
        update: async (id, data) => {
            const hasFile = containsFile(data);

            if (hasFile) {
                const formData = toFormData(
                    data,
                    "PUT"
                );

                return api.post(
                    `${endpoint}/${id}`,
                    formData,
                    {
                        headers: {
                            "Content-Type":
                                "multipart/form-data",
                        },
                    }
                );
            }

            return api.put(
                `${endpoint}/${id}`,
                data
            );
        },

        /**
         * DELETE
         */
        remove: (id) => {
            return api.delete(
                `${endpoint}/${id}`
            );
        },
    };
};

export default createCrudApi;