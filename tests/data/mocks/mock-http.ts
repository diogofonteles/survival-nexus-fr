import {
  HttpRequest,
  HttpResponse,
  HttpStatusCode,
  HttpClient,
} from '@/data/protocols/http'
import { faker } from '@faker-js/faker'
import { Observable, of } from 'rxjs'

export const mockHttpRequest = (): HttpRequest => ({
  url: faker.internet.url(),
  method: faker.helpers.arrayElement(['get', 'post', 'put', 'delete']),
  body: faker.helpers.objectValue({}),
  headers: faker.helpers.objectValue({}),
})

export class HttpClientSpy<R = never> implements HttpClient<R> {
  url?: string
  method?: string
  body?: never
  headers?: never
  response: HttpResponse<R> = {
    statusCode: HttpStatusCode.ok200,
  }

  request(data: HttpRequest): Observable<HttpResponse<R>> {
    this.url = data.url
    this.method = data.method
    this.body = data.body
    this.headers = data.headers
    return of(this.response)
  }
}
