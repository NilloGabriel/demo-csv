export const haversineDistance = (company, city) => {
  const deg2rad = deg => deg * (Math.PI / 180);
  const R = 6371;
  const dLat = deg2rad(city.lat - company.lat);
  const dLng = deg2rad(city.lng - company.lng);
  const a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(deg2rad(company.lat)) * Math.cos(deg2rad(company.lat)) *
    Math.sin(dLng / 2) * Math.sin(dLng / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round((R * c * 1000) * 1000) / 1000;
}