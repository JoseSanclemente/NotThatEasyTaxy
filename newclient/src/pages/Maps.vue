<template>
  <div>
    <div id="floating-panel">
      <md-dialog-prompt
        :md-active.sync="active"
        v-model="value"
        md-title="Agregar a mis Favoritos"
        md-input-maxlength="30"
        md-input-placeholder="Nombre de la ubicación"
        md-confirm-text="Done"
        :md-closed="handleAddButton('bottom', 'center')"
      />
      <md-button
        title="Agregar a Favoritos"
        class="md-just-icon"
        @click="showNameInput"
      >
        <md-icon>add</md-icon>
      </md-button>
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
var favLocations = [];

function addMarkertoFav(name) {
  if (markerBuffer != null) {
    markerBuffer.setAnimation(false);
    markerBuffer.setTitle(name);
    favLocations.push(markerBuffer);
    markerBuffer = null;
    return true;
  }
  return false;
}

export default {
  data: function() {
    return {
      active: false,
      value: null
    };
  },
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
    showNameInput() {
      if (markerBuffer != null) {
        this.active = true;
      } else {
        alert("Selecciona una ubicación");
      }
    },
    handleAddButton(verticalAlign, horizontalAlign) {
      var showNotify = false;
      if (this.value != null) {
        showNotify = addMarkertoFav(this.value);
        console.log(favLocations);
        this.value = null;
      }

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
