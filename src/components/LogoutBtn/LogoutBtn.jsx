import React from 'react'
import './LogoutBtn.scss'
import { auth } from '../../../api/firebase'

const LogoutBtn = () => {

  const signOutWithGoogle = () => {
    auth.signOut()
  }

  return (
    <div className="align-self-center d-none d-sm-block text-white">
      <p onClick={signOutWithGoogle}>Logout</p>
    </div>
  )
}

export default LogoutBtn