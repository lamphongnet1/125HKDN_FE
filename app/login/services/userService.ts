import type { RegisterPayload, LoginPayload } from '../types/user';

/**
 * Helper to handle HTTP responses.
 */
const handleResponse = async (response: Response) => {
    const contentType = response.headers.get('content-type') || '';

    // Check if response is JSON
    if (contentType.includes('application/json')) {
        const data = await response.json();
        if (!response.ok) {
            const error = data?.message || response.statusText;
            throw new Error(error);
        }
        return data;
    }

    // If not JSON (e.g., HTML error page), throw descriptive error
    const text = await response.text();
    throw new Error(`Server returned non-JSON response: ${text.substring(0, 100)}...`);
};

/**
 * Register a new user.
 * @param payload - Object containing registration fields.
 * @returns JSON response from the server (usually contains token, ID_User, etc.)
 */
export const registerUser = async (payload: RegisterPayload) => {
    // Map frontend fields to backend expected fields
    const backendPayload = {
        HoTen: payload.name || '',
        Email: payload.email,
        MatKhau: payload.password,
    };
    //Bug
    const res = await fetch('http://localhost:8000/api/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload),
    });
    return handleResponse(res);
};

/**
 * Login an existing user.
 * The backend expects fields named "Email" and "MatKhau".
 * @param email - User email.
 * @param password - User password.
 * @returns JSON response containing at least a token and ID_User.
 */
export const loginUser = async (email: string, password: string) => {
    // Backend expects multipart/form-data (like a regular HTML form)
    const form = new FormData();
    form.append('Email', email.trim());
    form.append('MatKhau', password);

    const res = await fetch('http://localhost:8000/api/login', {
        method: 'POST',
        // Don't set Content-Type - browser will set it with correct boundary
        headers: {
            'Accept': 'application/json',
        },
        body: form,
    });
    return handleResponse(res);
};
