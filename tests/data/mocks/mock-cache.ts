import { GetStorage } from '@/data/protocols/cache'

import { faker } from '@faker-js/faker'

export class GetStorageSpy implements GetStorage {
  key: string | undefined
  value: never = faker.helpers.objectValue({})

  get(key: string): never {
    this.key = key
    return this.value
  }
}
