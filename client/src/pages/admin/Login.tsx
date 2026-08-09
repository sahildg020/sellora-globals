import React, { useState } from 'react'
import API, { setAuthToken } from '../../api'
import { useToast } from '../../components/ToastContext'

export default function Login(){
  const [email,setEmail]=useState('')
  const [password,setPassword]=useState('')
  const [loading,setLoading]=useState(false)
  const toast = useToast()
  async function submit(e:React.FormEvent){
    e.preventDefault()
    setLoading(true)
    try{
      const res = await API.post('/auth/login',{ email, password })
      const token = res.data.token
      setAuthToken(token)
      localStorage.setItem('admin_token', token)
      toast.showToast('Logged in', 'success')
      window.location.href = '/admin'
    }catch(err:any){
      toast.showToast(err?.response?.data?.message || 'Login failed','error')
    }finally{setLoading(false)}
  }
  return (
    <div style={{padding:20}}>
      <h2>Admin Login</h2>
      <form onSubmit={submit} style={{maxWidth:420}}>
        <div>
          <label>Email</label><br/>
          <input value={email} onChange={e=>setEmail(e.target.value)} />
        </div>
        <div>
          <label>Password</label><br/>
          <input type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        </div>
        <button className="btn" type="submit" disabled={loading}>{loading? 'Signing...' : 'Login'}</button>
      </form>
    </div>
  )
}
