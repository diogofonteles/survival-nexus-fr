import {
  Authentication,
  AuthenticationModel,
  AuthenticationParams,
} from '@/domain/usecases/authentication'
import { HttpClient, HttpStatusCode } from '../protocols/http/http-client'

type RemoteAuthenticationModel = AuthenticationModel

export class RemoteAuthentication implements Authentication {
  constructor(
    private readonly url: string,
    private readonly httpClient: HttpClient<RemoteAuthenticationModel>,
  ) {
    this.url = url
    this.httpClient = httpClient
  }

  async auth(params: AuthenticationParams): Promise<AuthenticationModel> {
    const httpResponse = await this.httpClient.request({
      url: this.url,
      method: 'post',
      body: params,
    })

    switch (httpResponse.statusCode) {
      case HttpStatusCode.ok:
        return httpResponse.body ?? ({} as AuthenticationModel)
      case HttpStatusCode.unauthorized:
        throw new Error('Credenciais inválidas')
      default:
        throw new Error('Erro inesperado')
    }
  }
}
