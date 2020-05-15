import { makeStyles } from "@material-ui/core/styles";
import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import Button from "@material-ui/core/Button";
import Typography from "@material-ui/core/Typography";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    marginLeft: 100
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

export default function Comment() {
  const classes = useStyles();

  const dummyReplies = [
    {
      user: {
        name: "Vicktor",
        email: "vicktor.is.great@hotmail.com",
        role: "owner"
      },
      review: "This is a great restaurant, must try"
    },
    {
      user: {
        name: "Vicktor",
        email: "vicktor.is.great@hotmail.com",
        role: "owner"
      },
      review:
        "This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try This is a great restaurant, must try"
    }
  ];

  /* Child Components */
  const deleteButton_CC = reply => {
    if (reply.user.role === "owner") {
      return (
        <div>
          <input type="button" class="delete_button" value="Delete" />
        </div>
      );
    }
  };

  const replyBox_CC = () => {
    return (
      <div>
        <input type="text" className="reply-input-box" />
        <input type="reply_button" class="reply_button" value="Reply" />
      </div>
    );
  };

  return (
    <Card className={classes.root}>
      <CardContent>
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
          DELETE
        </Button>
      </CardActions>
    </Card>
  );
}
