import React, { useEffect, useState } from 'react'
import API from '../api'

export default function AdminDashboard(){
  const [products,setProducts]=useState([] as any[])
  useEffect(()=>{ API.get('/products').then(r=>setProducts(r.data)) },[])
  return (
    <div style={{padding:20}}>
      <h2>Admin Dashboard</h2>
      <p>Products</p>
      <ul>
        {products.map(p=> <li key={p._id}>{p.title}</li>)}
      </ul>
    </div>
  )
}
