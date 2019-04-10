import React from "react";
import MyLocation from "@material-ui/icons/MyLocation";
import "assets/css/material-dashboard-react.css";
import Button from "components/CustomButtons/Button.jsx";
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import CustomInput from "components/CustomInput/CustomInput.jsx";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import PropTypes from "prop-types";
import Typography from "@material-ui/core/Typography";
import {
  withScriptjs,
  withGoogleMap,
  GoogleMap,
  Marker
} from "react-google-maps";

function TabContainer(props) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {props.children}
    </Typography>
  );
}

TabContainer.propTypes = {
  children: PropTypes.node.isRequired
};

const styles = theme => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper
  }
});

class Map extends React.Component {
  constructor() {
    super();
    this.state = {
      userLocation: {
        lat: 0,
        lng: 0
      },
      markers: [],
      tab: 0
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

  addNewMarker = (destiny_lat, destiny_lng) => {
    const currentMarkers = this.state.markers;
    var newMarker = { lat: destiny_lat, lng: destiny_lng };
    currentMarkers.push(newMarker);
    this.setState({ markers: currentMarkers });
  };

  handleTabChange = (event, value) => {
    this.setState({ tab: value });
  };

  handleAddFav = event => {
    event.preventDefault();
    var lat = parseFloat(event.target.destiny_lat.value, 10);
    var lng = parseFloat(event.target.destiny_lng.value, 10);
    this.addNewMarker(lat, lng);
  };

  handleTravel = event => {
    event.preventDefault();
    var or_lat = parseFloat(event.target.destiny_lat.value, 10);
    var or_lng = parseFloat(event.target.destiny_lng.value, 10);
    var des_lat = parseFloat(event.target.destiny_lat.value, 10);
    var des_lng = parseFloat(event.target.destiny_lng.value, 10);
    console.log("You start to travel!");
  };

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
        <AppBar position="static">
          <Tabs value={this.state.tab} onChange={this.handleTabChange}>
            <Tab label="Viajar" />
            <Tab label="Agregar a Favoritos" />
          </Tabs>
        </AppBar>
        {this.state.tab === 0 && (
          <TabContainer>
            {" "}
            <form onSubmit={this.handleTravel}>
              {" "}
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Latitud de Origen"
                    id="origin_lat"
                    type="text"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Longitud de Origen"
                    id="origin_lng"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
              </GridContainer>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Latitud de Destino"
                    id="destiny_lat"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Longitud de Destino"
                    id="destiny_lng"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button color="success" type="submit">
                    Empezar Viaje
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </TabContainer>
        )}
        {this.state.tab === 1 && (
          <TabContainer>
            {" "}
            <form onSubmit={this.handleAddFav}>
              <GridContainer>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Latitud del Lugar"
                    id="destiny_lat"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={4}>
                  <CustomInput
                    labelText="Longitud del Lugar"
                    id="destiny_lng"
                    formControlProps={{
                      fullWidth: true
                    }}
                  />
                </GridItem>
                <GridItem xs={12} sm={12} md={2}>
                  <Button color="info" type="submit">
                    Agregar Lugar
                  </Button>
                </GridItem>
              </GridContainer>
            </form>
          </TabContainer>
        )}
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
      {props.markers.map((marker, id) => (
        <Marker
          key={`marker-${id}`}
          position={{ lat: marker.lat, lng: marker.lng }}
        />
      ))}
    </GoogleMap>
  ))
);

export default Map;
