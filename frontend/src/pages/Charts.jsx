import { BarChart3, TrendingUp } from 'lucide-react'

export default function ChartsPage() {
  return (
    <div className="page">
      <header className="pageHeader">
        <div className="pageHeader__icon">
          <BarChart3 />
        </div>
        <div className="pageHeader__text">
          <h1 className="pageTitle">Charts & Analytics</h1>
          <p className="muted">Visual insights into your spending patterns.</p>
        </div>
      </header>

      <section className="panel">
        <h2 className="panel__title"><TrendingUp /> Planned charts</h2>
        <ul className="bullets">
          <li>Spending breakdown by category</li>
          <li>Monthly trend lines</li>
          <li>Income vs. expenses comparison</li>
        </ul>
      </section>
    </div>
  )
}
