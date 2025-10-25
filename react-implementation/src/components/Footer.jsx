import React from 'react'
import '../styles/footer.css'

export default function Footer() {
  return ( 
    <footer className="site-footer" role="contentinfo">
      <div className="container footer-inner">
        <div className="footer-left">© {new Date().getFullYear()} Ticketr</div>
        <div className="footer-right">Accessible · Responsive · Lightweight</div>
      </div>
    </footer> 
  ) 
}
