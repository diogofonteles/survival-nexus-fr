import { RemoteLoadSurvivors } from '@/data/usecases/remote-load-survivors'
import { LoadSurvivors } from '@/domain/usecases/load-survivors'
import { ApiHelper } from '@/main/helpers/api.helper'
import { makeAuthorizeHttpClientDecorator } from '../decorators'

export const makeRemoteLoadSurvivors = (): LoadSurvivors =>
  new RemoteLoadSurvivors(
    ApiHelper.GetAbsolutePath('/survivors/list'),
    makeAuthorizeHttpClientDecorator(),
  )
