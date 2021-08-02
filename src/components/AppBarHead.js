import SearchBar from "./SearchBar";
import { Button, Toolbar, AppBar, Typography, Grid } from "@material-ui/core";
import { useHistory } from "react-router-dom";

export default function AppBarHead({ searchForm, setSearchForm }) {
  const history = useHistory();

  const logout = () => {
    console.log("Logged out success!");
    localStorage.removeItem("token");
    history.push("/");
  };

  return (
    <>
      <AppBar className="AppBarRoot" position="sticky">
        <Toolbar>
          <Grid container justifyContent="space-around" alignItems="center">
            <Grid item xs={12} md={2} lg={2}>
              <Typography className="AppBarTitle" variant="h6">
                Secret Family Recipes
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={6}>
              <SearchBar
                searchForm={searchForm}
                setSearchForm={setSearchForm}
              />
            </Grid>
            <Grid item xs={6} md={2} lg={2}>
              <Button
                className="AppBarButton"
                onClick={() => history.push("/AddRecipe")}
                variant="contained"
                style={{ backgroundColor: "green", color: "white" }}
              >
                Add
              </Button>
            </Grid>
            <Grid item xs={6} md={2} lg={2}>
              <Button
                className="AppBarButton"
                onClick={logout}
                variant="contained"
              >
                Logout
              </Button>
            </Grid>

            {/* <Link
              to={'/AddRecipe'}
              style={{ textDecoration: "none", margin: "0 -15rem 0 0"}}
            > */}

            {/* </Link> */}
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
}
