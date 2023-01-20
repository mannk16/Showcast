import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { selectGenreOrCategory } from "../../Features/currentGenreOrCategory";
import {
  LinkContainer,
  ImageContainer,
  StyledDivider,
  StyledLinks,
  GenreImgs,
} from "./styles";
import {
  useTheme,
  Divider,
  List,
  ListItem,
  ListItemText,
  ListSubheader,
  ListItemIcon,
  Box,
  CircularProgress,
} from "@mui/material";

import { useGetGenresQuery } from "../../Services/TMDB";

import image1 from "../../Showcast/1.jpeg";
import image2 from "../../Showcast/2.jpeg";

import { genres } from "../../assets-genres";

const Categories = [
  { label: "Popular", value: "popular" },
  { label: "Top Rated", value: "top_rated" },
  { label: "Upcoming", value: "upcoming" },
];

export const Sidebar = ({ setMobileOpen }) => {
  const navigate = useNavigate();
  const theme = useTheme();
  const { data, isFetching } = useGetGenresQuery();
  const dispatch = useDispatch();
  const { genreIdOrCategoryName } = useSelector(
    (state) => state.currentgenreOrCategory
  );

  return (
    <>
      <LinkContainer onClick={() => navigate("/")}>
        <ImageContainer
          src={theme.palette.mode === "light" ? image1 : image2}
          alt="filmverse logo"
        />
      </LinkContainer>
      <StyledDivider />
      <List>
        <ListSubheader>Categories</ListSubheader>
        {Categories.map(({ label, value }) => (
          <StyledLinks key={value} onClick={() => navigate("/")}>
            <ListItem
              onClick={() => dispatch(selectGenreOrCategory(value))}
              button
            >
              <ListItemIcon>
                <GenreImgs src={genres[label.toLowerCase()]}></GenreImgs>
              </ListItemIcon>
              <ListItemText primary={label} />
            </ListItem>
          </StyledLinks>
        ))}
      </List>
      <Divider />
      <List>
        <ListSubheader>Genres</ListSubheader>
        {isFetching ? (
          <Box display="flex" justifyContent="center">
            <CircularProgress />
          </Box>
        ) : (
          data.genres.map(({ name, id }) => (
            <StyledLinks key={id} onClick={() => navigate("/")}>
              <ListItem
                onClick={() => dispatch(selectGenreOrCategory(id))}
                button
              >
                <ListItemIcon>
                  <GenreImgs src={genres[name.toLowerCase()]}></GenreImgs>
                </ListItemIcon>
                <ListItemText primary={name} />
              </ListItem>
            </StyledLinks>
          ))
        )}
      </List>
    </>
  );
};
