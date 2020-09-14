import React, { useState } from 'react';
import {
  DialogTitle,
  DialogContent,
  DialogContentText,
  TextField,
  DialogActions,
  Button,
  Dialog,
} from '@material-ui/core';
import { connect } from 'react-redux';
import { createNewProposal } from '../../../core/services/proposals.service';
import { KeyPair } from '../../../shared/types';
import ApplicationState from '../../../core/redux/application-state';

interface Props {
  open: boolean;
  keyPair: KeyPair;
  onClose: () => void;
  refreshProposals: () => void;
}

const AddProposal: React.FunctionComponent<Props> = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');

  function createProposal() {
    createNewProposal(props.keyPair, title, description);
    props.onClose();
    props.refreshProposals();
  }

  return (
    <Dialog open={props.open} onClose={props.onClose}>
      <DialogTitle>New Proposal</DialogTitle>
      <DialogContent>
        <DialogContentText>
          To subscribe to this website, please enter your email address here. We will send updates occasionally.
        </DialogContentText>
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
          fullWidth
          variant="outlined"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
        />
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

const mapStateToProps = (store: ApplicationState) => {
  return {
    keyPair: store.account.keyPair,
  };
};

export default connect(mapStateToProps)(AddProposal);
