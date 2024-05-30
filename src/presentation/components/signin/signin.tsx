'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import './signin.css'
import icon from '@/app/icon.png'
import ModalAddSurvivor from '@/presentation/components/modal-add-survivor/modal-add-survivor'
import { Authentication } from '@/domain/usecases/authentication'
import { makeRemoteAuthentication } from '@/main/factories/usecases/remote-authentication-factory'
import { useRecoilState, useRecoilValue, useResetRecoilState } from 'recoil'
import { signinState } from './components/atoms'
import { currentAccountState } from '../atoms/atoms'
import { useRouter } from 'next/navigation'
import { Validation } from '@/presentation/protocols'
import { makeLoginValidation } from '@/main/factories/validation'
import { Input } from './components'

export default function Signin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const { setCurrentAccount } = useRecoilValue(currentAccountState)
  const [state, setState] = useRecoilState(signinState)
  const authentication: Authentication = makeRemoteAuthentication()
  const validation: Validation = makeLoginValidation()
  const router = useRouter()
  const resetLoginState = useResetRecoilState(signinState)

  useEffect(() => resetLoginState(), [])
  useEffect(() => validate('email'), [state.email])
  useEffect(() => validate('password'), [state.password])

  const validate = (field: string): void => {
    const { email, password } = state
    const formData = { email, password }
    setState((old) => ({
      ...old,
      [`${field}Error`]: validation.validate(field, formData),
    }))
    setState((old) => ({
      ...old,
      isFormInvalid: !!old.emailError || !!old.passwordError,
    }))
  }

  const handleSignin = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      if (state.isLoading || state.isFormInvalid) {
        return
      }
      console.log(state)
      setState((old) => ({ ...old, isLoading: true }))
      console.log(state)
      const account = await authentication.auth({
        email: state.email,
        password: state.password,
      })
      console.log('account', account)
      setCurrentAccount(account)
      router.push('report')
    } catch (error: any) {
      setState((old) => ({
        ...old,
        isLoading: false,
        mainError: error.message,
      }))
    }
  }

  return (
    <div className="signin-container">
      <div className="signin-form-container">
        <div className="signin-header">
          <Image src={icon} alt="Icon" width={60} height={60} />
          <h1>Survival Nexus</h1>
        </div>
        <h2>Signin</h2>
        <form onSubmit={handleSignin}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <Input type="email" name="email"></Input>
            {/* <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            /> */}
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <Input type="password" name="password"></Input>
          </div>
          <div className="signin-actions">
            <button type="submit" className="signin-button">
              Signin
            </button>
          </div>
        </form>
        <p className="signup-link">
          Dont have an account?{' '}
          <span onClick={() => setIsModalOpen(true)}>
            Click here to sign up
          </span>
        </p>
      </div>
      <ModalAddSurvivor
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  )
}
