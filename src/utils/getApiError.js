export const getApiError = (err) => {
    const data = err?.response?.data;
    return {
        status: err?.response?.status,
        code: data?.code,
        message: data?.message || 'Có lỗi xảy ra',
        details: data?.details || null
    };
};
