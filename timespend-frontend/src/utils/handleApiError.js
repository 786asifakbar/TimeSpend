export const handleApiError = (error) => {
    if (error.response?.status === 401) {
        localStorage.clear();
        window.location.href = "/login";
    }

    if (error.response?.status === 403) {
        return "Upgrade to Pro to access this feature";
    }

    return error.response?.data?.message || "Something went wrong";
};
