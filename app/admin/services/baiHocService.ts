export interface BaiHoc {
    ID_BaiHoc: number;
    ID_Chuong: number;
    TenBaiHoc: string;
    IconBaiHoc: string;
    ThuTu: number;
    created_at?: string;
    updated_at?: string;
}

const API_BASE_URL = 'http://localhost:8000/api/baihoc';

export const baiHocService = {
    async getAll(): Promise<BaiHoc[]> {
        try {
            const response = await fetch(API_BASE_URL, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-store',
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const result = await response.json();
            return result.data || result;
        } catch (error) {
            console.error('Failed to fetch baihoc:', error);
            throw error;
        }
    },

    async create(data: { ID_Chuong: number; TenBaiHoc: string; IconBaiHoc: string; ThuTu: number }): Promise<BaiHoc> {
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
            console.error('Failed to create baihoc:', error);
            throw error;
        }
    },

    async update(id: number, data: { ID_Chuong: number; TenBaiHoc: string; IconBaiHoc: string; ThuTu: number }): Promise<BaiHoc> {
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
            console.error('Failed to update baihoc:', error);
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
            console.error('Failed to delete baihoc:', error);
            throw error;
        }
    }
};
