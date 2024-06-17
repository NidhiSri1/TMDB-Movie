import { createBrowserRouter } from "react-router-dom";
import MoviesList from "../pages/movies/MoviesList";
import MainLayout from "../layout/MainLayout";
import React, { Suspense } from "react";
import { Box, Skeleton } from "@mui/material";

const MovieDetails = React.lazy(() =>
  import("../pages/moviedetails/MovieDetails")
);

export const router = createBrowserRouter([
  {
    path: "/",
    element: <MainLayout />,
    children: [
      {
        path: "/",
        element: <MoviesList />,
      },
      {
        path: "/movie",
        element: (
          <Suspense
            fallback={
              <Box sx={{ display: "flex",justifyContent:"space-around" }}>
                <Skeleton width="48%" height="800px"></Skeleton>
                <Skeleton width="48%" height="800px"></Skeleton>
              </Box>
            }
          >
            <MovieDetails />
          </Suspense>
        ),
      },
    ],
  },
]);
