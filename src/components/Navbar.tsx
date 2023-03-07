import { useEffect, useRef } from "react";

import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import LogoutIcon from "@mui/icons-material/LogoutOutlined";

import { useStore } from "../store/store";
import { useAuth, useLogout } from "../hooks";

const styles = {
  toolbar: { alignItems: "center" },
  button: { color: "white" },
};

export const Navbar = () => {
  const appBarRef = useRef<HTMLDivElement | null>(null);
  const email = useStore((state) => state.email);
  const { mutate, isSuccess: isLogoutSuccess } = useLogout();

  const setNavbarHeight = useStore((state) => state.setNavbarHeight);
  const logout = useStore((state) => state.logout);

  useEffect(() => {
    if (!appBarRef.current) return;

    const { height } = appBarRef.current.getBoundingClientRect();

    setNavbarHeight(height);
  }, []);

  useEffect(() => {
    if (!isLogoutSuccess) return;

    logout();
  }, [isLogoutSuccess]);

  return (
    <AppBar position="sticky" ref={appBarRef}>
      <Toolbar sx={styles.toolbar}>
        <Typography variant="h6" component="h1" flexGrow={1}>
          OpenJira
        </Typography>

        <Typography variant="h6" component="span" marginRight={3}>
          {email}
        </Typography>
        <Button
          sx={styles.button}
          startIcon={<LogoutIcon />}
          onClick={() => mutate()}
        >
          Log out
        </Button>
      </Toolbar>
    </AppBar>
  );
};
