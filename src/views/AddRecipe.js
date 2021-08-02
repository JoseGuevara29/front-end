import React, { useContext } from "react";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import {
  MenuItem,
  Select,
  TextField,
  Button,
  Grid,
  Typography,
} from "@material-ui/core";
import { UserContext } from "../context/UserContext";

import { axiosWithAuth } from "../helpers/axiosWithAuth";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function AddRecipe() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
    console.log("new recipe: ", user);
  };

  /////////POST
  const handleSubmit = (e) => {
    e.preventDefault();
    // saveEdit(editColor);

    axiosWithAuth()
      .post("https://reqres.in/api/users", user)
      .then((res) => {
        console.log("add data: ", res.data);
        setUser([...user, res.data]);
        // localStorage.setItem("token", res.data.token);
        history.push("/home");
      })
      .catch((err) => {
        // console.log("sad path: ", err);
      });
  };

  const handleCancel = (e) => {
    // console.log("Cancel button pushed, routing back to home.");
    history.push("/home");
  };

  return (
    <form className={classes.root} noValidate autoComplete="off">
      <Grid
        container
        spacing={0}
        direction="column"
        alignItems="center"
        justify="center"
        style={{ minHeight: "100vh" }}
      >
        <Typography variant="h5" component="h2">
          New Recipe
        </Typography>{" "}
        <br />
        <Grid item xs={12}>
          <div>
            <TextField
              id="outlined-basic"
              name="name"
              label="name"
              variant="outlined"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div>
            {" "}
            <TextField
              id="outlined-basic"
              name="job"
              label="Job"
              variant="outlined"
              value={user.job}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="Category"
              value={recipe.category}
              onChange={handleChange}
            >
              <MenuItem value="Select One">Select One</MenuItem>
              <MenuItem value="Breakfast">Breakfast</MenuItem>
              <MenuItem value="Lunch">Lunch</MenuItem>
              <MenuItem value="Dinner">Dinner</MenuItem>
              <MenuItem value="Desert">Desert</MenuItem>
              <MenuItem value="Snacks">Snacks</MenuItem>
            </Select>
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              name="Description"
              label="Description"
              multiline
              rows={8}
              variant="outlined"
              value={recipe.description}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              name="Ingredients"
              label="Ingredients"
              multiline
              rows={8}
              variant="outlined"
              value={recipe.ingredients}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              name="Instructions"
              label="Instructions"
              multiline
              rows={8}
              variant="outlined"
              value={recipe.instructions}
              onChange={handleChange}
            />
          </div> */}
          <div>
            <Button onClick={handleSubmit} variant="contained">
              Save
            </Button>
            <Button onClick={handleCancel} variant="contained">
              Cancel
            </Button>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
