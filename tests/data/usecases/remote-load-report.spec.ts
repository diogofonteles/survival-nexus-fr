import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  RemoteLoadReport,
  RemoteLoadReportModel,
} from '@/data/usecases/remote-load-report'
import { of, throwError } from 'rxjs'

interface HttpResponse<T> {
  statusCode: HttpStatusCode
  body?: T
}

describe('RemoteLoadReport', () => {
  let url: string
  let httpClientSpy: jest.Mocked<HttpClient<RemoteLoadReportModel>>
  let remoteLoadReport: RemoteLoadReport

  beforeEach(() => {
    url = 'any_url'
    httpClientSpy = {
      request: jest.fn(),
    }
    remoteLoadReport = new RemoteLoadReport(url, httpClientSpy)
  })

  test('should call HttpClient with correct URL and method', () => {
    httpClientSpy.request.mockReturnValueOnce(
      of({
        statusCode: HttpStatusCode.ok200,
        body: {} as RemoteLoadReportModel,
      }),
    )

    remoteLoadReport.load().subscribe()

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      url,
      method: 'get',
    })
  })

  test('should return a LoadReportModel if HttpClient returns 200', (done) => {
    const httpResult: HttpResponse<RemoteLoadReportModel> = {
      statusCode: HttpStatusCode.ok200,
    }
    httpClientSpy.request.mockReturnValueOnce(of(httpResult))

    remoteLoadReport.load().subscribe((result) => {
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

    remoteLoadReport.load().subscribe({
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

    remoteLoadReport.load().subscribe({
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

    remoteLoadReport.load().subscribe({
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
