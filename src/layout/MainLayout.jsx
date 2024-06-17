import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import Header from "../components/header/Header";

const MainLayout = ({ children }) => {
  return (
    <Box>
      <Header />
      <Outlet>{children}</Outlet>
    </Box>
  );
};

export default MainLayout;
