import React from "react";
import { createRoot } from "react-dom/client";
import App from "./components/App";
import {
  createBrowserRouter,
  Route,
  createRoutesFromElements,
  RouterProvider,
} from "react-router-dom";
import Home from "./components/home";
import EmployeeCreate from "./components/homeComp/employeeCreate";
import EmployeeSearch from "./components/homeComp/employeeSearch";
import HomeContent from "./components/homeComp/homeContent";
import axios from "axios";


const container = document.getElementById("root");

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route>
      <Route index element=<App /> />
      <Route path="/home" element=<Home/>>
        <Route index element=<HomeContent/>/>
        <Route path="employee/create" element=<EmployeeCreate/> />
        <Route path="employee/search" element=<EmployeeSearch/> />
      </Route>
    </Route>
  )
);

const root = createRoot(container);
root.render(<RouterProvider router={router} />);
