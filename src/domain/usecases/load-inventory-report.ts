import { Observable } from 'rxjs'

export type LoadInventoryReportModel = {
  props: {
    averageWater: number
    averageFood: number
    averageMedication: number
    averageVacine: number
  }
}

export interface LoadInventoryReport {
  load: () => Observable<LoadInventoryReportModel>
}
