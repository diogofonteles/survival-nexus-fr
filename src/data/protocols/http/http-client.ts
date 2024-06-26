import { Observable } from 'rxjs'

export type HttpMethod = 'post' | 'get' | 'put' | 'delete'

export type HttpRequest = {
  url: string
  method: HttpMethod
  body?: any
  headers?: never
}

export enum HttpStatusCode {
  ok200 = 200,
  ok201 = 201,
  noContent = 204,
  badRequest = 400,
  unauthorized = 401,
  forbidden = 403,
  notFound = 404,
  serverError = 500,
}

export type HttpResponse<T = unknown> = {
  statusCode: HttpStatusCode
  body?: T
}

export interface HttpClient<R = any> {
  request: (data: HttpRequest) => Observable<HttpResponse<R>>
}
