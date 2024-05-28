import '@/presentation/components/report/report.css'

export default function Report() {
  return (
    <div className="report-container">
      <main className="main-content">
        <div className="header-report">
          <h1>Reports</h1>
          <p>
            Your camp has grown <span>+5%</span> this month
          </p>
        </div>
        <div className="cards">
          <div className="card">
            <h2>Number of Healthy Survivors</h2>
            <div className="number-container">
              <div className="number">1,205</div>
              <div className="badge-positive">+5%</div>
            </div>
            <p className="last-30-days">Last 30 days</p>
            <div className="download-link-container">
              <a href="#" className="download-link">
                Download Report
              </a>
            </div>
          </div>
          <div className="card">
            <h2>Number of Infected Survivors</h2>
            <div className="number-container">
              <div className="number">39</div>
              <div className="badge-negative">-12%</div>
            </div>
            <p className="last-30-days">Last 30 days</p>
            <div className="download-link-container">
              <a href="#" className="download-link">
                Download Report
              </a>
            </div>
          </div>
          <div className="card">
            <h2>Average Resource Allocation</h2>
            <div className="number-container">
              <div className="number">Food</div>
            </div>
            <p className="last-30-days">10 days worth</p>
            <div className="download-link-container">
              <a href="#" className="download-link">
                Download Report
              </a>
            </div>
          </div>
        </div>
      </main>
    </div>
  )
}
