// This is linked to the Dbase Padvinder.sqlite3 now! In the table maps.
// This is shown on the clientside through the get request that renders the map pug

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


// function numStarsRate(reviewNum) {
//     console.log(reviewNum);
//     let printStar = "";
//     for (let i = 1; i <= reviewNum; i++) {
//       printStar += "*";
//     }
//
//     console.log(printStar);
//     document.getElementById("reviewStar").innerText = printstar;
// }
