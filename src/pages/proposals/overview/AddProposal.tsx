import React, { useState } from 'react';
import { DialogTitle, DialogContent, TextField, DialogActions, Button, Dialog } from '@material-ui/core';
import { connect, useSelector } from 'react-redux';
import IconButton from '@material-ui/core/IconButton';
import Grid from '@material-ui/core/Grid';
import makeStyles from '@material-ui/core/styles/makeStyles';
import AddCircleIcon from '@material-ui/icons/AddCircle';
import RemoveCircleIcon from '@material-ui/icons/RemoveCircle';
import { COLOR_RED } from '../../../core/dynamic-theme/DefaultTheme';
import ApplicationState from '../../../core/redux/application-state';
import { createNewProposal } from '../../../core/services/proposals.service';
import { notifyError, notifySuccess } from '../../../core/redux/snackbar/snackbar-actions';

interface Props {
  open: boolean;
  onClose: () => void;
  refreshProposals: () => void;
  notifyError: typeof notifyError;
  notifySuccess: typeof notifySuccess;
}

const useStyles = makeStyles({
  optionsWrapper: {
    marginTop: '15px',
  },
  option: {
    marginTop: '10px',
  },
  textField: {
    width: '80%',
  },
  actions: {
    marginLeft: '5px',
    display: 'inline',
  },
});

const DEFAULT_OPTIONS = ['Approve', 'Reject'];
const MAX_OPTIONS = 4;
const MIN_OPTIONS = DEFAULT_OPTIONS.length;

const AddProposal: React.FunctionComponent<Props> = (props) => {
  const classes = useStyles();
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [options, setOptions] = useState(DEFAULT_OPTIONS);
  const [counter, setCounter] = useState(MIN_OPTIONS);
  const accountState = useSelector((state: ApplicationState) => state.account);

  function incrementCounter() {
    if (counter < MAX_OPTIONS) {
      setCounter(counter + 1);
    }
  }

  function decrementCounter() {
    if (counter > MIN_OPTIONS) {
      setOptions(options.slice(0, counter - 1));
      setCounter(counter - 1);
    }
  }

  function optionChange(index: number, text: string) {
    options[index] = text;
  }

  function renderOptions() {
    const toRender = [];
    for (let i = 1; i <= counter; i++) {
      toRender.push(
        <Grid item xs={12} className={classes.option} key={`opt-${i}`}>
          <TextField
            label={`Option ${i}`}
            type="text"
            color="secondary"
            variant="outlined"
            defaultValue={options[i - 1] ? options[i - 1] : ''}
            className={classes.textField}
            onChange={(event) => optionChange(i - 1, event.target.value)}
          />
          {counter === i && counter > MIN_OPTIONS && (
            <IconButton onClick={decrementCounter} className={classes.actions}>
              <RemoveCircleIcon color="inherit" style={{ color: COLOR_RED }} />
            </IconButton>
          )}
          {counter === i && counter < MAX_OPTIONS && (
            <IconButton onClick={incrementCounter} className={classes.actions}>
              <AddCircleIcon />
            </IconButton>
          )}
        </Grid>
      );
    }

    return (
      <Grid container className={classes.optionsWrapper}>
        {toRender}
      </Grid>
    );
  }

  async function createProposal() {
    if (options.length !== new Set<string>(options).size) {
      setOptions(DEFAULT_OPTIONS);
      setCounter(MIN_OPTIONS);
      return;
    }

    try {
      await createNewProposal(accountState, title, description, options);
    } catch (error) {
      props.notifyError(error?.message);
    }
    props.onClose();
    props.notifySuccess('Created New Proposal');
    setTitle('');
    setDescription('');
    setOptions(DEFAULT_OPTIONS);
    setCounter(MIN_OPTIONS);
    props.refreshProposals();
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>New Proposal</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          id="title"
          label="Title"
          type="text"
          fullWidth
          variant="outlined"
          value={title}
          onChange={(event) => setTitle(event.target.value)}
        />
        <TextField
          margin="dense"
          id="description"
          label="Description"
          type="text"
          multiline
          rows={5}
          rowsMax={15}
          fullWidth
          variant="outlined"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
        {renderOptions()}
      </DialogContent>
      <DialogActions>
        <Button onClick={props.onClose} color="secondary" variant="contained">
          Cancel
        </Button>
        <Button onClick={createProposal} color="primary" variant="contained">
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const mapDispatchToProps = {
  notifySuccess,
  notifyError,
};

export default connect(null, mapDispatchToProps)(AddProposal);
