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
      <div className="content-card">
        <h3>Posisi Terbaru</h3>

        {loading && <p>Memuat data...</p>}

        {!loading && !positions.length && (
          <p>Belum ada data posisi di database.</p>
        )}

        {latest && (
          <div className="position-summary">
            <p>Status GPS: <strong>{latest.status}</strong></p>
            <p>Latitude: {latest.latitude}</p>
            <p>Longitude: {latest.longitude}</p>
            <p>Ketinggian: {latest.altitude} m</p>
            <p>Satelit: {latest.satellites}</p>
            <p>HDOP: {latest.hdop}</p>
            <p>RSSI: {latest.rssi} dBm</p>
            <p>SNR: {latest.snr} dB</p>
            <p>
              Diterima:{" "}
              {latest.receivedAt
                ? new Date(latest.receivedAt).toLocaleString("id-ID")
                : "-"}
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
