import React, { useState, useEffect } from "react";

import {
  Typography,
  Button,
  ButtonGroup,
  Grid,
  Box,
  CircularProgress,
  Rating,
} from "@mui/material";
import {
  Movie as MovieIcon,
  Theaters,
  Language,
  PlusOne,
  Favorite,
  FavoriteBorderOutlined,
  Remove,
  ArrowBack,
} from "@mui/icons-material";

import { genres } from "../../assets-genres";
import { MovieList } from "../MovieList/MovieList";

import { Link, useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { useGetMovieQuery } from "../../Services/TMDB";
import {
  StyledGrid,
  Posterimg,
  GenresGrid,
  Links,
  GenreImg,
  CastImg,
  ButtonsContainer,
  ButtonsGrid,
  StyledModal,
  Videoiframe,
} from "./styles";
import { selectGenreOrCategory } from "../../Features/currentGenreOrCategory";
import { useGetRecommendationsQuery } from "../../Services/TMDB";
import { useGetListQuery } from "../../Services/TMDB";

export const MovieInformation = () => {
  const { user } = useSelector((state) => state.user);
  const [open, setOpen] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { id } = useParams();
  const { data, isFetching, error } = useGetMovieQuery(id);
  const { data: favoriteMovies } = useGetListQuery({
    listName: "favorite/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: watchlistedMovies } = useGetListQuery({
    listName: "watchlist/movies",
    accountId: user.id,
    sessionId: localStorage.getItem("session_id"),
    page: 1,
  });

  const { data: recommendations } = useGetRecommendationsQuery({
    id,
    list: "/recommendations",
  });

  const [isMovieFavorited, setIsMovieFavorited] = useState(false);
  const [isMoviewatchListed, setIsMoviewatchListed] = useState(false);

  useEffect(() => {
    setIsMoviewatchListed(
      !!watchlistedMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistedMovies, data]);

  useEffect(() => {
    setIsMovieFavorited(
      !!favoriteMovies?.results?.find((movie) => movie?.id === data?.id)
    );
  }, [watchlistedMovies, data]);

  const addToFavorites = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/favorite?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        favorite: !isMovieFavorited,
      }
    );
    setIsMovieFavorited((prev) => !prev);
  };

  const addToWatchlist = async () => {
    await axios.post(
      `https://api.themoviedb.org/3/account/${user.id}/watchlist?api_key=${
        process.env.REACT_APP_TMDB_KEY
      }&session_id=${localStorage.getItem("session_id")}`,
      {
        media_type: "movie",
        media_id: id,
        watchlist: !isMoviewatchListed,
      }
    );

    setIsMoviewatchListed((prev) => !prev);
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center">
        <CircularProgress size="8rem" />
      </Box>
    );
  }

  if (error) {
    return (
      <Link onClick={() => navigate("/")}>
        Something has gone wrong. Go back
      </Link>
    );
  }
  return (
    <div>
      <StyledGrid container>
        <Grid
          item
          sm={12}
          lg={4}
          style={{
            display: "flex",
            marginBottom: "30px",
            alignItems: "flex-start",
          }}
        >
          <Posterimg
            src={`https://image.tmdb.org/t/p/w500/${data?.poster_path}`}
            alt={data?.title}
          />
        </Grid>
        <Grid item container direction="column" lg={7}>
          <Typography variant="h3" align="center" gutterBottom>
            {data?.title} ({data.release_date.split("-")[0]})
          </Typography>
          <Typography variant="h5" align="center" gutterBottom>
            {data?.tagline}
          </Typography>
          <StyledGrid item>
            <Box display="flex" align="center" justifyContent="center">
              <Rating readOnly value={data.vote_average / 2} />
              <Typography
                variant="subtitle1"
                gutterBottom
                style={{ marginLeft: "10px" }}
              >
                {Math.round(data?.vote_average)}/10
              </Typography>
            </Box>
            <Typography variant="h6" align="center" gutterBottom>
              {data?.runtime} min /
              {data?.spoken_languages.length > 0
                ? data?.spoken_languages[0].name
                : ""}
            </Typography>
          </StyledGrid>
          <GenresGrid item>
            {data?.genres?.map((genre, i) => (
              <Links
                onClick={() => {
                  navigate("/");
                  dispatch(selectGenreOrCategory(genre.id));
                }}
                key={genre.name}
              >
                <GenreImg src={genres[genre.name.toLowerCase()]} height={30} />
                <Typography color="textPrimary" variant="subtitle1">
                  {genre?.name}
                </Typography>
              </Links>
            ))}
          </GenresGrid>
          <Typography variant="h5" gutterBottom style={{ marginTop: "10px" }}>
            Overview
          </Typography>
          <Typography style={{ marginBottom: "2rem" }}>
            {data?.overview}
          </Typography>
          <Typography variant="h5" gutterBottom>
            {" "}
            Top Cast
          </Typography>
          <Grid container item spacing={2}>
            {data &&
              data.credits?.cast
                ?.map(
                  (character, i) =>
                    character.profile_path && (
                      <Grid
                        item
                        key={i}
                        xs={4}
                        md={2}
                        component={Link}
                        to={`/actors/${character.id}`}
                        style={{ textDecoration: "none" }}
                      >
                        <CastImg
                          src={`https://image.tmdb.org/t/p/w500/${character.profile_path}`}
                          alt={character.name}
                        />
                        <Typography color="textPrimary">
                          {character?.name}
                        </Typography>
                        <Typography color="textSecondary">
                          {character.character.split("/")[0]}
                        </Typography>
                      </Grid>
                    )
                )
                .slice(0, 6)}
          </Grid>
          <Grid container item style={{ marginTop: "2rem" }}>
            <ButtonsContainer>
              <ButtonsGrid item xs={12} sm={6}>
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={data?.homepage}
                    endIcon={<Language />}
                  >
                    Website
                  </Button>
                  <Button
                    target="_blank"
                    rel="noopener noreferrer"
                    href={`https://www.imdb.com/title/${data?.imdb_id}`}
                    endIcon={<MovieIcon />}
                  >
                    IMDB
                  </Button>
                  <Button
                    onClick={() => setOpen(true)}
                    href="#"
                    endIcon={<Theaters />}
                  >
                    Trailer
                  </Button>
                </ButtonGroup>
              </ButtonsGrid>

              <ButtonsGrid item xs={12} sm={6}>
                <ButtonGroup size="small" variant="outlined">
                  <Button
                    onClick={addToFavorites}
                    endIcon={
                      isMovieFavorited ? (
                        <FavoriteBorderOutlined />
                      ) : (
                        <Favorite />
                      )
                    }
                  >
                    {isMovieFavorited ? "Unfavorite" : "Favorite"}
                  </Button>
                  <Button
                    onClick={addToWatchlist}
                    endIcon={isMoviewatchListed ? <Remove /> : <PlusOne />}
                  >
                    Watchlist
                  </Button>
                  <Button
                    endIcon={<ArrowBack />}
                    sx={{ borderColor: "primary.main" }}
                  >
                    <Typography
                      component={Link}
                      to="/"
                      color="inherit"
                      variant="subtitle2"
                      style={{ textDecoration: "none" }}
                    >
                      Back
                    </Typography>
                  </Button>
                </ButtonGroup>
              </ButtonsGrid>
            </ButtonsContainer>
          </Grid>
        </Grid>
        <Box marginTop="5rem" width="100%">
          <Typography variant="h3" gutterBottom align="center">
            You might also like
          </Typography>
          {recommendations ? (
            <MovieList movies={recommendations} numberOfMovies={12} />
          ) : (
            <Box>Sorry nothing was found </Box>
          )}
        </Box>

        <StyledModal
          closeAfterTransition
          open={open}
          onClose={() => setOpen(false)}
        >
          {data?.videos?.results?.length > 0 && (
            <Videoiframe
              autoPlay
              frameBorder="0"
              title="Trailer"
              src={`https://www.youtube.com/embed/${data.videos.results[0].key}`}
              allow="autoplay"
            />
          )}
        </StyledModal>
      </StyledGrid>
    </div>
  );
};
