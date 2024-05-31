import ListInventories from '@/presentation/components/list-inventories/list-inventories'
import { ReactNode } from 'react'
import { PrivateRoute } from '@/main/proxies'

export function ListInventoriesPage({ children }: { children: ReactNode }) {
  return (
    <PrivateRoute>
      <div>
        <ListInventories />
        {children}
      </div>
    </PrivateRoute>
  )
}
