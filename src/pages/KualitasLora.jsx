
export default function KualitasLoRa({ positions, loading, error }) {
  return (
    <div className="content-card">
      <h2>Kualitas Komunikasi LoRa</h2>
      <p>Pemantauan RSSI dan SNR dari paket yang diterima.</p>

      {error && <div className="alert alert-danger">{error}</div>}
      {loading && <p>Memuat data...</p>}

      <div className="table-responsive">
        <table className="data-table">
          <thead>
            <tr>
              <th>Counter</th>
              <th>RSSI (dBm)</th>
              <th>SNR (dB)</th>
              <th>Status GPS</th>
              <th>Waktu Diterima</th>
            </tr>
          </thead>

          <tbody>
            {positions.map((p) => (
              <tr key={`${p.deviceId}-${p.counter}`}>
                <td>{p.counter}</td>
                <td>{p.rssi}</td>
                <td>{p.snr}</td>
                <td>{p.status}</td>
                <td>
                  {p.receivedAt
                    ? new Date(p.receivedAt).toLocaleString("id-ID")
                    : "-"}
                </td>
              </tr>
            ))}

            {!loading && positions.length === 0 && (
              <tr>
                <td colSpan="5">Belum ada data komunikasi.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
