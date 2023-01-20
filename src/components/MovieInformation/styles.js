import { styled, Grid, Box, Modal } from "@mui/material";

export const StyledGrid = styled(Grid)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-around",
  margin: "10px 0 !important",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
    flexWrap: "wrap",
  },
}));
export const Posterimg = styled("img")(({ theme }) => ({
  borderRadius: "20px",
  boxShadow: "0.5em 1em 1em rgb(64,64,70)",
  width: "80%",
  [theme.breakpoints.down("md")]: {
    margin: "0 auto",
    width: "50%",
  },
  [theme.breakpoints.down("sm")]: {
    margin: "0 auto",
    width: "100%",

    marginBottom: "30px",
  },
}));

export const GenresGrid = styled(Grid)(({ theme }) => ({
  margin: "10px 0 !important",
  display: "flex",
  justifyContent: "space-around",
  flexWrap: "wrap",
}));

export const Links = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  textDecoration: "none",
  [theme.breakpoints.down("sm")]: {
    padding: "0.5rem 1rem",
  },
}));

export const GenreImg = styled("img")(({ theme }) => ({
  filter: theme.palette.mode === "dark" && "invert(1)",
  marginRight: "10px",
}));

export const CastImg = styled("img")(({ theme }) => ({
  width: "100%",
  maxWidth: "7em",
  height: "8em",
  objectFit: "cover",
  borderRadius: "10px",
}));

export const ButtonsContainer = styled("div")(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  width: "100%",
  [theme.breakpoints.down("sm")]: {
    flexDirection: "column",
  },
}));
export const ButtonsGrid = styled(Grid)(({ theme }) => ({}));
export const StyledModal = styled(Modal)(({ theme }) => ({
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));
export const Videoiframe = styled("iframe")(({ theme }) => ({
  width: "50%",
  height: "50%",
  [theme.breakpoints.down("sm")]: {
    width: "90%",
    height: "90%",
  },
}));
