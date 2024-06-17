import { Box, Grid, Skeleton } from "@mui/material";
import React, { useEffect, useState } from "react";
import Pagination from "@mui/material/Pagination";
import { makeStyles } from "tss-react/mui";
import { getMovies } from "../../api-services/movies";
import MovieCard from "../../components/moviecard/MovieCard";
import SearchBar from "../../components/searchbar/SearchBar";
import FilterDate from "../../components/filterbydate/FilterDate";

const useStyles = makeStyles()(() => ({
  root: {
    margin: "0px",
    padding: "0px",
    width: "100%",
  },
  cardContainer: {
    padding: "20px 80px",
  },
}));

const filterText = ["Popular", "Title", "Release Date"];
const filterValues = {
  Popular: "popularity.desc",
  Title: "title.asc",
  "Release Date": "primary_release_date.asc",
};

function MoviesList() {
  const { classes } = useStyles();
  const [movieList, setMovieList] = useState([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPage] = useState(1);
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [sortValue, setSortValue] = useState("Popular");
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSort = (value) => {
    setSortValue(value);
    setAnchorEl(null);
  };

  const handleChange = (value) => {
    setPage(value);
  };

  const loadMovies = async () => {
    try {
      setLoading(true);
      const response = await getMovies(page, filterValues[sortValue]);
      setMovieList(response.data.results);
      setTotalPage(response.data.total_pages);
    } catch (error) {
      console.error("Error fetching user:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadMovies();
  }, [page, sortValue]);

  return (
    <Grid container className={classes.root}>
      <Grid
        item
        container
        sm={12}
        alignContent="center"
        display="flex"
        justifyContent="center"
        paddingTop="20px"
      >
        <SearchBar placeholder="Search Movie" />
        <FilterDate
          handleSort={handleSort}
          filterText={filterText}
          anchorEl={anchorEl}
          open={open}
          handleClick={handleClick}
          handleClose={handleClose}
          sortValue={sortValue}
        />
      </Grid>
      <Grid
        item
        container
        sm={12}
        spacing={3}
        className={classes.cardContainer}
        data-testid="display-data-grid"
      >
        {loading &&
          new Array(12).fill(0).map((item, index) => (
            <Grid item xs={12} sm={6} md={4} lg={3} key={index}>
              <Skeleton variant="rectangular" width={210} height={118} />
              <Box sx={{ pt: 0.5 }}>
                <Skeleton width="40%" />
                <Skeleton width="40%" />
              </Box>
            </Grid>
          ))}
        {!loading &&
          movieList.map((movie) => (
            <Grid
              key={movie.id}
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              data-testid="movie-container"
            >
              <MovieCard movie={movie} />
            </Grid>
          ))}
      </Grid>
      <Grid item sm={12} display="flex" justifyContent="center">
        {!loading && (
          <Pagination
            count={totalPages}
            page={page}
            onChange={handleChange}
            data-testid="pagination-container"
          />
        )}
      </Grid>
    </Grid>
  );
}

export default MoviesList;
