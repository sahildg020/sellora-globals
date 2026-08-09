import React, { useEffect, useState } from 'react'
import API from '../api'
import { Link } from 'react-router-dom'

export default function Products(){
  const [products, setProducts] = useState<any[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(()=>{
    API.get('/products').then(r=>setProducts(r.data)).catch(()=>{}).finally(()=>setLoading(false))
  },[])

  return (
    <div className="container" style={{padding:20}}>
      <h2>Products</h2>
      {loading ? <p>Loading...</p> : (
        <div className="grid" style={{marginTop:12}}>
          {products.map(p=> (
            <div key={p._id} className="product-card card">
              <img src={p.images?.[0] || '/placeholder.png'} alt={p.name} />
              <h4>{p.name}</h4>
              <p style={{color:'#6b7280'}}>{p.shortDescription}</p>
              <div style={{display:'flex',justifyContent:'space-between',marginTop:10}}>
                <Link to={`/products/${p.slug}`}><button className="btn">Request Quote</button></Link>
                <div style={{fontSize:13,color:'#6b7280'}}>{p.category}</div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  )
}
