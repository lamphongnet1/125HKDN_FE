export interface RegisterPayload {
    name?: string;
    email: string;
    password: string;
    age?: number;
    diem?: number;
    soGioOnline?: number;
}

/**
 * Register a new user.
 * Expected backend response: { token?: string; message?: string; data?: any }
 */
export async function registerUser(payload: RegisterPayload) {
    // Map to backend expected field names
    const backendPayload = {
        HoTen: payload.name,
        Email: payload.email,
        MatKhau: payload.password,
        Diem: payload.diem,
        SoGioOnline: payload.soGioOnline,
    };
    const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(backendPayload),
    });
    const json = await response.json();
    return json;
}

/**
 * Login an existing user.
 * Expected backend response: { token?: string; message?: string; data?: any }
 */
export async function loginUser(emailOrUsername: string, password: string) {
    // Backend expects form data with fields Email and MatKhau
    const form = new URLSearchParams();
    form.append('Email', emailOrUsername.trim());
    form.append('MatKhau', password);
    const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: form.toString(),
    });
    const json = await response.json();
    return json;
}
