/* eslint-disable @typescript-eslint/no-unused-vars */
import { AccountModel } from '@/domain/models/account-model'
import {
  getCurrentAccountAdapter,
  setCurrentAccountAdapter,
} from '@/main/adapters/current-account-adapter'
import { atom } from 'recoil'

export const currentAccountState = atom({
  key: 'currentAccountState',
  default: {
    getCurrentAccount: getCurrentAccountAdapter,
    setCurrentAccount: setCurrentAccountAdapter,
  },
})
