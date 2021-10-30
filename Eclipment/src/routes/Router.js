import { lazy } from "react";

const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
var ThemeRoutes = [
  {
    navlabel: true,
    name: "Personal",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    path: "/",
    exact:true,
    name: "Dashboard",
    icon: "mdi mdi-gauge",
    component: Dashboard,
  }
];
export default ThemeRoutes;
