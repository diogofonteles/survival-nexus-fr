'use client'

import { useState } from 'react'
import Image from 'next/image'
import './signin.css'
import icon from '@/app/icon.png'
import ModalAddSurvivor from '@/presentation/components/modal-add-survivor/modal-add-survivor'
import { Authentication } from '@/domain/usecases/authentication'
import { makeRemoteAuthentication } from '@/main/factories/usecases/remote-authentication-factory'
// import { Validation } from '@/presentation/protocols'

export default function Signin() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const authentication: Authentication = makeRemoteAuthentication()

  const handleSignin = (e: React.FormEvent) => {
    e.preventDefault()
    authentication.auth({ email, password })
    console.log('Email:', email, 'Password:', password)
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
            <input
              type="email"
              id="email"
              name="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
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
