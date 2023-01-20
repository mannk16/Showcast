import { styled, Box, Divider } from "@mui/material";

export const LinkContainer = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "center",
  padding: "10% 0",
}));

export const ImageContainer = styled("img")(({ theme }) => ({
  width: "230px",
  marginTop: "-40px",
}));

export const StyledDivider = styled(Divider)(({ theme }) => ({
  marginTop: "-30px",
}));

export const StyledLinks = styled(Box)(({ theme }) => ({
  color: theme.palette.text.primary,
  textDecoration: "none",
}));

export const GenreImgs = styled("img")(({ theme }) => ({
  filter: theme.palette.mode === "dark" && "invert(1)",
  height: "30px",
}));
