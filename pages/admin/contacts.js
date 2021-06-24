import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";

import Admin from "layouts/Admin.js";
import ListContacts from "../../components/Contacts/ListContacts";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
  },
}));

function Contacts() {
  const classes = useStyles();

  return (
    <Paper square className={classes.root}>
      <ListContacts />
    </Paper>
  );
}

Contacts.layout = Admin;

export default Contacts;
