import api from "./api";

export type Notice = {
    _id: string;
    title: string;
    details: string;
    attachment: string[];
    createdAt: string;
    updatedAt: string;
};

export const getNotices = async (): Promise<Notice[]> => {
    const response = await api.get("/notices");

    return response.data.data;
};

export const getNotice = async (
    id: string
): Promise<Notice> => {
    const response = await api.get(`/notices/${id}`);

    return response.data.data;
};

export const createNotice = async (
    formData: FormData
) => {
    const response = await api.post(
        "/notices",
        formData
    );

    return response.data;
};

export const updateNotice = async (
    id: string,
    formData: FormData
) => {
    const response = await api.put(
        `/notices/${id}`,
        formData
    );

    return response.data;
};

export const deleteNotice = async (
    id: string
) => {
    const response = await api.delete(
        `/notices/${id}`
    );

    return response.data;
};