import DashboardLayout from "@/pages/Layout/DashboardLayout.vue";

import Maps from "@/pages/Maps.vue";
import Dashboard from "@/pages/Dashboard.vue";
/*import UserProfile from "@/pages/UserProfile.vue";
import TableList from "@/pages/TableList.vue";
import Typography from "@/pages/Typography.vue";
import Icons from "@/pages/Icons.vue";
import Notifications from "@/pages/Notifications.vue"; */

const routes = [
  {
    path: "/",
    component: DashboardLayout,
    redirect: "/auth/login"
  },
  {
    path: "/auth",
    name: "auth",
    redirect: "/auth/login",
    component: () =>
      import(/* webpackChunkName: "auth" */ "../pages/Layout/AuthLayout.vue"),
    children: [
      {
        path: "login",
        name: "login",
        component: () =>
          import(/* webpackChunkName: "login" */ "../pages/Login.vue")
      }
    ]
  },
  {
    path: "/client",
    component: DashboardLayout,
    children: [
      {
        path: "/client/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "/client/map",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      }
    ]
  },
  {
    path: "/driver",
    component: DashboardLayout,
    children: []
  }
  /* {
    path: "/",
    component: DashboardLayout,
    redirect: "/auth/login",
    children: [
      {
        path: "user/dashboard",
        name: "Dashboard",
        component: Dashboard
      },
      {
        path: "user/maps",
        name: "Maps",
        meta: {
          hideFooter: true
        },
        component: Maps
      },
      {
        path: "user/profile",
        name: "User Profile",
        component: UserProfile
      },
      {
        path: "table",
        name: "Table List",
        component: TableList
      },
      {
        path: "typography",
        name: "Typography",
        component: Typography
      },
      {
        path: "icons",
        name: "Icons",
        component: Icons
      },
      {
        path: "notifications",
        name: "Notifications",
        component: Notifications
      }
    ]
  } */
];

export default routes;
