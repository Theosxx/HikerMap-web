
import Sidebar from '../components/Sidebar'
import Topbar from '../components/Topbar'

export default function DashboardLayout({
  activeMenu,
  onNavigate,
  children,
}) {
  return (
    <div className="app-shell">
      <Sidebar
        activeMenu={activeMenu}
        onNavigate={onNavigate}
      />

      <main className="main-content">
        <Topbar activeMenu={activeMenu} />

        <div className="page-content">
          {children}
        </div>
      </main>
    </div>
  )
}
