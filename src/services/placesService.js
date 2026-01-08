export const moodMap = {
  Work: "cafe",
  Date: "restaurant",
  "Quick Bite": "fast_food",
  Budget: "street_food"
};
export async function fetchNearbyPlaces(lat, lon, mood) {
  const tag = moodMap[mood];

  const query = `
    [out:json];
    node
      ["amenity"="${tag}"]
      (around:2000, ${lat}, ${lon});
    out;
  `;

  const url = "https://overpass-api.de/api/interpreter";

  const response = await fetch(url, {
    method: "POST",
    body: query
  });

  const data = await response.json();
  return data.elements;
}
