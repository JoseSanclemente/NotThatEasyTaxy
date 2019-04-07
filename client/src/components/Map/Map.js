import React, { Component } from 'react';
import './Map.css';
import { Map, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import userLocationURL from './user_location.svg';
import favLocationURL from './fav_location.svg';

const userIcon = L.icon({
  iconUrl: userLocationURL,
  iconSize: [50, 82],
  popupAnchor: [0, -15]
});

const favIcon = L.icon({
  iconUrl: favLocationURL,
  iconSize: [50, 82],
  popupAnchor: [0, -15]
});

class MapComponent extends Component {
  state = {
    userLocation: {
      lat: 3.4372201,
      lng: -76.5224991
    },
    favLocations: [
      { position:[0,0], name:"Test" }
    ],
    markers: [[51.505, -0.09]],
    zoom: 13,
  }
  
  getUserLocation = (position) => {
    this.setState(
      {
        userLocation: {
          lat: position.coords.latitude,
          lng: position.coords.longitude,
          popupMessage: "Tu posición actual"
        },
      });
  }

  failedGettingLocation = () => {
    fetch('https://ipapi.co/json').then(response => response.json())
    .then(location => {
      this.setState({
        userLocation: {
          lat: location.latitude,
          lng: location.longitude
        },
      });
    })
  }

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getUserLocation, this.failedGettingLocation, {enableHighAccuracy: true});
  }

  addMarker = (e) => {
    const currentMarkers = this.state.favLocations
    console.log(currentMarkers);
    var newMarker = {position: e.latlng, name: "Second Marker"}
    currentMarkers.push(newMarker)
    this.setState(
      {
        favLocations: currentMarkers
      }
    )
  }
 
  render(){    
    const userPosition = [this.state.userLocation.lat, this.state.userLocation.lng]
    const userMessage = this.state.userLocation.popupMessagesposition
    return (
      <Map className="Map" center={userPosition} zoom={this.state.zoom}
        onClick={this.addMarker}>
        <TileLayer
          attribution='&amp;copy <a href="http://osm.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"/>
          
        <Marker position={userPosition} icon={userIcon}>
          <Popup>
            <span>{userMessage}</span>
          </Popup>
        </Marker>

        {this.state.favLocations.map((fav,id) => 
          <Marker key={`marker-${id}`} position={fav.position} icon={favIcon}>
          <Popup>
            <span>{fav.name}</span>
          </Popup>
          </Marker>
        )}
      </Map>
    )
  }
}

export default MapComponent