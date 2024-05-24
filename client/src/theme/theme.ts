import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#EAEAEA", // Your custom primary color
    },
    secondary: {
      main: "#F33F3F", // Your custom secondary color
    },
    text:{
      primary:"#8E8E8E"
    }
    // You can define other custom colors here
  },
});

export default theme;
