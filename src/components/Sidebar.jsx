
const menus = [
  { name: 'Pemantauan', icon: '⌖' },
  { name: 'Data Pendaki', icon: '♧' },
  { name: 'Riwayat Perjalanan', icon: '◷' },
  { name: 'Kualitas LoRa', icon: '⌁' },
]

export default function Sidebar({ activeMenu, onNavigate }) {
  return (
    <aside className="sidebar">
      <div className="brand">
        <div className="brand-icon">⌁</div>
        <div>
          <h1>HikerMap</h1>
          <span>MONITORING SYSTEM</span>
        </div>
      </div>

      <div className="nav-label">MENU UTAMA</div>

      <nav className="navigation">
        {menus.map((menu) => (
          <button
            key={menu.name}
            className={`nav-item ${
              activeMenu === menu.name ? 'active' : ''
            }`}
            onClick={() => onNavigate(menu.name)}
          >
            <span className="menu-icon">{menu.icon}</span>
            <span>{menu.name}</span>
          </button>
        ))}
      </nav>

      <div className="sidebar-bottom">
        <div className="mountain-card">
          <strong>Gunung Panderman</strong>
          <span>Batu, Jawa Timur</span>
        </div>
        <div className="sidebar-footer">
          Sistem pemantauan lokal
        </div>
      </div>
    </aside>
  )
}
