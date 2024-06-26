import './input-styles.css'

import React, { useRef, RefObject } from 'react'

type Props = React.DetailedHTMLProps<
  React.InputHTMLAttributes<HTMLInputElement>,
  HTMLInputElement
> & {
  state: any
  setState: any
}

const Input: React.FC<Props> = ({ state, setState, ...props }: Props) => {
  const inputRef: RefObject<HTMLInputElement> = useRef(null)
  const error = state[`${props.name}Error`]
  return (
    <div
      data-testid={`${props.name}-wrap`}
      className={'inputWrap'}
      data-status={error ? 'invalid' : 'valid'}
    >
      <input
        {...props}
        ref={inputRef}
        title={error}
        placeholder=" "
        data-testid={props.name}
        readOnly
        onFocus={(e) => {
          e.target.readOnly = false
        }}
        onChange={(e) => {
          setState({ ...state, [e.target.name]: e.target.value })
        }}
      />
      <label
        data-testid={`${props.name}-label`}
        onClick={() => {
          inputRef.current?.focus()
        }}
        title={error}
      >
        {props.placeholder}
      </label>
    </div>
  )
}

export default Input
