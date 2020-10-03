import React, { useState } from 'react';
import { DialogTitle, DialogContent, TextField, DialogActions, Button, Dialog } from '@material-ui/core';
import { useSelector } from 'react-redux';
import { createNewProposal } from '../../../core/services/proposals.service';
import ApplicationState from '../../../core/redux/application-state';

interface Props {
  open: boolean;
  onClose: () => void;
  refreshProposals: () => void;
}

const AddProposal: React.FunctionComponent<Props> = (props) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const accountState = useSelector((state: ApplicationState) => state.account);

  async function createProposal() {
    await createNewProposal(accountState, title, description);
    props.onClose();
    setTitle('');
    setDescription('');
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

export default AddProposal;
