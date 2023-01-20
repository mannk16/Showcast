import React from "react";
import { CssBaseline } from "@mui/material";
import { Routes, Route } from "react-router-dom";
import { Actors } from "./components/Actors/Actors";
import { MovieInformation } from "./components/MovieInformation/MovieInformation";
import { Movies } from "./components/Movies/Movies";
import { Profile } from "./components/Profile/Profile";
import { Navbar } from "./components/Navbar/Navbar";

import { AppDiv, StyledToolbar, StyledMain } from "./styles";
function App() {
  return (
    <AppDiv>
      <CssBaseline />
      <Navbar />
      <StyledMain>
        <StyledToolbar />
        <Routes>
          <Route path="/" element={<Movies />} />
          <Route path="movie/:id" element={<MovieInformation />} />
          <Route path="/approved" element={<Movies />} />
          <Route path="actors/:id" element={<Actors />} />
          <Route path="profile/:id" element={<Profile />} />
        </Routes>
      </StyledMain>
    </AppDiv>
  );
}

export default App;
