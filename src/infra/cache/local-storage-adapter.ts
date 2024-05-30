import { SetStorage, GetStorage } from '@/data/protocols/cache'

export class LocalStorageAdapter implements SetStorage, GetStorage {
  set(key: string, value: object): void {
    if (typeof window !== 'undefined') {
      if (value) {
        localStorage.setItem(key, JSON.stringify(value))
      } else {
        localStorage.removeItem(key)
      }
    }
  }

  get<T>(key: string): T | null {
    if (typeof window !== 'undefined') {
      const data = localStorage.getItem(key)
      if (data) {
        return JSON.parse(data)
      }
    }
    return null
  }
}
