import ListInventories from '@/presentation/components/list-inventories/list-inventories'
import { ReactNode } from 'react'

export default function ListInventoriesPage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div>
      <ListInventories />
      {children}
    </div>
  )
}
