// src/Spinner.js
import React from 'react';
import './Spinner.css';
import Navbar from "./Navbar";
import fakeNavbar from './fake-navbar.png';
const Spinner = ({ fullPage = false, text = "Yükleniyor..." }) => {

    // Eğer Tam Ekran (Full Page) isteniyorsa:
    if (fullPage) {
        return (
            <div className="spinner-overlay">
              <img className="fake-navbar" src={fakeNavbar} />
                <div className="spinner-circle"></div>
                <span className="spinner-text">{text}</span>
            </div>
        );
    }

    // Eğer Normal (Inline) isteniyorsa:
    return (
        <div className="spinner-inline">
            <div className="spinner-circle"></div>
        </div>
    );
};

export default Spinner;