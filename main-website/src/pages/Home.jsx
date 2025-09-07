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
                        <table className="custom-table">
                            <tbody>
                                <tr>
                                    <td colSpan="3" className="merged-cell top">
                                        <div className="cell-content">

                                            <h2>Common Guidlines</h2>
                                            <img src="./images/image 36.png" className="cell-bg-image" />

                                            <button className="cell-button">
                                                <i className="fas fa-arrow-right"></i>
                                            </button>

                                        </div>
                                    </td>
                                </tr>
                                <tr>
                                    <td colSpan="3" className="spacer-row"></td>
                                </tr>
                                <tr>
                                    <td className="merged-cell bottom">
                                        <div className="cell-content">
                                            <h2>Meet the team</h2>
                                            <img src="./images/image 37.png" className="cell-bg-image" />
                                            <button className="cell-button"><i className="fas fa-arrow-right"></i></button>
                                        </div>
                                    </td>
                                    <td className="cell-gap">&nbsp;</td>
                                    <td className="merged-cell bottom">
                                        <div className="cell-content">
                                            <h2>Roles </h2>
                                            <img src="./images/image 38.png" className="cell-bg-image" />
                                            <button className="cell-button"><i className="fas fa-arrow-right"></i></button>
                                        </div>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>

        </div>
    );
}