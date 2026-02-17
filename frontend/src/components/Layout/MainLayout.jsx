import { useState } from 'react'
import { Outlet } from 'react-router-dom'
import Sidebar from './Sidebar'
import './layout.css'

export default function MainLayout() {
  const [collapsed, setCollapsed] = useState(false)

  return (
    <div className={collapsed ? 'shell shell--collapsed' : 'shell'}>
      <Sidebar collapsed={collapsed} onToggle={() => setCollapsed((v) => !v)} />

      <div className="shell__content">
        <main className="content">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
