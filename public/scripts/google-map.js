// This is linked to the Dbase Padvinder.sqlite3 now! In the table maps.
// This is shown on the clientside through the get request that renders the map pug

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


function setMarkers(map) {
  // Adds markers to the map.



  // const image = {
  //   url: 'https://developers.google.com/maps/documentation/javascript/examples/full/images/beachflag.png',
  //   // This marker is 20 pixels wide by 32 pixels high.
  //   size: new google.maps.Size(20, 32),
  // };

  for (let i = 0; i < g_numTracks; i++) {
    let oneTrackMarker = g_arrayMaps[i];
    console.log("value: A ", oneTrackMarker); // Returns an object of per table row in the loop starting with id 1
    //const trackGeoLat = oneTrackMarker.start_lat; OVERBODIG
    //const trackGeoLong = oneTrackMarker.start_long; OVERBODIG
    const trackGeo = {lat: oneTrackMarker.start_lat, lng: oneTrackMarker.start_long};

    //console.log("value: ", trackGeoLat); // Returns the lat per table row in the loop starting with id 1 //OVERBODIG
    //console.log("value: ", trackGeoLong); // Returns the long per table row in the loop starting with id 1 //OVERBODIG
    //console.log("value: B", trackGeo);

    let marker = new google.maps.Marker({
      position: trackGeo,
      map: map,
      //icon: image,
    });

    const trackName = oneTrackMarker.track_name;
    //console.log("value: C", trackName);
    const trackStart = oneTrackMarker.start_point_name;
    //console.log("value: D", trackStart);
    const trackLink = oneTrackMarker.start_website;
    //console.log("value: E", trackLink);
    const trackID = oneTrackMarker.track_id;
    //console.log("value: F", trackID);

    const contentString =
                `<div id="content"></div>` +
                  //`<div id="siteNotice">` +
                  `<h1 id="firstHeading" class="firstHeading"> ${trackName}</h1>` +
                  `<div id="bodyContent">`+
                    `<h3><b>Startingpoint: ${trackStart}</b></h3>`+
                    `<p><a href = "${trackLink}">Click here for website startingpoint! </a></p>` +
                    `<p><a href= "/tracks/${trackID}">Click here for more info about this track!</a></p>` +
                  `</div>`;

    let infowindow = new google.maps.InfoWindow({
            content: contentString
    });
    marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
  }
}
