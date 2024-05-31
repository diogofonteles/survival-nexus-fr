import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  RemoteLoadSurvivors,
  RemoteLoadSurvivorsModel,
} from '@/data/usecases/remote-load-survivors'
import { of, throwError } from 'rxjs'

interface HttpResponse<T> {
  statusCode: HttpStatusCode
  body?: T
}

describe('RemoteLoadSurvivors', () => {
  let url: string
  let httpClientSpy: jest.Mocked<HttpClient<RemoteLoadSurvivorsModel[]>>
  let remoteLoadSurvivors: RemoteLoadSurvivors

  beforeEach(() => {
    url = 'any_url'
    httpClientSpy = {
      request: jest.fn(),
    }
    remoteLoadSurvivors = new RemoteLoadSurvivors(url, httpClientSpy)
  })

  test('should call HttpClient with correct URL and method', () => {
    httpClientSpy.request.mockReturnValueOnce(
      of({
        statusCode: HttpStatusCode.ok200,
        body: [] as RemoteLoadSurvivorsModel[],
      }),
    )

    remoteLoadSurvivors.load(1).subscribe()

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      url: `${url}?page=1`,
      method: 'get',
    })
  })

  test('should return a list of LoadSurvivorsModel if HttpClient returns 200', (done) => {
    const httpResult: HttpResponse<RemoteLoadSurvivorsModel[]> = {
      statusCode: HttpStatusCode.ok200,
    }
    httpClientSpy.request.mockReturnValueOnce(of(httpResult))

    remoteLoadSurvivors.load(1).subscribe((result) => {
      expect(result).toEqual(httpResult.body)
      done()
    })
  })

  test('should throw an error if HttpClient returns 401', (done) => {
    httpClientSpy.request.mockReturnValueOnce(
      of({
        statusCode: HttpStatusCode.unauthorized,
      }),
    )

    remoteLoadSurvivors.load(1).subscribe({
      error: (error) => {
        expect(error).toEqual(new Error('Unauthorized'))
        done()
      },
    })
  })

  test('should throw an error if HttpClient returns an unexpected status code', (done) => {
    httpClientSpy.request.mockReturnValueOnce(
      of({
        statusCode: HttpStatusCode.badRequest,
      }),
    )

    remoteLoadSurvivors.load(1).subscribe({
      error: (error) => {
        expect(error).toEqual(new Error('Unexpected error'))
        done()
      },
    })
  })

  test('should log and throw error on catchError', (done) => {
    const consoleErrorSpy = jest
      .spyOn(console, 'error')
      .mockImplementation(() => {})
    const error = new Error('any_error')
    httpClientSpy.request.mockReturnValueOnce(throwError(() => error))

    remoteLoadSurvivors.load(1).subscribe({
      error: (err) => {
        expect(consoleErrorSpy).toHaveBeenCalledWith(
          'Unexpected error: ',
          error,
        )
        expect(err).toBe(error)
        consoleErrorSpy.mockRestore()
        done()
      },
    })
  })
})
