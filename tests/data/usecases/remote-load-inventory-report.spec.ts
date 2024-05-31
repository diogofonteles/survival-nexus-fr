import { HttpClient, HttpStatusCode } from '@/data/protocols/http'
import {
  RemoteLoadInventoryReport,
  RemoteLoadInventoryReportModel,
} from '@/data/usecases/remote-load-inventory-report'
import { of, throwError } from 'rxjs'

interface HttpResponse<T> {
  statusCode: HttpStatusCode
  body?: T
}

describe('RemoteLoadInventoryReport', () => {
  let url: string
  let httpClientSpy: jest.Mocked<HttpClient<RemoteLoadInventoryReportModel>>
  let remoteLoadInventoryReport: RemoteLoadInventoryReport

  beforeEach(() => {
    url = 'any_url'
    httpClientSpy = {
      request: jest.fn(),
    }
    remoteLoadInventoryReport = new RemoteLoadInventoryReport(
      url,
      httpClientSpy,
    )
  })

  test('should call HttpClient with correct URL and method', () => {
    httpClientSpy.request.mockReturnValueOnce(
      of({
        statusCode: HttpStatusCode.ok200,
        body: {} as RemoteLoadInventoryReportModel,
      }),
    )

    remoteLoadInventoryReport.load().subscribe()

    expect(httpClientSpy.request).toHaveBeenCalledWith({
      url,
      method: 'get',
    })
  })

  test('should return a LoadInventoryReportModel if HttpClient returns 200', (done) => {
    const httpResult: HttpResponse<RemoteLoadInventoryReportModel> = {
      statusCode: HttpStatusCode.ok200,
    }
    httpClientSpy.request.mockReturnValueOnce(of(httpResult))

    remoteLoadInventoryReport.load().subscribe((result) => {
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

    remoteLoadInventoryReport.load().subscribe({
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

    remoteLoadInventoryReport.load().subscribe({
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

    remoteLoadInventoryReport.load().subscribe({
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
