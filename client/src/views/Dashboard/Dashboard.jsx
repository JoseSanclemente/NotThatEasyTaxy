import React from "react";
import PropTypes from "prop-types";
// react plugin for creating charts
import ChartistGraph from "react-chartist";
// @material-ui/core
import withStyles from "@material-ui/core/styles/withStyles";
import Icon from "@material-ui/core/Icon";
// @material-ui/icons
import AccessTime from "@material-ui/icons/AccessTime";
// core components
import GridItem from "components/Grid/GridItem.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import Card from "components/Card/Card.jsx";
import CardHeader from "components/Card/CardHeader.jsx";
import CardBody from "components/Card/CardBody.jsx";
import CardFooter from "components/Card/CardFooter.jsx";

import dashboardStyle from "assets/jss/material-dashboard-react/views/dashboardStyle.jsx";

class Dashboard extends React.Component {
  state = {
    value: 0
  };
  handleChange = (event, value) => {
    this.setState({ value });
  };

  handleChangeIndex = index => {
    this.setState({ value: index });
  };
  render() {
    const { classes } = this.props;
    return (
      <div>
        <GridContainer>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="black">
                <h4 className={classes.cardTitleWhite}>Viaje No.4712394</h4>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>$9.000</h4>
                <h6 className={classes.cardCategory}>Origen:</h6>
                <h6 className={classes.cardCategory}>Destino:</h6>
                <h5 className={classes.cardCategory}>Valoración: 4.0</h5>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Fecha de viaje: 9/04/2019
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="black">
                <h4 className={classes.cardTitleWhite}>Viaje No.38517382</h4>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>$12.300</h4>
                <h6 className={classes.cardCategory}>Origen:</h6>
                <h6 className={classes.cardCategory}>Destino:</h6>
                <h5 className={classes.cardCategory}>Valoración: 5.0</h5>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Fecha de viaje: 5/04/2019
                </div>
              </CardFooter>
            </Card>
          </GridItem>
          <GridItem xs={12} sm={12} md={10}>
            <Card>
              <CardHeader color="black">
                <h4 className={classes.cardTitleWhite}>Viaje No.2831374</h4>
              </CardHeader>
              <CardBody>
                <h4 className={classes.cardTitle}>$7.000</h4>
                <h6 className={classes.cardCategory}>Origen:</h6>
                <h6 className={classes.cardCategory}>Destino:</h6>
                <h5 className={classes.cardCategory}>Valoración: 4.0</h5>
              </CardBody>
              <CardFooter chart>
                <div className={classes.stats}>
                  <AccessTime /> Fecha de viaje: 2/04/2019
                </div>
              </CardFooter>
            </Card>
          </GridItem>
        </GridContainer>
      </div>
    );
  }
}

Dashboard.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(dashboardStyle)(Dashboard);
