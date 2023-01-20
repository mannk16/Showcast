import React from "react";
import { Typography, Box } from "@mui/material";
import { Movie } from "../Movie/Movie";
import { MoviesBox } from "./styles";

export const RatedCards = ({ title, data }) => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom>
        {title}
      </Typography>
      <MoviesBox display="flex" flexWrap="flexWrap">
        {data?.results.map((movie, i) => (
          <Movie key={movie.id} movie={movie} i={i} />
        ))}
      </MoviesBox>
    </Box>
  );
};
