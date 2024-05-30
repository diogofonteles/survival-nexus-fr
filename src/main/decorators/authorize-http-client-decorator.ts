import { HttpClient, HttpRequest, HttpResponse } from '@/data/protocols/http'
import { GetStorage } from '@/data/protocols/cache'

export class AuthorizeHttpClientDecorator implements HttpClient {
  constructor(
    private readonly getStorage: GetStorage,
    private readonly httpClient: HttpClient,
  ) {
    this.getStorage = getStorage
    this.httpClient = httpClient
  }

  async request(data: HttpRequest): Promise<HttpResponse> {
    const account = this.getStorage.get('account')
    if (account?.access_token) {
      Object.assign(data, {
        headers: Object.assign(data.headers || {}, {
          'x-access-token': account.access_token,
        }),
      })
    }
    const httpResponse = await this.httpClient.request(data)
    return httpResponse
  }
}
