import React, { useEffect, useContext } from "react";
import { Container, Grid } from "@material-ui/core";
import { cardsInformation } from "../dummyData";
import RecipeCard from "./RecipeCard";
import { UserContext } from "../context/UserContext";
import { axiosWithAuth } from "../helpers/axiosWithAuth";

export default function RecipeCards({ searchForm }) {
  const { searchCategory, searchTerm } = searchForm;
  const { user, setUser } = useContext(UserContext);
  useEffect(() => {
    axiosWithAuth()
      .get("https://reqres.in/api/users?page=2")
      .then((res) => {
        // console.log("respone: ", res.data.data);
        setUser(res.data.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  console.log("users: ", user);
  // console.log("Dummy data: ", cardsInformation);

  return (
    <Container>
      <Grid spacing={6} container justifyContent="center" alignItems="baseline">
        {console.log("recipe before map: ", user)}
        {user.map((cardInfo, index) => {
          return (
            <Grid item key={index} xs={12} md={6} lg={4}>
              <RecipeCard cardInfo={cardInfo} />
              {console.log("cardInfo: ", cardInfo)}
            </Grid>
          );

          // if (searchCategory === "all" && searchTerm === "") {
          //   console.log("cardInfo: ", cardInfo);
          //   return (
          //     <Grid item key={index} xs={12} md={6} lg={4}>
          //       <RecipeCard cardInfo={cardInfo} />
          //     </Grid>
          //   );
          // } else if (
          //   cardInfo.name.toLowerCase().includes(searchTerm.toLowerCase()) &&
          //   (cardInfo.category === searchCategory || searchCategory === "all")
          // ) {
          //   return (
          //     <Grid item key={index} xs={12} md={6} lg={4}>
          //       <RecipeCard cardInfo={cardInfo} />
          //     </Grid>
          //   );
          // } else if (
          //   searchTerm === "" &&
          //   cardInfo.category === searchCategory
          // ) {
          //   return (
          //     <Grid item key={index} xs={12} md={6} lg={4}>
          //       <RecipeCard cardInfo={cardInfo} />
          //     </Grid>
          //   );
          // } else {
          //   //pass
          // }
        })}
      </Grid>
    </Container>
  );
}
