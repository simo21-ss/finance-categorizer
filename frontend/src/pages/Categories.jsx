import { Tags, Sparkles } from 'lucide-react'

export default function CategoriesPage() {
  return (
    <div className="page">
      <header className="pageHeader">
        <div className="pageHeader__icon">
          <Tags />
        </div>
        <div className="pageHeader__text">
          <h1 className="pageTitle">Categories</h1>
          <p className="muted">Organize transactions with smart rules and labels.</p>
        </div>
      </header>

      <section className="panel">
        <h2 className="panel__title"><Sparkles /> Planned features</h2>
        <ul className="bullets">
          <li>Create and edit categories</li>
          <li>Keyword and merchant matching rules</li>
          <li>Bulk re-categorization tools</li>
        </ul>
      </section>
    </div>
  )
}
