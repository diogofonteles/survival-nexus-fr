import { RemoteAuthentication } from '@/data/usecases/remote-authentication'
import { Authentication } from '@/domain/usecases/authentication'
import { makeAxiosHttpClient } from '@/main/factories/http/axios-http-client-factory'
import { ApiHelper } from '@/main/helpers/api.helper'

export const makeRemoteAuthentication = (): Authentication =>
  new RemoteAuthentication(
    ApiHelper.GetAbsolutePath('/signin'),
    makeAxiosHttpClient(),
  )
