import './styles.css'
import React from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter, Routes, Route } from 'react-router-dom'
import App from './App'
import AdminLogin from './pages/admin/Login'
import AdminDashboard from './pages/admin/Dashboard'
import ProductsPage from './pages/Products'
import ProductDetail from './pages/ProductDetail'
import Home from './pages/Home'
import AdminProductsList from './pages/admin/ProductsList'
import AdminProductForm from './pages/admin/ProductForm'
import AdminEnquiries from './pages/admin/Enquiries'
import AdminGallery from './pages/admin/Gallery'
import { ToastProvider } from './components/ToastContext'

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ToastProvider>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<App />}>
            <Route index element={<Home />} />
            <Route path="products" element={<ProductsPage />} />
            <Route path="products/:slug" element={<ProductDetail />} />
          </Route>
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin/products" element={<AdminProductsList />} />
          <Route path="/admin/products/new" element={<AdminProductForm />} />
          <Route path="/admin/products/:id" element={<AdminProductForm />} />
          <Route path="/admin/enquiries" element={<AdminEnquiries />} />
          <Route path="/admin/gallery" element={<AdminGallery />} />
        </Routes>
      </BrowserRouter>
    </ToastProvider>
  </React.StrictMode>
)
