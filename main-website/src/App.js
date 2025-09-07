import logo from './logo.svg';
import './App.css';
import '@fortawesome/fontawesome-free/css/all.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './pages/Home'
import MapPage from './pages/MapPage'
import Buildings from './pages/Buildings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/map" element={<MapPage />} />
        <Route path="/building/:id" element={<Buildings />} />
        {/* <Route path="/map" element={<MapPage />} /> */}
      </Routes>
    </Router>

  );
}

export default App;
