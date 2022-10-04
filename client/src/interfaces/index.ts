interface Users {
  id: string;
  name: string;
  username: string;
  age: number;
  nationality: string;
  favoriteMovies: FavoriteMovie[];
}

interface FavoriteMovie {
  id: string;
  name: string;
  yearOfPublication: number;
  isInTheaters: boolean;
}

export interface UsersData {
  users: Users[];
}

export interface Movies {
  id: string;
  name: string;
  yearOfPublication: number;
  isInTheaters: boolean;
}

export interface MoviesData {
  movies: Movies[];
}
