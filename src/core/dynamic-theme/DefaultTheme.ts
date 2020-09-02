import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const COLOR_CHROMIA_LIGHTER = '#fbf8ff';
export const COLOR_CHROMIA_LIGHT = '#f9f6fd';
export const COLOR_GRAY = '#c0bdc3';
export const COLOR_CHROMIA_DARK_LIGHTER = '#333037';
export const COLOR_CHROMIA_DARK = '#1F1A23';
export const COLOR_CHROMIA_DARKER = '#1e1b23';
export const COLOR_RED = '#FF405E';
export const COLOR_ORANGE = '#FF702B';
export const COLOR_STEEL_BLUE = '#4D617D';
export const COLOR_PURPLE = '#CC91F0';
export const COLOR_SOFT_PINK = '#FFB0C2';
export const COLOR_YELLOW = '#FFB500';
export const COLOR_OFF_WHITE = '#FFF8F8';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: COLOR_STEEL_BLUE,
    },
    secondary: {
      main: COLOR_SOFT_PINK,
    },
    background: { default: COLOR_CHROMIA_LIGHTER },
  },
  typography: {
    fontFamily: '"International", "Roboto", "Helvetica", "Arial", sans-serif',
  },
  overrides: {
    MuiDialog: {
      paper: {
        background: COLOR_OFF_WHITE,
        border: 'solid 1px',
        borderColor: COLOR_STEEL_BLUE,
      },
    },
    MuiTextField: {
      root: {
        '& label.Mui-focused': {
          color: COLOR_STEEL_BLUE,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: COLOR_STEEL_BLUE,
          },
          '&:hover fieldset': {
            borderColor: COLOR_RED,
          },
          '&.Mui-focused fieldset': {
            borderColor: COLOR_STEEL_BLUE,
          },
          color: COLOR_CHROMIA_DARK,
        },
        '& label': {
          color: COLOR_CHROMIA_DARK,
          opacity: 0.5,
        },
      },
    },
    MuiToolbar: {
      root: {
        background: COLOR_CHROMIA_LIGHTER,
      },
    },
    MuiTypography: {
      subtitle1: {
        color: COLOR_CHROMIA_DARKER,
      },
      subtitle2: {
        color: COLOR_STEEL_BLUE,
      },
      caption: {
        color: COLOR_YELLOW,
      },
      h1: {
        color: COLOR_STEEL_BLUE,
        fontFamily: '"Battlefin", "International", "Roboto", "Helvetica", "Arial", "sans-serif"',
        fontSize: '32px',
        paddingTop: '20px',
      },
      h5: {
        color: COLOR_STEEL_BLUE,
        fontFamily: '"Battlefin", "International", "Roboto", "Helvetica", "Arial", "sans-serif"',
      },
      h6: {
        color: COLOR_STEEL_BLUE,
        fontFamily: '"Battlefin", "International", "Roboto", "Helvetica", "Arial", "sans-serif"',
      },
      body1: {
        color: COLOR_CHROMIA_DARK,
      },
      body2: {
        color: COLOR_CHROMIA_DARK,
      },
      colorTextSecondary: {
        color: COLOR_CHROMIA_DARK,
        opacity: 0.4,
      },
      gutterBottom: {
        marginBottom: 0,
      },
      colorInherit: {
        color: 'none',
      },
    },
    MuiMenu: {
      paper: {
        background: COLOR_OFF_WHITE,
      },
    },
    MuiMenuItem: {
      gutters: {
        color: COLOR_STEEL_BLUE,
        background: COLOR_OFF_WHITE,
      },
    },
    MuiListItemIcon: {
      root: {
        color: COLOR_STEEL_BLUE,
      },
    },
    MuiIconButton: {
      colorInherit: {
        color: COLOR_STEEL_BLUE,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: COLOR_STEEL_BLUE,
      },
    },
    MuiPaper: {
      root: {
        backgroundColor: COLOR_OFF_WHITE,
      },
    },
    MuiCard: {
      root: {
        background: COLOR_OFF_WHITE,
        marginBottom: '3px',
      },
    },
    MuiSvgIcon: {
      root: {
        color: COLOR_STEEL_BLUE,
      },
    },
    MuiLink: {
      root: {
        color: COLOR_PURPLE,
      },
    },
    MuiListItem: {
      root: {
        '&$selected': {
          backgroundColor: COLOR_OFF_WHITE,
        },
      },
    },
    MuiAvatar: {
      root: {
        color: COLOR_OFF_WHITE,
      },
    },
    MuiSelect: {
      icon: {
        color: COLOR_STEEL_BLUE,
      },
    },
    MuiChip: {
      root: {
        color: COLOR_OFF_WHITE,
      },
    },
  },
});
