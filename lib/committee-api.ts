import api from "@/lib/api";

export type ICommittee = {
    _id: string;
    name: string;
    designation: string;
    phone: string;
    email: string;
    photo: string;
};

export const getCommittees = async (): Promise<ICommittee[]> => {
    const response = await api.get<{
        success: boolean;
        data: ICommittee[];
    }>("/committees");

    return response.data.data;
};

export const createCommittee = async (
    formData: FormData
) => {
    const response = await api.post(
        "/committees",
        formData
    );

    return response.data;
};

export const updateCommittee = async (
    id: string,
    formData: FormData
) => {
    const response = await api.put(
        `/committees/${id}`,
        formData
    );

    return response.data;
};

export const deleteCommittee = async (
    id: string
) => {
    const response = await api.delete(
        `/committees/${id}`
    );

    return response.data;
};