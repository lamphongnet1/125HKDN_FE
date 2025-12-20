const API_URL = "http://127.0.0.1:8000/api";

export async function getUserById(id: number) {
  const res = await fetch(`${API_URL}/users/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // rất quan trọng với App Router
  });

  if (!res.ok) {
    throw new Error("Không lấy được dữ liệu user");
  }

  return res.json();
}

// --- Authentication helpers
export type LoginResponse = {
  token?: string;
  user?: Record<string, any>;
  message?: string;
};

export async function loginUser(identifier: string, password: string): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ identifier, password }),
    });

    if (!res.ok) {
      const data = await res.json().catch(() => ({}));
      throw new Error(data?.message || "Đăng nhập thất bại");
    }

    return res.json();
  } catch (err) {
    // Nếu API không tồn tại trong môi trường dev, mô phỏng phản hồi để UX vẫn hoạt động
    if ((err as any).name === "TypeError" || (err as any).message?.includes("Failed to fetch")) {
      await new Promise((r) => setTimeout(r, 700));
      if (identifier === "demo@demo.com" && password === "password") {
        return { token: "demo-token", user: { id: 1, name: "Demo User", email: "demo@demo.com" } };
      }
      throw new Error("Thông tin đăng nhập không đúng (demo)");
    }
    throw err;
  }
}

export type RegisterData = {
  name?: string;
  email: string;
  password: string;
  age?: number;
};

export async function registerUser(data: RegisterData): Promise<LoginResponse> {
  try {
    const res = await fetch(`${API_URL}/auth/register`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data),
    });

    if (!res.ok) {
      const body = await res.json().catch(() => ({}));
      throw new Error(body?.message || "Đăng ký thất bại");
    }

    return res.json();
  } catch (err) {
    // fallback simulation for local dev
    if ((err as any).name === "TypeError" || (err as any).message?.includes("Failed to fetch")) {
      await new Promise((r) => setTimeout(r, 700));
      if (data.email.endsWith("@demo.com")) {
        return { token: "demo-token", user: { id: 2, name: data.name || "Demo", email: data.email } };
      }
      throw new Error("Không thể kết nối tới server (demo)");
    }
    throw err;
  }
}
