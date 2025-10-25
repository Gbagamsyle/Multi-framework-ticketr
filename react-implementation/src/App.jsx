import React from 'react'
import { Routes, Route, Navigate } from 'react-router-dom'
import Container from './components/Container'
import Header from './components/Header'
import Footer from './components/Footer'
import ProtectedRoute from './components/ProtectedRoute'
import Landing from './pages/Landing'
import Login from  './pages/Auth/Login'
import Signup from './pages/Auth/Signup'
import Dashboard from './pages/Dashboard'
import Tickets from './pages/Tickets'
import NotFound from './pages/NotFound'
import Toast from './components/Toast'


export default function App() {
return (
<div className="app-root">
<Header />
<main>
<Container>
<Routes>
<Route path="/" element={<Landing />} />
<Route path="/auth/login" element={<Login />} />
<Route path="/auth/signup" element={<Signup />} />


<Route
path="/dashboard"
element={<ProtectedRoute><Dashboard /></ProtectedRoute>}
/>
<Route
path="/tickets"
element={<ProtectedRoute><Tickets /></ProtectedRoute>}
/>


<Route path="/404" element={<NotFound />} />
<Route path="*" element={<Navigate to="/404" replace />} />
</Routes>
</Container>
</main>
<Footer />
<Toast />
</div>
)
}