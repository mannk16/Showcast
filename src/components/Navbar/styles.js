import { Button, styled } from "@mui/material";
import { Toolbar, IconButton, Drawer } from "@mui/material";

export const StyledNavToolbar = styled(Toolbar)(({ theme }) => ({
  height: "80px",
  display: "flex",
  justifyContent: "space-between",
  marginLeft: "240px",

  [theme.breakpoints.down("sm")]: {
    marginLeft: 0,
    flexWrap: "wrap",
  },
}));

export const MenuButton = styled(IconButton)(({ theme }) => ({
  marginRight: theme.spacing(2),
  [theme.breakpoints.up("sm")]: {
    display: "none",
  },
}));

export const StyledNavbar = styled("nav")(({ theme }) => ({
  [theme.breakpoints.up("sm")]: {
    width: "240px",
    flexShrink: "0",
  },
}));

export const StyledDrawer = styled(Drawer)(({ theme }) => ({
  width: "240px",
}));

export const LinkButton = styled(Button)(({ theme }) => ({
  "&:hover": {
    color: "white !important",
    textDecoration: "none",
  },
}));
