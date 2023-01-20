import React, { useState } from "react";
import {
  Box,
  CircularProgress,
  useMediaQuery,
  Typography,
  useTheme,
} from "@mui/material";

import { useSelector } from "react-redux";
import { useGetMoviesQuery } from "../../Services/TMDB";
import { MovieList } from "../MovieList/MovieList";
import { Pagination } from "../Pagination/Pagination";

export const Movies = () => {
  const theme = useTheme();
  const large = useMediaQuery(theme.breakpoints.only("lg"));
  const [page, setPage] = useState(1);
  const { genreIdOrCategoryName, searchQuery } = useSelector(
    (state) => state.currentgenreOrCategory
  );
  const { data, error, isFetching } = useGetMoviesQuery({
    genreIdOrCategoryName,
    page,
    searchQuery,
  });

  const numOfMovies = large ? 16 : 18;

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center">
        <CircularProgress size="4rem" />
      </Box>
    );
  }

  if (!data.results.length) {
    return (
      <Box display="flex" alignItems="center" mt="20px">
        <Typography variant="h4">
          No movies that match that name.
          <br />
          Please search for something else.
        </Typography>
      </Box>
    );
  }

  if (error) {
    return "An error has occured";
  }

  return (
    <div>
      <MovieList movies={data} numberOfMovies={numOfMovies} />
      <Pagination
        currentPage={page}
        setPage={setPage}
        totalpages={data.total_pages}
      />
    </div>
  );
};
