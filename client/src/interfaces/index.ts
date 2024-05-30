import { Dispatch, SetStateAction } from "react";
export interface Comment {
  _id: string;
  movie_id: string;
  text: string;
  rate: number | null;
  owner_user: string;
  owner_id: string;
  date: number;
}
export interface AddCommentProps {
  onNewComment: (comment: Comment) => void;
}
export interface MovieCommentProps {
  deleteCommentLocal: (id: string) => void;
  comment: Comment;
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
}

export interface User {
  username: string;
  prefferedName: string;
  genres: string[];
  likes: string[];
  avatar: string;
  id: string;
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
  setActiveModal: Dispatch<SetStateAction<string | null>>;
  setUser: Dispatch<SetStateAction<User>>;
  user: User;
  fetchUserDetails: () => void;
  fetchPopularMovies: () => void;
  fetchRecentComments: () => void;
  createComment: (commentDetails: CommentDetails) => void;
  recentComments: Comment[];
}

// export interface NewCommentWithDetails extends Comment {
//   date: number;
//   owner_user: string;
//   owner_id: string;
// }
