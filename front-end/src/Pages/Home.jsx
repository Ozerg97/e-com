import './css/Home.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faLock, faGlobe, faEnvelope, } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <>
      
      <section id="welcome">
      <div className="welcome-content">
        <h1 id="bienvenue-h1">Bienvenue chez E-cozer</h1>
        <p>Nous sommes une petite entreprise qui offre des produits de santé</p>
        <Link to="/shop"><button>Visiter notre boutique</button></Link>
      </div>

      <div id="slider" className="mobile-only">
        <input type="radio" name="slider" id="slide1" />
        <input type="radio" name="slider" id="slide2" />
        <input type="radio" name="slider" id="slide3" />
        <input type="radio" name="slider" id="slide4" />
        <div id="slides">
          <div id="overflow">
            <div className="inner">
              <div className="slide slide_1">
                <div className="slide-content">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faCheckCircle}
                      className="fa-check-circle"
                      aria-hidden="true"
                    />
                    <h3>Qualité vérifiée</h3>
                    <p>
                      Des produits dont l'efficacité et la sécurité ont été
                      rigoureusement testées.
                    </p>
                  </div>
                </div>
              </div>
              <div className="slide slide_2">
                <div className="slide-content">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faLock}
                      className="fa-lock"
                      aria-hidden="true"
                    />
                    <h3>Achats sécurisés</h3>
                    <p>
                      Cryptage avancé pour des transactions en toute sécurité.
                    </p>
                  </div>
                </div>
              </div>
              <div className="slide slide_3">
                <div className="slide-content">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faGlobe}
                      className="fa-globe"
                      aria-hidden="true"
                    />
                    <h3>Satisfaction globale</h3>
                    <p>
                      Des millions de clients satisfaits dans le monde entier.
                    </p>
                  </div>
                </div>
              </div>
              <div className="slide slide_4">
                <div className="slide-content">
                  <div className="icon">
                    <FontAwesomeIcon
                      icon={faEnvelope}
                      className="fa-envelope"
                      aria-hidden="true"
                    />
                    <h3>Assistance 24/7</h3>
                    <p>Une équipe dévouée prête à vous aider à tout moment.</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div id="controls">
          <label htmlFor="slide1"></label>
          <label htmlFor="slide2"></label>
          <label htmlFor="slide3"></label>
          <label htmlFor="slide4"></label>
        </div>
        <div id="bullets">
          <label htmlFor="slide1"></label>
          <label htmlFor="slide2"></label>
          <label htmlFor="slide3"></label>
          <label htmlFor="slide4"></label>
        </div>
      </div>

      <div className="commitment-section">
        <h2>Votre confiance, notre engagement : L'excellence en magasin</h2>
        <div className="icons">
          <div className="icon">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="fa-check-circle"
              aria-hidden="true"
            />
            <h3>Qualité vérifiée</h3>
            <p>
              Des produits dont l'efficacité et la sécurité ont été
              rigoureusement testées.
            </p>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faLock}
              className="fa-lock"
              aria-hidden="true"
            />
            <h3>Achats sécurisés</h3>
            <p>Cryptage avancé pour des transactions en toute sécurité.</p>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faGlobe}
              className="fa-globe"
              aria-hidden="true"
            />
            <h3>Satisfaction globale</h3>
            <p>Des millions de clients satisfaits dans le monde entier.</p>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="fa-envelope"
              aria-hidden="true"
            />
            <h3>Assistance 24/7</h3>
            <p>Une équipe dévouée prête à vous aider à tout moment.</p>
          </div>
        </div>
      </div>
    </section>
      
    </>
  );
}

export default Home;
