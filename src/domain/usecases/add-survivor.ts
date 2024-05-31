import { Observable } from 'rxjs'

export type SurvivorModel = {
  name: string
  email: string
  password: string
  age: number
  gender: string
  lastLocation: {
    latitude: number
    longitude: number
  }
  infected: boolean
}

export interface AddSurvivor {
  add: (survivor: SurvivorModel) => Observable<void>
}
