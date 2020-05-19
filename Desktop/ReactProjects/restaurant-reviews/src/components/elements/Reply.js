import React from "react";
import PropTypes from "prop-types";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    width: "80%",
    marginLeft: "10%"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  deleteButton: {
    backgroundColor: "red",
    float: "right",
    cursor: "pointer"
  }
});

export default function Reply(props) {
  const classes = useStyles();

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h4">
          Replied {props.reply ? props.reply.name: ""}
        </Typography>
        <Typography variant="body2" component="p">
          {props.reply? props.reply.message : ""}
        </Typography>
      </CardContent>
    </Card>
  );
}

Reply.propTyes = {
  reply: PropTypes.object
};

Reply.propTypes = {
  reply: {}
};