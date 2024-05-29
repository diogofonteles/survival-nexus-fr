import Signin from '@/presentation/components/signin/signin'
import { ReactNode } from 'react'

export default function SigninPage({ children }: { children: ReactNode }) {
  return (
    <div>
      <Signin />
      {children}
    </div>
  )
}
