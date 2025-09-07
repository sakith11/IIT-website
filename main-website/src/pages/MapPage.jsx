import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './mapPage.css';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


export let isUserLocationAvailable = false;
// Set default icon globally
L.Icon.Default.mergeOptions({
    iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
    iconUrl: require('leaflet/dist/images/marker-icon.png'),
    shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const markerData = [
    {
        id: 1,
        title: 'GP Square',
        bgColor: '#FF30300D',
        description: '435 Galle RD, Colombo 03, Sri Lanka',
        schools: [
            { name: "computing", background: '6cbae3', text: '166c9a' },
            { name: "business", background: 'e38c9e', text: '911d35' }
        ],
        lat: 6.9271,
        lng: 79.8612,
        highlighted: true,
        nearby: [
            { id: 'n1', title: 'GP Coffee Shop', lat: 6.9273, lng: 79.8615 },
            { id: 'n2', title: 'GP Auditorium', lat: 6.9269, lng: 79.8610 }
        ]
    },
    {
        id: 2,
        title: 'Dialog Building',
        bgColor: '#30FF4C0D',
        description: '435 Galle RD, Colombo 03, Sri Lanka',
        schools: [
            { name: "computing", background: '6cbae3', text: '166c9a' },
            { name: "business", background: 'e38c9e', text: '911d35' }
        ],
        lat: 6.9285,
        lng: 79.8605,
        highlighted: false,
        nearby: []
    },
    {
        id: 3,
        title: 'Spencer Building',
        bgColor: '#3067FF0D',
        description: '435 Galle RD, Colombo 03, Sri Lanka',
        schools: [
            { name: "computing", background: '6cbae3', text: '166c9a' },
            { name: "business", background: 'e38c9e', text: '911d35' }
        ],
        lat: 6.9277,
        lng: 79.8620,
        highlighted: false,
        nearby: []
    },
    {
        id: 4,
        title: 'IIT Kurunegala',
        bgColor: '#30B3FF0D',
        description: '435 Galle RD, Colombo 03, Sri Lanka',
        schools: [
            { name: "computing", background: '6cbae3', text: '166c9a' },
            { name: "business", background: 'e38c9e', text: '911d35' }
        ],
        lat: 7.2511,
        lng: 80.3464,
        highlighted: false,
        nearby: [
            { name: "computing", background: '6cbae3', text: '166c9a' },
            { name: "business", background: 'e38c9e', text: '911d35' }
        ]
    },
    {
        id: 5,
        title: 'IIT Galle',
        bgColor: '#FF30300D',
        description: '435 Galle RD, Colombo 03, Sri Lanka',
        schools: [
            { name: "computing", background: '6cbae3', text: '166c9a' },
            { name: "business", background: 'e38c9e', text: '911d35' }
        ],
        lat: 6.0535,
        lng: 80.2210,
        highlighted: false,
        nearby: [
            { name: "computing", background: '6cbae3', text: '166c9a' },
            { name: "business", background: 'e38c9e', text: '911d35' }
        ]
    },
    {
        id: 6,
        title: 'IIT Ramakrishna',
        bgColor: '#FF30970D',
        description: '435 Galle RD, Colombo 03, Sri Lanka',
        schools: [
            { name: "computing", background: '6cbae3', text: '166c9a' },
            { name: "business", background: 'e38c9e', text: '911d35' },
            { name: "foundation", background: '95f181', text: '1a7e04' }
        ],
        lat: 6.9285,
        lng: 79.8605,
        highlighted: false,
        nearby: []
    }
];

const defaultIcon = () =>
    new L.Icon({
        iconUrl: require('leaflet/dist/images/marker-icon.png'),
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

const highlightIcon = () =>
    new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png',
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

const nearbyIcon = () =>
    new L.Icon({
        iconUrl: 'https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-green.png',
        shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
        iconSize: [25, 41],
        iconAnchor: [12, 41],
    });

function MapFlyTo({ center }) {
    const map = useMap();
    if (center) {
        map.flyTo(center, 17); // Zoom in and move
    }
    return null;
}
function useUserLocation() {
    const [location, setLocation] = useState(null);

    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    setLocation({
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    });
                },
                (error) => {
                    console.error('Error getting location:', error);
                }
            );
        } else {
            console.warn('Geolocation not available');
        }
    }, []);

    return location;
}

