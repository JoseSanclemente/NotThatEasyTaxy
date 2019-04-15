<template>
  <div>
    <div id="floating-panel-buttons">
      <toggle-button
        class="md-switch md-lg"
        :width="150"
        :height="52"
        :font-size="20"
        :value="false"
        @change="isActive = !isActive"
        :css-colors="true"
        :sync="true"
        :labels="{ checked: 'Activo', unchecked: 'Inactivo' }"
      />
      <md-button
        title="Listo"
        class="md-warning-icon"
        @click="handleStartButton()"
      >
        <md-icon class="md-size-3x">check_circle_outline</md-icon>
      </md-button>
    </div>
    <div id="map"></div>
  </div>
</template>
<style>
#floating-panel-buttons {
  position: absolute;
  width: 150px;
  height: 80px;
  top: 200px;
  left: 2%;
  z-index: 5;
  background-color: transparent;
  border: none;
}
</style>

<script>
import GoogleMapsLoader from "google-maps";

export default {
  data: function() {
    return {
      isActive: false,
      startLocation: null
    };
  },
  methods: {
    handleStartButton() {
      console.log("Working!");
    },
    initMap(google) {
      var userCoords;
      let _this = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        userCoords = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        var mapOptions = {
          zoom: 12,
          center: userCoords,
          scrollwheel: false
        };

        var map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );
        new google.maps.Marker({
          position: userCoords,
          title: "Mi posición",
          map: map
        });

        /*_this.googleAPI.directionsService = new google.maps.DirectionsService();
        _this.googleAPI.directionsDisplay = new google.maps.DirectionsRenderer({
          map: _this.googleAPI.map
        });*/
        map.addListener("click", function(e) {
          if (_this.isActive) {
            var destinationCoords = new google.maps.LatLng(
              e.latLng.lat(),
              e.latLng.lng()
            );
            if (this.startLocation != null) {
              this.startLocation.setMap(null);
              this.startLocation.setPosition(destinationCoords);
              this.startLocation.setMap(map);
            } else {
              this.startLocation = new google.maps.Marker({
                position: destinationCoords,
                map: map,
                title: "Punto de partida"
              });
            }
          } else {
            alert("Para empezar debe cambiarse a Activo");
          }
        });
      });
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
