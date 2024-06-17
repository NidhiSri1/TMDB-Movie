import * as React from "react";
import Paper from "@mui/material/Paper";
import InputBase from "@mui/material/InputBase";
import { makeStyles } from "tss-react/mui";

const useStyles = makeStyles()((theme) => ({
  container: {
    padding: "4px 4px",
    display: "flex",
    alignItems: "center",
    width: 400,
  },
  input: {
    marginLeft: theme.spacing(1),
    flex: 1,
  },
}));

export default function SearchBar(props) {
  const { classes } = useStyles();
  let { placeholder, onChange } = props;

  return (
    <Paper component="form" className={classes.container}>
      <InputBase
        className={classes.input}
        placeholder={placeholder}
        onChange={onChange}
        inputProps={{ "aria-label": "search google maps" }}
      />
    </Paper>
  );
}
