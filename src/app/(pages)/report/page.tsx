'use client'

import Report from '@/presentation/components/report/report'
import { PrivateRoute } from '@/main/proxies'
import { ReactNode } from 'react'

export default function ReportPage({ children }: { children: ReactNode }) {
  return (
    <PrivateRoute>
      <div>
        <Report />
        {children}
      </div>
    </PrivateRoute>
  )
}
