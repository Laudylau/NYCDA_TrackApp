
function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 44.8519085, lng: 0.418257}
  });

  setMarkers(map);
}

let g_castles = [
  ['Chateau de Monbazillac', 44.7966125, 0.4919465],
  ['Chateau de Bridoire', 44.7965911, 0.4240952]
];

function setMarkers(map) {
  // Adds markers to the map.

  const image = {
    url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
    // This marker is 20 pixels wide by 32 pixels high.
    size: new google.maps.Size(20, 32),
  };

  for (let i = 0; i < g_castles.length; i++) {
    let castle = g_castles[i];
    let marker = new google.maps.Marker({
      position: {lat: castle[1], lng: castle[2]},
      map: map,
      icon: image,
    });
  }
}
