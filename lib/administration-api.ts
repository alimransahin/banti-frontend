import api from "@/lib/api";

export interface IAdministration {
    _id: string;
    title: string;
    file: {
        url: string;
        publicId: string;
        name: string;
    };
    createdAt: string;
    updatedAt: string;
}

export const getAdministrations = async (): Promise<IAdministration[]> => {
    const response = await api.get<{
        success: boolean;
        data: IAdministration[];
    }>("/administrations");

    return response.data.data;
};

export const createAdministration = async (formData: FormData) => {
    const response = await api.post("/administrations", formData);

    return response.data;
};

export const updateAdministration = async (id: string, formData: FormData) => {
    const response = await api.put(`/administrations/${id}`, formData);

    return response.data;
};

export const deleteAdministration = async (id: string) => {
    const response = await api.delete(`/administrations/${id}`);

    return response.data;
};