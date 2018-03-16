// This is linked to the Dbase Padvinder.sqlite3 now! In the table maps.

function initMap() {
    const trackStart = {lat: maps.start_lat, lng: maps.start_long};
    console.log("link with maps table made");
    const map = new google.maps.Map(document.getElementById('map'), {
      zoom: 9,
      center: trackStart
    });
    const marker = new google.maps.Marker({
      position: trackStart,
      map: map
    });
}
