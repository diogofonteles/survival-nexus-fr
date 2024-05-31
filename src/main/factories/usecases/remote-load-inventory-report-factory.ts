import { LoadInventoryReport } from '@/domain/usecases/load-inventory-report'
import { ApiHelper } from '@/main/helpers/api.helper'
import { makeAuthorizeHttpClientDecorator } from '../decorators'
import { RemoteLoadInventoryReport } from '@/data/usecases/remote-load-inventory-report'

export const makeRemoteLoadInventoryReport = (): LoadInventoryReport =>
  new RemoteLoadInventoryReport(
    ApiHelper.GetAbsolutePath('/inventory/report'),
    makeAuthorizeHttpClientDecorator(),
  )
