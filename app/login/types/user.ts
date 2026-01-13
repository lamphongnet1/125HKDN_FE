export interface RegisterPayload {
    name?: string;
    email: string;
    password: string;
    age?: number;
    diem?: number;
    soGioOnline?: number;
}

export interface LoginPayload {
    Email: string;
    MatKhau: string;
}

export interface UpdateOnlineTimeResponse {
    success: boolean;
    message: string;
    SoGioOnline: number;
  }
