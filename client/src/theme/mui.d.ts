import { Palette, PaletteOptions } from "@mui/material/styles";

declare module "@mui/material/styles" {
  interface Palette {
    text: Palette["main"];
  }

  interface PaletteOptions {
    text?: PaletteOptions["main"];
  }
}
