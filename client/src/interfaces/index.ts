import { ChangeEvent, Dispatch, SetStateAction } from "react";
export interface Comment {
  _id: string;
  movie_id: string;
  text: string;
  rate: number | null;
  owner_user: string;
  owner_id: string;
  date: Date;
}
export interface AddCommentProps {
  onNewComment: (comment: void | Comment) => void;
}
export interface MovieCommentProps {
  deleteCommentLocal: (id: string) => void;
  comment: Comment;
}
export interface LikedMovie {
  movie_id: string;
  date: Date;
  _id: string;
}
export interface MovieData {
  title: string;
  overview: string;
  genres: {
    id: number;
    name: string;
  }[];
  director: {
    name: string;
    profile_path: string;
  };
  cast: {
    name: string;
    profile_path: string;
    character: string;
  }[];
  original_language: string;
  release_date: string;
  backdrop_path: string;
}

export interface Movie {
  id: number;
  backdrop_path: string;
  title: string;
  genres: string[];
  isLiked: boolean;
}
export interface LikedMovie {
  movie_id: string;
  date: Date;
}
export interface User {
  username: string;
  prefferedName: string;
  genres: string[];
  likes: string[];
  avatar: string;
  id: string;
  likedMovies?: LikedMovie[];
}

export interface Genre {
  id: number;
  name: string;
}
export interface CommentDetails {
  text: string;
  movie_id: string;
  rate: number | null;
}

export interface ContextProps {
  activeModal: string | null;
  popularMovies: Movie[];
  searchResults: Movie[];
  setActiveModal: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User>>;
  user: User;
  searchMovieByKey: (e: ChangeEvent<HTMLInputElement>) => void;
  fetchUserDetails: () => void;
  fetchPopularMovies: () => void;
  fetchRecentComments: () => void;
  createComment: (commentDetails: CommentDetails) => void;
  recentComments: Comment[];
  getLikedMovies: () => Promise<any[] | undefined>;
  isLoading: boolean;
}
export interface MovieDetails {
  posterPath: string;
  title: string;
}
export interface Cast {
  name: string;
  character?: string;
  profile_path: string;
}

// export interface NewCommentWithDetails extends Comment {
//   date: number;
//   owner_user: string;
//   owner_id: string;
// }
