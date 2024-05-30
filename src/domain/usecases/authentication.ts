import { AccountModel } from '@/domain/models/account-model'
import { Observable } from 'rxjs'

export type AuthenticationParams = {
  email: string
  password: string
}

export type AuthenticationModel = AccountModel

export interface Authentication {
  auth: (params: AuthenticationParams) => Observable<AuthenticationModel>
}
