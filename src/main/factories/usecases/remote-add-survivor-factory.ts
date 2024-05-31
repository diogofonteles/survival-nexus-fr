import { RemoteAddSurvivor } from '@/data/usecases/remote-add-survivor'
import { AddSurvivor } from '@/domain/usecases/add-survivor'
import { ApiHelper } from '@/main/helpers/api.helper'
import { makeAuthorizeHttpClientDecorator } from '../decorators'

export const makeRemoteAddSurvivor = (): AddSurvivor =>
  new RemoteAddSurvivor(
    ApiHelper.GetAbsolutePath('/survivors'),
    makeAuthorizeHttpClientDecorator(),
  )
