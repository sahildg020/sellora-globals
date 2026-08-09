import React from 'react'
import { Link } from 'react-router-dom'

export default function Navbar(){
  return (
    <nav className="nav">
      <div className="container header">
        <div className="brand">
          <img src="/logo192.png" alt="logo" width={44} height={44} />
          <div>
            <h1>Sellora Globals</h1>
            <div style={{fontSize:12,color:'#6B7280'}}>Smart Products for Modern Living</div>
          </div>
        </div>
        <div className="nav-links">
          <Link to="/">Home</Link>
          <Link to="/products">Products</Link>
          <a href="#contact">Contact</a>
          <a href="/admin">Admin</a>
        </div>
      </div>
    </nav>
  )
}
