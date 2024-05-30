'use client'

import { useRouter } from 'next/navigation'
import { useRecoilValue } from 'recoil'
import React, { useEffect } from 'react'
import { currentAccountState } from '@/presentation/components/atoms/atoms'

const PrivateRoute: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const { getCurrentAccount } = useRecoilValue(currentAccountState)
  const router = useRouter()

  useEffect(() => {
    if (!getCurrentAccount()?.access_token) {
      router.push('/')
    }
  }, [getCurrentAccount, router])

  if (!getCurrentAccount()?.access_token) {
    return null
  }

  return <>{children}</>
}

export default PrivateRoute
