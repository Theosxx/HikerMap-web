
import { useCallback, useEffect, useState } from "react";
import { getPositions } from "../services/api";

export default function usePositions() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const refresh = useCallback(async () => {
    try {
      const data = await getPositions();
      setPositions(data);
      setError("");
    } catch (err) {
      setError(err.message || "Gagal mengambil data posisi.");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    refresh();

    const interval = setInterval(refresh, 5000);

    return () => clearInterval(interval);
  }, [refresh]);

  return { positions, loading, error, refresh };
}
