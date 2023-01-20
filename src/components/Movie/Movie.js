import React from "react";
import {
  StyledTitle,
  MovieContainer,
  LinkedImage,
  StyledImage,
} from "./styles";
import { Grow, Tooltip, Rating } from "@mui/material";
import { useNavigate } from "react-router-dom";

export const Movie = ({ movie, i }) => {
  const navigate = useNavigate();

  return (
    <MovieContainer item xs={12} sm={6} md={4} lg={3} xl={2}>
      <Grow in key={i} timeout={(i + 1) * 250}>
        <LinkedImage onClick={() => navigate(`/movie/${movie.id}`)}>
          {movie.poster_path ? (
            <StyledImage
              alt={movie.title}
              src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
            ></StyledImage>
          ) : (
            <StyledImage
              alt={movie.title}
              src="https://www.fillmurray.com/200/300"
            />
          )}
          <StyledTitle variant="h5">{movie.title}</StyledTitle>
          <Tooltip title={`${movie.vote_average}/10`} disableTouchListener>
            <div>
              <Rating readOnly value={movie.vote_average / 2} precision={0.1} />
            </div>
          </Tooltip>
        </LinkedImage>
      </Grow>
    </MovieContainer>
  );
};
