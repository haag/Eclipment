import { lazy } from "react";

const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const Notes = lazy(() => import("../views/notes/Notes"));

var ThemeRoutes = [
  {
    navlabel: true,
    name: "Personal",
    icon: "mdi mdi-dots-horizontal",
  },
  {
    path: "/notes",
    name: "Notes",
    icon: "mdi mdi-note",
    component: Notes,
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
