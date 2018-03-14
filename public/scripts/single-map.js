// just to check if the map works, have to link this to database file


function initMap() {
    const lalala = {lat: 44.7966125, lng: 0.4919465};
      var map = new google.maps.Map(document.getElementById('map'), {
        zoom: 9,
        center: lalala
      });
      var marker = new google.maps.Marker({
        position: lalala,
        map: map
      });
}
