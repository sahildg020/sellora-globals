import React, { useEffect, useState } from 'react'
import API from '../../api'

export default function Gallery(){
  const [items,setItems]=useState<any[]>([])
  const [file,setFile]=useState<File | null>(null)
  const [caption,setCaption]=useState('')

  useEffect(()=>{ const t = localStorage.getItem('admin_token'); if(t) API.defaults.headers.common['Authorization'] = `Bearer ${t}`; fetch() },[])

  async function fetch(){ try{ const r = await API.get('/gallery'); setItems(r.data) }catch(e){ console.error(e) } }

  async function upload(e:any){ e.preventDefault(); if(!file) return alert('Select file')
    const fd = new FormData(); fd.append('file', file); fd.append('caption', caption)
    try{ await API.post('/gallery', fd, { headers: {'Content-Type':'multipart/form-data'} }); setCaption(''); setFile(null); fetch(); alert('Uploaded') }catch(err:any){ alert(err?.response?.data?.message || 'Upload failed') }
  }

  async function remove(id:string){ if(!confirm('Delete image?')) return; try{ await API.delete(`/gallery/${id}`); setItems(items.filter(i=>i._id!==id)); alert('Deleted') }catch(e:any){ alert(e?.response?.data?.message || 'Delete failed') } }

  return (
    <div style={{padding:20}}>
      <h2>Gallery</h2>
      <form onSubmit={upload} style={{display:'flex',gap:8,alignItems:'center',marginBottom:12}}>
        <input type="file" onChange={e=>setFile(e.target.files?.[0]||null)} />
        <input placeholder="Caption" value={caption} onChange={e=>setCaption(e.target.value)} />
        <button className="btn" type="submit">Upload</button>
      </form>
      <div className="grid">
        {items.map(i=> (
          <div key={i._id} className="card">
            <img src={i.url} style={{width:'100%',height:160,objectFit:'cover',borderRadius:6}}/>
            <div style={{display:'flex',justifyContent:'space-between',alignItems:'center',marginTop:8}}>
              <div style={{fontSize:13}}>{i.caption}</div>
              <div><button onClick={()=>remove(i._id)}>Delete</button></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
