import React, { createContext, useContext, useState } from 'react'

type Toast = { id: number, message: string, type?: 'success' | 'error' }

const ToastContext = createContext<any>(null)

export function useToast(){ return useContext(ToastContext) }

export function ToastProvider({ children }: any){
  const [toasts, setToasts] = useState<Toast[]>([])
  function showToast(message: string, type:'success'|'error'='success'){
    const id = Date.now()
    setToasts(t => [...t, { id, message, type }])
    setTimeout(()=> setToasts(t => t.filter(x=> x.id!==id)), 4000)
  }
  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div style={{position:'fixed',right:16,top:16,zIndex:9999}}>
        {toasts.map(t=> (
          <div key={t.id} style={{marginBottom:8,background:t.type==='success'? '#0b3d91':'#dc2626',color:'#fff',padding:'8px 12px',borderRadius:6,boxShadow:'0 6px 18px rgba(2,6,23,0.12)'}}>{t.message}</div>
        ))}
      </div>
    </ToastContext.Provider>
  )
}
