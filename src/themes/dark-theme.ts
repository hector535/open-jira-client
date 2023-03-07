import red from "@mui/material/colors/red";
import createTheme from "@mui/material/styles/createTheme";

//Lo que se va a poner aqui extendera del tema dark.
export const darkTheme = createTheme({
  //Estos son paletas de colores, aqui yo defino como quiero que se vean los colores primarios, secundarios, background, success, warning, info, etc.
  palette: {
    mode: "dark",
    secondary: {
      main: "#19857b",
    },
    error: {
      main: red.A400,
    },
  },

  //Aqui yo puedo definir como yo quiero que se vean los componentes por defecto para el tema light
  components: {
    MuiAppBar: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: {
          backgroundColor: "#4a148c",
        },
      },
    },
  },
});
