import { Box, Typography } from "@mui/material";
import React from "react";

const Footer = () => {
  return (
    <Box
      sx={{
        background: "#BB8493",
        height: "50px",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        width: "100vw",
      }}
    >
      <Typography variant="h6" sx={{ color: "#fff" }}>
        Copyright © 2024: Nepal Electronic Mart
      </Typography>
    </Box>
  );
};

export default Footer;
