import {
  HttpClient,
  HttpRequest,
  HttpResponse,
} from '@/data/protocols/http/http-client'
import { AccountModel } from '@/domain/models/account-model'
import axios, { AxiosError, AxiosResponse } from 'axios'

export class AxiosHttpClient implements HttpClient {
  async request(data: HttpRequest): Promise<HttpResponse<AccountModel>> {
    let axiosResponse: AxiosResponse
    try {
      axiosResponse = await axios.request({
        url: data.url,
        method: data.method,
        data: data.body,
        headers: data.headers,
      })
    } catch (error) {
      if (error instanceof AxiosError && error.response) {
        axiosResponse = error.response
      } else {
        console.error('An unexpected error occurred:', error)
        throw error
      }
    }
    return {
      statusCode: axiosResponse.status,
      body: axiosResponse.data,
    }
  }
}
