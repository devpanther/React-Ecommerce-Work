import { useQuery } from "@apollo/client";
import React, { useEffect, useState } from "react";
import { Grid, Hidden, Paper, Typography } from "@material-ui/core";
import { Pagination } from "@material-ui/lab";
import qs from "querystring";

import { RECIPES_BY_CATEGORY } from "../queries/recipe";
import { useStyles } from "../styles/home";
import { paginate } from "../utils/helpers";
import Loading from "../components/shared/Loading";
import RecipeCard from "../components/shared/RecipeCard";
import NoResult from "../components/shared/NoResult";

const Recipes = ({ location }) => {
  const { category, search } = qs.parse(location.search.replace("?", ""));
  const { data, loading } = useQuery(RECIPES_BY_CATEGORY, {
    variables: { title: category ? category : search, count: 200 },
  });
  const [page, setPage] = useState(1);
  const classes = useStyles();
  const handleChange = (e, page) => {
    setPage(page);
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  if (loading) return <Loading />;
  let count = 0;
  let paginatedData = [];
  const recipesPerPage = 12;
  if (data) {
    count = Math.ceil(data.recipesByCategory.length / recipesPerPage);
    paginatedData = paginate(page, recipesPerPage, data.recipesByCategory);
  }

  if (!paginatedData.length && !loading) return <NoResult search={search} />;
  return (
    <Paper className={classes.paper}>
      {category && (
        <center>
          <Typography
            style={{ marginBottom: "1rem", textTransform: "uppercase" }}
            variant="h5"
          >
            {category.endsWith("s") ? category : `${category}s`}
          </Typography>
        </center>
      )}
      {search && (
        <center>
          <Typography style={{ marginBottom: "1rem" }} variant="h5">
            {`Found over ${data.recipesByCategory.length} results for `}
            <strong>{search}</strong>
          </Typography>
        </center>
      )}

      <Hidden xsDown>
        <Pagination
          className={classes.pagination}
          count={count}
          page={page}
          color="primary"
          shape="rounded"
          size="large"
          onChange={(e, page) => handleChange(e, page)}
        />
      </Hidden>
      <Hidden smUp>
        <Pagination
          className={classes.pagination}
          count={count}
          page={page}
          color="primary"
          shape="rounded"
          size="small"
          onChange={(e, page) => handleChange(e, page)}
        />
      </Hidden>

      <Grid container justify="center" alignItems="center" spacing={2}>
        {data
          ? paginatedData.map((recipe) => (
              <Grid
                key={recipe._id}
                className={classes.gridItem}
                item
                xs={12}
                sm={6}
                md={4}
                lg={3}
              >
                <RecipeCard stretch recipe={recipe} />
              </Grid>
            ))
          : null}
      </Grid>

      <Hidden xsDown>
        <Pagination
          className={classes.pagination}
          count={count}
          page={page}
          color="primary"
          shape="rounded"
          size="large"
          onChange={(e, page) => handleChange(e, page)}
        />
      </Hidden>
      <Hidden smUp>
        <Pagination
          className={classes.pagination}
          count={count}
          page={page}
          color="primary"
          shape="rounded"
          size="small"
          onChange={(e, page) => handleChange(e, page)}
        />
      </Hidden>
    </Paper>
  );
};

export default Recipes;
