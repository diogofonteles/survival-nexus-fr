import ListSurvivors from '@/presentation/components/list-survivors/list-survivors'
import { ReactNode } from 'react'

export default function ListSurvivorsPage({
  children,
}: {
  children: ReactNode
}) {
  return (
    <div>
      <ListSurvivors />
      {children}
    </div>
  )
}
