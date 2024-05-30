import {
  Authentication,
  AuthenticationModel,
  AuthenticationParams,
} from '@/domain/usecases/authentication'
import { HttpClient, HttpStatusCode } from '../protocols/http/http-client'
import { Observable, catchError, from, map } from 'rxjs'

type RemoteAuthenticationModel = AuthenticationModel

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthenticationModel>,
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  auth(params: AuthenticationParams): Observable<AuthenticationModel> {
    return from(
      this.httpClient.request({
        url: this.url,
        method: 'post',
        body: params,
      }),
    ).pipe(
      map((httpResponse) => {
        switch (httpResponse.statusCode) {
          case HttpStatusCode.ok:
            return httpResponse.body ?? ({} as AuthenticationModel)
          case HttpStatusCode.unauthorized:
            throw new Error('Invalid credentials')
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
