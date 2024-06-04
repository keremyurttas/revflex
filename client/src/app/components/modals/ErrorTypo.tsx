import Typography from "@mui/material/Typography";
interface ErrorTypoProps {
  message: string;
}

export const ErrorTypo: React.FC<ErrorTypoProps> = ({ message }) => {
  if (!message) {
    return null; // Return null to render nothing if message is empty
  }

  return (
    <div>
      {message} {/* Return a valid React element */}
    </div>
  );
};
