import './css/Home.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCheckCircle, faLock, faGlobe, faEnvelope, } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';

function Home() {
  return (
    
      
      <section id="welcome">
      <div className="welcome-content">
        <h1 id="bienvenue-h1">Welcome to E-cozer</h1>
        <p>We are a small company offering health products</p>
        <Link to="/shop"><button>Visit our store</button></Link>
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
                    <h3>Verified quality</h3>
            <p>
            Products that have been rigorously tested for efficacy and safety.
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
                    <h3>Secure purchases</h3>
                    <p>Advanced encryption for secure transactions.</p>
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
                    <h3>Satisfaction guaranteed</h3>
                    <p>Satisfied customers in Canada.</p>
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
                    <p>A dedicated team ready to help you at any time.</p>
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
        <h2>Your trust, our commitment: In-store excellence</h2>
        <div className="icons">
          <div className="icon">
            <FontAwesomeIcon
              icon={faCheckCircle}
              className="fa-check-circle"
              aria-hidden="true"
            />
            <h3>Verified quality</h3>
            <p>
            Products that have been rigorously tested for efficacy and safety.
            </p>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faLock}
              className="fa-lock"
              aria-hidden="true"
            />
            <h3>Secure purchases</h3>
            <p>Advanced encryption for secure transactions.</p>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faGlobe}
              className="fa-globe"
              aria-hidden="true"
            />
            <h3>Satisfaction guaranteed</h3>
            <p>Satisfied customers in Canada.</p>
          </div>
          <div className="icon">
            <FontAwesomeIcon
              icon={faEnvelope}
              className="fa-envelope"
              aria-hidden="true"
            />
            <h3>Assistance 24/7</h3>
            <p>A dedicated team ready to help you at any time.</p>
          </div>
        </div>
      </div>
    </section>
      
    
  );
}

export default Home;
