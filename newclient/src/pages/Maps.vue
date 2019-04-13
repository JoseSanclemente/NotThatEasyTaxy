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

var markerBuffer;
var favLocations = [];

function mapListener(map) {
  map.addListener("click", function(e) {
    var newCoords = new google.maps.LatLng(e.latLng.lat(), e.latLng.lng());

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
}

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
function calculateAndDisplayRoute(
  directionsDisplay,
  directionsService,
  userMaker,
  destinationMaker,
  stepDisplay,
  map
) {
  // Retrieve the start and end locations and create a DirectionsRequest using
  // WALKING directions.
  directionsService.route(
    {
      origin: userMaker,
      destination: destinationMaker,
      travelMode: "DRIVING"
    },
    function(response, status) {
      // Route the directions and pass the response to a function to create
      // markers for each step.
      if (status === "OK") {
        document.getElementById(
          "warnings-panel"
        ).innerHTML = directionsDisplay.setDirections(response);
      } else {
        window.alert("Directions request failed due to " + status);
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

        var marker = new google.maps.Marker({
          position: userLocation,
          title: "Mi posición",
          draggable: false
        });

        marker.setMap(map);

        mapListener(map);

        // Instantiate a directions service.
        var directionsService = new google.maps.DirectionsService();

        // Create a renderer for directions and bind it to the map.
        var directionsDisplay = new google.maps.DirectionsRenderer({
          map: map
        });

        // Instantiate an info window to hold step text.
        var stepDisplay = new google.maps.InfoWindow();

        // Display the route between the initial start and end selections.
        calculateAndDisplayRoute(
          directionsDisplay,
          directionsService,
          markerArray,
          stepDisplay,
          map
        );
        // Listen to change events from the start and end lists.
        var onChangeHandler = function() {
          calculateAndDisplayRoute(
            directionsDisplay,
            directionsService,
            marker,
            markerBuffer,
            stepDisplay,
            map
          );
        };
      });
    },
    showNameInput() {
      if (markerBuffer != null) {
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
