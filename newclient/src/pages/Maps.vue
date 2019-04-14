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
      googleAPI: {
        map: null,
        userMarker: null,
        destinationMarker: null,
        directionsService: null,
        directionsDisplay: null
      },
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
    calculateRoute(endMarker) {
      let _this = this;
      _this.googleAPI.directionsService.route(
        {
          origin: _this.googleAPI.userMarker.position,
          destination: endMarker.position,
          travelMode: "DRIVING"
        },
        function(response, status) {
          if (status === "OK") {
            var duration = response.routes[0].legs[0].duration.text;
            var distance = response.routes[0].legs[0].distance.value;
            _this.calculateTravelInformation(distance, duration);

            _this.googleAPI.directionsDisplay.setDirections(response);
          }
        }
      );
    },
    showLocationNamePrompt() {
      if (this.googleAPI.destinationMarker != null) {
        this.showInputName = true;
      } else {
        alert("Selecciona una ubicación");
      }
    },
    addMarkerToFavorites() {
      let _this = this;
      var favoriteMarker;

      _this.googleAPI.destinationMarker.setTitle(_this.locationName);

      favoriteMarker = _this.googleAPI.destinationMarker;
      favoriteMarker.setMap(_this.googleAPI.map);

      favoriteMarker.addListener("click", function() {
        _this.calculateRoute(favoriteMarker);
      });

      _this.favLocations.push(_this.googleAPI.destinationMarker);
      _this.showNotification = true;
      _this.destinationCoords = null;
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
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });

        _this.showNotification = false;
      }
    },
    initMap(google) {
      let _this = this;
      var userCoords;
      navigator.geolocation.getCurrentPosition(function(position) {
        userCoords = new google.maps.LatLng(
          position.coords.latitude,
          position.coords.longitude
        );

        var mapOptions = {
          zoom: 15,
          center: userCoords,
          scrollwheel: false
        };

        _this.googleAPI.map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );

        _this.googleAPI.userMarker = new google.maps.Marker({
          position: userCoords,
          title: "Mi posición"
        });

        _this.googleAPI.userMarker.setMap(_this.googleAPI.map);

        _this.googleAPI.directionsService = new google.maps.DirectionsService();
        _this.googleAPI.directionsDisplay = new google.maps.DirectionsRenderer({
          map: _this.googleAPI.map
        });

        _this.googleAPI.map.addListener("click", function(e) {
          var destinationCoords = new google.maps.LatLng(
            e.latLng.lat(),
            e.latLng.lng()
          );
          _this.googleAPI.destinationMarker = new google.maps.Marker({
            position: destinationCoords
          });
          _this.calculateRoute(_this.googleAPI.destinationMarker);
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
