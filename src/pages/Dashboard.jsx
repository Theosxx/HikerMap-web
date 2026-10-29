import HikerMap from "../components/HikerMap";
export default function Dashboard({ positions, loading, error }) {
  const latest = positions[0];

  const fixedPositions = positions.filter(
    (p) => p.status === "FIX"
  );

  const noFixPositions = positions.filter(
    (p) => p.status === "NOFIX"
  );

  const avgRssi = positions.length
    ? (
        positions.reduce((sum, p) => sum + p.rssi, 0) /
        positions.length
      ).toFixed(1)
    : "-";

  const stats = [
    { label: "Total Data Posisi", value: positions.length },
    { label: "GPS FIX", value: fixedPositions.length },
    { label: "GPS NOFIX", value: noFixPositions.length },
    { label: "Rata-rata RSSI", value: avgRssi },
  ];

  return (
    <div className="dashboard-page">
      <div className="page-heading">
        <div>
          <h2>Pemantauan Pendaki</h2>
          <p>Data posisi dari backend HikerMap.</p>
        </div>
      </div>

      {error && <div className="alert alert-danger">{error}</div>}

      <div className="stats-grid">
        {stats.map((stat) => (
          <div className="stat-card" key={stat.label}>
            <span>{stat.label}</span>
            <h3>{loading ? "..." : stat.value}</h3>
          </div>
        ))}
      </div>
        <HikerMap positions={positions} />
      
      <div className="content-card latest-position-card">
        <div className="latest-header">
          <div>
            <h3>Informasi Posisi Terbaru</h3>
            <p>Data terakhir yang diterima dari perangkat gateway.</p>
          </div>

          {latest && (
            <span className={`gps-badge ${latest.status === "FIX" ? "gps-fix" : "gps-nofix"}`}>
              {latest.status}
            </span>
          )}
        </div>

        {loading && <p>Memuat informasi posisi...</p>}

        {!loading && !latest && (
          <p>Belum ada data posisi di database.</p>
        )}

        {latest && (
          <>
            <div className="latest-received">
              <span>Terakhir diperbarui</span>
              <strong>
                {latest.receivedAt
                  ? new Date(latest.receivedAt).toLocaleString("id-ID")
                  : "-"}
              </strong>
            </div>

            <div className="latest-info-grid">
              <div className="info-section">
                <div className="info-section-title">
                  <span className="info-icon">⌖</span>
                  <h4>Informasi GPS</h4>
                </div>

                <div className="info-item">
                  <span>Latitude</span>
                  <strong>{latest.latitude}</strong>
                </div>

                <div className="info-item">
                  <span>Longitude</span>
                  <strong>{latest.longitude}</strong>
                </div>

                <div className="info-item">
                  <span>Ketinggian</span>
                  <strong>{latest.altitude} m</strong>
                </div>

                <div className="info-item">
                  <span>Jumlah Satelit</span>
                  <strong>{latest.satellites}</strong>
                </div>

                <div className="info-item">
                  <span>HDOP</span>
                  <strong>{latest.hdop}</strong>
                </div>
              </div>

              <div className="info-section">
                <div className="info-section-title">
                  <span className="info-icon">⌁</span>
                  <h4>Kualitas Komunikasi LoRa</h4>
                </div>

                <div className="info-item">
                  <span>RSSI</span>
                  <strong>{latest.rssi} dBm</strong>
                </div>

                <div className="info-item">
                  <span>SNR</span>
                  <strong>{latest.snr} dB</strong>
                </div>

                <div className="info-item">
                  <span>Counter Paket</span>
                  <strong>#{latest.counter}</strong>
                </div>
              </div>
            </div>
          </>
        )}
      </div>

    </div>
  );
}
