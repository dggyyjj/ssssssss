const viewer = new Cesium.Viewer('cesiumContainer');

const apiUrl = 'https://api.aviationstack.com/v1/flights?access_key=d663a37426d9152b9a5bb7ca04dc750b';

loadFlights();

async function loadFlights() {
  try {
    const response = await fetch(apiUrl);
    const data = await response.json();
    const flights = data.data.slice(0, 100);

    const flightPoints = [];

    flights.forEach(flight => {
      const departure = flight.departure;
      const arrival = flight.arrival;

      if (departure.latitude && departure.longitude) {
        flightPoints.push({
          latLon: Cesium.Cartesian3.fromDegrees(departure.longitude, departure.latitude, 5000),
          color: Cesium.Color.RED
        });
      }

      if (arrival.latitude && arrival.longitude) {
        flightPoints.push({
          latLon: Cesium.Cartesian3.fromDegrees(arrival.longitude, arrival.latitude, 5000),
          color: Cesium.Color.GREEN
        });
      }
    });

    const geometry = viewer.scene.primitives.add(new Cesium.PointPrimitiveCollection());
    flightPoints.forEach(point => {
      geometry.add({
        position: point.latLon,
        color: point.color,
        pixelSize: 6
      });
    });

  } catch (error) {
    console.error('שגיאה באחזור נתוני טיסה:', error);
  }
}
