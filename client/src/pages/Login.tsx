import React, { useState } from 'react'
import API, { setAuthToken } from '../api'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  async function submit(e:React.FormEvent){
    e.preventDefault()
    const res = await API.post('/auth/login',{ email, password })
    const token = res.data.token
    setAuthToken(token)
    localStorage.setItem('token', token)
    alert('Logged in')
    window.location.href = '/admin'
  }
  return (
    <div style={{padding:20}}>
      <h2>Admin Login</h2>
      <form onSubmit={submit}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button type="submit">Login</button>
      </form>
    </div>
  )
}
