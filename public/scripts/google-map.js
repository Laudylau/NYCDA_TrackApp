

// Create a global variable to store an array of the table objects of maps
const g_arrayMaps = maps;
const g_numTracks = parseInt(g_arrayMaps.length);
//console.log(g_arrayMaps); // this prints the array ob maps objects
//console.log(numTracks); // this prints the number of tracks

function initMap() {
  const map = new google.maps.Map(document.getElementById('map'), {
    zoom: 8,
    center: {lat: 44.8519085, lng: 0.418257}
  });

  setMarkers(map);
}


// let g_castles = [
//   [1, 'Chateau de Monbazillac', 44.7966125, 0.4919465, 'lalala1'],
//   [2, 'Chateau de Bridoire', 44.7965911, 0.4240952, 'lalala2']
// ];



function setMarkers(map) {
  // Adds markers to the map.



  // const image = {
  //   url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //   // This marker is 20 pixels wide by 32 pixels high.
  //   size: new google.maps.Size(20, 32),
  // };

  for (let i = 0; i < g_numTracks; i++) {
    let oneTrackMarker = g_arrayMaps[i];
    console.log(oneTrackMarker); // Returns an object of per table row in the loop starting with id 1
    //const trackGeoLat = oneTrackMarker.start_lat; OVERBODIG
    //const trackGeoLong = oneTrackMarker.start_long; OVERBODIG
    const trackGeo = {lat: oneTrackMarker.start_lat, lng: oneTrackMarker.start_long};
    const trackStart = oneTrackMarker.start_point_name;
    //console.log("value: ", trackGeoLat); // Returns the lat per table row in the loop starting with id 1 //OVERBODIG
    //console.log("value: ", trackGeoLong); // Returns the long per table row in the loop starting with id 1 //OVERBODIG
    console.log("value: ", trackGeo);
    //console.log("value: ", trackStart);
    let marker = new google.maps.Marker({
      position: trackGeo,
      map: map,
      //icon: image,
    });

    let infowindow = new google.maps.InfoWindow({
            content: trackStart
    });
    marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
  }
}
