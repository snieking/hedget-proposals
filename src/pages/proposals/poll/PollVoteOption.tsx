import React from 'react';
import { Radio, Typography } from '@material-ui/core';

interface Props {
  text: string;
  voteHandler: (option: string) => void;
}

const PollVoteOption: React.FunctionComponent<Props> = (props) => {
  return (
    <>
      <Radio
        checked={false}
        onChange={() => props.voteHandler(props.text)}
        value={props.text}
        name={props.text}
        inputProps={{ 'aria-label': props.text }}
      />
      <Typography id={props.text} component="span">
        {props.text}
      </Typography>
      <br />
    </>
  );
};

export default PollVoteOption;
