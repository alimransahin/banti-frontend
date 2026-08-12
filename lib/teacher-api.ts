import api from "@/lib/api";
import type { Teacher } from "@/lib/data-store";

export const getTeachers = async (): Promise<Teacher[]> => {
    const response = await api.get<{
        success: boolean;
        data: Teacher[];
    }>("/teachers");

    return response.data.data;
};

export const createTeacher = async (
    formData: FormData
) => {
    const response = await api.post(
        "/teachers",
        formData
    );

    return response.data;
};

export const updateTeacher = async (
    id: string,
    formData: FormData
) => {
    const response = await api.put(
        `/teachers/${id}`,
        formData
    );

    return response.data;
};

export const deleteTeacher = async (
    id: string
) => {
    const response = await api.delete(
        `/teachers/${id}`
    );

    return response.data;
};