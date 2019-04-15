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

      <md-button
        title="Realizar viaje"
        class="md-info-icon"
        @click="handleDoTripButton()"
      >
        <md-icon>local_taxi</md-icon>
      </md-button>
    </div>
    <div id="floating-panel-info">
      <div id="information-card">
        <stats-card data-background-color="orange">
          <template slot="header">
            <md-icon>info_outline</md-icon>
          </template>

          <template slot="content">
            <p class="category">Precio</p>
            <h3 class="title">COP {{ travelCost }}</h3>
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
import superagent from "superagent";

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
      id: 0,
      locationName: "",
      favLocations: [
        { lat: 3.4372201, lng: -76.5224991, name: "Mi Casa" },
        { lat: 3.47012, lng: -76.5225767, name: "Mi Trabajo" }
      ],
      showInputName: false,
      showNotification: false,
      travelDuration: "",
      travelCost: ""
    };
  },
  methods: {
    calculateTravelInformation(distance, duration) {
      var totalCost = 4000 + (distance / 1000) * 300;
      this.travelCost = Math.round(totalCost);
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
        this.$notify({
          message: "Seleccione un lugar de llegada",
          icon: "notification_important",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "danger"
        });
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
    createMarker(google, pos, name) {
      let _this = this;
      var marker = new google.maps.Marker({
        position: pos,
        title: name,
        animation: google.maps.Animation.DROP,
        map: _this.googleAPI.map
      });
      google.maps.event.addListener(marker, "click", function() {
        _this.googleAPI.destinationMarker = marker;
        _this.calculateRoute(marker);
      });
    },
    loadFavoritePlaces(google) {
      let _this = this;
      for (var i = 0; i < _this.favLocations.length; i++) {
        var coords = new google.maps.LatLng(
          _this.favLocations[i].lat,
          _this.favLocations[i].lng
        );
        _this.createMarker(google, coords, _this.favLocations[i].name);
      }
    },
    handleDoTripButton() {
      if (this.googleAPI.destinationMarker != null) {
        this.$notify({
          message: "¡Su viaje ha empezado!",
          icon: "notification_important",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "success"
        });
      } else {
        this.$notify({
          message: "Seleccione un lugar de llegada",
          icon: "notification_important",
          horizontalAlign: "center",
          verticalAlign: "top",
          type: "danger"
        });
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
          zoom: 12,
          center: userCoords,
          scrollwheel: false
        };

        _this.googleAPI.map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );

        _this.googleAPI.userMarker = new google.maps.Marker({
          position: userCoords,
          title: "Mi posición",
          map: _this.googleAPI.map
        });

        _this.loadFavoritePlaces(google);

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
