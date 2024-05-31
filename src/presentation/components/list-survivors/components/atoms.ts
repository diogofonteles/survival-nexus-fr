import { atom } from 'recoil'
import { LoadSurvivorsModel } from '@/domain/usecases/load-survivors'

export const survivorsState = atom<LoadSurvivorsModel[]>({
  key: 'survivorsState',
  default: [],
})

export const currentPageState = atom<number>({
  key: 'currentPageState',
  default: 1,
})
