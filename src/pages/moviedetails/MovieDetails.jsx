import React, { useEffect, useState } from "react";
import { Box, Chip, Grid, Rating, Skeleton, Typography } from "@mui/material";
import { useLocation } from "react-router-dom";
import { makeStyles } from "tss-react/mui";
import { getMoviesDetails } from "../../api-services/movies";
import { imageUrl } from "../../asstes/assetsList";

const useStyles = makeStyles()((theme) => ({
  root: {
    marginTop: "130px",
  },
  imageBox: {
    overflow: "hidden",
    height: "70vh",
  },
  image: {
    height: "100%",
    maxWidth: "100%",
    maxHeight: "100%",
    borderRadius: "10px",
  },
  displayDetails: {
    display: "flex",
    justifyContent: "center",
    flexDirection: "column",
  },
  titleText: {
    fontSize: "30px",
    fontWeight: "bold",
  },
  italicText: {
    fontStyle: "italic",
    marginBottom: "20px",
  },
  subHeadingText: {
    fontSize: "19px",
    fontWeight: "bold",
  },
  fontDistance: {
    marginBottom: "20px",
    fontSize: "16px",
  },
  gener: {
    display: "flex",
    marginTop: "20px",
  },
  released: {},
}));

function Details(props) {
  const location = useLocation();
  const id = location.state.id;
  const { classes } = useStyles();
  const [moviedetail, setMovieDetail] = useState({
    title: "",
    poster_path: "",
    genres: [],
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchUser = async () => {
      try {
        setLoading(true);
        const response = await getMoviesDetails(id);
        setMovieDetail(response.data);
      } catch (error) {
        console.error("Error fetching user:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, []);

  if (loading || !Object.keys(moviedetail).length > 0) {
    return (
      <Grid container>
        <Grid
          container
          item
          sm={5}
          xs={12}
          display="flex"
          justifyContent="center"
          alignItems="center"
          padding="20px"
        >
          <Skeleton width="100%" height="500px" />
        </Grid>
        <Grid
          container
          item
          sm={7}
          xs={12}
          display="flex"
          justifyContent="start"
          alignItems="center"
          padding="20px"
        >
          <Skeleton width="100%" height="500px" />
        </Grid>
      </Grid>
    );
  }

  return (
    <Grid container>
      <Grid
        container
        item
        sm={5}
        xs={12}
        display="flex"
        justifyContent="center"
        alignItems="center"
        padding="20px"
      >
        <img
          className={classes.image}
          src={`${imageUrl}${moviedetail.poster_path}`}
        ></img>
      </Grid>
      <Grid
        item
        container
        sm={7}
        xs={12}
        display="flex"
        justifyContent="start"
        direction="column"
        alignItems="start"
        padding="20px"
      >
        <Typography className={classes.titleText}>
          {moviedetail.title}
        </Typography>
        <Typography className={classes.released}>
          Released On {moviedetail.release_date}
        </Typography>
        <Box className={classes.gener}>
          {moviedetail.genres.map((genre, index) => {
            return (
              <Typography key={index} className={classes.fontDistance}>
                <Chip variant="outlined" color="secondary" label={genre.name} />
                &nbsp;
              </Typography>
            );
          })}
        </Box>
        <Box className={classes.gener}>
          {moviedetail.adult && <Chip color="primary" label="18+" />}
        </Box>

        <Typography className={classes.italicText}>
          {moviedetail.original_title}
        </Typography>
        <Typography className={classes.subHeadingText}>Overview</Typography>
        <Typography className={classes.fontDistance}>
          {moviedetail.overview}
        </Typography>
        <Grid>
          <Rating
            name="customized-10"
            defaultValue={Math.floor(moviedetail.vote_average)}
            max={10}
            disabled
          />
          <Typography className={classes.italicText}>
            from {moviedetail.vote_count} users
          </Typography>
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Details;
