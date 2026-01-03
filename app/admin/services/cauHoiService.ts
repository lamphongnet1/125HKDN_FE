export type LoaiCauHoi = 'tracnghiem' | 'dientu' | 'chonanh' | 'nghehoithoai' | 'nghexepcau' | 'video';

export interface CauHoi {
    ID_Cau: number;
    ID_BaiHoc: number;
    ThuTu: number;
    LoaiCauHoi: LoaiCauHoi;
    data?: Record<string, any>; // JSON object - optional because API doesn't return it in list
    created_at?: string;
    updated_at?: string;
    // Additional fields from joined data
    ID_Chuong?: number;
    TenChuong?: string;
    TenBaiHoc?: string;
    // Dynamic fields based on question type
    chonanh?: any;
    tracnghiem?: any;
    dientu?: any;
    nghehoithoai?: any;
    nghexepcau?: any;
    video?: any;
}

const API_BASE_URL = 'http://localhost:8000/api/cauhoi';

export interface PaginationMeta {
    current_page: number;
    last_page: number;
    per_page: number;
    total: number;
}

export interface PaginatedResponse {
    data: CauHoi[];
    meta: PaginationMeta;
}

export const cauHoiService = {
    async getAll(page: number = 1): Promise<PaginatedResponse> {
        try {
            const response = await fetch(`${API_BASE_URL}?page=${page}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-store',
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const result = await response.json();
            // Handle paginated response: { success: true, data: { data: [...], current_page, ... } }
            if (result.data && result.data.data) {
                return {
                    data: result.data.data,
                    meta: {
                        current_page: result.data.current_page,
                        last_page: result.data.last_page,
                        per_page: result.data.per_page,
                        total: result.data.total
                    }
                };
            }
            // Fallback for non-paginated response
            return { data: result.data || result, meta: { current_page: 1, last_page: 1, per_page: 20, total: 0 } };
        } catch (error) {
            console.error('Failed to fetch cauhoi:', error);
            throw error;
        }
    },

    async getById(id: number): Promise<CauHoi> {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                cache: 'no-store',
            });
            if (!response.ok) throw new Error(`Error: ${response.statusText}`);
            const result = await response.json();
            // API returns: { success: true, data: { ID_Cau, ..., chonanh: {...} } }
            return result.data || result;
        } catch (error) {
            console.error('Failed to fetch cauhoi detail:', error);
            throw error;
        }
    },

    async create(data: { ID_BaiHoc: number; ThuTu: number; LoaiCauHoi: LoaiCauHoi; data: Record<string, any> }): Promise<CauHoi> {
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
            console.error('Failed to create cauhoi:', error);
            throw error;
        }
    },

    async update(id: number, data: { ID_BaiHoc: number; ThuTu: number; LoaiCauHoi: LoaiCauHoi; data: Record<string, any> }): Promise<CauHoi> {
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
            console.error('Failed to update cauhoi:', error);
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
            console.error('Failed to delete cauhoi:', error);
            throw error;
        }
    }
};
