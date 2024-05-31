import {
  LoadInventoryReport,
  LoadInventoryReportModel,
} from '@/domain/usecases/load-inventory-report'
import { HttpClient, HttpStatusCode } from '../protocols/http'
import { Observable, catchError, from, map } from 'rxjs'

export type RemoteLoadInventoryReportModel = LoadInventoryReportModel

export class RemoteLoadInventoryReport implements LoadInventoryReport {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadInventoryReportModel>,
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  load(): Observable<LoadInventoryReportModel> {
    return from(
      this.httpClient.request({
        url: this.url,
        method: 'get',
      }),
    ).pipe(
      map((httpReponse) => {
        switch (httpReponse.statusCode) {
          case HttpStatusCode.ok200:
            return httpReponse.body ?? ({} as LoadInventoryReportModel)
          case HttpStatusCode.unauthorized:
            throw new Error('Unauthorized')
          default:
            throw new Error('Unexpected error')
        }
      }),
      catchError((error) => {
        console.error('Unexpected error: ', error)
        throw error
      }),
    )
  }
}
