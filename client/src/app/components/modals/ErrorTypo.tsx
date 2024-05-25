import Typography from "@mui/material/Typography";
interface ErrorTypoProps {
  message: string;
}

export const ErrorTypo: React.FC<ErrorTypoProps> = ({ message }) => {
  return (
    message && (
      <Typography variant="body2" color={"error"}>
        {message}
      </Typography>
    )
  );
};
