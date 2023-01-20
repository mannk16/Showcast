import { styled, Grid, Typography, Box } from "@mui/material";

export const MovieContainer = styled(Grid)(({ theme }) => ({
  padding: "10px",
}));

export const StyledTitle = styled(Typography)(({ theme }) => ({
  color: theme.palette.text.primary,
  textOverflow: "ellipsis",
  width: "230px",
  whiteSpace: "nowrap",
  overflow: "hidden",
  marginTop: "10px",
  marginBottom: 0,
  textAlign: "center",
}));

export const LinkedImage = styled(Box)(({ theme }) => ({
  alignItems: "center",
  fontWeight: "bolder",
  textDecoration: "none",
  [theme.breakpoints.up("xs")]: {
    display: "flex",
    flexDirection: "column",
  },

  "&:hover": {
    cursor: "pointer",
  },
}));

export const StyledImage = styled("img")(({ theme }) => ({
  borderRadius: "20px",
  height: "300px",
  marginBottom: "10px",
  "&:hover": {
    transform: "scale(1.05)",
  },
}));
