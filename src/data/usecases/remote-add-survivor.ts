import { AddSurvivor, SurvivorModel } from '@/domain/usecases/add-survivor'
import { HttpClient, HttpStatusCode } from '../protocols/http'
import { Observable, from, catchError, map } from 'rxjs'

export class RemoteAddSurvivor implements AddSurvivor {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<void>,
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  add(survivor: SurvivorModel): Observable<void> {
    return from(
      this.httpClient.request({
        url: this.url,
        method: 'post',
        body: survivor,
      }),
    ).pipe(
      map((httpResponse) => {
        switch (httpResponse.statusCode) {
          case HttpStatusCode.ok201:
            return
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
