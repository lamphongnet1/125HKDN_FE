export interface User {
    ID_User: number;
    HoTen: string;
    Email: string;
    MatKhau: string; // Included in response but maybe not needed for display
    Diem: number;
    SoGioOnline: number;
    created_at: string;
    updated_at: string;
    deleted_at: string | null;
}

const API_BASE_URL = 'http://localhost:8000/api/users';

export const adminUserService = {
    async getAllUsers(): Promise<User[]> {
        try {
            const response = await fetch(`${API_BASE_URL}/`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
                cache: 'no-store',
            });

            if (!response.ok) {
                throw new Error(`Error fetching users: ${response.statusText}`);
            }

            return await response.json();
        } catch (error) {
            console.error('Failed to fetch users:', error);
            throw error;
        }
    },

    async lockUser(id: number): Promise<void> {
        try {
            // Assuming DELETE method for locking/soft-deleting
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error(`Error locking user: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Failed to lock user ${id}:`, error);
            throw error;
        }
    },

    async restoreUser(id: number): Promise<void> {
        try {
            const response = await fetch(`${API_BASE_URL}/restore/${id}`, {
                method: 'POST', // Assuming GET for restore endpoint
            });

            if (!response.ok) {
                throw new Error(`Error restoring user: ${response.statusText}`);
            }
        } catch (error) {
            console.error(`Failed to restore user ${id}:`, error);
            throw error;
        }
    }
};
