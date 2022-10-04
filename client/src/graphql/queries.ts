import { gql } from "@apollo/client";

export const GET_ALL_USERS = gql`
  query Users {
    users {
      id
      name
      username
      age
      nationality
      favoriteMovies {
        name
        isInTheaters
      }
    }
  }
`;

export const GET_ALL_MOVIES = gql`
  query Movies {
    movies {
      id
      name
      yearOfPublication
      isInTheaters
    }
  }
`;

export const GET_MOVIE = gql`
  query Movies($name: String!) {
    movie(name: $name) {
      id
      name
      yearOfPublication
    }
  }
`;
