<template>
  <div>
    <div id="floating-panel">
      <md-button
        title="Agregar a Favoritos"
        class="md-just-icon"
        @click="handleAddButton('bottom', 'center')"
      >
        <md-icon>add</md-icon>
      </md-button>
      <md-field>
        <label>Type here!</label>
        <md-input v-model="type"></md-input>
        <span class="md-helper-text">Helper text</span>
      </md-field>
    </div>
    <div id="map"></div>
  </div>
</template>
<style>
#floating-panel {
  position: absolute;
  top: 150px;
  left: 2%;
  z-index: 5;
  background-color: transparent;
  border: none;
  text-align: center;
  font-family: "Roboto", "sans-serif";
  line-height: 30px;
}
</style>

<script>
import GoogleMapsLoader from "google-maps";

var markerBuffer;
var mapBuffer;
var userMarker;
var favLocations = [];

function addMarkertoFav() {
  if (markerBuffer != null) {
    markerBuffer.setAnimation(false);
    favLocations.push(markerBuffer);
    markerBuffer = null;
    return true;
  } else {
    alert("Selecciona una ubicación");
    return false;
  }
}

export default {
  methods: {
    initMap(google) {
      navigator.geolocation.getCurrentPosition(function(position) {
        var userLocation = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );
        var mapOptions = {
          zoom: 13,
          center: userLocation,
          scrollwheel: false // we disable de scroll over the map, it is a really annoing when you scroll through page
        };

        var map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );
        mapBuffer = map;

        var marker = new google.maps.Marker({
          position: userLocation,
          title: "Mi posición",
          draggable: false
        });

        // To add the marker to the map, call setMap();
        marker.setMap(map);

        map.addListener("click", function(e) {
          var newCoords = new google.maps.LatLng(
            e.latLng.lat(),
            e.latLng.lng()
          );

          var newMarker = new google.maps.Marker({
            position: newCoords,
            title: "Ubicación de Destino",
            draggable: false,
            animation: google.maps.Animation.BOUNCE
          });

          if (markerBuffer != null) {
            markerBuffer.setMap(null);
            markerBuffer = newMarker;
            markerBuffer.setMap(map);
          } else {
            markerBuffer = newMarker;
            markerBuffer.setMap(map);
          }
        });
      });
    },
    handleAddButton(verticalAlign, horizontalAlign) {
      var showNotify = addMarkertoFav();
      console.log(favLocations);

      if (showNotify) {
        this.$notify({
          message: "¡Agregado a Favoritos!",
          icon: "check_circle_outline",
          horizontalAlign: horizontalAlign,
          verticalAlign: verticalAlign,
          type: "success"
        });
      }
    }
  },
  mounted() {
    GoogleMapsLoader.KEY = "AIzaSyA9zXrUoWJOVpGMcmgTniyG6EP9yKCic7Y";
    GoogleMapsLoader.load(google => {
      this.initMap(google);
    });
  }
};
</script>
