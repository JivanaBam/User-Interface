import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "../component/Headers";

const MainLayout = () => {
  return (
    <>
      <Headers />
      <Outlet />
      {/* <h3>Footer</h3> */}
    </>
  );
};

export default MainLayout;
