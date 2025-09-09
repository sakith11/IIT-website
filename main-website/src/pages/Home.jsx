import React from 'react';
import { Link } from 'react-router-dom';
import './home.css';
import "@fontsource/inter/600.css"
import { useEffect, useState } from 'react';


export default function Home() {
    useEffect(() => {
        document.body.style.backgroundColor = '#F2F7FD';

        return () => {
            // Reset or clean up when component unmounts
            document.body.style.backgroundColor = '';
        };
    }, []);
    const [isHovered, setIsHovered] = useState(false);
    const [isHovered1, setIsHovered1] = useState(false);
    const [isHovered2, setIsHovered2] = useState(false);

    return (

        <div className="App">
            <div className="container">
                <div className='main'>
                    <div className='left'>
                        <h2 className='welcome'>Welcome to</h2>
                        <h1 class="multi-line-heading">
                            <span><span class="red-letter">I</span>nformatics</span>
                            <span><span class="red-letter">I</span>nstitute of</span>
                            <span><span class="red-letter">T</span>echnology</span>
                        </h1>
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
                                <div className="cell-content" style={{
                                    backgroundColor: isHovered ? '#ff4d4d' : '#ffffff',
                                }}>
                                    <h2>Common Guidelines</h2>
                                    <img src="./images/image 36.png" className="cell-bg-image" />
                                    <button className="cell-button" onMouseEnter={() => setIsHovered(true)}
                                        onMouseLeave={() => setIsHovered(false)}>
                                        <i className="fas fa-arrow-right"></i>
                                    </button>
                                </div>
                            </div>

                            <div className="grid-item bottom">
                                <div className="cell-content" style={{
                                    backgroundColor: isHovered1 ? '#ff4d4d' : '#ffffff',
                                }}>
                                    <h2>Meet the team</h2>
                                    <img src="./images/image 37.png" className="cell-bg-image" />
                                    <button className="cell-button" onMouseEnter={() => setIsHovered1(true)}
                                        onMouseLeave={() => setIsHovered1(false)}><i className="fas fa-arrow-right"></i></button>
                                </div>
                            </div>

                            <div className="grid-item bottom">
                                <div className="cell-content" style={{
                                    backgroundColor: isHovered2 ? '#ff4d4d' : '#ffffff',
                                }}>
                                    <h2>Roles</h2>
                                    <img src="./images/image 38.png" className="cell-bg-image" />
                                    <button className="cell-button" onMouseEnter={() => setIsHovered2(true)}
                                        onMouseLeave={() => setIsHovered2(false)}><i className="fas fa-arrow-right"></i></button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}