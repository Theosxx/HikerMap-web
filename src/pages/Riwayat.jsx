
export default function Riwayat({ positions, loading, error }) {
  const history = [...positions].sort(
    (a, b) =>
      new Date(b.receivedAt || 0) -
      new Date(a.receivedAt || 0)
  );

  return (
    <div className="content-card">
      <h2>Riwayat Posisi</h2>
      <p>Riwayat paket posisi yang tersimpan di database.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p>Memuat data...</p>}

      <div className="history-list">
        {history.map((p) => (
          <div
            className="history-item"
            key={`${p.deviceId}-${p.counter}`}
          >
            <div>
              <strong>Paket #{p.counter}</strong>
              <p>
                {p.latitude}, {p.longitude}
              </p>
              <small>
                {p.receivedAt
                  ? new Date(p.receivedAt).toLocaleString("id-ID")
                  : "-"}
              </small>
            </div>

            <span className="status-label">{p.status}</span>
          </div>
        ))}

        {!loading && history.length === 0 && (
          <p>Belum ada riwayat posisi.</p>
        )}
      </div>
    </div>
  );
}
