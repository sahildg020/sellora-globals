import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import API from '../api'
import RequestQuoteForm from '../components/RequestQuoteForm'

export default function ProductDetail(){
  const { slug } = useParams()
  const [product, setProduct] = useState<any>(null)
  useEffect(()=>{
    if(!slug) return
    API.get(`/products/slug/${slug}`).then(r=>setProduct(r.data)).catch(()=>{})
  },[slug])

  return (
    <div className="container" style={{padding:20}}>
      {!product ? <p>Loading...</p> : (
        <div style={{display:'grid',gridTemplateColumns:'1fr 380px',gap:20}}>
          <div>
            <img src={product.images?.[0] || '/placeholder.png'} style={{width:'100%',borderRadius:8}}/>
            <h2>{product.name}</h2>
            <p style={{color:'#6b7280'}}>{product.shortDescription}</p>
            <h4>Features</h4>
            <ul>{(product.features||[]).map((f:any,i:number)=><li key={i}>{f}</li>)}</ul>
            <h4>Specifications</h4>
            <pre style={{whiteSpace:'pre-wrap'}}>{product.specifications}</pre>
          </div>
          <aside className="card">
            <RequestQuoteForm presetProduct={product} />
          </aside>
        </div>
      )}
    </div>
  )
}
