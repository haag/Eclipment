import { lazy } from "react";

const Dashboard = lazy(() => import("../views/dashboard/Dashboard"));
const ModalComponent = lazy(() => import("../views/studentModal/StudentModal"));
const Notes = lazy(() => import("../views/notes/Notes"));

var ThemeRoutes = [
  {
    navlabel: true,
    name: "Personal",
    icon: "mdi mdi-dots-horizontal"
  },
  {
    path: "/notes",
    name: "Notes",
    icon: "mdi mdi-note",
    component: Notes
  },
  {
    path: "/studentModal",
    name: "StudentModal",

    icon: "mdi mdi mdi-tablet",
    component: ModalComponent
  },
  {
    path: "/",
    exact: true,
    name: "Dashboard",
    icon: "mdi mdi-gauge",
    component: Dashboard
  }
];
export default ThemeRoutes;
