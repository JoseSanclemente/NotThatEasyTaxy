// @material-ui/icons
import Car from "@material-ui/icons/DirectionsCarOutlined";
import LibraryBooks from "@material-ui/icons/LibraryBooks";
import BubbleChart from "@material-ui/icons/BubbleChart";
import LocationOn from "@material-ui/icons/LocationOnOutlined";
import LocalTaxi from "@material-ui/icons/LocalTaxi";
import WorkOutline from "@material-ui/icons/WorkOutline";
// core components/views for Admin layout
import DashboardPage from "views/Dashboard/Dashboard.jsx";
import Maps from "views/Maps/Maps.jsx";
import TaxiPage from "views/Taxi/Taxi.jsx";
import HistoryPage from "views/History/History.jsx";

const dashboardRoutes = [
  {
    path: "/dashboard",
    name: "Mis viajes",
    icon: Car,
    component: DashboardPage,
    layout: "/admin"
  },
  {
    path: "/maps",
    name: "Realizar un viaje",
    icon: LocationOn,
    component: Maps,
    layout: "/admin"
  },
  {
    path: "/taxi",
    name: "Taxi",
    icon: LocalTaxi,
    component: TaxiPage,
    layout: "/driver"
  },
  {
    path: "/history",
    name: "Historial de viajes",
    icon: WorkOutline,
    component: HistoryPage,
    layout: "/driver"
  }
];

export default dashboardRoutes;
