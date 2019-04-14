<template>
  <div>
    <div id="floating-panel-buttons">
      <toggle-button
        :width="150"
        :height="52"
        :font-size="20"
        :value="false"
        @change="isActive = !isActive"
        color="#1ad85f"
        :sync="true"
        :labels="{ checked: 'Activo', unchecked: 'Inactivo' }"
      />
    </div>
    <div id="map"></div>
  </div>
</template>
<style>
#floating-panel-buttons {
  position: absolute;
  width: 150px;
  height: 80px;
  top: 150px;
  left: 2%;
  z-index: 5;
  background-color: transparent;
  border: none;
}

#floating-panel-info {
  position: absolute;
  width: 10px;
  height: 10px;
  top: 500px;
  left: 25%;
  z-index: 5;
  background-color: transparent;
  border: none;
}

#information-card {
  position: absolute;
  width: 500px;
  left: 25%;
  z-index: 5;
  background-color: transparent;
}
</style>

<script>
import GoogleMapsLoader from "google-maps";
import { StatsCard } from "@/components";

export default {
  components: {
    StatsCard
  },
  data: function() {
    return {
      isActive: false,
      startLocation: null
    };
  },
  methods: {
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

        var driverMaker = new google.maps.Marker({
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
