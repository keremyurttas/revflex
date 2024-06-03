import Avatar from "@mui/material/Avatar";
import { FC } from "react";
interface CircleAvatarProps {
  id: string;
  owner: string;
}

export const CircleAvatar: FC<CircleAvatarProps> = ({ id, owner }) => {
  return (
    <>
      <Avatar alt={owner} src={`http://localhost:8000/api/avatars/${id}`}>
        {owner[0].toUpperCase()}
      </Avatar>
    </>
  );
};
