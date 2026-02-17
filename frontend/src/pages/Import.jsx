import { Upload, FileSpreadsheet } from 'lucide-react'

export default function ImportPage() {
  return (
    <div className="page">
      <header className="pageHeader">
        <div className="pageHeader__icon">
          <Upload />
        </div>
        <div className="pageHeader__text">
          <h1 className="pageTitle">Import Data</h1>
          <p className="muted">Bring in transactions from CSV, JSON, or bank exports.</p>
        </div>
      </header>

      <section className="panel">
        <h2 className="panel__title"><FileSpreadsheet /> Planned import flow</h2>
        <ul className="bullets">
          <li>Upload CSV or JSON files</li>
          <li>Preview rows and map columns</li>
          <li>Validate and save transactions</li>
        </ul>
      </section>
    </div>
  )
}
