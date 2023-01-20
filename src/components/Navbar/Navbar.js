import React, { useEffect, useState, useContext } from "react";
import { useDispatch, useSelector } from "react-redux";
import { ColorModeContext } from "../../utils/ToggleColorMode";
import {
  Menu,
  AccountCircle,
  Brightness4,
  Brightness7,
} from "@mui/icons-material";
import { Link } from "react-router-dom";
import { Sidebar } from "../Sidebar/Sidebar";
import { Search } from "../Search/Search";
import {
  AppBar,
  Button,
  Avatar,
  useMediaQuery,
  useTheme,
  IconButton,
} from "@mui/material";
import {
  StyledNavToolbar,
  MenuButton,
  StyledNavbar,
  StyledDrawer,
  LinkButton,
} from "./styles";

import { fetchToken, getSessionId, moviesApi } from "../../utils";
import { setUser } from "../../Features/auth";

export const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.user);
  const [mobileOpen, setMobileOpen] = useState(false);
  const isMobile = useMediaQuery("(max-width:600px)");
  const theme = useTheme();
  const colorMode = useContext(ColorModeContext);

  const dispatch = useDispatch();
  console.log(user);

  const token = localStorage.getItem("request_token");
  const sessionIdLocalStorage = localStorage.getItem("session_id");

  useEffect(() => {
    const loginUser = async () => {
      if (token) {
        if (sessionIdLocalStorage) {
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionIdLocalStorage}`
          );

          dispatch(setUser(userData));
        } else {
          const sessionId = await getSessionId();
          const { data: userData } = await moviesApi.get(
            `/account?session_id=${sessionId}`
          );
          dispatch(setUser(userData));
        }
      }
    };
    loginUser();
  }, [token, dispatch, sessionIdLocalStorage]);

  return (
    <>
      <AppBar position="fixed">
        <StyledNavToolbar>
          {isMobile && (
            <MenuButton
              color="inherit"
              edge="start"
              style={{ outline: "none" }}
              onClick={() => {
                setMobileOpen((prevState) => !prevState);
              }}
            >
              <Menu />
            </MenuButton>
          )}

          <IconButton
            color="inherit"
            sx={{ ml: 1 }}
            onClick={colorMode.toggleColorMode}
          >
            {theme.palette.mode === "dark" ? <Brightness7 /> : <Brightness4 />}
          </IconButton>
          {!isMobile && <Search />}

          <div>
            {!isAuthenticated ? (
              <Button color="inherit" onClick={fetchToken}>
                Login &nbsp; <AccountCircle />
              </Button>
            ) : (
              <LinkButton
                color="inherit"
                onClick={() => {}}
                component={Link}
                to={`/profile/${user.id}`}
              >
                {!isMobile && <>My Movies &nbsp;</>}
                <Avatar style={{ width: "30", height: "30" }} alt="profile" />
              </LinkButton>
            )}
          </div>
          {isMobile && <Search />}
        </StyledNavToolbar>
      </AppBar>

      <div>
        <StyledNavbar>
          {isMobile ? (
            <StyledDrawer
              variant="temporary"
              anchor="right"
              open={mobileOpen}
              ModalProps={{ keepMounted: true }}
              onClose={() => {
                setMobileOpen((prevState) => !prevState);
              }}
            >
              <Sidebar setMobileOpen={setMobileOpen} />
            </StyledDrawer>
          ) : (
            <StyledDrawer variant="permanent" open>
              <Sidebar setMobileOpen={setMobileOpen} />
            </StyledDrawer>
          )}
          ;
        </StyledNavbar>
      </div>
    </>
  );
};
