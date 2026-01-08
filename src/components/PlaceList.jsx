import PlaceCard from "./PlaceCard";

export default function PlaceList({ places, activePlace, setActivePlace }) {
  return (
    <div className="place-grid">
      {places.map(place => (
        <PlaceCard
          key={place.id}
          place={place}
          active={activePlace === place.id}
          onHover={setActivePlace}
        />
      ))}
    </div>
  );
}
