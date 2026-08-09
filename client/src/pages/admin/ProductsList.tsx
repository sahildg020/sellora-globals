import React, { useEffect, useState } from 'react'
import API from '../../api'
import { useToast } from '../../components/ToastContext'

export default function ProductsList(){
  const [products,setProducts]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  const toast = useToast()

  useEffect(()=>{
    const t = localStorage.getItem('admin_token')
    if(t) API.defaults.headers.common['Authorization'] = `Bearer ${t}`
    API.get('/products').then(r=>setProducts(r.data)).catch(()=>{}).finally(()=>setLoading(false))
  },[])

  async function remove(id:string){
    if(!confirm('Delete product?')) return
    try{ await API.delete(`/products/${id}`); setProducts(products.filter(p=>p._id!==id)); toast.showToast('Deleted','success') }catch(e:any){ toast.showToast(e?.response?.data?.message || 'Delete failed','error') }
  }

  return (
    <div style={{padding:20}}>
      <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
        <h2>Products</h2>
        <a href="/admin/products/new"><button className="btn">Create Product</button></a>
      </div>
      {loading ? <p>Loading...</p> : (
        <div className="grid" style={{marginTop:12}}>
          {products.map(p=> (
            <div key={p._id} className="card">
              <img src={p.images?.[0]||'/placeholder.svg'} style={{width:'100%',height:140,objectFit:'cover',borderRadius:6}}/>
              <h4>{p.name} {p.featured && <span style={{color:'#ff7a00',fontSize:12}}>★ Featured</span>}</h4>
              <div style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                <div style={{fontSize:13,color:'#6b7280'}}>{p.category}</div>
                <div style={{display:'flex',gap:8}}>
                  <a href={`/admin/products/${p._id}`}><button> Edit </button></a>
                  <button onClick={()=>remove(p._id)}>Delete</button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  )
}
