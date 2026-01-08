import { useEffect, useState } from "react";
import { MapContainer, TileLayer, Marker, Popup, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import "./App.css";

/* Helper component to move map */
function FlyTo({ position }) {
  const map = useMap();
  useEffect(() => {
    if (position) {
      map.flyTo(position, 14, { duration: 1.5 });
    }
  }, [position, map]);
  return null;
}

export default function App() {
  const [userPos, setUserPos] = useState(null);
  const [places, setPlaces] = useState([]);
  const [activePlace, setActivePlace] = useState(null);
  const [search, setSearch] = useState("");
  const [dark, setDark] = useState(false);

  /* Dark mode */
  useEffect(() => {
    document.body.className = dark ? "dark" : "";
  }, [dark]);

  /* Get user location */
  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setUserPos([pos.coords.latitude, pos.coords.longitude]);
      },
      () => {
        setUserPos([30.7333, 76.7794]); // fallback Chandigarh
      }
    );
  }, []);

  /* Fetch nearby places using Overpass API */
  useEffect(() => {
    if (!userPos) return;

    const query = `
      [out:json];
      (
        node(around:1200,${userPos[0]},${userPos[1]})[amenity];
      );
      out center;
    `;

    fetch("https://overpass-api.de/api/interpreter", {
      method: "POST",
      body: query,
    })
      .then((res) => res.json())
      .then((data) => {
        setPlaces(
          data.elements.slice(0, 20).map((p, i) => ({
            id: i,
            name: p.tags?.name || "Unnamed place",
            type: p.tags?.amenity,
            coords: [p.lat, p.lon],
          }))
        );
      });
  }, [userPos]);

  /* Search location (Nominatim) */
  const handleSearch = async () => {
    if (!search) return;
    const res = await fetch(
      `https://nominatim.openstreetmap.org/search?format=json&q=${search}`
    );
    const data = await res.json();
    if (data.length > 0) {
      setUserPos([parseFloat(data[0].lat), parseFloat(data[0].lon)]);
    }
  };

  return (
    <div className="app">
      {/* Header */}
      <header className="header">
        <div>
          <h1>Smart Nearby Places Recommender</h1>
          <p>Discover places around your current location</p>
        </div>

        <button className="dark-toggle" onClick={() => setDark(!dark)}>
          {dark ? "☀️" : "🌙"}
        </button>
      </header>

      {/* Search */}
      <div className="search-bar">
        <input
          placeholder="Search another location..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      {/* Map */}
      {userPos && (
        <MapContainer center={userPos} zoom={14} className="map">
          <FlyTo position={userPos} />
          <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />

          {places.map((p) => (
            <Marker
              key={p.id}
              position={p.coords}
              eventHandlers={{
                click: () => setActivePlace(p.id),
              }}
            >
              <Popup>
                <strong>{p.name}</strong>
                <br />
                {p.type}
              </Popup>
            </Marker>
          ))}
        </MapContainer>
      )}

      {/* Nearby list */}
      <h2 className="section-title">Nearby Places</h2>
      <div className="place-grid">
        {places.map((p) => (
          <div
            key={p.id}
            className={`place-card ${
              activePlace === p.id ? "active" : ""
            }`}
            onMouseEnter={() => setActivePlace(p.id)}
          >
            <h3>{p.name}</h3>
            <p>{p.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
