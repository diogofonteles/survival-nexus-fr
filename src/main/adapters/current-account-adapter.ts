import { AccountModel } from '@/domain/models/account-model'
import { makeLocalStorageAdapter } from '@/main/factories/cache/local-storage-adapter-factory'

export const setCurrentAccountAdapter = (account: AccountModel): void => {
  makeLocalStorageAdapter().set('account', account)
}

export const getCurrentAccountAdapter = (): AccountModel | null => {
  return makeLocalStorageAdapter().get<AccountModel>('account')
}
