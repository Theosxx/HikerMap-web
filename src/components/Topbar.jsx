
export default function Topbar({ activeMenu }) {
  return (
    <header className="topbar">
      <div className="breadcrumb">
        <span>HikerMap</span>
        <span>/</span>
        <strong>{activeMenu}</strong>
      </div>

      <div className="topbar-right">
        <span className="environment-badge">
          <span className="footer-dot" />
          MODE SIMULASI
        </span>
        <div className="avatar">A</div>
      </div>
    </header>
  )
}
