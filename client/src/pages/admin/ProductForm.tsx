import React, { useEffect, useState } from 'react'
import API from '../../api'
import { useNavigate, useParams } from 'react-router-dom'

export default function ProductForm(){
  const { id } = useParams()
  const navigate = useNavigate()
  const [loading,setLoading]=useState(false)
  const [name,setName]=useState('')
  const [slug,setSlug]=useState('')
  const [category,setCategory]=useState('Kitchen Products')
  const [shortDescription,setShortDescription]=useState('')
  const [description,setDescription]=useState('')
  const [features,setFeatures]=useState('')
  const [specifications,setSpecifications]=useState('')
  const [featured,setFeatured]=useState(false)
  const [available,setAvailable]=useState(true)
  const [files,setFiles]=useState<FileList | null>(null)

  useEffect(()=>{
    const t = localStorage.getItem('admin_token')
    if(t) API.defaults.headers.common['Authorization'] = `Bearer ${t}`
    if(id && id!=='new'){
      API.get(`/products`).then(r=>{ const p = r.data.find((x:any)=>x._id===id); if(p){ setName(p.name); setSlug(p.slug); setCategory(p.category); setShortDescription(p.shortDescription||''); setDescription(p.description||''); setFeatures(JSON.stringify(p.features||[])); setSpecifications(p.specifications||''); setFeatured(!!p.featured); setAvailable(!!p.available); } })
    }
  },[id])

  useEffect(()=>{ setSlug(name.toLowerCase().replace(/[^a-z0-9]+/g,'-').replace(/(^-|-$)/g,'')) },[name])

  async function submit(e:any){
    e.preventDefault(); setLoading(true)
    try{
      const fd = new FormData()
      fd.append('name', name)
      fd.append('slug', slug)
      fd.append('category', category)
      fd.append('shortDescription', shortDescription)
      fd.append('description', description)
      fd.append('features', features)
      fd.append('specifications', specifications)
      fd.append('featured', String(featured))
      fd.append('available', String(available))
      if(files){ for(const f of Array.from(files)){ fd.append('images', f) } }
      if(id && id!=='new'){
        await API.put(`/products/${id}`, fd, { headers: {'Content-Type':'multipart/form-data'} })
      }else{
        await API.post('/products', fd, { headers: {'Content-Type':'multipart/form-data'} })
      }
      alert('Saved')
      navigate('/admin/products')
    }catch(err:any){ console.error(err); alert(err?.response?.data?.message || 'Save failed') }
    finally{ setLoading(false) }
  }

  return (
    <div style={{padding:20}}>
      <h2>{id && id!=='new' ? 'Edit Product' : 'Create Product'}</h2>
      <form onSubmit={submit} style={{maxWidth:800}}>
        <div>
          <label>Name</label><br/>
          <input required value={name} onChange={e=>setName(e.target.value)} />
        </div>
        <div>
          <label>Slug</label><br/>
          <input required value={slug} onChange={e=>setSlug(e.target.value)} />
        </div>
        <div>
          <label>Category</label><br/>
          <select value={category} onChange={e=>setCategory(e.target.value)}>
            <option>Kitchen Products</option>
            <option>Mobile Holders & Accessories</option>
            <option>Car Accessories</option>
            <option>Home Utility Products</option>
            <option>Lifestyle Products</option>
          </select>
        </div>
        <div>
          <label>Short Description</label><br/>
          <input value={shortDescription} onChange={e=>setShortDescription(e.target.value)} />
        </div>
        <div>
          <label>Description</label><br/>
          <textarea value={description} onChange={e=>setDescription(e.target.value)} />
        </div>
        <div>
          <label>Features (JSON array, e.g. ["Feature 1","Feature 2"])</label><br/>
          <textarea value={features} onChange={e=>setFeatures(e.target.value)} />
        </div>
        <div>
          <label>Specifications</label><br/>
          <textarea value={specifications} onChange={e=>setSpecifications(e.target.value)} />
        </div>
        <div>
          <label>Images</label><br/>
          <input type="file" multiple onChange={e=>setFiles(e.target.files)} />
        </div>
        <div style={{marginTop:8}}>
          <label><input type="checkbox" checked={featured} onChange={e=>setFeatured(e.target.checked)} /> Featured</label>
          <label style={{marginLeft:12}}><input type="checkbox" checked={available} onChange={e=>setAvailable(e.target.checked)} /> Available</label>
        </div>
        <div style={{marginTop:12}}>
          <button className="btn" type="submit" disabled={loading}>{loading? 'Saving...' : 'Save'}</button>
        </div>
      </form>
    </div>
  )
}
