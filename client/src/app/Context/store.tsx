"use client";

import {
  ContextProps,
  Genre,
  CommentDetails,
  Movie,
  User,
  LikedMovie,
  Comment,
} from "@/interfaces";
import {
  createContext,
  useContext,
  Dispatch,
  SetStateAction,
  useState,
  ReactNode,
  useCallback,
  useEffect,
  ChangeEvent,
} from "react";

type RootContentProps = {
  children: ReactNode;
};

const GlobalContext = createContext<ContextProps | undefined>(undefined);

export const GlobalContextProvider = ({ children }: RootContentProps) => {
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [searchResults, setSearchResults] = useState<Movie[]>([]);
  const [recentComments, setRecentComments] = useState<Comment[]>([]);
  const [popularMovies, setPopularMovies] = useState<Movie[]>([]);
  const [user, setUser] = useState<User>({
    username: "",
    prefferedName: "",
    genres: [],
    likes: [],
    avatar: "",
    id: "",
  });
  const [isLoading, setIsLoading] = useState(false);
  const [genres, setGenres] = useState<Genre[]>([]);
  const BACKEND_URL = process.env.NEXT_PUBLIC_BACKEND_URL;

  const fetchGenres = useCallback(async () => {
    try {
      setIsLoading(true);
      const response = await fetch(
        `https://api.themoviedb.org/3/genre/movie/list?api_key=0c1c779b65d0bbadb26f4d37ed5eda05&language=en-US`
      );
      if (response.ok) {
        const data = await response.json();
        setGenres(data.genres);
        setIsLoading(false);
      } else {
        console.error("Failed to fetch genres:", response.statusText);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("An error occurred while fetching genres:", error);
    }
  }, []);
  // const handleResponse = (response) => {
  //   return response.result.map((movie: any) => ({
  //     id: movie.id,
  //     backdrop_path: movie.backdrop_path,
  //     title: movie.title,
  //     genres: movie.genre_ids.map((id: number) => {
  //       const genre = genres.find((g) => g.id === id);
  //       return genre ? genre.name : "";
  //     }),
  //   }));
  // };
  const fetchPopularMovies = useCallback(async () => {
    try {
      setIsLoading(true);
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
        const userLikedMovieIds =
          user?.likedMovies?.map((likedMovie) => likedMovie.movie_id) || [];

        const movies = data.results.map((movie: any) => {
          const movieIdStr = movie.id.toString();
          const isLiked = userLikedMovieIds.includes(movieIdStr);

          return {
            id: movie.id,
            backdrop_path: movie.backdrop_path,
            title: movie.title,
            isLiked: isLiked,
            genres: movie.genre_ids.map((id: number) => {
              const genre = genres.find((genre) => genre.id === id);
              return genre ? genre.name : "";
            }),
          };
        });
        setPopularMovies(movies);
      } else {
        console.error("Failed to fetch popular movies:", response.statusText);
      }
      setIsLoading(false);
    } catch (error) {
      console.error("An error occurred while fetching popular movies:", error);
    }
  }, [genres, user]);

  const fetchUserDetails = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URL}/auth/user/info`, {
        method: "GET",

        credentials: "include",
      });

      if (response.ok) {
        const data = await response.json();
        setUser(data);
      } else {
        console.error("Failed to fetch user details:", response.statusText);
      }
      setIsLoading(false)
    } catch (error) {
      console.error("An error occurred while fetching user details:", error);
    }
  }, []);

  const getLikedMovies = async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URL}/${user.id}/liked`, {
        credentials: "include",
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }

      const ids = await response.json();
      const likedMoviesPromises = ids.likedMoviesIds.map(
        async (likedMovie: LikedMovie) => {
          const secResp = await fetch(
            `https://api.themoviedb.org/3/movie/${likedMovie.movie_id}?api_key=0c1c779b65d0bbadb26f4d37ed5eda05`
          );
          if (!secResp.ok) {
            throw new Error("Network response was not ok");
          }
          const data = await secResp.json();
          return {
            id: data.id,
            backdrop_path: data.backdrop_path,
            title: data.title,
            genres: data.genres.map((genre: Genre) => genre.name),
            isLiked: true,
          };
        }
      );

      const likedMovies = await Promise.all(likedMoviesPromises);
      setIsLoading(false)
      return likedMovies;
    } catch (error) {
      console.error(error);
    }
  };
  const fetchRecentComments = useCallback(async () => {
    try {
      setIsLoading(true)
      const response = await fetch(`${BACKEND_URL}/recent-comments`, {
        method: "GET",
      });
      if (response.ok) {
        const data = await response.json();
        setRecentComments(data);
      } else {
        console.error("Failed to fetch recent comments", response.statusText);
      }
      setIsLoading(false)
    } catch (error) {
      console.error("An error occured while fetching recent comments", error);
    }
  }, []);

  const createComment = async (
    comment: CommentDetails
  ): Promise<Comment | null> => {
    try {
      setIsLoading(true)
      const response = await fetch(
        `${BACKEND_URL}/movies/${comment.movie_id}/comments`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            ...comment,
            owner_id: user.id,
            owner_user: user.username,
          }),
          credentials: "include",
        }
      );
      setIsLoading(false)
      if (response.ok) {
        const data = await response.json();
        return data; // Return the created comment
      } else {
        console.error("Failed to post a new comment:", response.statusText);
        return null;
      }
   
    } catch (error) {
      console.error("An error occurred while posting a new comment:", error);
      return null;
    }
  };
  const searchMovieByKey = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = `https://api.themoviedb.org/3/search/movie?api_key=0c1c779b65d0bbadb26f4d37ed5eda05&query=${e.target.value}`;

    try {
      const response = await fetch(url);
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
        setSearchResults(movies);
      } else {
        console.error("Failed to fetch movies:", response.statusText);
      }
    } catch (error) {
      console.error("Error fetching movies", error);
    }
  };

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
        createComment,
        searchResults,
        fetchRecentComments,
        recentComments,
        searchMovieByKey,
        getLikedMovies,
        isLoading,
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
