import { createTheme } from "@mui/material/styles";

export const baseTheme = createTheme({
  palette: {
    primary: {
      main: "#4caf50"
    },
    secondary: {
      main: "#ffffff"
    }
  },
  shape: {
    borderRadius: 4
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          margin: 1
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#4caf50"
        }
      },
      defaultProps: {
        elevation: 0
      }
    }
  }
});

export const dark = createTheme({
  palette: {
    mode:"dark",
    primary: {
      main: "#4caf50"
    },
    secondary: {
      main: "#4caf10"
    }
  },
  shape: {
    borderRadius: 4
  },
  components: {
    MuiButton: {
      defaultProps: {
        sx: {
          margin: 1
        }
      }
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          background: "#ffffff"
        }
      },
      defaultProps: {
        elevation: 0
      }
    }
  },
});
export const theme1 = {
    palette: {
      primary: {
        main: "#1769aa"
      },
      secondary: {
        main: "#00000"
      }
    },
    components: {
      MuiButton: {
        defaultProps: {
          disableRipple: true,
          size: "large",
          sx: {
            borderRadius: "10px"
          }
        }
      },
      MuiIcon: {
        size: "large"
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            background: "green"
          }
        },
        defaultProps: {
          elevation: 20
        }
      },
    }
  };
  