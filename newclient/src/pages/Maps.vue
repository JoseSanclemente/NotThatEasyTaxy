<template>
  <div>
    <div id="floating-panel-buttons">
      <md-dialog-prompt
        :md-active.sync="showInputName"
        v-model="locationName"
        md-title="Agregar a mis Favoritos"
        md-input-maxlength="30"
        md-input-placeholder="Nombre de la ubicación"
        md-confirm-text="Done"
        :md-closed="handleAddFavoriteButton()"
      />
      <md-button
        title="Agregar a Favoritos"
        class="md-success-icon"
        @click="showLocationNamePrompt()"
      >
        <md-icon>add</md-icon>
      </md-button>

      <md-button title="Realizar viaje" class="md-info-icon">
        <md-icon>local_taxi</md-icon>
      </md-button>
    </div>
    <div id="floating-panel-info">
      <div id="information-card">
        <stats-card data-background-color="green">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">Precio</p>
            <h3 class="title">$ {{ travelCost }}</h3>
          </template>

          <template slot="footer">
            <div class="stats">
              <md-icon>access_time</md-icon>
              {{ travelDuration }}
            </div>
          </template>
        </stats-card>
      </div>
    </div>
    <div id="map"></div>
  </div>
</template>
<style>
#floating-panel-buttons {
  position: absolute;
  width: 10px;
  height: 10px;
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
      mapInstance: null,
      userCoords: null,
      destinationCoords: null,
      locationName: "",
      favLocations: [],
      showInputName: false,
      showNotification: false,
      travelDuration: "",
      travelCost: ""
    };
  },
  methods: {
    calculateTravelInformation(distance, duration) {
      var totalCost = 4000 + (distance / 1000) * 300;
      this.travelCost = totalCost;
      this.travelDuration = duration;
    },
    calculateRoute(directionsDisplay, directionsService) {
      let _this = this;
      directionsService.route(
        {
          origin: _this.userCoords,
          destination: _this.destinationCoords,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            var duration = response.routes[0].legs[0].duration.text;
            var distance = response.routes[0].legs[0].distance.value;
            _this.calculateTravelInformation(distance, duration);

            directionsDisplay.setDirections(response);
          }
        }
      );
    },
    showLocationNamePrompt() {
      if (this.destinationCoords != null) {
        this.showInputName = true;
      } else {
        alert("Selecciona una ubicación");
      }
    },
    addMarkerToFavorites() {
      var marker = new google.maps.Marker({
        position: this.destinationCoords,
        title: this.locationName
      });

      marker.setMap(this.mapInstance);

      this.favLocations.push(marker);
      this.showNotification = true;
      this.destinationCoords = null;
    },
    handleAddFavoriteButton() {
      let _this = this;
      if (_this.locationName != "") {
        _this.addMarkerToFavorites(_this.locationName);
        _this.locationName = "";
      }

      if (_this.showNotification) {
        _this.$notify({
          message: "¡Agregado a Favoritos!",
          icon: "check_circle_outline",
          horizontalAlign: "bottom",
          verticalAlign: "center",
          type: "success"
        });
        _this.showNotification = false;
      }
    },
    initMap(google) {
      let _this = this;
      navigator.geolocation.getCurrentPosition(function(position) {
        _this.userCoords = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        var mapOptions = {
          zoom: 15,
          center: _this.userCoords,
          scrollwheel: false
        };

        _this.mapInstance = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );

        var userMarker = new google.maps.Marker({
          position: _this.userCoords,
          title: "Mi posición"
        });
        userMarker.setMap(_this.mapInstance);

        var directionsService = new google.maps.DirectionsService();
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: _this.mapInstance
        });

        _this.mapInstance.addListener("click", function(e) {
          _this.destinationCoords = new google.maps.LatLng(
            e.latLng.lat(),
            e.latLng.lng()
          );

          _this.calculateRoute(directionsDisplay, directionsService);
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
