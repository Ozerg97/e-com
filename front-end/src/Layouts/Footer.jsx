import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Company information</h4>
                    <p>E-cozer</p>
                    <p>Canada</p>
                    <p>Téléphone: (581) 443-7426</p>
                    <p>Email: support@e-cozer.com</p>
                </div>
                <div className="footer-section">
                    <h4>Navigation</h4>
                    <ul>
                        <li><Link to="/">Home</Link></li>
                        <li><Link to="/shop">Shop</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Policies</h4>
                    <ul>
                       
                        
                        <li><Link to="/refund-policy">Return Policy</Link></li>
                        <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                        <li><Link to="/terms-of-service">Terms of Service</Link></li>
                        <li><Link to="/shipping-delivery">Shipping & Delivery</Link></li>
                        
                    </ul>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
