import Report from '@/presentation/components/report/report'
import { ReactNode } from 'react'

export default function ReportPage({ children }: { children: ReactNode }) {
  return (
    <div>
      <Report />
      {children}
    </div>
  )
}
