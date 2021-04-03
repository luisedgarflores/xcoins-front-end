import React from 'react';
import { useExchangeBarStyles } from './ExchangeBar.styles';
import Paper from '@material-ui/core/Paper';
import InputBase from '@material-ui/core/InputBase';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import RefreshIcon from '@material-ui/icons/Refresh';

export default function ExchangeBar({data}) {
  const classes = useExchangeBarStyles();

  return (
    <Paper component="form" className={classes.root}>
      <IconButton className={classes.iconButton} aria-label="menu">
        <MenuIcon />
      </IconButton>
      <InputBase
        className={classes.exchangeField}
        value={data.usd}
        placeholder="Exchange rate"
        disabled={true}
        inputProps={{ 'aria-label': 'Set spread' }}
      />
      <InputBase
        className={classes.input}
        placeholder="spread"
        inputProps={{ 'aria-label': 'spread' }}
      />
      <Divider className={classes.divider} orientation="vertical" />
      <IconButton color="primary" className={classes.iconButton} aria-label="directions">
        <RefreshIcon />
      </IconButton>
    </Paper>
  );
}