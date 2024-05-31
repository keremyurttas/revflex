export const handleNoImage = (backdropPath: string | undefined, fullUrl: string) => {
  const defaultBackdropPath =
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS9dI2vOEBq9ApxwOBoucjQHHZW1DWpMdwQgA&s";
  return backdropPath ? fullUrl : defaultBackdropPath;
};
