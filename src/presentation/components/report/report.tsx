'use client'

import { LoadInventoryReportModel } from '@/domain/usecases/load-inventory-report'
import { LoadReportModel } from '@/domain/usecases/load-report'
import { makeRemoteLoadInventoryReport } from '@/main/factories/usecases/remote-load-inventory-report-factory'
import { makeRemoteLoadReport } from '@/main/factories/usecases/remote-load-report-factory'
import '@/presentation/components/report/report.css'
import { useEffect, useState, useRef } from 'react'
import { combineLatest } from 'rxjs'

export default function Report() {
  const loadReport = useRef(makeRemoteLoadReport())
  const loadInventoryReport = useRef(makeRemoteLoadInventoryReport())
  const [reportData, setReportData] = useState<LoadReportModel | null>(null)
  const [inventoryData, setInventoryData] =
    useState<LoadInventoryReportModel | null>(null)

  useEffect(() => {
    const subscription = combineLatest([
      loadReport.current.load(),
      loadInventoryReport.current.load(),
    ]).subscribe({
      next: ([report, inventory]) => {
        console.log('Report data received:', report)
        console.log('Inventory data received:', inventory)
        setReportData(report)
        setInventoryData(inventory)
      },
      error: (error) => {
        console.error('Error loading data:', error)
      },
    })

    return () => {
      console.log('Unsubscribing from data streams')
      subscription.unsubscribe()
    }
  }, [])

  if (!reportData || !inventoryData) {
    return <div>Loading...</div>
  }

  const formatPercentage = (value: number) => Math.round(value)

  const healthyPercentage = formatPercentage(reportData.props.percentHealthy)
  const infectedPercentage = formatPercentage(reportData.props.percentInfected)

  const getBadgeClass = (value: number) =>
    value >= 0 ? 'badge-positive' : 'badge-negative'

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
              <div className="number">{reportData.props.totalHealthy}</div>
              <div className={getBadgeClass(healthyPercentage)}>
                {healthyPercentage}%
              </div>
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
              <div className="number">{reportData.props.totalInfected}</div>
              <div className={getBadgeClass(infectedPercentage)}>
                {infectedPercentage}%
              </div>
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
            <p className="last-30-days">
              Average {inventoryData.props.averageFood} per survivor
            </p>
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
