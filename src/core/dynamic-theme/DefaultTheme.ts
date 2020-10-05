import createMuiTheme from '@material-ui/core/styles/createMuiTheme';

export const COLOR_CHROMIA_LIGHTER = '#FEFEFE';
export const COLOR_CHROMIA_LIGHT = '#fafafa';
export const COLOR_CHROMIA_DARK_LIGHTER = '#333037';
export const COLOR_CHROMIA_DARK = '#1F1A23';
export const COLOR_CHROMIA_DARKER = '#1e1b23';
export const COLOR_RED = '#FF405E';
export const COLOR_ORANGE = '#FF702B';
export const COLOR_STEEL_BLUE = '#4D617D';
export const COLOR_PURPLE = '#CC91F0';
export const COLOR_SOFT_PINK = '#FFB0C2';
export const COLOR_YELLOW = '#F8C749';
export const COLOR_OFF_WHITE = '#f9f6fd';
export const COLOR_HEDGET_GREEN = '#4ACEA5';
export const COLOR_HEDGET_OFF_GREEN = '#66D5B1';

export const lightTheme = createMuiTheme({
  palette: {
    type: 'light',
    primary: {
      main: COLOR_HEDGET_GREEN,
    },
    secondary: {
      main: COLOR_YELLOW,
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
        borderColor: COLOR_HEDGET_GREEN,
      },
    },
    MuiTextField: {
      root: {
        '& label.Mui-focused': {
          color: COLOR_HEDGET_GREEN,
        },
        '& .MuiOutlinedInput-root': {
          '& fieldset': {
            borderColor: COLOR_HEDGET_GREEN,
          },
          '&:hover fieldset': {
            borderColor: COLOR_RED,
          },
          '&.Mui-focused fieldset': {
            borderColor: COLOR_HEDGET_GREEN,
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
        color: COLOR_CHROMIA_DARK,
      },
      caption: {
        color: COLOR_YELLOW,
      },
      h1: {
        color: COLOR_CHROMIA_DARK,
        fontFamily: '"Battlefin", "International", "Roboto", "Helvetica", "Arial", "sans-serif"',
        fontSize: '32px',
        paddingTop: '20px',
      },
      h5: {
        color: COLOR_CHROMIA_DARK,
        fontFamily: '"Battlefin", "International", "Roboto", "Helvetica", "Arial", "sans-serif"',
      },
      h6: {
        color: COLOR_CHROMIA_DARK,
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
        color: COLOR_CHROMIA_DARK,
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
        color: COLOR_HEDGET_GREEN,
      },
    },
    MuiIconButton: {
      colorInherit: {
        color: COLOR_HEDGET_GREEN,
      },
    },
    MuiDivider: {
      root: {
        backgroundColor: COLOR_HEDGET_GREEN,
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
        color: COLOR_CHROMIA_DARK,
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
        color: COLOR_HEDGET_GREEN,
      },
    },
    MuiChip: {
      root: {
        color: COLOR_OFF_WHITE,
      },
    },
  },
});
