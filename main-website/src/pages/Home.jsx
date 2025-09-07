import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import "@fontsource/inter/600.css"


export default function Home() {
    return (
        <div className="App">
            <div className="container">
                <div className='main'>
                    <div className='left'>
                        <h2 className='welcome'>Welcome to</h2>
                        <h1 >Informatics Institute of Technology</h1>
                        <h2 >Discover where learning meets fun,friends, and endless possibilities. </h2>
                        <Link to="/map" className="welcome-link">
                            <button className="welcome-button">
                                Start Exploring
                            </button>
                        </Link>
                    </div>
                    <div className='right'>
                        <div className="custom-grid">
                            <div className="grid-item full-width top">
                                <div className="cell-content">
                                    <h2>Common Guidelines</h2>
                                    <img src="./images/image 36.png" className="cell-bg-image" />
                                    <button className="cell-button">
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="grid-item bottom">
                                <div className="cell-content">
                                    <h2>Meet the team</h2>
                                    <img src="./images/image 37.png" className="cell-bg-image" />
                                    <button className="cell-button"><i className="fas fa-arrow-right"></i></button>
                                </div>
                            </div>

                            <div className="grid-item bottom">
                                <div className="cell-content">
                                    <h2>Roles</h2>
                                    <img src="./images/image 38.png" className="cell-bg-image" />
                                    <button className="cell-button"><i className="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}