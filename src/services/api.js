
const API_URL = import.meta.env.VITE_API_URL;

export async function getPositions() {
  const response = await fetch(`${API_URL}/api/positions`, {
    headers: {
      "ngrok-skip-browser-warning": "true",
    },
  });

  if (!response.ok) {
    throw new Error(`Gagal mengambil data: ${response.status}`);
  }

  const result = await response.json();

  if (!Array.isArray(result.data)) {
    throw new Error("Respons API bukan daftar posisi.");
  }

  return result.data;
}
