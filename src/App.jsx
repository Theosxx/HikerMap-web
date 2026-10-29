
import { useState } from "react";

import DashboardLayout from "./layouts/DashboardLayout";
import Dashboard from "./pages/Dashboard";
import DataPendaki from "./pages/DataPendaki";
import Riwayat from "./pages/Riwayat";
import KualitasLoRa from "./pages/KualitasLora";

import usePositions from "./hooks/usePositions";

import "./styles/global.css";
import "./styles/layout.css";
import "./styles/dashboard.css";
import "./styles/components.css";

export default function App() {
  const [activeMenu, setActiveMenu] = useState("Pemantauan");

  const { positions, loading, error, refresh } = usePositions();

  function renderPage() {
    const props = { positions, loading, error };

    switch (activeMenu) {
      case "Pemantauan":
        return <Dashboard {...props} />;

      case "Data Pendaki":
        return <DataPendaki {...props} />;

      case "Riwayat Perjalanan":
        return <Riwayat {...props} />;

      case "Kualitas LoRa":
        return <KualitasLoRa {...props} />;

      default:
        return <Dashboard {...props} />;
    }
  }

  return (
    <DashboardLayout
      activeMenu={activeMenu}
      onNavigate={setActiveMenu}
    >
      {renderPage()}
    </DashboardLayout>
  );
}
