import ListSurvivors from '@/presentation/components/list-survivors/list-survivors'
import { ReactNode } from 'react'
import { PrivateRoute } from '@/main/proxies'

export default function ListSurvivorsPage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <PrivateRoute>
      <div>
        <ListSurvivors />
        {children}
      </div>
    </PrivateRoute>
  )
}
