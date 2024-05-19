import React from "react";
import { Outlet } from "react-router-dom";
import Headers from "../component/Headers";
import Footer from "../component/Footer";
import { Box } from "@mui/material";

const MainLayout = () => {
  return (
    <>
      <Headers />
      <Box
        display="flex"
        flexDirection="column"
        justifyContent="center"
        alignItems="center"
        margin="3rem "
      >
        <Outlet />
      </Box>

      <Footer />
    </>
  );
};

export default MainLayout;
