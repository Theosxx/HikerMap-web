
import { useEffect } from "react";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
} from "react-leaflet";
import L from "leaflet";
import "leaflet/dist/leaflet.css";

const DEFAULT_CENTER = [-7.895, 112.506];

const gpsIcon = new L.Icon({
  iconUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon.png",
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-icon-2x.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.9.4/dist/images/marker-shadow.png",
  iconSize: [25, 41],
  iconAnchor: [12, 41],
  popupAnchor: [1, -34],
  shadowSize: [41, 41],
});

function MapUpdater({ position }) {
  const map = useMap();

  useEffect(() => {
    if (position) {
      map.flyTo(
        [Number(position.latitude), Number(position.longitude)],
        Math.max(map.getZoom(), 14),
        { duration: 1 }
      );
    }
  }, [position, map]);

  return null;
}

export default function HikerMap({ positions = [] }) {
  const validPositions = positions.filter((p) => {
    const lat = Number(p.latitude);
    const lng = Number(p.longitude);

    return (
      p.status === "FIX" &&
      Number.isFinite(lat) &&
      Number.isFinite(lng) &&
      Math.abs(lat) <= 90 &&
      Math.abs(lng) <= 180 &&
      (lat !== 0 || lng !== 0)
    );
  });

  // Pilih satu rekaman GPS FIX terbaru.
  const latestPosition = validPositions.reduce((latest, current) => {
    if (!latest) return current;

    return new Date(current.receivedAt || 0) >
      new Date(latest.receivedAt || 0)
      ? current
      : latest;
  }, null);

  return (
    <section className="content-card map-card">
      <div className="map-heading">
        <div>
          <h3>Peta Pemantauan</h3>
          <p>Menampilkan posisi GPS FIX terbaru.</p>
        </div>

        <span className="map-count">
          {latestPosition ? "1 posisi terbaru" : "Belum ada GPS FIX"}
        </span>
      </div>

      <div className="hiker-map">
        <MapContainer
          center={DEFAULT_CENTER}
          zoom={13}
          scrollWheelZoom
          className="leaflet-map"
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />

          <MapUpdater position={latestPosition} />

          {latestPosition && (
            <Marker
              position={[
                Number(latestPosition.latitude),
                Number(latestPosition.longitude),
              ]}
              icon={gpsIcon}
            >
              <Popup>
                <strong>Posisi GPS Terbaru</strong>
                <br />
                Counter: #{latestPosition.counter}
                <br />
                Status: {latestPosition.status}
                <br />
                Latitude: {latestPosition.latitude}
                <br />
                Longitude: {latestPosition.longitude}
                <br />
                Ketinggian: {latestPosition.altitude} m
                <br />
                Satelit: {latestPosition.satellites}
                <br />
                RSSI: {latestPosition.rssi} dBm
                <br />
                SNR: {latestPosition.snr} dB
                <br />
                Diterima:{" "}
                {latestPosition.receivedAt
                  ? new Date(latestPosition.receivedAt).toLocaleString("id-ID")
                  : "-"}
              </Popup>
            </Marker>
          )}
        </MapContainer>
      </div>

      {!latestPosition && (
        <p className="map-empty">
          Belum ada posisi GPS valid berstatus FIX.
        </p>
      )}
    </section>
  );
}
