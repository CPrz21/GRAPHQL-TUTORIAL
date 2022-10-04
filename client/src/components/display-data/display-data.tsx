import { useQuery, useLazyQuery } from "@apollo/client";
import { useState } from "react";

import { GET_ALL_USERS, GET_ALL_MOVIES, GET_MOVIE } from "../../graphql";
import { Movies, MoviesData, UsersData } from "../../interfaces";

export const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
  } = useQuery<UsersData>(GET_ALL_USERS);

  const { data: moviesData } = useQuery<MoviesData>(GET_ALL_MOVIES);

  const [fetchMovie, { data: movieData, error: movieError }] = useLazyQuery<{
    movie: Omit<Movies, "isInTheaters">;
  }>(GET_MOVIE);

  if (usersLoading) {
    return <p>Loading Your Data</p>;
  }

  if (usersError) {
    return <p>An Error has ocurred</p>;
  }

  return (
    <div>
      {/* {usersData &&
        usersData.users.map(({name, username, nationality, id}) => {
          return (
            <div key={id}>
              <h3>Name: {name}</h3>
              <h3>UserName: {username}</h3>
              <h3>Nationality: {nationality}</h3>
              <h3>Movies:</h3>

              <hr />
            </div>
          );
        })} */}

      {moviesData &&
        moviesData.movies.map(
          ({ id, name, yearOfPublication, isInTheaters }) => {
            return (
              <div key={id}>
                <h3>Name: {name}</h3>
                <h3>YearOfPublication: {yearOfPublication}</h3>
                <h3>IsInTheaters: {isInTheaters ? "Yes" : "No"}</h3>
                <hr />
              </div>
            );
          }
        )}

      <div>
        <input
          type="text"
          placeholder="Find a movie"
          onChange={(e) => setMovieSearched(e.target.value)}
        />
        <button
          onClick={() =>
            fetchMovie({
              variables: {
                name: movieSearched,
              },
            })
          }
        >
          Search
        </button>
      </div>
      {movieError && <p>An Error Has ocurred fetching your data</p>}
      {movieData && (
        <>
          <h3>{movieData.movie.id}</h3>
          <h3>{movieData.movie.name}</h3>
          <h3>{movieData.movie.yearOfPublication}</h3>
        </>
      )}
    </div>
  );
};
