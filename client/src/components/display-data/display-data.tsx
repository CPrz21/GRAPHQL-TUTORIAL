import { useState } from "react";
import { useQuery, useLazyQuery, useMutation } from "@apollo/client";

import {
  GET_ALL_USERS,
  GET_ALL_MOVIES,
  GET_MOVIE,
  CREATE_USER_MUTATION,
} from "../../graphql";
import { Movies, MoviesData, UsersData } from "../../interfaces";

export const DisplayData = () => {
  const [movieSearched, setMovieSearched] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [age, setAge] = useState(0);
  const [nationality, setNationality] = useState("");

  const {
    loading: usersLoading,
    error: usersError,
    data: usersData,
    refetch: refetchUsers,
  } = useQuery<UsersData>(GET_ALL_USERS);

  const { data: moviesData } = useQuery<MoviesData>(GET_ALL_MOVIES);

  const [fetchMovie, { data: movieData, error: movieError }] = useLazyQuery<{
    movie: Omit<Movies, "isInTheaters">;
  }>(GET_MOVIE);

  const [createUser] = useMutation(CREATE_USER_MUTATION);

  if (usersLoading) {
    return <p>Loading Your Data</p>;
  }

  if (usersError) {
    return <p>An Error has ocurred</p>;
  }

  return (
    <div>
      <input
        type="text"
        placeholder="name"
        onChange={(e) => setName(e.target.value)}
      />
      <input
        type="text"
        placeholder="username"
        onChange={(e) => setUsername(e.target.value)}
      />
      <input
        type="number"
        placeholder="age"
        onChange={(e) => setAge(Number(e.target.value))}
      />
      <input
        type="text"
        placeholder="nationality"
        onChange={(e) => setNationality(e.target.value.toUpperCase())}
      />
      <button
        onClick={() => {
          createUser({
            variables: {
              input: {
                name,
                username,
                age,
                nationality,
              },
            },
          });
          refetchUsers();
        }}
      >
        Create user
      </button>
      {usersData &&
        usersData.users.map(({ name, username, nationality, id }) => {
          return (
            <div key={id}>
              <h3>Name: {name}</h3>
              <h3>UserName: {username}</h3>
              <h3>Nationality: {nationality}</h3>
              <h3>Movies:</h3>

              <hr />
            </div>
          );
        })}

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
