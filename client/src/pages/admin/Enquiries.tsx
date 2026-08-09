import React, { useEffect, useState } from 'react'
import API from '../../api'
import { useToast } from '../../components/ToastContext'

export default function Enquiries(){
  const [list,setList]=useState<any[]>([])
  const [loading,setLoading]=useState(true)
  const [search,setSearch]=useState('')
  const toast = useToast()

  useEffect(()=>{
    const t = localStorage.getItem('admin_token')
    if(t) API.defaults.headers.common['Authorization'] = `Bearer ${t}`
    fetchData()
  },[])

  async function fetchData(){ setLoading(true); try{ const r = await API.get('/enquiries'); setList(r.data) }catch(e:any){ toast.showToast('Failed to load enquiries','error') } finally{ setLoading(false) } }

  async function changeStatus(id:string, status:string){ try{ await API.put(`/enquiries/${id}/status`, { status }); setList(list.map(l=> l._id===id ? { ...l, status } : l )); toast.showToast('Status updated','success') }catch(e:any){ toast.showToast(e?.response?.data?.message || 'Update failed','error') } }

  const filtered = list.filter(l=> !search || l.fullName.toLowerCase().includes(search.toLowerCase()) || l.email.toLowerCase().includes(search.toLowerCase()) || (l.productName||'').toLowerCase().includes(search.toLowerCase()))

  return (
    <div style={{padding:20}}>
      <h2>Enquiries</h2>
      <div style={{marginTop:8}}>
        <input placeholder="Search by name, email or product" value={search} onChange={e=>setSearch(e.target.value)} />
      </div>
      {loading ? <p>Loading...</p> : (
        <div style={{marginTop:12}}>
          {filtered.length===0 ? <p>No enquiries</p> : (
            <div className="grid">
              {filtered.map(e=> (
                <div key={e._id} className="card">
                  <div style={{display:'flex',justifyContent:'space-between'}}>
                    <div>
                      <strong>{e.fullName}</strong>
                      <div style={{fontSize:13,color:'#6b7280'}}>{e.companyName} • {e.country}</div>
                    </div>
                    <div style={{textAlign:'right'}}>
                      <div style={{fontSize:13}}>{new Date(e.createdAt).toLocaleString()}</div>
                      <div style={{marginTop:6}}>{e.status}</div>
                    </div>
                  </div>
                  <div style={{marginTop:8}}>
                    <div><strong>Product:</strong> {e.productName || 'N/A'}</div>
                    <div style={{marginTop:6}}>{e.message}</div>
                  </div>
                  <div style={{marginTop:8,display:'flex',gap:8}}>
                    {['New','Contacted','In Progress','Completed','Rejected'].map(s=> (
                      <button key={s} onClick={()=>changeStatus(e._id, s)} style={{fontSize:12,padding:'6px 8px'}}>{s}</button>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}
    </div>
  )
}
