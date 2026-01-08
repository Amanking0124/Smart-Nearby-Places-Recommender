export default function PlaceCard({ place, active, onHover }) {
  return (
    <div
      className={`place-card ${active ? "active" : ""}`}
      onMouseEnter={() => onHover(place.id)}
    >
      <img src={place.image} alt={place.name} />
      <h4>{place.name}</h4>
      <p>⭐ {place.rating} • {place.distance} km</p>
    </div>
  );
}
