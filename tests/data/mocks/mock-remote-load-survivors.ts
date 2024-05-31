import { RemoteLoadSurvivorsModel } from '@/data/usecases/remote-load-survivors'

import { faker } from '@faker-js/faker'

export const mockRemoteLoadSurvivors = (): RemoteLoadSurvivorsModel => ({
  props: {
    name: faker.person.fullName(),
    email: faker.internet.email(),
    password: faker.internet.password(),
    age: faker.number.int({ min: 1, max: 100 }),
    gender: faker.helpers.arrayElement(['male', 'female']),
    lastLocation: {
      latitude: faker.location.latitude(),
      longitude: faker.location.longitude(),
    },
    infected: faker.datatype.boolean(),
    createdAt: faker.date.recent().toISOString(),
  },
  _id: {
    value: faker.datatype.uuid(),
  },
})

export const mockRemoteSurvivorsModel = (): RemoteLoadSurvivorsModel[] => [
  mockRemoteLoadSurvivors(),
  mockRemoteLoadSurvivors(),
  mockRemoteLoadSurvivors(),
]
