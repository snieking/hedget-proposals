import React from 'react';
import { connect } from 'react-redux';
import { Snackbar } from '@material-ui/core';
import { CustomSnackbarContentWrapper } from './CustomSnackbar';
import ApplicationState from '../redux/application-state';
import { clearError, clearSuccess } from '../redux/snackbar/snackbar-actions';

interface Props {
  errorMessage: string;
  successMessage: string;
  clearError: typeof clearError;
  clearSuccess: typeof clearSuccess;
}

const SnackbarHolder: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        style={{
          zIndex: 10000,
        }}
        open={props.successMessage != null}
        autoHideDuration={3000}
        onClose={props.clearSuccess}
      >
        <CustomSnackbarContentWrapper variant="success" message={props.successMessage} />
      </Snackbar>
      <Snackbar
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        style={{
          zIndex: 10000,
        }}
        open={props.errorMessage != null}
        autoHideDuration={3000}
        onClose={props.clearError}
      >
        <CustomSnackbarContentWrapper variant="error" message={props.errorMessage} />
      </Snackbar>
    </>
  );
};

const mapStateToProps = (store: ApplicationState) => {
  return {
    errorMessage: store.snackbar.errorMessage,
    successMessage: store.snackbar.successMessage,
  };
};

const mapDispatchToProps = {
  clearError,
  clearSuccess,
};

export default connect(mapStateToProps, mapDispatchToProps)(SnackbarHolder);
