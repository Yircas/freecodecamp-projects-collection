import React from "react";
import Navigation from "./Navigation";
import { Outlet } from "react-router-dom";

const Layout = () => (
  <>
    <Navigation />
    <main>
      <Outlet />
    </main>
  </>
);

export default Layout;