function getDistanceInKm(lat1, lon1, lat2, lon2) {
    const R = 6371; // Radius of Earth in km
    const dLat = ((lat2 - lat1) * Math.PI) / 180;
    const dLon = ((lon2 - lon1) * Math.PI) / 180;
    const a =
        Math.sin(dLat / 2) * Math.sin(dLat / 2) +
        Math.cos((lat1 * Math.PI) / 180) *
        Math.cos((lat2 * Math.PI) / 180) *
        Math.sin(dLon / 2) *
        Math.sin(dLon / 2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
    return R * c;
}

function ResizeMap() {
    const map = useMap();

    useEffect(() => {
        setTimeout(() => {
            map.invalidateSize();
        }, 100); // small delay ensures DOM is settled
    }, [map]);

    return null;
}



let clickTimer = null;
export default function MapPage() {
    const [selectedMarker, setSelectedMarker] = useState(null);
    const userLocation = useUserLocation();
    const navigate = useNavigate();
    function handleSingleClick(item) {
        setSelectedMarker(item);
    }

    function handleDoubleClick(item) {
        navigate(`/building/${item.id}`);
    }
    const handleMobileClick = (item) => {
        if (window.innerWidth < 768) {
            handleDoubleClick(item);
        }
    };
    useEffect(() => {
        if ('geolocation' in navigator) {
            navigator.geolocation.getCurrentPosition(
                (position) => {
                    isUserLocationAvailable = true;
                    console.log('Location available:', position.coords);
                },
                (error) => {
                    isUserLocationAvailable = false;
                    console.warn(' Location access denied or failed:', error.message);
                }
            );
        } else {
            isUserLocationAvailable = false;
            console.warn('Geolocation not supported in this browser.');
        }
    }, []);

    return (
        <div className="mobile-page-wrapper">
            <div className='mapMain'>


                {/*  Content Area: Cards + Map */}
                <div className="content-area">
                    {/* Cards Section */}
                    <div className="card-container">
                        <div className="card-scroll">
                            {markerData.map((item) => {
                                const distance = userLocation && getDistanceInKm(userLocation.lat, userLocation.lng, item.lat, item.lng);
                                return (


                                    < div
                                        key={item.id}
                                        className="info-card"
                                        onClick={() => {
                                            if (clickTimer) {
                                                clearTimeout(clickTimer);
                                                clickTimer = null;
                                            }
                                            clickTimer = setTimeout(() => {
                                                handleSingleClick(item);
                                                clickTimer = null;
                                            }, 250); // delay allows time to detect a double click
                                        }}
                                        onDoubleClick={() => {
                                            clearTimeout(clickTimer);
                                            clickTimer = null;
                                            handleDoubleClick(item);
                                        }}
                                        style={{ cursor: 'pointer' }}

                                    >
                                        <div style={{
                                            width: '120px',
                                            height: '120px',
                                            backgroundColor: item.bgColor,
                                            display: 'flex',
                                            alignItems: 'center',
                                            justifyContent: 'center',
                                            borderRadius: '8px',
                                            marginTop: '8px',
                                            marginLeft: '10px'
                                        }}>
                                            <img src="/images/image 35.png" alt={item.title} className="card-image" onClick={handleMobileClick} />
                                        </div>
                                        <div className="card-text">
                                            <h3>{item.title}</h3>
                                            <p>{item.description}</p>
                                            <div className="distance-tag">
                                                {distance && <p><strong>{distance.toFixed(2)} km</strong></p>}
                                            </div>
                                            {/*  Render school bubbles */}
                                            <div className="school-badges">
                                                {item.schools?.map((school, idx) => (
                                                    <span
                                                        key={idx}
                                                        className="school-badge"
                                                        style={{
                                                            backgroundColor: `#${school.background}`,
                                                            color: `#${school.text}`,
                                                        }}
                                                    >
                                                        {school.name}
                                                    </span>
                                                ))}
                                            </div>
                                            {/* <Link to={`/building/${item.id}`}>
                                            <button className="card-button">Details</button>
                                        </Link> */}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Map Section */}
                    <div className="map-container">
                        <MapContainer
                            center={[6.9271, 79.8612]}
                            zoom={16}
                            scrollWheelZoom={true}
                            className="leaflet-map"
                        >
                            <ResizeMap />
                            <TileLayer
                                attribution='&copy; OpenStreetMap contributors'
                                url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                            />

                            {selectedMarker && <MapFlyTo center={[selectedMarker.lat, selectedMarker.lng]} />}

                            {markerData.map((marker) => (
                                <Marker
                                    key={marker.id}
                                    position={[marker.lat, marker.lng]}
                                    icon={marker.highlighted ? highlightIcon() : defaultIcon()}
                                >
                                    <Popup>{marker.title}</Popup>
                                </Marker>
                            ))}

                            {selectedMarker?.nearby?.map((n) => (
                                <Marker key={n.id} position={[n.lat, n.lng]} icon={nearbyIcon()}>
                                    <Popup>{n.title}</Popup>
                                </Marker>
                            ))}
                        </MapContainer>
                    </div>
                </div>
            </div>
        </div>


    );


}
