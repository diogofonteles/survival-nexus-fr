import { RemoteLoadReport } from '@/data/usecases/remote-load-report'
import { LoadReport } from '@/domain/usecases/load-report'
import { ApiHelper } from '@/main/helpers/api.helper'
import { makeAuthorizeHttpClientDecorator } from '../decorators'

export const makeRemoteLoadReport = (): LoadReport =>
  new RemoteLoadReport(
    ApiHelper.GetAbsolutePath('/survivors/report'),
    makeAuthorizeHttpClientDecorator(),
  )
