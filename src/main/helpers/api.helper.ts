import { enviroment } from '@/enviroments/enviroment'

interface ObjectApp {
  [key: string]: never
}

export class ApiHelper {
  public static GetAbsolutePath(relativePath: string): string {
    const baseUrl = enviroment.NEXT_PUBLIC_API_BASE_URL

    if (relativePath === null) return baseUrl
    if (!relativePath.startsWith('/') && !baseUrl.endsWith('/')) {
      relativePath = `/${relativePath}`
    } else if (relativePath.startsWith('/') && baseUrl.endsWith('/')) {
      relativePath = relativePath.substring(1, relativePath.length)
    }

    return `${baseUrl}${relativePath}`
  }

  public static removeAttribute(object: ObjectApp, attribute: string): void {
    delete object[attribute]
  }
}
