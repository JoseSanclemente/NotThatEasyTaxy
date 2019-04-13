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
        :md-closed="addFavoritePlace()"
      />
      <md-button
        title="Agregar a Favoritos"
        class="md-success-icon"
        @click="showNameInput"
      >
        <md-icon>add</md-icon>
      </md-button>

      <md-button
        title="Realizar viaje"
        class="md-info-icon"
        @click="showNameInput"
      >
        <md-icon>local_taxi</md-icon>
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
  max-width: 60px;
  background-color: transparent;
  border: none;
  text-align: center;
  font-family: "Roboto", "sans-serif";
}
</style>

<script>
import GoogleMapsLoader from "google-maps";

var destinationCoordsBuffer;
var mapGlobalInstance;
var favLocations = [];

function mapListener(map, userMaker, directionsService, directionsDisplay) {
  map.addListener("click", function(e) {
    destinationCoordsBuffer = new google.maps.LatLng(
      e.latLng.lat(),
      e.latLng.lng()
    );

    calculateRoute(
      directionsDisplay,
      directionsService,
      userMaker.position,
      destinationCoordsBuffer,
      map
    );
  });
}

function addMarkertoFav(name) {
  if (destinationCoordsBuffer != null) {
    var marker = new google.maps.Marker({
      position: destinationCoordsBuffer,
      title: name
    });

    marker.setMap(mapGlobalInstance);

    favLocations.push(marker);

    destinationCoordsBuffer = null;
    return true;
  }
  return false;
}
function calculateRoute(
  directionsDisplay,
  directionsService,
  startCoords,
  endCoords,
  map
) {
  directionsService.route(
    {
      origin: startCoords,
      destination: endCoords,
      travelMode: "DRIVING"
    },
    function(response, status) {
      if (status === "OK") {
        directionsDisplay.setDirections(response);
      }
    }
  );
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
          scrollwheel: false
        };

        var map = new google.maps.Map(
          document.getElementById("map"),
          mapOptions
        );

        mapGlobalInstance = map;

        var marker = new google.maps.Marker({
          position: userLocation,
          title: "Mi posición",
          draggable: false
        });

        marker.setMap(map);

        // Instantiate a directions service.
        var directionsService = new google.maps.DirectionsService();

        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });

        mapListener(map, marker, directionsService, directionsDisplay);

        // Display the route between the initial start and end selections.
      });
    },
    showNameInput() {
      if (destinationCoordsBuffer != null) {
        this.active = true;
      } else {
        alert("Selecciona una ubicación");
      }
    },
    addFavoritePlace() {
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
          horizontalAlign: "bottom",
          verticalAlign: "center",
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
