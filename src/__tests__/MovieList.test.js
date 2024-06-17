import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import MoviesList from "../pages/movies/MoviesList";
import { data } from "../mockdata/mockdata";
import axios from "axios";
import React from "react";
import { getMoviesDetails } from "../api-services/movies";

jest.mock("axios");
jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => jest.fn(),
}));

describe("Movie Listing", () => {
  test("Getting Movie List", async () => {
    const mockMovies = {
      data: { results: data, total_pages: 1 },
    };
    axios.get.mockResolvedValue(mockMovies);
    render(<MoviesList />);
    const movieContainers = screen.queryAllByTestId("movie-container");
    expect(movieContainers).toHaveLength(0);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(1);
    });
    const movieContainersAfterLoad = screen.queryAllByTestId("movie-container");
    expect(movieContainersAfterLoad).toHaveLength(20);
  });

  test("Handling  sorting", async () => {
    const mockMovies = {
      data: { results: data, total_pages: 1 },
    };
    axios.get.mockResolvedValue(mockMovies);
    const { getByTestId } = render(<MoviesList />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(2);
    });
    const movieContainersAfterLoad = screen.queryAllByTestId("movie-container");
    expect(movieContainersAfterLoad).toHaveLength(20);
    const sortButton = screen.getByRole("button", { name: /Sort/i });
    fireEvent.click(sortButton);
    await waitFor(() => {
      const menu = getByTestId("basic-menu");
      expect(menu).toBeTruthy();
      const menuItemTitle = getByTestId("menu-item-Popular");
      fireEvent.click(menuItemTitle);
    });

    const afterSort = screen.queryAllByTestId("movie-container");
    expect(afterSort).toHaveLength(20);
  });

  test("When i click on a card navigate to details page", async () => {
    const mockMovies = {
      data: { results: data, total_pages: 1 },
    };
    axios.get.mockResolvedValue(mockMovies);
    render(<MoviesList />);
    await waitFor(() => {
      expect(axios.get).toHaveBeenCalledTimes(3);
    });
    const movieCard = screen.getByTestId("Card-Item-1022789");
    fireEvent.click(movieCard);
    const movieId = 1022789;
    await getMoviesDetails(movieId);
  });
});
