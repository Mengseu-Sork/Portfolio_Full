export const storageUrl = (path) => {
    if (!path) {
        return null;
    }

    if (path.startsWith("http://") || path.startsWith("https://")) {
        return path;
    }

    const baseUrl = import.meta.env.VITE_STORAGE_URL;

    return `${baseUrl}/${path.replace(/^\/+/, "")}`;
};