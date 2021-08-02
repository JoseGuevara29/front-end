import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Typography,
  Button,
  Card,
  makeStyles,
  CardContent,
  CardActions,
  Collapse,
  Grid,
  IconButton,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import clsx from "clsx";
import { red } from "@material-ui/core/colors";

const useStyles = makeStyles((theme) => ({
  root: {
    minWidth: 100,
  },
  title: {
    fontSize: 14,
  },
  pos: {
    marginBottom: 12,
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto",
    transition: theme.transitions.create("transform", {
      duration: theme.transitions.duration.shortest,
    }),
  },
  expandOpen: {
    transform: "rotate(180deg)",
  },
  avatar: {
    backgroundColor: red[500],
  },
}));

export default function RecipeCard({ cardInfo }) {
  const classes = useStyles();
  // const { id } = useParams(); UNUSED VARIABLE
  const [expanded, setExpanded] = useState(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };

  // console.log("id in recipecard component: ", id);
  // console.log("card info id: ", cardInfo);

  return (
    <>
      <Card className={classes.root}>
        <CardContent>
          <Typography
            className={classes.title}
            color="textSecondary"
            gutterBottom
          >
            Secret Recipe
          </Typography>
          <Typography variant="h5" component="h2">
            Name: {cardInfo.first_name} {cardInfo.last_name}
          </Typography>
          <Typography className={classes.pos} color="textPrimay">
            Email: {cardInfo.email}
          </Typography>

          {/* <Typography className={classes.pos} color="textSecondary">
            Category: {cardInfo.pantone_value}
          </Typography>
          <Typography className={classes.pos} variant="body2" component="p">
            <Typography color="primary">Description</Typography>

            {cardInfo.year}
          </Typography> */}
        </CardContent>

        <CardActions disableSpacing>
          <Grid container justify="space-between">
            {/* EDIT BUTTON */}
            <Grid item>
              <Link
                to={`/EditRecipe/${cardInfo.id}`}
                style={{ textDecoration: "none" }}
              >
                <Button color="primary" size="small">
                  Edit
                </Button>
              </Link>
            </Grid>

            {/* EXPAND BUTTON */}
            {/* <Grid item justify="flex-end">
              <IconButton onClick={handleExpandClick}>
                <ExpandMoreIcon
                  className={clsx(classes.expand, {
                    [classes.expandOpen]: expanded,
                  })}
                  aria-expanded={expanded}
                  aria-label="show more"
                />
              </IconButton>
            </Grid> */}
          </Grid>
        </CardActions>

        {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
          <CardContent>
            <Typography className={classes.pos} variant="body2" component="p">
              <Typography color="primary">Ingredients</Typography>
              {cardInfo.id}
            </Typography>
            <Typography variant="body2" component="p">
              <Typography color="primary">Instructions</Typography>
              {cardInfo.id}
            </Typography>
          </CardContent>
        </Collapse>  */}
      </Card>
    </>
  );
}
