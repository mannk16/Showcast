import React from "react";

import { StyledGrid } from "./styles";
import { Movie } from "../Movie/Movie";

export const MovieList = ({ movies, numberOfMovies }) => {
  return (
    <StyledGrid container>
      {movies.results.slice(0, numberOfMovies).map((movie, i) => (
        <Movie key={i} movie={movie} i={i} />
      ))}
    </StyledGrid>
  );
};
