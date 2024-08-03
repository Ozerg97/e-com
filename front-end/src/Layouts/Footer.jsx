import React from 'react';
import './Footer.css';
import { Link } from 'react-router-dom';

function Footer() {
    return (
        <footer className="footer">
            <div className="footer-container">
                <div className="footer-section">
                    <h4>Informations sur l'entreprise</h4>
                    <p>Nom de l'entreprise</p>
                    <p>Adresse physique</p>
                    <p>Téléphone: (581) 443-7426</p>
                    <p>Email: contact@entreprise.com</p>
                </div>
                <div className="footer-section">
                    <h4>Navigation</h4>
                    <ul>
                        <li><Link to="/">Accueil</Link></li>
                        <li><Link to="/shop">Boutique</Link></li>
                        <li><Link to="/faq">FAQ</Link></li>
                        <li><Link to="/contact">Contact</Link></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Service client</h4>
                    <ul>
                       
                        
                        <li><Link to="/refund-policy">Politique de remboursement</Link></li>
                        <li><Link to="/privacy-policy">Politique de confidentialité</Link></li>
                        <li><Link to="/terms-of-service">Conditions d'utilisation</Link></li>
                        <li><Link to="/shipping-delivery">Expédition et livraison</Link></li>
                        
                    </ul>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
