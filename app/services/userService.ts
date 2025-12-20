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
    const response = await fetch('http://localhost:8000/api/users/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify(payload),
    });
    const json = await response.json();
    return json;
}

/**
 * Login an existing user.
 * Expected backend response: { token?: string; message?: string; data?: any }
 */
export async function loginUser(emailOrUsername: string, password: string) {
    const response = await fetch('http://localhost:8000/api/users/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ emailOrUsername, password }),
    });
    const json = await response.json();
    return json;
}
