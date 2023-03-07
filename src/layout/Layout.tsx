import { Outlet } from "react-router-dom";
import Box from "@mui/material/Box";
import { Navbar } from "../components/";

export const Layout = () => {
  return (
    <>
      <Navbar />
      <Box component="main" sx={{ padding: "2rem 1.25rem" }}>
        <Outlet />
      </Box>
    </>
  );
};
