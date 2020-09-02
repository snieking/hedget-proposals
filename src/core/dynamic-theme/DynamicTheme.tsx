import * as React from 'react';

import { ThemeProvider } from '@material-ui/styles';
import { lightTheme } from './DefaultTheme';

const DynamicTheme: React.FunctionComponent<unknown> = (props: React.PropsWithChildren<unknown>) => {
  return <ThemeProvider theme={lightTheme}>{props.children}</ThemeProvider>;
};

export default DynamicTheme;
