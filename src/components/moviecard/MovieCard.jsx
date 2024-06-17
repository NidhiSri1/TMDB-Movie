import * as React from "react";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import { makeStyles } from "tss-react/mui";
import { imageUrl } from "../../asstes/assetsList";
import { Tooltip } from "@mui/material";
import { useNavigate } from "react-router-dom";

const useStyles = makeStyles()(() => ({
  textStyle: {
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
  },
  root: {
    cursor: "pointer",
  },
}));

export default function MovieCard({ movie }) {
  const { classes } = useStyles();
  const navigate = useNavigate();
  const navigateToDetails = () =>
    navigate("/movie", { state: { id: movie.id } });
  return (
    <Card
      className={classes.root}
      onClick={navigateToDetails}
      data-testid={`Card-Item-${movie.id}`}
    >
      <CardMedia
        component="img"
        alt="green iguana"
        height="250"
        image={`${imageUrl}${movie.poster_path}`}
      />
      <CardContent>
        <Tooltip title={movie.title}>
          <Typography
            gutterBottom
            variant="h5"
            component="div"
            className={classes.textStyle}
          >
            {movie.title}
          </Typography>
        </Tooltip>
        <Tooltip title={movie.overview}>
          <Typography
            variant="body2"
            color="text.secondary"
            className={classes.textStyle}
          >
            {movie.overview}
          </Typography>
        </Tooltip>
      </CardContent>
    </Card>
  );
}
