import React from 'react'
import './LoginBtn.scss'
import { signInWithPopup } from 'firebase/auth'
import { auth, provider } from '../../../api/firebase'

const LoginBtn = () => {

  const signInWithGoogle = () => {
    signInWithPopup(auth, provider)
  }

  return (
    <div className="align-self-center d-none d-sm-block text-white">
      <p onClick={signInWithGoogle}>Login</p>
    </div>
  )
}

export default LoginBtn