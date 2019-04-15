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
        title="Empezar Turno"
        class="md-warning-icon"
        @click="handleStartButton()"
      >
        <md-icon>check_circle_outline</md-icon>
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
      if (this.startLocation != null) {
        this.$notify({
          message: "¡Su turno ha sido activo!",
          icon: "notification_important",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });
      } else {
        this.$notify({
          message:
            "Debe activar su turno y seleccionar un punto de partida para comenzar",
          icon: "notification_important",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "danger"
        });
      }
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
            if (_this.startLocation != null) {
              _this.startLocation.setMap(null);
              _this.startLocation.setPosition(destinationCoords);
              _this.startLocation.setMap(map);
            } else {
              _this.startLocation = new google.maps.Marker({
                position: destinationCoords,
                map: map,
                title: "Punto de partida"
              });
            }
          } else {
            _this.$notify({
              message:
                "Para seleccionar un punto de partida, debe activar su turno primero",
              icon: "notification_important",
              horizontalAlign: "center",
              verticalAlign: "top",
              type: "danger"
            });
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
