import React from 'react'
import { Link } from 'react-router-dom'

export default function Home(){
  return (
    <div>
      <section className="hero">
        <div className="container inner">
          <div style={{flex:1}}>
            <h2>Exporting Smart Kitchen & Lifestyle Products Worldwide</h2>
            <p style={{opacity:0.95,maxWidth:560,marginTop:12}}>Sellora Globals connects quality Indian products with global markets, delivering reliable products, professional service and trusted international trade solutions.</p>
            <div style={{marginTop:18,display:'flex',gap:12}}>
              <Link to="/products"><button className="btn">Explore Products</button></Link>
              <a href="#contact"><button style={{background:'transparent',border:'1px solid rgba(255,255,255,0.2)',color:'white',padding:'10px 16px',borderRadius:6}}>Request a Quote</button></a>
            </div>
          </div>
          <div style={{flex:1}}>
            <div className="card" style={{background:'white',color:'#111'}}>
              <h3 style={{marginTop:0}}>Featured Products</h3>
              <p style={{color:'#6b7280'}}>Handpicked items for international buyers.</p>
            </div>
          </div>
        </div>
      </section>

      <section style={{padding:'40px 0'}}>
        <div className="container">
          <h3>Product Categories</h3>
          <div className="grid" style={{marginTop:12}}>
            <div className="card">Kitchen Products</div>
            <div className="card">Mobile Holders & Accessories</div>
            <div className="card">Car Accessories</div>
            <div className="card">Home Utility Products</div>
            <div className="card">Lifestyle Products</div>
          </div>
        </div>
      </section>

      <section id="contact" style={{padding:'40px 0',background:'#fff'}}>
        <div className="container">
          <h3>Request a Quote / Contact</h3>
          <div className="card" style={{marginTop:12}}>
            <p>For enquiries or custom orders, email <a href="mailto:shopatsellora@gmail.com">shopatsellora@gmail.com</a> or call +91 7030624111</p>
          </div>
        </div>
      </section>

      <a className="request-cta" href="https://wa.me/917030624111" target="_blank" rel="noreferrer">💬</a>
    </div>
  )
}
