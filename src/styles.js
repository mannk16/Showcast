import styled from "@emotion/styled";

export const AppDiv = styled("div")(({ theme }) => ({
  display: "flex",
  height: "100%",
  width: "100%",
}));

export const StyledToolbar = styled("div")(({ theme }) => ({
  height: "70px",
}));

export const StyledMain = styled("main")(({ theme }) => ({
  padding: "2em",
  flexGrow: "1",
}));
