import React, { useState } from 'react';
import './buildings.css';
import { useParams } from 'react-router-dom';
import buildingData from '../data/BuildingInfo.json'; // Adjust path if needed


export default function BuildingInfoPage() {
    const { id } = useParams(); // e.g., 'gp-square'
    const building = buildingData.find(b => b.id === id);
    const [hasExplored, setHasExplored] = useState(false);
    const [currentFloorIndex, setCurrentFloorIndex] = useState(null);
    const [activeGradient, setActiveGradient] = useState({
        gradient1: building.gradient1,
        gradient2: building.gradient2,
    });
    // const [activeImage, setActiveImage] = useState(
    //     building.floors[0]?.image || building.image
    // );
    const [activeImage, setActiveImage] = useState(building.image);

    const handleFloorChange = (newIndex) => {
        if (newIndex < 0 || newIndex >= building.floors.length) return;

        const selectedFloor = building.floors[newIndex];

        setCurrentFloorIndex(newIndex);
        setActiveImage(selectedFloor.image);
        setActiveGradient({
            gradient1: selectedFloor.gradient1,
            gradient2: selectedFloor.gradient2,
        });
        setHasExplored(true);
    };


    const handleFloorClick = (index) => {
        setCurrentFloorIndex(index);
    };
    if (!building) return <p>Building not found.</p>;

    return (
        <div className="building-info-wrapper">
            <div className='buildingMain'>

                <div className="building-content">
                    {/* Image Section */}
                    <div className="building-image-container"
                        style={{
                            background: `linear-gradient(180deg, ${activeGradient.gradient1}, ${activeGradient.gradient2})`,
                        }}
                    >
                        <div className="building-image-box">
                            <img src={activeImage} alt={building.image} className="building-image" />
                            <div className="floor-navigation">
                                <button onClick={() => handleFloorChange(currentFloorIndex - 1)} disabled={currentFloorIndex === 0}>
                                    <i class="fa-solid fa-angle-up"></i>
                                </button>
                                <span className="floor-label">
                                    {hasExplored && currentFloorIndex !== null
                                        ? `${building.floors[currentFloorIndex].name}`
                                        : 'Explore!'}
                                </span>
                                <button onClick={() => handleFloorChange(currentFloorIndex + 1)} disabled={currentFloorIndex === building.floors.length - 1}>
                                    <i class="fa-solid fa-angle-down"></i>
                                </button>
                            </div>
                        </div>

                    </div>

                    {/* Floor Navigation */}
                    <div className='drop-down-container'>


                        {/* Dropdowns Section */}
                        <div className="building-dropdowns">
                            {/* Description */}
                            {/* <details className="dropdown-section" open>
                                <summary>Description</summary>
                                <p>{building.description}</p>
                            </details> */}

                            {/* Floors */}
                            {building.floors.map((floor, floorIndex) => {
                                const sectionNames = floor.sections.map(section => section.name).join(', ');

                                return (
                                    <details
                                        key={floorIndex}
                                        className="dropdown-section"
                                        open={floorIndex === currentFloorIndex}
                                    >
                                        <summary
                                            className="dropdown-summary"
                                            onClick={() => {
                                                setCurrentFloorIndex(floorIndex);
                                                setActiveImage(floor.image);
                                                setActiveGradient({
                                                    gradient1: floor.gradient1,
                                                    gradient2: floor.gradient2,
                                                });
                                                setHasExplored(true);
                                            }}
                                        >
                                            <span className="summary-content">
                                                {floor.name}
                                                <p className="floor-description">{sectionNames}</p>
                                            </span>
                                            <i className="fa-solid fa-angle-down dropdown-icon" aria-hidden="true"></i>
                                        </summary>

                                        {/* Floor sections */}
                                        {floor.sections.map((section, sectionIndex) => (
                                            <details
                                                key={sectionIndex}
                                                className="nested-dropdown"
                                                open={floorIndex === currentFloorIndex}
                                            >
                                                <summary className="section-summary">
                                                    <span
                                                        className="section-icon"
                                                        dangerouslySetInnerHTML={{ __html: section.icon }}
                                                    />
                                                    <span className="section-name">{section.name}</span>
                                                </summary>
                                                <p className="section-description">{section.description}</p>
                                            </details>
                                        ))}

                                    </details>
                                );
                            })}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    );

}
