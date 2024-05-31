import { Observable } from 'rxjs'

export type LoadSurvivorsModel = {
  props: {
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
    createdAt: string
  }
  _id: {
    value: string
  }
}

export interface LoadSurvivors {
  load: (page: number) => Observable<LoadSurvivorsModel[]>
}
