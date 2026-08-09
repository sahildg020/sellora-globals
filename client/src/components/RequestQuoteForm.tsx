import React, { useEffect, useState } from 'react'
import API from '../api'
import { useToast } from '../components/ToastContext'

export default function RequestQuoteForm({ presetProduct }: { presetProduct?: any }){
  const [fullName,setFullName]=useState('')
  const [company,setCompany]=useState('')
  const [email,setEmail]=useState('')
  const [phone,setPhone]=useState('')
  const [country,setCountry]=useState('')
  const [product,setProduct]=useState(presetProduct?.name || '')
  const [quantity,setQuantity]=useState('')
  const [message,setMessage]=useState('')
  const [loading,setLoading]=useState(false)
  const toast = useToast()

  React.useEffect(()=>{ if(presetProduct) setProduct(presetProduct.name) },[presetProduct])

  async function submit(e:any){
    e.preventDefault()
    setLoading(true)
    try{
      await API.post('/enquiries',{ fullName, companyName:company, email, phone, country, productName:product, productId: presetProduct?._id, quantity, message })
      toast.showToast('Enquiry submitted — we will contact you soon','success')
      setFullName('');setCompany('');setEmail('');setPhone('');setCountry('');setQuantity('');setMessage('')
    }catch(err:any){
      console.error(err)
      toast.showToast(err?.response?.data?.message || 'Submission failed','error')
    }finally{setLoading(false)}
  }

  return (
    <form onSubmit={submit}>
      <h3>Request a Quote</h3>
      <div>
        <label>Full Name *</label><br/>
        <input required value={fullName} onChange={e=>setFullName(e.target.value)} />
      </div>
      <div>
        <label>Company Name</label><br/>
        <input value={company} onChange={e=>setCompany(e.target.value)} />
      </div>
      <div>
        <label>Email *</label><br/>
        <input required type="email" value={email} onChange={e=>setEmail(e.target.value)} />
      </div>
      <div>
        <label>Phone</label><br/>
        <input value={phone} onChange={e=>setPhone(e.target.value)} />
      </div>
      <div>
        <label>Country *</label><br/>
        <input required value={country} onChange={e=>setCountry(e.target.value)} />
      </div>
      <div>
        <label>Product</label><br/>
        <input value={product} onChange={e=>setProduct(e.target.value)} />
      </div>
      <div>
        <label>Quantity</label><br/>
        <input value={quantity} onChange={e=>setQuantity(e.target.value)} />
      </div>
      <div>
        <label>Message *</label><br/>
        <textarea required value={message} onChange={e=>setMessage(e.target.value)} />
      </div>
      <div style={{marginTop:10}}>
        <button className="btn" type="submit" disabled={loading}>{loading? 'Sending...' : 'Submit Enquiry'}</button>
      </div>
    </form>
  )
}
