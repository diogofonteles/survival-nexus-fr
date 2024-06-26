import { signinState } from './atoms'
import { SubmitButtonBase } from '@/presentation/components'

import { useRecoilValue } from 'recoil'
import React from 'react'

type Props = {
  text: string
}

const SubmitButton: React.FC<Props> = ({ text }: Props) => {
  const state = useRecoilValue(signinState)
  return <SubmitButtonBase text={text} state={state} />
}

export default SubmitButton
