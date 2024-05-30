import { signinState } from './atoms'
import { InputBase } from '@/presentation/components'

import { useRecoilState } from 'recoil'
import React from 'react'

type Props = {
  type: string
  name: string
}

const Input: React.FC<Props> = ({ type, name }: Props) => {
  const [state, setState] = useRecoilState(signinState)
  return <InputBase type={type} name={name} state={state} setState={setState} />
}

export default Input
