import { LoadReport, LoadReportModel } from '@/domain/usecases/load-report'
import { HttpClient, HttpStatusCode } from '../protocols/http'
import { Observable, catchError, from, map } from 'rxjs'

export type RemoteLoadReportModel = LoadReportModel

export class RemoteLoadReport implements LoadReport {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadReportModel>,
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  load(): Observable<LoadReportModel> {
    return from(
      this.httpClient.request({
        url: this.url,
        method: 'get',
      }),
    ).pipe(
      map((httpReponse) => {
        switch (httpReponse.statusCode) {
          case HttpStatusCode.ok200:
            return httpReponse.body ?? ({} as LoadReportModel)
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
