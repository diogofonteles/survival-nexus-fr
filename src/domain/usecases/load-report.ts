import { Observable } from 'rxjs'

export type LoadReportModel = {
  props: {
    totalSurvivors: number
    totalHealthy: number
    totalInfected: number
    percentHealthy: number
    percentInfected: number
  }
}

export interface LoadReport {
  load: () => Observable<LoadReportModel>
}
