// This is linked to the Dbase Padvinder.sqlite3 now! In the table maps.

function initMap() {
    const trackGeo = {lat: maps.start_lat, lng: maps.start_long};
    const trackStart = maps.start_point_name;
    console.log("value: ", trackGeo);
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: trackGeo
    });

    const marker = new google.maps.Marker({
      position: trackGeo,
      map: map
    });

    const infowindow = new google.maps.InfoWindow({
            content: "Startingpoint: " + trackStart
    });

    marker.addListener('click', function() {
          infowindow.open(map, marker);
        });
}
