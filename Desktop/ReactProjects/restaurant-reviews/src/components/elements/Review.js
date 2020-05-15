import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";
import Rating from "@material-ui/lab/Rating";

const useStyles = makeStyles({
  root: {
    minWidth: 275
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  rate: {
    display: "inline",
    float: "right"
  },
  deleteButton: {
    backgroundColor: "red",
    float: "right",
    cursor: "pointer"
  }
});

export default function Comment() {
  const classes = useStyles();

  const dummyComments = [
    {
      user: {
        name: "Vicktor",
        email: "vicktor.is.great@hotmail.com",
        role: "owner"
      },
      rating: 1.5,
      review_date: "2020-03-04",
      review: "This is a great restaurant, must try"
    },
    {
      user: {
        name: "Vicktor",
        email: "vicktor.is.great@hotmail.com",
        role: "owner"
      },
      rating: 3,
      review_date: "2020-03-04",
      review:
        "This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try"
    }
  ];

  /* Child Components */
  const replyButton_CC = comment => {
    console.log(comment.user.role);
    if (comment.user.role === "owner") {
      return <input type="button" class="reply_button" value="Reply" />;
    }
  };

  const deleteButton_CC = comment => {
    if (comment.user.role === "owner") {
      return (
        <div>
          <input type="button" class="reply_button" value="Delete" />
        </div>
      );
    }
  };

  return (
    <Card className={classes.root}>
      <CardContent>
        <div className={classes.rate}>
          <Rating
            name="half-rating-read"
            defaultValue={3}
            precision={0.5}
            readOnly
          />
        </div>
        <Typography variant="h5" component="h4">
          Sandy Sand
        </Typography>
        <Typography
          className={classes.title}
          color="textSecondary"
          gutterBottom
        >
          2020-05-12
        </Typography>
        <Typography variant="body2" component="p">
          well meaning and kindly.
          <br />
          {'"a benevolent smile"'}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small" className={classes.deleteButton}>
          RESTAURANT DETAILS
        </Button>
        <Button size="small" className={classes.deleteButton}>
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}
