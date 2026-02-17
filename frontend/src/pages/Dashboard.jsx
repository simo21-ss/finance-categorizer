import { LayoutDashboard, Activity } from 'lucide-react'

export default function Dashboard() {
  return (
    <div className="page">
      <header className="pageHeader">
        <div className="pageHeader__icon">
          <LayoutDashboard />
        </div>
        <div className="pageHeader__text">
          <h1 className="pageTitle">Dashboard</h1>
          <p className="muted">Overview cards and summaries will appear here.</p>
        </div>
      </header>

      <section className="panel">
        <h2 className="panel__title"><Activity /> Coming soon</h2>
        <p className="muted">
          This page will show totals, recent activity, and monthly breakdowns.
        </p>
      </section>
    </div>
  )
}
