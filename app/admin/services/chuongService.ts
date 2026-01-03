export interface Chuong {
    ID_Chuong: number;
    TenChuong: string;
    ThuTu: number;
    created_at?: string;
    updated_at?: string;
}

const API_BASE_URL = 'http://localhost:8000/api/chuong';

export const chuongService = {
    async getAll(): Promise<Chuong[]> {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-store',
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const result = await response.json();
            // Handle response format: { success: true, data: [...] }
            return result.data || result;
        } catch (error) {
            console.error('Failed to fetch chuong:', error);
            throw error;
        }
    },

    async create(data: { TenChuong: string; ThuTu: number }): Promise<Chuong> {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const result = await response.json();
            return result.data || result;
        } catch (error) {
            console.error('Failed to create chuong:', error);
            throw error;
        }
    },

    async update(id: number, data: { TenChuong: string; ThuTu: number }): Promise<Chuong> {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(data),
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const result = await response.json();
            return result.data || result;
        } catch (error) {
            console.error('Failed to update chuong:', error);
            throw error;
        }
    },

    async delete(id: number): Promise<void> {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
        } catch (error) {
            console.error('Failed to delete chuong:', error);
            throw error;
        }
    }
};
