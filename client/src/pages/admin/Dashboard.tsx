import React, { useEffect, useState } from 'react'
import API, { setAuthToken } from '../../api'
import { useToast } from '../../components/ToastContext'

export default function Dashboard(){
  const [stats,setStats]=useState<any>(null)
  const [tokenChecked,setTokenChecked]=useState(false)
  const toast = useToast()

  useEffect(()=>{
    const t = localStorage.getItem('admin_token')
    if(t){ setAuthToken(t) }
    setTokenChecked(true)
  },[])

  useEffect(()=>{ if(!tokenChecked) return; API.get('/admin/stats').then(r=>setStats(r.data)).catch(e=>{ toast.showToast('Unauthorized or server error','error') }) },[tokenChecked])

  function logout(){ setAuthToken(undefined); localStorage.removeItem('admin_token'); window.location.href = '/admin/login' }

  return (
    <div style={{padding:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Admin Dashboard</h2>
        <div><button onClick={logout}>Logout</button></div>
      </div>

      {!stats ? <p>Loading...</p> : (
        <div style={{display:'grid',gridTemplateColumns:'repeat(4,1fr)',gap:12,marginTop:12}}>
          <div className="card">Total Products: <strong>{stats.totalProducts}</strong></div>
          <div className="card">Featured Products: <strong>{stats.featuredProducts}</strong></div>
          <div className="card">Total Enquiries: <strong>{stats.totalEnquiries}</strong></div>
          <div className="card">New Enquiries: <strong>{stats.newEnquiries}</strong></div>
        </div>
      )}

      <div style={{marginTop:20}}>
        <h3>Manage</h3>
        <div style={{display:'flex',gap:8}}>
          <a href="/admin/products">Products</a>
          <a href="/admin/enquiries">Enquiries</a>
          <a href="/admin/gallery">Gallery</a>
        </div>
      </div>
    </div>
  )
}
