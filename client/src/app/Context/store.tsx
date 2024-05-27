"use client";

import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useCallback,
  useEffect,
} from "react";

interface Movie {
  id: number;
  backdrop_path: string;
  title: string;
  genres: string[];
}

interface User {
  username: string;
  prefferedName: string;
  genres: string[];
  likes: string[];
  avatar: string;
}

interface Genre {
  id: number;
  name: string;
}

interface ContextProps {
  activeModal: string | null;
  popularMovies: Movie[];
  setActiveModal: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User>>;
  user: User;
  fetchUserDetails: () => void;
  fetchPopularMovies: () => void;
}

type RootContentProps = {
  children: ReactNode;
};

const GlobalContext = createContext<ContextProps | undefined>(undefined);

export const GlobalContextProvider = ({ children }: RootContentProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [user, setUser] = useState<User>({
    username: "",
    prefferedName: "",
    genres: [],
    likes: [],
    avatar: "",
  });
  const [genres, setGenres] = useState<Genre[]>([]);

  const fetchGenres = useCallback(async () => {
    try {
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=0c1c779b65d0bbadb26f4d37ed5eda05&language=en-US`
      );
      if (response.ok) {
        const data = await response.json();
        setGenres(data.genres);
      } else {
        console.error("Failed to fetch genres:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching genres:", error);
    }
  }, []);

  const fetchPopularMovies = useCallback(async () => {
    try {
      const response = await fetch(
        "https://api.themoviedb.org/3/movie/popular?api_key=0c1c779b65d0bbadb26f4d37ed5eda05",
        {
          method: "GET",
          headers: {
            accept: "application/json",
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        const movies = data.results.map((movie: any) => ({
          id: movie.id,
          backdrop_path: movie.backdrop_path,
          title: movie.title,
          genres: movie.genre_ids.map((id: number) => {
            const genre = genres.find((g) => g.id === id);
            return genre ? genre.name : "";
          }),
        }));
        setPopularMovies(movies);
        console.log(movies)
      } else {
        console.error("Failed to fetch popular movies:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching popular movies:", error);
    }
  }, [genres]);

  const fetchUserDetails = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8000/api/auth/user/info", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
    } catch (error) {
      console.error("An error occurred while fetching user details:", error);
    }
  }, []);

  useEffect(() => {
    fetchGenres();
  }, [fetchGenres]);

  useEffect(() => {
    if (genres.length > 0) {
      fetchPopularMovies();
    }
  }, [genres, fetchPopularMovies]);

  return (
    <GlobalContext.Provider
      value={{
        activeModal,
        setActiveModal,
        user,
        setUser,
        fetchUserDetails,
        fetchPopularMovies,
        popularMovies,
      }}
    >
      {children}
    </GlobalContext.Provider>
  );
};

export const useGlobalContext = (): ContextProps => {
  const context = useContext(GlobalContext);
  if (!context) {
    throw new Error(
      "useGlobalContext must be used within a GlobalContextProvider"
    );
  }
  return context;
};
