import { createBrowserRouter } from "react-router-dom";
import Home from "../../pages/home/home";
import ProtectedRoute from "../protected-routes/protected-route";
import DashBoard from "../../pages/dash-board/dash-board";
import Login from "../../pages/login/login-containor";
import PublicCode from "../../pages/public/code-menegement/public-code";
import UserMenegement from "../../pages/public/user-menegement/user-menegement";
import RollMenegement from "../../pages/public/roll-menegement/roll-group/roll-menegement";
import MenuMenegement from "../../pages/public/menu-menegement/menu-menegement";
import RollGroup from "../../pages/public/roll-menegement/roll-group-user/roll-group-user";
import BuildingMenegement from "../../pages/public/building-menegement/building-menegement";
import RollMenuMenegement from "../../pages/public/roll-menegement/roll-menu/roll-menu-menegement";
import NavTest from "../../pages/test/navTest";
import BasAir from "../../pages/bas/bas-air";

export const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
    children: [
      {
        path: "/",
        element: <DashBoard />,
      },
      {
        path: "/publiccode",
        element: <PublicCode />,
      },
      {
        path: "/usermanegement",
        element: <UserMenegement />,
      },
      {
        path: "/rollmanegement",
        element: <RollMenegement />,
      },
      {
        path: "/menumanegement",
        element: <MenuMenegement />,
      },
      {
        path: "/rollgroup",
        element: <RollGroup />,
      },
      {
        path: "/buildingmanegement",
        element: <BuildingMenegement />,
      },
      {
        path: "/rollmenumanegement",
        element: <RollMenuMenegement />,
      },
      {
        path: "/navtest",
        element: <NavTest />,
      },
      {
        path: "/basair",
        element: <BasAir />,
      },
    ],
  },
  {
    path: "/login",
    element: <Login />,
  },
]);
