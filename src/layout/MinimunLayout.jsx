import React from "react";
import { Outlet } from "react-router-dom";
import CustomSnackbar from "../component/CustomSnackbar";

const MinimunLayout = () => {
  return (
    <>
      <CustomSnackbar />
      <Outlet />
    </>
  );
};

export default MinimunLayout;
