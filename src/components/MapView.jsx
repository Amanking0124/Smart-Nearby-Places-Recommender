import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

export default function MapView({ places, activePlace, setActivePlace }) {
  return (
    <MapContainer center={[30.7333, 76.7794]} zoom={14} className="map">
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />

      {places.map(place => (
        <Marker
          key={place.id}
          position={place.coords}
          eventHandlers={{
            click: () => setActivePlace(place.id),
          }}
        >
          <Popup>
            <strong>{place.name}</strong><br />
            ⭐ {place.rating}<br />
            {place.distance} km away
          </Popup>
        </Marker>
      ))}
    </MapContainer>
  );
}
