import { RemoteLoadReportModel } from '@/data/usecases/remote-load-report'

import { faker } from '@faker-js/faker'

export const mockRemoteLoadReport = (): RemoteLoadReportModel => ({
  props: {
    totalHealthy: faker.number.int({ min: 0, max: 100 }),
    totalInfected: faker.number.int({ min: 0, max: 100 }),
    totalSurvivors: faker.number.int({ min: 0, max: 100 }),
    percentHealthy: faker.number.float({ min: 0, max: 100 }),
    percentInfected: faker.number.float({ min: 0, max: 100 }),
  },
})

export const mockRemoteReportModel = (): RemoteLoadReportModel[] => [
  mockRemoteLoadReport(),
  mockRemoteLoadReport(),
  mockRemoteLoadReport(),
]
