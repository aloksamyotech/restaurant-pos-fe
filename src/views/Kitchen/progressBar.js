import * as React from 'react';
import PropTypes from 'prop-types';
import LinearProgress from '@mui/material/LinearProgress';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';

function LinearProgressWithLabel(props) {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center' }}>
      <Box sx={{ width: '100%', mr: 1 }}>
        <LinearProgress variant="determinate" value={props.value} />
      </Box>
      <Box sx={{ minWidth: 35 }}>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {`${Math.round(props.value)}%`}
        </Typography>
      </Box>
    </Box>
  );
}

LinearProgressWithLabel.propTypes = {
  value: PropTypes.number.isRequired, 
};

export default function LinearWithValueLabel({ completedPercentage }) {
  return (
    <Box sx={{ width: '100%' }}>
        <Typography>Order Complete Percentage</Typography>
      <LinearProgressWithLabel value={completedPercentage} />
    </Box>
  );
}

LinearWithValueLabel.propTypes = {
  completedPercentage: PropTypes.number.isRequired,
};
