import React from "react";
import MyLocation from "@material-ui/icons/MyLocation";
import "assets/css/material-dashboard-react.css";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      }
    };
  }

  getUserLocation = position => {
    this.setState({
      userLocation: {
        lat: position.coords.latitude,
        lng: position.coords.longitude
      }
    });
  };

  componentDidMount() {
    navigator.geolocation.getCurrentPosition(this.getUserLocation);
  }

  render() {
    return (
      <div>
        <CustomMap
          googleMapURL="https://maps.googleapis.com/maps/api/js?key=AIzaSyDb6lNM9G-sc8mjYt78Lwucq1mZMJn-uDM"
          loadingElement={<div style={{ height: `100%` }} />}
          containerElement={
            <div style={{ padding: "20px", height: `500px` }} />
          }
          mapElement={<div style={{ height: `100%` }} />}
          lat={this.state.userLocation.lat}
          lng={this.state.userLocation.lng}
          markers={this.state.markers}
        />
      </div>
    );
  }
}

const CustomMap = withScriptjs(
  withGoogleMap(props => (
    <GoogleMap
      defaultZoom={13}
      defaultCenter={{ lat: 3.4372201, lng: -76.5224991 }}
      defaultOptions={{
        scrollwheel: false,
        zoomControl: true
      }}
    >
      <Marker position={{ lat: props.lat, lng: props.lng }} icon={MyLocation} />
    </GoogleMap>
  ))
);

export default Map;
