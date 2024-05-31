import {
  LoadSurvivors,
  LoadSurvivorsModel,
} from '@/domain/usecases/load-survivors'
import { HttpClient, HttpStatusCode } from '../protocols/http'
import { Observable, catchError, from, map } from 'rxjs'

export type RemoteLoadSurvivorsModel = LoadSurvivorsModel

export class RemoteLoadSurvivors implements LoadSurvivors {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteLoadSurvivorsModel[]>,
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  load(page: number = 1): Observable<LoadSurvivorsModel[]> {
    const paginatedUrl = `${this.url}?page=${page}`
    return from(
      this.httpClient.request({
        url: paginatedUrl,
        method: 'get',
      }),
    ).pipe(
      map((httpResponse) => {
        switch (httpResponse.statusCode) {
          case HttpStatusCode.ok200:
            return httpResponse.body ?? ([] as LoadSurvivorsModel[])
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
