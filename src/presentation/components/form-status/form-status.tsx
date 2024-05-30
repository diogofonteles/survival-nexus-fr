import './form-status-styles.css'
import Spinner from '@/presentation/components/spinner/spinner'
import React from 'react'

type Props = {
  state: any
}

const FormStatus: React.FC<Props> = ({ state }: Props) => {
  const { isLoading, mainError } = state
  return (
    <div data-testid="error-wrap" className={'errorWrap'}>
      {isLoading && <Spinner className={'spinner'} />}
      {mainError && (
        <span data-testid="main-error" className={'error'}>
          {mainError}
        </span>
      )}
    </div>
  )
}

export default FormStatus
