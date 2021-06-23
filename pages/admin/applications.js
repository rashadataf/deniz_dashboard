import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Admin from "layouts/Admin.js";
import ListApplications from "../../components/Applications/ListApplications";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Applications() {
  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <ListApplications />
    </Paper>
  );
}

Applications.layout = Admin;

export default Applications;
