import { ArrowLeftRight, ListFilter } from 'lucide-react'

export default function TransactionsPage() {
  return (
    <div className="page">
      <header className="pageHeader">
        <div className="pageHeader__icon">
          <ArrowLeftRight />
        </div>
        <div className="pageHeader__text">
          <h1 className="pageTitle">Transactions</h1>
          <p className="muted">Browse, search, and filter your imported transactions.</p>
        </div>
      </header>

      <section className="panel">
        <h2 className="panel__title"><ListFilter /> Coming soon</h2>
        <p className="muted">
          This page will show imported transactions with categories, search, and filtering.
        </p>
      </section>
    </div>
  )
}
