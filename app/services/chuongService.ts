const API_URL = "http://127.0.0.1:8000/api";

export async function getUserById(id: number) {
  const res = await fetch(`${API_URL}/chuong/${id}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
    },
    cache: "no-store", // rất quan trọng với App Router
  });

  if (!res.ok) {
    throw new Error("Không lấy được dữ liệu chương");
  }

  return res.json();
}
