
export default function Riwayat({ positions, loading, error }) {
  const history = [...positions].sort(
    (a, b) =>
      new Date(b.receivedAt || 0) -
      new Date(a.receivedAt || 0)
  );

  return (
      
  <div className="content-card history-card">
    <div className="history-header">
      <div>
        <h3>Riwayat Perjalanan</h3>
        <p>Rekaman posisi GPS yang diterima dan tersimpan di database.</p>
      </div>
      <span className="history-total">
        {positions.length} Rekaman
      </span>
    </div>

    {positions.length === 0 ? (
      <div className="history-empty">
        Belum ada riwayat posisi.
      </div>
    ) : (
      <div className="history-list">
        {positions.map((item) => (
          <div className="history-item" key={item.id ?? item.counter}>
            <div className="history-item-top">
              <div className="history-counter">
                <span className="history-location-icon">⌖</span>
                <strong>Paket #{item.counter}</strong>
              </div>

              <span
                className={`gps-badge ${
                  item.status === "FIX" ? "gps-fix" : "gps-nofix"
                }`}
              >
                {item.status}
              </span>
            </div>

            <div className="history-coordinates">
              <div>
                <span>Latitude</span>
                <strong>{item.latitude}</strong>
              </div>
              <div>
                <span>Longitude</span>
                <strong>{item.longitude}</strong>
              </div>
              <div>
                <span>Ketinggian</span>
                <strong>{item.altitude} m</strong>
              </div>
            </div>

            <div className="history-time">
              <span>Waktu diterima</span>
              <strong>
                {item.receivedAt
                  ? new Date(item.receivedAt).toLocaleString("id-ID")
                  : "-"}
              </strong>
            </div>
          </div>
        ))}
      </div>
    )}
  </div>

  );
}
