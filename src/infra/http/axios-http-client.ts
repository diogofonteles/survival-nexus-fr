import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@/data/protocols/http/http-client'
import { AccountModel } from '@/domain/models/account-model'
import axios, { AxiosError } from 'axios'
import { Observable, catchError, from, map, of } from 'rxjs'

export class AxiosHttpClient implements HttpClient {
  request(data: HttpRequest): Observable<HttpResponse<AccountModel>> {
    return from(
      axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      }),
    ).pipe(
      map((axiosResponse) => ({
        statusCode: axiosResponse.status,
        body: axiosResponse.data,
      })),
      catchError((error) => {
        if (error instanceof AxiosError && error.response) {
          return of({
            statusCode: error.response.status,
            body: error.response.data,
          })
        }
        console.error('An unexpected error occurred:', error)
        throw error
      }),
    )
  }
}
