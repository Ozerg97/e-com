import React from 'react';
import './Footer.css';

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
                        <li><a href="/">Accueil</a></li>
                        <li><a href="/boutique">Boutique</a></li>
                        <li><a href="/promotions">Promotions</a></li>
                        <li><a href="/blog">Blog</a></li>
                        <li><a href="/faq">FAQ</a></li>
                    </ul>
                </div>
                <div className="footer-section">
                    <h4>Service client</h4>
                    <ul>
                        <li><a href="/aide">Centre d'aide</a></li>
                        <li><a href="/retours">Politique de retour</a></li>
                        <li><a href="/remboursements">Politique de remboursement</a></li>
                        <li><a href="/cgv">Conditions générales de vente</a></li>
                        <li><a href="/confidentialite">Politique de confidentialité</a></li>
                        <li><a href="/suivi">Suivi de commande</a></li>
                    </ul>
                </div>
                
            </div>
        </footer>
    );
};

export default Footer;
