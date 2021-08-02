import React, { useContext } from "react";
import { useHistory, useParams } from "react-router-dom";
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
import axios from "axios";

const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiTextField-root": {
      margin: theme.spacing(1),
      width: "25ch",
    },
  },
}));

export default function EditRecipe() {
  const { user, setUser } = useContext(UserContext);
  const history = useHistory();
  const classes = useStyles();
  const { id } = useParams();
  // console.log("id in edit component: ", id);

  const handleChange = (event) => {
    const { value, name } = event.target;
    setUser({ ...user, [name]: value });
    console.log("new recipe: ", user);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // saveEdit(editColor);

    axios
      .put(`https://reqres.in/api/users/${id}`, user)
      .then((res) => {
        console.log("Edit data: ", res.data);
        // localStorage.setItem("token", res.data.token);
        // setUser([...user, res.data]);
        history.push("/home");
      })
      .catch((err) => {
        // console.log("sad path: ", err);
      });
  };
  const handleDelete = () => {
    axios
      .delete(`https://reqres.in/api/users/${id}`)
      .then(() => {
        console.log("Deleted item succefully.");
        history.push("/home");
      })
      .catch((err) => {
        console.log("sad path: ", err);
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
          Edit Recipe {user.name}
        </Typography>{" "}
        <br />
        <Grid item xs={12}>
          <div>
            <TextField
              id="outlined-basic"
              name="name"
              label="Name"
              variant="outlined"
              value={user.name}
              onChange={handleChange}
            />
          </div>
          <div>
            {" "}
            <TextField
              id="outlined-basic"
              name="email"
              label="email"
              variant="outlined"
              value={user.email}
              onChange={handleChange}
            />
          </div>
          {/* <div>
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              name="category"
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
              name="description"
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
              name="ingredients"
              label="Ingredients"
              multiline
              rows={8}
              variant="outlined"
              value={recipe.Ingredients}
              onChange={handleChange}
            />
          </div>
          <div>
            <TextField
              id="outlined-multiline-static"
              name="instructions"
              label="Instructions"
              multiline
              rows={8}
              variant="outlined"
              value={recipe.instructions}
              onChange={handleChange}
            />
          </div> */}
          <div>
            <Grid container justify="space-between">
              {" "}
              <Grid item>
                <Button
                  onClick={handleSubmit}
                  variant="contained"
                  color="primary"
                  size="small"
                >
                  Save
                </Button>
              </Grid>
              <Grid item>
                <Button onClick={handleCancel} variant="contained" size="small">
                  Cancel
                </Button>
              </Grid>
              <Grid item>
                <Button
                  onClick={handleDelete}
                  variant="contained"
                  color="secondary"
                  size="small"
                >
                  Delete
                </Button>
              </Grid>
            </Grid>
          </div>
        </Grid>
      </Grid>
    </form>
  );
}
